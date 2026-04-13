"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ShoppingBag,
  Download,
  Search,
  Filter,
  Calendar,
  Eye,
  FileText,
} from "lucide-react";
import { toast } from "sonner";
import { getMyPurchases } from "@/app/services/contents";
import DownloadFilesDialog from "@/components/DownloadFilesDialog";

interface PurchasedContent {
  id: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  category: {
    id: string;
    name: string;
  };
  author: {
    id: string;
    username: string;
  };
  purchasedAt: string;
  downloadCount: number;
}

export default function MyPurchases() {
  const [purchases, setPurchases] = useState<PurchasedContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    keyword: "",
    categoryName: "",
    sortBy: "Newest",
    sortDir: "Desc",
  });

  const fetchPurchases = useCallback(async () => {
    setLoading(true);
    try {
      const params = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== ""),
      );
      const data = await getMyPurchases(params);
      setPurchases(data?.items || []);
    } catch (error) {
      console.error("Failed to fetch purchases:", error);
      toast.error("Không thể tải danh sách mua hàng");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchPurchases();
  }, [filters, fetchPurchases]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-6">
            <div className="h-8 bg-gray-100 rounded animate-pulse"></div>
            <div className="grid gap-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-32 bg-gray-100 rounded-lg animate-pulse"
                ></div>
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
            <ShoppingBag className="h-8 w-8" />
            <h1 className="text-3xl font-bold">Đơn hàng của tôi</h1>
            <Badge variant="secondary">{purchases.length} sản phẩm</Badge>
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
                    onChange={(e) =>
                      setFilters({ ...filters, keyword: e.target.value })
                    }
                    className="pl-10"
                  />
                </div>

                <Select
                  value={filters.categoryName}
                  onValueChange={(value) =>
                    setFilters({ ...filters, categoryName: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Danh mục" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Tất cả</SelectItem>
                    <SelectItem value="Bản vẽ kiến trúc">
                      Bản vẽ kiến trúc
                    </SelectItem>
                    <SelectItem value="Nội thất">Nội thất</SelectItem>
                    <SelectItem value="Mẫu nhà">Mẫu nhà</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={filters.sortBy}
                  onValueChange={(value) =>
                    setFilters({ ...filters, sortBy: value })
                  }
                >
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

                <Select
                  value={filters.sortDir}
                  onValueChange={(value) =>
                    setFilters({ ...filters, sortDir: value })
                  }
                >
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

          {/* Purchases List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Danh sách sản phẩm đã mua
              </CardTitle>
            </CardHeader>
            <CardContent>
              {purchases.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    Chưa có đơn hàng nào
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Bạn chưa mua sản phẩm nào
                  </p>
                  <Button>
                    <Eye className="h-4 w-4 mr-2" />
                    Khám phá sản phẩm
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {purchases.map((purchase) => (
                    <div key={purchase.id} className="border rounded-lg p-4">
                      <div className="flex gap-4">
                        <div className="w-20 h-20 relative flex-shrink-0">
                          {purchase.thumbnail ? (
                            <Image
                              src={purchase.thumbnail}
                              alt={purchase.title}
                              fill
                              className="object-cover rounded"
                              sizes="(max-width: 768px) 80px, 80px"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
                              <Download className="w-8 h-8 text-gray-400" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-2">
                            <div className="min-w-0">
                              <h3 className="font-medium text-lg">
                                {purchase.title}
                              </h3>
                              <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                                {purchase.description}
                              </p>
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline">
                                  {purchase.category.name}
                                </Badge>
                                <span className="text-sm text-gray-500">
                                  bởi {purchase.author.username}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold text-lg">
                                {purchase.price > 0
                                  ? `${purchase.price.toLocaleString("vi-VN")} ₫`
                                  : "Miễn phí"}
                              </div>
                              <div className="text-sm text-gray-500">
                                Đã tải {purchase.downloadCount} lần
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Calendar className="h-4 w-4" />
                              Mua vào{" "}
                              {new Date(
                                purchase.purchasedAt,
                              ).toLocaleDateString("vi-VN")}
                            </div>

                            <div className="flex items-center gap-2">
                              <DownloadFilesDialog
                                contentId={purchase.id}
                                contentTitle={purchase.title}
                              >
                                <Button variant="outline" size="sm">
                                  <Download className="h-4 w-4 mr-2" />
                                  Tải xuống
                                </Button>
                              </DownloadFilesDialog>
                            </div>
                          </div>
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
