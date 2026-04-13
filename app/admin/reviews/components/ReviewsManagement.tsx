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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Star, 
  Search, 
  Filter,
  Eye,
  MessageSquare,
  Calendar,
  User,
  Trash2,
  CheckCircle,
  XCircle,
  AlertTriangle
} from "lucide-react";
import { toast } from "sonner";

interface Review {
  id: string;
  rating: number;
  comment: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
  content: {
    id: string;
    title: string;
    category: string;
  };
  createdAt: string;
  updatedAt: string;
  helpful: number;
  status: 'approved' | 'pending' | 'rejected';
}

export default function ReviewsManagement() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [filters, setFilters] = useState({
    keyword: '',
    status: '',
    rating: '',
    sortBy: 'Newest',
    sortDir: 'Desc',
  });

  // Mock data for now - would come from API
  useEffect(() => {
    const mockReviews: Review[] = [
      {
        id: "1",
        rating: 5,
        comment: "Sản phẩm rất tốt, chất lượng vượt mong đợi. Rất đáng tiền! Tôi rất hài lòng với mua sắm này.",
        user: {
          id: "user-1",
          username: "tranduy.ha",
          email: "tranduy.ha911@gmail.com",
        },
        content: {
          id: "content-1",
          title: "Bộ template thiết kế website chuyên nghiệp",
          category: "Thiết kế",
        },
        createdAt: "2026-01-15T10:30:00Z",
        updatedAt: "2026-01-15T10:30:00Z",
        helpful: 12,
        status: "approved",
      },
      {
        id: "2",
        rating: 4,
        comment: "Nội dung tốt nhưng cần cải thiện thêm về tài liệu hướng dẫn. Tổng thể là ổn.",
        user: {
          id: "user-2",
          username: "nguyenvana",
          email: "nguyenvana@example.com",
        },
        content: {
          id: "content-2",
          title: "Khóa học lập trình React từ cơ bản đến nâng cao",
          category: "Lập trình",
        },
        createdAt: "2026-01-10T15:45:00Z",
        updatedAt: "2026-01-10T15:45:00Z",
        helpful: 8,
        status: "pending",
      },
      {
        id: "3",
        rating: 2,
        comment: "Sản phẩm không như quảng cáo, chất lượng kém. Không nên mua.",
        user: {
          id: "user-3",
          username: "lethib",
          email: "lethib@example.com",
        },
        content: {
          id: "content-3",
          title: "Bộ icon vector đa dạng",
          category: "Thiết kế",
        },
        createdAt: "2026-01-05T09:20:00Z",
        updatedAt: "2026-01-05T09:20:00Z",
        helpful: 3,
        status: "rejected",
      },
      {
        id: "4",
        rating: 5,
        comment: "Tuyệt vời! Rất đáng tiền.",
        user: {
          id: "user-4",
          username: "phamvanc",
          email: "phamvanc@example.com",
        },
        content: {
          id: "content-4",
          title: "Bộ font chữ thiết kế độc quyền",
          category: "Thiết kế",
        },
        createdAt: "2026-01-03T14:15:00Z",
        updatedAt: "2026-01-03T14:15:00Z",
        helpful: 6,
        status: "pending",
      },
    ];

    setTimeout(() => {
      setReviews(mockReviews);
      setLoading(false);
    }, 1000);
  }, []);

  const handleApproveReview = async (reviewId: string) => {
    try {
      // Mock API call
      setReviews(reviews.map(r => 
        r.id === reviewId ? { ...r, status: 'approved' as const } : r
      ));
      toast.success("Đã duyệt đánh giá");
    } catch (error) {
      toast.error("Không thể duyệt đánh giá");
    }
  };

  const handleRejectReview = async (reviewId: string) => {
    if (!confirm("Bạn có chắc chắn muốn từ chối đánh giá này?")) {
      return;
    }

    try {
      // Mock API call
      setReviews(reviews.map(r => 
        r.id === reviewId ? { ...r, status: 'rejected' as const } : r
      ));
      toast.success("Đã từ chối đánh giá");
    } catch (error) {
      toast.error("Không thể từ chối đánh giá");
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa đánh giá này?")) {
      return;
    }

    try {
      // Mock API call
      setReviews(reviews.filter(r => r.id !== reviewId));
      toast.success("Đã xóa đánh giá");
    } catch (error) {
      toast.error("Không thể xóa đánh giá");
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Đã duyệt</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Chờ duyệt</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Đã từ chối</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const filteredReviews = reviews.filter(review => {
    const matchesKeyword = !filters.keyword || 
      review.comment.toLowerCase().includes(filters.keyword.toLowerCase()) ||
      review.user.username.toLowerCase().includes(filters.keyword.toLowerCase()) ||
      review.content.title.toLowerCase().includes(filters.keyword.toLowerCase());
    
    const matchesStatus = !filters.status || review.status === filters.status;
    const matchesRating = !filters.rating || review.rating.toString() === filters.rating;
    
    return matchesKeyword && matchesStatus && matchesRating;
  });

  const stats = {
    total: reviews.length,
    approved: reviews.filter(r => r.status === 'approved').length,
    pending: reviews.filter(r => r.status === 'pending').length,
    rejected: reviews.filter(r => r.status === 'rejected').length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-6">
            <div className="h-8 bg-gray-100 rounded animate-pulse"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-100 rounded-lg animate-pulse"></div>
              ))}
            </div>
            <div className="h-96 bg-gray-100 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3">
            <MessageSquare className="h-8 w-8" />
            <h1 className="text-3xl font-bold">Quản lý Đánh giá</h1>
            <Badge variant="secondary">{stats.total} đánh giá</Badge>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Tổng số</p>
                    <p className="text-2xl font-bold">{stats.total}</p>
                  </div>
                  <MessageSquare className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Đã duyệt</p>
                    <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Chờ duyệt</p>
                    <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Đã từ chối</p>
                    <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
                  </div>
                  <XCircle className="h-8 w-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Tìm kiếm đánh giá..."
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
                    <SelectItem value="approved">Đã duyệt</SelectItem>
                    <SelectItem value="pending">Chờ duyệt</SelectItem>
                    <SelectItem value="rejected">Đã từ chối</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filters.rating} onValueChange={(value) => setFilters({ ...filters, rating: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Số sao" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Tất cả</SelectItem>
                    <SelectItem value="5">5 sao</SelectItem>
                    <SelectItem value="4">4 sao</SelectItem>
                    <SelectItem value="3">3 sao</SelectItem>
                    <SelectItem value="2">2 sao</SelectItem>
                    <SelectItem value="1">1 sao</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filters.sortBy} onValueChange={(value) => setFilters({ ...filters, sortBy: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sắp xếp" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Newest">Mới nhất</SelectItem>
                    <SelectItem value="Oldest">Cũ nhất</SelectItem>
                    <SelectItem value="Rating">Đánh giá</SelectItem>
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

          {/* Reviews Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Danh sách đánh giá
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Người dùng</TableHead>
                    <TableHead>Nội dung</TableHead>
                    <TableHead>Đánh giá</TableHead>
                    <TableHead>Sao</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Ngày tạo</TableHead>
                    <TableHead>Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReviews.map((review) => (
                    <TableRow key={review.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{review.user.username}</div>
                          <div className="text-sm text-gray-500">{review.user.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{review.content.title}</div>
                          <div className="text-sm text-gray-500">{review.content.category}</div>
                          <div className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {review.comment}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4 text-gray-400" />
                          {review.helpful}
                        </div>
                      </TableCell>
                      <TableCell>
                        {renderStars(review.rating)}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(review.status)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          {formatDate(review.createdAt)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedReview(review);
                              setShowDetailDialog(true);
                            }}
                            className="h-8 w-8 p-0"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {review.status === 'pending' && (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleApproveReview(review.id)}
                                className="h-8 w-8 p-0 text-green-600"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRejectReview(review.id)}
                                className="h-8 w-8 p-0 text-red-600"
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteReview(review.id)}
                            className="h-8 w-8 p-0 text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {filteredReviews.length === 0 && (
                <div className="text-center py-16">
                  <MessageSquare className="h-24 w-24 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Không có đánh giá nào</h3>
                  <p className="text-gray-500">Không tìm thấy đánh giá nào phù hợp với bộ lọc</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
