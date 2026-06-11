"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getContentDetail } from "@/app/services/contents";
import { addToCart } from "@/app/services/cart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Star,
  ShoppingCart,
  Download,
  Eye,
  Calendar,
  User,
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import CopyrightReportButton from "@/components/CopyrightReportButton";
import type { Content } from "@/types";

export default function ContentDetail() {
  const params = useParams();
  const contentId = params.id as string;

  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await getContentDetail(contentId);
        setContent(data);
      } catch (error) {
        console.error("Failed to fetch content:", error);
        toast.error("Không thể tải thông tin nội dung");
      } finally {
        setLoading(false);
      }
    };

    if (contentId) {
      fetchContent();
    }
  }, [contentId]);

  const handleAddToCart = async () => {
    if (!content) return;

    setAddingToCart(true);
    try {
      await addToCart({
        contentId: content.id,
        quantity: 1,
      });
      toast.success("Đã thêm vào giỏ hàng!");
    } catch (error) {
      console.error("Failed to add to cart:", error);
      toast.error("Không thể thêm vào giỏ hàng");
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Skeleton className="aspect-square w-full" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Nội dung không tồn tại
          </h1>
          <p className="text-gray-600">
            Nội dung bạn tìm kiếm không có hoặc đã bị xóa.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image
              src={content.thumbnail}
              alt={content.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {content.images && content.images.length > 0 && (
            <div className="grid grid-cols-4 gap-2">
              {content.images.slice(0, 4).map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-square overflow-hidden rounded"
                >
                  <Image
                    src={image}
                    alt={`${content.title} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Content Info */}
        <div className="space-y-6">
          {/* Header */}
          <div>
            <Badge className="mb-2">{content.category.name}</Badge>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {content.title}
            </h1>

            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">
                  {(content.rating ?? 0).toFixed(1)}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                <span>{content.downloads ?? 0}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>{content.views ?? 0}</span>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed">
              {content.description}
            </p>
          </div>

          {/* Author */}
          {content.author && (
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10">
                    <Image
                      src={content.author.avatar || "/placeholder-avatar.jpg"}
                      alt={content.author.username}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{content.author.username}</p>
                    <p className="text-sm text-gray-600">Tác giả</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tags */}
          {content.tags && content.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {content.tags.map((tag, index) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* File Info */}
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Số lượng file</p>
                  <p className="font-medium">{content.fileCount ?? 0} files</p>
                </div>
                <div>
                  <p className="text-gray-600">Dung lượng</p>
                  <p className="font-medium">{content.fileSize ?? "—"}</p>
                </div>
                <div>
                  <p className="text-gray-600">Ngày đăng</p>
                  <p className="font-medium">
                    {new Date(content.createdAt).toLocaleDateString("vi-VN")}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Danh mục</p>
                  <p className="font-medium">{content.category.name}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Price and Actions */}
          <div className="space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-primary">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(content.price)}
              </span>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleAddToCart}
                disabled={addingToCart}
                className="flex-1"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                {addingToCart ? "Đang thêm..." : "Thêm vào giỏ hàng"}
              </Button>

              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Mua ngay
              </Button>
            </div>

            <div className="mt-4 pt-4 border-t">
              <CopyrightReportButton
                contentId={content.id}
                contentTitle={content.title}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
