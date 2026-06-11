"use client";

import { useEffect, useState } from "react";
import { ShoppingCart, Eye } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { getContents } from "@/app/services/contents";
import { formatCurrency } from "@/lib/format";
import type { Content } from "@/types";

export default function SectionCard() {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setErrorMessage(null);
        const data = await getContents({ pageSize: 6, sortBy: "Newest" });
        setContents(Array.isArray(data) ? data.slice(0, 6) : []);
      } catch {
        setErrorMessage("Không thể tải nội dung nổi bật.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Bản vẽ thiết kế chuyên nghiệp
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Khám phá bộ sưu tập bản vẽ thiết kế chất lượng cao từ các chuyên gia
            hàng đầu
          </p>
        </div>

        {errorMessage && (
          <p className="text-center text-sm text-red-600 mb-8">{errorMessage}</p>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-96 w-full rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {contents.map((content) => (
              <div
                key={content.id}
                className="group/container relative max-w-md rounded-xl bg-linear-to-r from-neutral-600 to-neutral-300 pt-0 shadow-lg overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
              >
                <Link href={`/pages/detail/${content.id}`}>
                  <div className="h-60 relative">
                    <Image
                      src={content.thumbnail}
                      alt={content.title}
                      fill
                      className="object-cover"
                    />
                    <div className="cursor-pointer group/view z-20 flex flex-col items-center justify-center opacity-0 group-hover/container:opacity-100 absolute left-1/2 top-1/2 -translate-1/2 rounded-full transition-opacity duration-300">
                      <Eye className="size-8 stroke-white group-hover/view:scale-110 transition-transform duration-300" />
                      <span className="text-white text-sm group-hover/view:scale-110 transition-transform duration-300">
                        Xem chi tiết
                      </span>
                    </div>
                  </div>
                </Link>

                <div className="opacity-0 group-hover/container:opacity-100 transition-opacity duration-300 absolute inset-0 bg-linear-to-b from-gray-400/50 to-gray-300/20 z-10" />

                {content.category?.name && (
                  <div className="inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold bg-primary text-primary-foreground shadow absolute top-4 left-4 rounded-full z-20">
                    {content.category.name}
                  </div>
                )}

                <Card className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm border-none relative z-20">
                  <CardHeader className="px-6">
                    <CardTitle className="font-semibold text-lg md:text-xl line-clamp-1">
                      {content.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="px-6 line-clamp-2 h-12">
                    {content.description}
                  </CardContent>

                  <CardFooter className="flex items-center px-6 justify-between gap-3 max-sm:flex-col max-sm:items-stretch flex-wrap">
                    <span className="text-xl font-semibold">
                      {formatCurrency(content.price)}
                    </span>

                    <Link href={`/pages/detail/${content.id}`}>
                      <button className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-8 transition-all duration-300">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Xem sản phẩm
                      </button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        )}

        <div className="text-center">
          <Link
            href="/pages/collections"
            className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground h-11 px-8 font-medium hover:bg-primary/90 transition-colors"
          >
            Xem tất cả bản vẽ
          </Link>
        </div>
      </div>
    </section>
  );
}
