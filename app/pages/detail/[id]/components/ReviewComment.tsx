"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getContentReviews, createReview, updateReview, deleteReview } from "@/app/services/reviews";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  MessageSquareOff, 
  Star, 
  Shield, 
  ThumbsUp, 
  Edit, 
  Trash2, 
  Check, 
  X 
} from "lucide-react";
import { toast } from "sonner";

interface Review {
  id: string;
  rating: number; 
  comment: string;
  user: {
    id: string;
    username: string;
    avatar?: string;
  };
  createdAt: string;
  helpful: number;
}

export default function ReviewComment() {
  const params = useParams();
  const contentId = params.id as string;
  
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const [submitting, setSubmitting] = useState(false);
  const [editingReview, setEditingReview] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ rating: 5, comment: "" });
  const [currentUserId, setCurrentUserId] = useState<string>("user-1"); // Mock current user

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getContentReviews(contentId);
        setReviews(data);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    if (contentId) {
      fetchReviews();
    }
  }, [contentId]);

  const handleSubmitReview = async () => {
    if (!newReview.comment.trim()) {
      toast.error("Vui lòng nhập nội dung đánh giá");
      return;
    }

    setSubmitting(true);
    try {
      const review = await createReview(contentId, {
        rating: newReview.rating,
        comment: newReview.comment,
      });
      setReviews([review, ...reviews]);
      setNewReview({ rating: 5, comment: "" });
      toast.success("Đã gửi đánh giá thành công!");
    } catch (error) {
      console.error("Failed to submit review:", error);
      toast.error("Không thể gửi đánh giá");
    } finally {
      setSubmitting(false);
    }
  };

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
      setReviews(reviews.map(r => r.id === reviewId ? updatedReview : r));
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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="p-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-3/4" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 lg:py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* LEFT */}
      <div className="col-span-2">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Đánh giá & Nhận xét
          </h2>
          <p className="text-sm text-gray-600">
            Chia sẻ trải nghiệm của bạn về sản phẩm này
          </p>
        </div>

        {/* Review Form */}
        <Card className="p-6 mb-8">
          <h3 className="font-semibold mb-4">Viết đánh giá của bạn</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Đánh giá</label>
              {renderStars(newReview.rating, true, (rating) =>
                setNewReview({ ...newReview, rating })
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Nhận xét</label>
              <Textarea
                placeholder="Chia sẻ suy nghĩ của bạn về sản phẩm này..."
                value={newReview.comment}
                onChange={(e: any) => setNewReview({ ...newReview, comment: e.target.value })}
                rows={4}
              />
            </div>
            <Button
              onClick={handleSubmitReview}
              disabled={submitting}
              className="w-full md:w-auto"
            >
              {submitting ? "Đang gửi..." : "Gửi đánh giá"}
            </Button>
          </div>
        </Card>

        {/* Reviews List */}
        {reviews.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 rounded-full bg-gray-100 p-4">
              <MessageSquareOff className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Chưa có đánh giá nào</h3>
            <p className="text-gray-500">Hãy là người đầu tiên đánh giá sản phẩm này</p>
          </div>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <Card key={review.id} className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback>
                      {review.user.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-semibold">{review.user.username}</h4>
                        <p className="text-sm text-gray-600">
                          {new Date(review.createdAt).toLocaleDateString("vi-VN")}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {renderStars(review.rating)}
                        {review.user.id === currentUserId && (
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
                        )}
                      </div>
                    </div>
                    
                    {editingReview === review.id ? (
                      <div className="space-y-4 mt-4">
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
                            onChange={(e: any) => setEditForm({ ...editForm, comment: e.target.value })}
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
                      <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                    )}
                    
                    <div className="flex items-center gap-4 mt-4">
                      <Button variant="ghost" size="sm" className="text-gray-600">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        Hữu ích ({review.helpful})
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT */}
      <div className="space-y-6">
        {/* Rating Summary */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Đánh giá trung bình</h3>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">
              {reviews.length > 0
                ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
                : "0.0"}
            </div>
            {renderStars(
              reviews.length > 0
                ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
                : 0
            )}
            <p className="text-sm text-gray-600 mt-2">
              Dựa trên {reviews.length} đánh giá
            </p>
          </div>
        </Card>

        {/* Trust Badges */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium">Đánh giá xác thực</p>
                <p className="text-sm text-gray-600">
                  Tất cả đánh giá đều từ khách hàng đã mua hàng
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
