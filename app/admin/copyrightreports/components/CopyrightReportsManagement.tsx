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
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Eye, 
  FileText,
  User,
  Calendar,
  MessageSquare
} from "lucide-react";
import { toast } from "sonner";
import {
  getCopyrightReports,
  getCopyrightReportDetail,
  approveCopyrightReport,
  rejectCopyrightReport,
} from "@/app/services/copyrightreports";

interface CopyrightReport {
  id: string;
  contentId: string;
  content: {
    id: string;
    title: string;
    thumbnail: string;
    author: {
      username: string;
    };
  };
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  reportedBy: {
    id: string;
    username: string;
    email: string;
  };
  createdAt: string;
  reviewedAt?: string;
  reviewedBy?: {
    username: string;
  };
  reviewNote?: string;
}

export default function CopyrightReportsManagement() {
  const [reports, setReports] = useState<CopyrightReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<CopyrightReport | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState<Set<string>>(new Set());

  const fetchReports = async () => {
    try {
      setLoading(true);
      const data = await getCopyrightReports();
      setReports(data?.items || []);
    } catch (error) {
      console.error("Failed to fetch copyright reports:", error);
      toast.error("Không thể tải danh sách báo cáo bản quyền");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleStatusUpdate = async (id: string, action: 'approve' | 'reject') => {
    setUpdatingStatus((prev) => new Set(prev).add(id));
    try {
      if (action === 'approve') {
        await approveCopyrightReport(id);
        toast.success("Đã phê duyệt báo cáo bản quyền");
      } else {
        await rejectCopyrightReport(id);
        toast.success("Đã từ chối báo cáo bản quyền");
      }
      fetchReports();
    } catch (error) {
      console.error("Failed to update report status:", error);
      toast.error("Không thể cập nhật trạng thái báo cáo");
    } finally {
      setUpdatingStatus((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  const openDetailDialog = async (report: CopyrightReport) => {
    try {
      const detail = await getCopyrightReportDetail(report.id);
      setSelectedReport(detail);
      setIsDetailDialogOpen(true);
    } catch (error) {
      console.error("Failed to fetch report detail:", error);
      toast.error("Không thể tải thông tin chi tiết");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">Chờ xử lý</Badge>;
      case 'approved':
        return <Badge variant="default">Đã phê duyệt</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Đã từ chối</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Shield className="h-4 w-4 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Shield className="h-8 w-8" />
          <h1 className="text-3xl font-bold">Quản lý Báo cáo Bản quyền</h1>
        </div>
        <div className="grid gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-20 bg-gray-100 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Shield className="h-8 w-8" />
        <h1 className="text-3xl font-bold">Quản lý Báo cáo Bản quyền</h1>
        <Badge variant="secondary">{reports.length} báo cáo</Badge>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chờ xử lý</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {reports.filter(r => r.status === 'pending').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Báo cáo cần xem xét
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đã phê duyệt</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {reports.filter(r => r.status === 'approved').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Báo cáo đã xác nhận
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đã từ chối</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {reports.filter(r => r.status === 'rejected').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Báo cáo bị từ chối
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Danh sách Báo cáo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nội dung</TableHead>
                <TableHead>Người báo cáo</TableHead>
                <TableHead>Lý do</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Ngày báo cáo</TableHead>
                <TableHead>Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {report.content.thumbnail && (
                        <img
                          src={report.content.thumbnail}
                          alt={report.content.title}
                          className="w-12 h-12 object-cover rounded"
                        />
                      )}
                      <div>
                        <div className="font-medium max-w-xs truncate">{report.content.title}</div>
                        <div className="text-sm text-gray-500">
                          bởi {report.content.author.username}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{report.reportedBy.username}</div>
                      <div className="text-sm text-gray-500">{report.reportedBy.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs">
                      <p className="text-sm line-clamp-2">{report.reason}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(report.status)}
                      {getStatusBadge(report.status)}
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(report.createdAt).toLocaleDateString('vi-VN')}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openDetailDialog(report)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      
                      {report.status === 'pending' && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleStatusUpdate(report.id, 'approve')}
                            disabled={updatingStatus.has(report.id)}
                            className="text-green-600 hover:text-green-700"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleStatusUpdate(report.id, 'reject')}
                            disabled={updatingStatus.has(report.id)}
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
          {reports.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Không tìm thấy báo cáo bản quyền nào.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Chi tiết Báo cáo Bản quyền</DialogTitle>
            <DialogDescription>
              Thông tin chi tiết về báo cáo vi phạm bản quyền
            </DialogDescription>
          </DialogHeader>
          {selectedReport && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">ID Báo cáo</label>
                  <p className="font-medium">{selectedReport.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Trạng thái</label>
                  <div className="mt-1 flex items-center gap-2">
                    {getStatusIcon(selectedReport.status)}
                    {getStatusBadge(selectedReport.status)}
                  </div>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Nội dung bị báo cáo</label>
                <div className="mt-1 p-3 border rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    {selectedReport.content.thumbnail && (
                      <img
                        src={selectedReport.content.thumbnail}
                        alt={selectedReport.content.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                    <div>
                      <h4 className="font-medium">{selectedReport.content.title}</h4>
                      <p className="text-sm text-gray-500">
                        bởi {selectedReport.content.author.username}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Người báo cáo</label>
                <div className="mt-1">
                  <p className="font-medium">{selectedReport.reportedBy.username}</p>
                  <p className="text-sm text-gray-500">{selectedReport.reportedBy.email}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Lý do báo cáo</label>
                <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm">{selectedReport.reason}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Ngày báo cáo</label>
                  <p className="font-medium">
                    {new Date(selectedReport.createdAt).toLocaleDateString('vi-VN')}
                  </p>
                </div>
                {selectedReport.reviewedAt && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Ngày xử lý</label>
                    <p className="font-medium">
                      {new Date(selectedReport.reviewedAt).toLocaleDateString('vi-VN')}
                    </p>
                  </div>
                )}
              </div>
              
              {selectedReport.reviewedBy && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Người xử lý</label>
                  <p className="font-medium">{selectedReport.reviewedBy.username}</p>
                </div>
              )}
              
              {selectedReport.reviewNote && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Ghi chú xử lý</label>
                  <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm">{selectedReport.reviewNote}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
