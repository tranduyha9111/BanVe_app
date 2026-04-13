"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Users, Eye, CheckCircle, XCircle, Clock } from "lucide-react";
import { toast } from "sonner";
import {
  getCollaborators,
  updateCollaboratorStatus,
  getCollaboratorDetail,
} from "@/app/services/collaborators";

interface Collaborator {
  id: string;
  user: {
    id: string;
    email: string;
    username?: string;
  };
  bankName: string;
  bankAccount: string;
  ownerName: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export default function CollaboratorManagement() {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCollaborator, setSelectedCollaborator] = useState<Collaborator | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [updatingStatus, setUpdatingStatus] = useState<Set<string>>(new Set());

  const fetchCollaborators = async () => {
    try {
      setLoading(true);
      const params = statusFilter !== 'all' ? { status: statusFilter as 'pending' | 'approved' | 'rejected' } : {};
      const data = await getCollaborators(params);
      setCollaborators(data || []);
    } catch (error) {
      console.error("Failed to fetch collaborators:", error);
      toast.error("Không thể tải danh sách cộng tác viên");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollaborators();
  }, [statusFilter]);

  const handleStatusUpdate = async (id: string, status: 'approved' | 'rejected') => {
    setUpdatingStatus((prev) => new Set(prev).add(id));
    try {
      await updateCollaboratorStatus(id, status);
      toast.success(`Đã ${status === 'approved' ? 'duyệt' : 'từ chối'} đơn đăng ký`);
      fetchCollaborators();
    } catch (error) {
      console.error("Failed to update status:", error);
      toast.error("Không thể cập nhật trạng thái");
    } finally {
      setUpdatingStatus((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  const openDetailDialog = async (collaborator: Collaborator) => {
    try {
      const detail = await getCollaboratorDetail(collaborator.id);
      setSelectedCollaborator(detail);
      setIsDetailDialogOpen(true);
    } catch (error) {
      console.error("Failed to fetch collaborator detail:", error);
      toast.error("Không thể tải thông tin chi tiết");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          Chờ duyệt
        </Badge>;
      case 'approved':
        return <Badge variant="default" className="flex items-center gap-1">
          <CheckCircle className="h-3 w-3" />
          Đã duyệt
        </Badge>;
      case 'rejected':
        return <Badge variant="destructive" className="flex items-center gap-1">
          <XCircle className="h-3 w-3" />
          Đã từ chối
        </Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Quản lý Cộng tác viên</h1>
        </div>
        <div className="grid gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Quản lý Cộng tác viên</h1>
        <div className="flex items-center gap-4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Lọc theo trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="pending">Chờ duyệt</SelectItem>
              <SelectItem value="approved">Đã duyệt</SelectItem>
              <SelectItem value="rejected">Đã từ chối</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Danh sách Cộng tác viên
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Thông tin</TableHead>
                <TableHead>Ngân hàng</TableHead>
                <TableHead>Tài khoản</TableHead>
                <TableHead>Chủ tài khoản</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Ngày đăng ký</TableHead>
                <TableHead>Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {collaborators.map((collaborator) => (
                <TableRow key={collaborator.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{collaborator.user.username || 'N/A'}</div>
                      <div className="text-sm text-gray-500">{collaborator.user.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{collaborator.bankName}</TableCell>
                  <TableCell className="font-mono">{collaborator.bankAccount}</TableCell>
                  <TableCell>{collaborator.ownerName}</TableCell>
                  <TableCell>{getStatusBadge(collaborator.status)}</TableCell>
                  <TableCell>
                    {new Date(collaborator.createdAt).toLocaleDateString('vi-VN')}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openDetailDialog(collaborator)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      
                      {collaborator.status === 'pending' && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleStatusUpdate(collaborator.id, 'approved')}
                            disabled={updatingStatus.has(collaborator.id)}
                            className="text-green-600 hover:text-green-700"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleStatusUpdate(collaborator.id, 'rejected')}
                            disabled={updatingStatus.has(collaborator.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {collaborators.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Chưa có đơn đăng ký nào.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Chi tiết Cộng tác viên</DialogTitle>
            <DialogDescription>
              Thông tin chi tiết về đơn đăng ký cộng tác viên
            </DialogDescription>
          </DialogHeader>
          {selectedCollaborator && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="font-medium">{selectedCollaborator.user.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Username</label>
                  <p className="font-medium">{selectedCollaborator.user.username || 'N/A'}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Ngân hàng</label>
                  <p className="font-medium">{selectedCollaborator.bankName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Tài khoản</label>
                  <p className="font-medium font-mono">{selectedCollaborator.bankAccount}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Chủ tài khoản</label>
                <p className="font-medium">{selectedCollaborator.ownerName}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Trạng thái</label>
                  <div className="mt-1">{getStatusBadge(selectedCollaborator.status)}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Ngày đăng ký</label>
                  <p className="font-medium">
                    {new Date(selectedCollaborator.createdAt).toLocaleDateString('vi-VN')}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
