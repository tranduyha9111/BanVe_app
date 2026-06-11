"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getContents } from "@/app/services/contents";
import { getCategories } from "@/app/services/categories";
import type { Content, CategoryRef } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Filter, Star, Download, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ContentGrid() {
  const searchParams = useSearchParams();
  const queryQ = searchParams.get("q") ?? "";

  const [contents, setContents] = useState<Content[]>([]);
  const [categories, setCategories] = useState<CategoryRef[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState(queryQ);
  const [sortBy, setSortBy] = useState<"newest" | "popular" | "rating">(
    "newest"
  );

  useEffect(() => {
    setSearchTerm(queryQ);
  }, [queryQ]);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setErrorMessage(null);

        const [contentsData, categoriesData] = await Promise.all([
          getContents({
            categoryName: selectedCategory || undefined,
            keyword: searchTerm || undefined,
            pageSize: 20,
          }),
          getCategories({ limit: 50 }),
        ]);

        // Sort contents based on sortBy
        const sortedContents = [...contentsData];
        switch (sortBy) {
          case "newest":
            sortedContents.sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            );
            break;
          case "popular":
            sortedContents.sort(
              (a, b) => (b.downloads ?? 0) - (a.downloads ?? 0)
            );
            break;
          case "rating":
            sortedContents.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
            break;
        }

        setContents(sortedContents);
        setCategories(categoriesData);
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
           
          console.error("Failed to fetch data:", error);
        }
        setErrorMessage("Không thể tải dữ liệu. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory, searchTerm, sortBy]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <Skeleton className="h-48 w-full" />
            <CardHeader>
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-3 w-full mb-2" />
              <Skeleton className="h-3 w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {errorMessage ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {errorMessage}
        </div>
      ) : null}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === "" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("")}
          >
            Tất cả
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>

        <div className="flex gap-2">
          <select
            value={sortBy}
            onChange={(e) => {
              const v = e.target.value;
              if (v === "newest" || v === "popular" || v === "rating") {
                setSortBy(v);
              }
            }}
            className="px-3 py-1 border rounded-md text-sm"
          >
            <option value="newest">Mới nhất</option>
            <option value="popular">Phổ biến</option>
            <option value="rating">Đánh giá cao</option>
          </select>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          type="text"
          placeholder="Tìm kiếm nội dung..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Content Grid */}
      {contents.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Không tìm thấy nội dung nào.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {contents.map((content) => (
            <Card
              key={content.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={content.thumbnail || "/placeholder.jpg"}
                  alt={content.title}
                  fill
                  className="object-cover"
                />
                <Badge className="absolute top-2 right-2">
                  {content.category.name}
                </Badge>
              </div>

              <CardHeader className="pb-2">
                <CardTitle className="text-lg line-clamp-2">
                  {content.title}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {content.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">
                      {(content.rating ?? 0).toFixed(1)}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Download className="h-3 w-3" />
                      <span>{content.downloads ?? 0}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      <span>{content.views ?? 0}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(content.price)}
                  </span>
                  <Link href={`/pages/detail/${content.id}`}>
                    <Button size="sm">Xem chi tiết</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
