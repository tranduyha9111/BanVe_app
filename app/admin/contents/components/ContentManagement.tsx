"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { 
  FileText, 
  Eye, 
  Edit, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  Archive,
  Plus,
  Search,
  Filter
} from "lucide-react";
import { toast } from "sonner";
import {
  getManagementContents,
  updateContentStatus,
  deleteContent,
  getManagementContentDetail,
} from "@/app/services/contents";
import type { Content } from "@/types";

export default function ContentManagement() {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [filters, setFilters] = useState({
    keyword: '',
    status: '',
    categoryName: '',
    collaboratorId: '',
    sortBy: 'Newest',
    sortDir: 'Desc',
  });
  const [updatingStatus, setUpdatingStatus] = useState<Set<string>>(new Set());

  const fetchContents = async () => {
    try {
      setLoading(true);
      const params = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== '')
      );
      const data = await getManagementContents(params);
      setContents(data?.items || []);
    } catch (error) {
      console.error("Failed to fetch contents:", error);
      toast.error("Không thể tải danh sách nội dung");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContents();
  }, [filters]);

  const handleStatusUpdate = async (id: string, action: 'publish' | 'archive') => {
    setUpdatingStatus((prev) => new Set(prev).add(id));
    try {
      const publish = action === 'publish';
      await updateContentStatus(id, publish);
      toast.success(`Đã ${publish ? 'xuất bản' : 'lưu trữ'} nội dung`);
      fetchContents();
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

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa nội dung này?")) return;
    
    try {
      await deleteContent(id);
      toast.success("Đã xóa nội dung");
      fetchContents();
    } catch (error) {
      console.error("Failed to delete content:", error);
      toast.error("Không thể xóa nội dung");
    }
  };

  const openDetailDialog = async (content: Content) => {
    try {
      const detail = await getManagementContentDetail(content.id);
      setSelectedContent(detail);
      setIsDetailDialogOpen(true);
    } catch (error) {
      console.error("Failed to fetch content detail:", error);
      toast.error("Không thể tải thông tin chi tiết");
    }
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'draft':
        return <Badge variant="secondary">Bản nháp</Badge>;
      case 'published':
        return <Badge variant="default">Đã xuất bản</Badge>;
      case 'archived':
        return <Badge variant="outline">Đã lưu trữ</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Quản lý Nội dung</h1>
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
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Quản lý Nội dung</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Thêm nội dung
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Bộ lọc
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Tìm kiếm..."
                value={filters.keyword}
                onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
                className="pl-10"
              />
            </div>
            
            <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tất cả</SelectItem>
                <SelectItem value="draft">Bản nháp</SelectItem>
                <SelectItem value="published">Đã xuất bản</SelectItem>
                <SelectItem value="archived">Đã lưu trữ</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.sortBy} onValueChange={(value) => setFilters({ ...filters, sortBy: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Sắp xếp" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Newest">Mới nhất</SelectItem>
                <SelectItem value="Price">Giá</SelectItem>
                <SelectItem value="Title">Tiêu đề</SelectItem>
                <SelectItem value="Sold">Đã bán</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.sortDir} onValueChange={(value) => setFilters({ ...filters, sortDir: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Thứ tự" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Desc">Giảm dần</SelectItem>
                <SelectItem value="Asc">Tăng dần</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Contents Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Danh sách Nội dung
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nội dung</TableHead>
                <TableHead>Tác giả</TableHead>
                <TableHead>Danh mục</TableHead>
                <TableHead>Giá</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thống kê</TableHead>
                <TableHead>Ngày tạo</TableHead>
                <TableHead>Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contents.map((content) => (
                <TableRow key={content.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {content.thumbnail && (
                        <img
                          src={content.thumbnail}
                          alt={content.title}
                          className="w-12 h-12 object-cover rounded"
                        />
                      )}
                      <div>
                        <div className="font-medium max-w-xs truncate">{content.title}</div>
                        <div className="text-sm text-gray-500 line-clamp-1">
                          {content.description}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">
                        {content.collaborator?.username ?? "—"}
                      </div>
                      <div className="text-sm text-gray-500">
                        {content.collaborator?.email ?? ""}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{content.category.name}</Badge>
                  </TableCell>
                  <TableCell>
                    {content.price > 0 
                      ? `${content.price.toLocaleString('vi-VN')} ₫`
                      : "Miễn phí"
                    }
                  </TableCell>
                  <TableCell>{getStatusBadge(content.status)}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{content.views} lượt xem</div>
                      <div>{content.downloads} lượt tải</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(content.createdAt).toLocaleDateString('vi-VN')}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openDetailDialog(content)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      
                      {content.status === 'draft' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStatusUpdate(content.id, 'publish')}
                          disabled={updatingStatus.has(content.id)}
                          className="text-green-600 hover:text-green-700"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                      
                      {content.status === 'published' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStatusUpdate(content.id, 'archive')}
                          disabled={updatingStatus.has(content.id)}
                          className="text-orange-600 hover:text-orange-700"
                        >
                          <Archive className="h-4 w-4" />
                        </Button>
                      )}
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(content.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {contents.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Không tìm thấy nội dung nào.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Chi tiết Nội dung</DialogTitle>
            <DialogDescription>
              Thông tin chi tiết về nội dung
            </DialogDescription>
          </DialogHeader>
          {selectedContent && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Tiêu đề</label>
                  <p className="font-medium">{selectedContent.title}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Giá</label>
                  <p className="font-medium">
                    {selectedContent.price > 0 
                      ? `${selectedContent.price.toLocaleString('vi-VN')} ₫`
                      : "Miễn phí"
                    }
                  </p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Mô tả</label>
                <p className="text-sm">{selectedContent.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Tác giả</label>
                  <p className="font-medium">
                    {selectedContent.collaborator?.username ?? "—"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {selectedContent.collaborator?.email ?? ""}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Danh mục</label>
                  <p className="font-medium">{selectedContent.category.name}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Trạng thái</label>
                  <div className="mt-1">{getStatusBadge(selectedContent.status)}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Ngày tạo</label>
                  <p className="font-medium">
                    {new Date(selectedContent.createdAt).toLocaleDateString('vi-VN')}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Lượt xem</label>
                  <p className="font-medium">{selectedContent.views}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Lượt tải</label>
                  <p className="font-medium">{selectedContent.downloads}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
