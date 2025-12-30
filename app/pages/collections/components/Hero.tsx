"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { ChevronDown, Funnel, SearchX } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <main className="flex-1">
      {/* TOP BAR */}
      <div className="hidden lg:flex items-center justify-between mb-6">
        <div className="text-sm text-gray-600">
          <span className="tracking-wider">Hiển thị 0 sản phẩm</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Sắp xếp theo</span>

            {/* ✅ SELECT ĐÚNG CHUẨN */}
            <Select defaultValue="best-selling">
              <SelectTrigger className="border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex items-center justify-between gap-2 rounded-md px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 w-48 border-0 bg-transparent font-medium">
                <SelectValue />
                <ChevronDown className="size-4 opacity-50" />
              </SelectTrigger>

              {/* Dropdown */}
              <SelectContent>
                <SelectItem value="best-selling">Bán chạy nhất</SelectItem>
                <SelectItem value="price-asc">Giá tăng dần</SelectItem>
                <SelectItem value="price-desc">Giá giảm dần</SelectItem>
                <SelectItem value="newest">Mới nhất</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* EMPTY STATE */}
      <div className="flex items-center justify-center min-h-[500px]">
        <Card className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl py-6 max-w-md w-full border-0 shadow-lg">
          <CardContent className="p-12 text-center space-y-6">
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <SearchX className="w-12 h-12 text-gray-400" />
                </div>
                <div className="absolute -top-1 -right-1 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Funnel className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-gray-900">
                Không tìm thấy sản phẩm
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Không tìm thấy sản phẩm nào phù hợp với bộ lọc của bạn. Hãy thử
                điều chỉnh tiêu chí tìm kiếm.
              </p>
            </div>

            <div className="pt-6 border-t">
              <p className="text-sm text-gray-500">
                Gợi ý: Thử tìm kiếm với từ khóa khác hoặc mở rộng phạm vi giá
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
