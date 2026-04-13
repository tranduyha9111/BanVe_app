"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
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
  Edit,
  Trash2,
  X,
  MessageSquare,
  Calendar,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import { updateReview, deleteReview } from "@/app/services/reviews";

interface Review {
  id: string;
  rating: number;
  comment: string;
  content: {
    id: string;
    title: string;
    thumbnail: string;
  };
  createdAt: string;
  updatedAt: string;
  helpful: number;
}

export default function MyReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingReview, setEditingReview] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ rating: 5, comment: "" });
  const [submitting, setSubmitting] = useState(false);
  const [filters, setFilters] = useState({
    keyword: '',
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
        comment: "Sản phẩm rất tốt, chất lượng vượt mong đợi. Rất đáng tiền!",
        content: {
          id: "content-1",
          title: "Bộ template thiết kế website chuyên nghiệp",
          thumbnail: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg",
        },
        createdAt: "2026-01-15T10:30:00Z",
        updatedAt: "2026-01-15T10:30:00Z",
        helpful: 12,
      },
      {
        id: "2",
        rating: 4,
        comment: "Nội dung tốt nhưng cần cải thiện thêm về tài liệu hướng dẫn.",
        content: {
          id: "content-2",
          title: "Khóa học lập trình React từ cơ bản đến nâng cao",
          thumbnail: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg",
        },
        createdAt: "2026-01-10T15:45:00Z",
        updatedAt: "2026-01-10T15:45:00Z",
        helpful: 8,
      },
      {
        id: "3",
        rating: 3,
        comment: "Bình thường, không có gì đặc biệt.",
        content: {
          id: "content-3",
          title: "Bộ icon vector đa dạng",
          thumbnail: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg",
        },
        createdAt: "2026-01-05T09:20:00Z",
        updatedAt: "2026-01-05T09:20:00Z",
        helpful: 3,
      },
    ];

    setTimeout(() => {
      setReviews(mockReviews);
      setLoading(false);
    }, 1000);
  }, []);

  const handleEditReview = (review: Review) => {
    setEditingReview(review.id);
    setEditForm({ rating: review.rating, comment: review.comment });
  };

  const handleUpdateReview = async (reviewId: string) => {
    if (!editForm.comment.trim()) {
      toast.error("Vui lòng nhập nội dung đánh giá");
      return;
    }

    setSubmitting(true);
    try {
      const updatedReview = await updateReview(reviewId, {
        rating: editForm.rating,
        comment: editForm.comment,
      });
      setReviews(reviews.map(r => r.id === reviewId ? { ...r, ...updatedReview } : r));
      setEditingReview(null);
      setEditForm({ rating: 5, comment: "" });
      toast.success("Đã cập nhật đánh giá thành công!");
    } catch (error) {
      console.error("Failed to update review:", error);
      toast.error("Không thể cập nhật đánh giá");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa đánh giá này?")) {
      return;
    }

    try {
      await deleteReview(reviewId);
      setReviews(reviews.filter(r => r.id !== reviewId));
      toast.success("Đã xóa đánh giá thành công!");
    } catch (error) {
      console.error("Failed to delete review:", error);
      toast.error("Không thể xóa đánh giá");
    }
  };

  const cancelEdit = () => {
    setEditingReview(null);
    setEditForm({ rating: 5, comment: "" });
  };

  const renderStars = (rating: number, interactive = false, onChange?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            } ${interactive ? "cursor-pointer hover:text-yellow-400" : ""}`}
            onClick={() => interactive && onChange && onChange(star)}
          />
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-6">
            <div className="h-8 bg-gray-100 rounded animate-pulse"></div>
            <div className="grid gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-100 rounded-lg animate-pulse"></div>
              ))}
            </div>
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
            <h1 className="text-3xl font-bold">Đánh giá của tôi</h1>
            <Badge variant="secondary">{reviews.length} đánh giá</Badge>
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
                    placeholder="Tìm kiếm đánh giá..."
                    value={filters.keyword}
                    onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
                    className="pl-10"
                  />
                </div>
                
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

          {/* Reviews List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Danh sách đánh giá
              </CardTitle>
            </CardHeader>
            <CardContent>
              {reviews.length === 0 ? (
                <div className="text-center py-16">
                  <MessageSquare className="h-24 w-24 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Chưa có đánh giá nào</h3>
                  <p className="text-gray-500">Bạn chưa đánh giá sản phẩm nào</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border rounded-lg p-6">
                      <div className="flex items-start gap-4">
                        {review.content.thumbnail && (
                          <div className="w-16 h-16 relative flex-shrink-0">
                            <Image
                              src={review.content.thumbnail}
                              alt={review.content.title}
                              fill
                              className="object-cover rounded"
                              sizes="(max-width: 768px) 64px, 64px"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h4 className="font-semibold text-lg">{review.content.title}</h4>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Calendar className="h-4 w-4" />
                                <span>Đánh giá vào {formatDate(review.createdAt)}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {renderStars(review.rating)}
                              <div className="flex gap-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleEditReview(review)}
                                  className="h-8 w-8 p-0"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteReview(review.id)}
                                  className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                          
                          {editingReview === review.id ? (
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium mb-2">Đánh giá</label>
                                {renderStars(editForm.rating, true, (rating) =>
                                  setEditForm({ ...editForm, rating })
                                )}
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-2">Nhận xét</label>
                                <Textarea
                                  value={editForm.comment}
                                  onChange={(e) => setEditForm({ ...editForm, comment: e.target.value })}
                                  rows={3}
                                />
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  onClick={() => handleUpdateReview(review.id)}
                                  disabled={submitting}
                                  size="sm"
                                >
                                  <Check className="h-4 w-4 mr-1" />
                                  {submitting ? "Đang lưu..." : "Lưu"}
                                </Button>
                                <Button
                                  variant="outline"
                                  onClick={cancelEdit}
                                  disabled={submitting}
                                  size="sm"
                                >
                                  <X className="h-4 w-4 mr-1" />
                                  Hủy
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <p className="text-gray-700 leading-relaxed mb-4">{review.comment}</p>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span>{review.helpful} người thấy hữu ích</span>
                                {review.updatedAt !== review.createdAt && (
                                  <span>Đã chỉnh sửa vào {formatDate(review.updatedAt)}</span>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
