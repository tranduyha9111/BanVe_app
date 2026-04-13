"use client";

import { ShoppingCart, Eye, Heart } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const Cards = [
  {
    id: 1,
    all: "Tất cả bản vẽ",
    img: "https://images.pexels.com/photos/1404948/pexels-photo-1404948.jpeg",
    title: "Tiêu đề bản vẽ xây dựng",
    description: "Mô tả bản vẽ xây dựng",
    price: "0 ₫",
    icon: ShoppingCart,
    titleCart: "Thêm vào giỏ",
    iconDetail: Eye,
    Detail: "Xem chi tiết",
    iconLike: Heart,
  },
  {
    id: 2,
    all: "Tất cả bản vẽ",
    img: "https://images.pexels.com/photos/1404948/pexels-photo-1404948.jpeg",
    title: "Tiêu đề bản vẽ xây dựng",
    description: "Mô tả bản vẽ xây dựng",
    price: "0 ₫",
    icon: ShoppingCart,
    titleCart: "Thêm vào giỏ",
    iconDetail: Eye,
    Detail: "Xem chi tiết",
    iconLike: Heart,
  },
  {
    id: 3,
    all: "Tất cả bản vẽ",
    img: "https://images.pexels.com/photos/1404948/pexels-photo-1404948.jpeg",
    title: "Tiêu đề bản vẽ xây dựng",
    description: "Mô tả bản vẽ xây dựng",
    price: "0 ₫",
    icon: ShoppingCart,
    titleCart: "Thêm vào giỏ",
    iconDetail: Eye,
    Detail: "Xem chi tiết",
    iconLike: Heart,
  },
  {
    id: 4,
    all: "Tất cả bản vẽ",
    img: "https://images.pexels.com/photos/1404948/pexels-photo-1404948.jpeg",
    title: "Tiêu đề bản vẽ xây dựng",
    description: "Mô tả bản vẽ xây dựng",
    price: "0 ₫",
    icon: ShoppingCart,
    titleCart: "Thêm vào giỏ",
    iconDetail: Eye,
    Detail: "Xem chi tiết",
    iconLike: Heart,
  },
  {
    id: 5,
    all: "Tất cả bản vẽ",
    img: "https://images.pexels.com/photos/1404948/pexels-photo-1404948.jpeg",
    title: "Tiêu đề bản vẽ xây dựng",
    description: "Mô tả bản vẽ xây dựng",
    price: "0 ₫",
    icon: ShoppingCart,
    titleCart: "Thêm vào giỏ",
    iconDetail: Eye,
    Detail: "Xem chi tiết",
    iconLike: Heart,
  },
  {
    id: 6,
    all: "Tất cả bản vẽ",
    img: "https://images.pexels.com/photos/1404948/pexels-photo-1404948.jpeg",
    title: "Tiêu đề bản vẽ xây dựng",
    description: "Mô tả bản vẽ xây dựng",
    price: "0 ₫",
    icon: ShoppingCart,
    titleCart: "Thêm vào giỏ",
    iconDetail: Eye,
    Detail: "Xem chi tiết",
    iconLike: Heart,
  },
];

export default function SectionCard() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Bản vẽ thiết kế chuyên nghiệp
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Khám phá bộ sưu tập bản vẽ thiết kế chất lượng cao từ các chuyên gia
            hàng đầu
          </p>
        </div>

        {/* GRID LIST */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {Cards.map((card) => (
            <div
              key={card.id}
              className="group/container relative max-w-md rounded-xl bg-linear-to-r from-neutral-600 to-neutral-300 pt-0 shadow-lg overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-2 cursor-pointer"
              style={{
                backgroundImage: `url("${card.img}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* OVERLAY + ICON DETAIL */}
              <Link href="/pages/detail/id">
                <div className="h-60 relative">
                  <div className="cursor-pointer group/view z-20 flex flex-col items-center justify-center opacity-0 group-hover/container:opacity-100 absolute left-1/2 top-1/2 -translate-1/2 rounded-full transition-opacity duration-300">
                    <card.iconDetail className="size-8 stroke-white group-hover/view:scale-110 transition-transform duration-300" />
                    <span className="text-white text-sm group-hover/view:scale-110 transition-transform duration-300">
                      Xem chi tiết
                    </span>
                  </div>
                </div>
              </Link>

              {/* DARK OVERLAY */}
              <div className="opacity-0 group-hover/container:opacity-100 transition-opacity duration-300 absolute inset-0 bg-linear-to-b from-gray-400/50 to-gray-300/20 z-10"></div>

              {/* TAG */}
              <div className="inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold bg-primary text-primary-foreground shadow hover:bg-primary/80 absolute top-4 left-4 rounded-full z-20">
                {card.all}
              </div>

              {/* LIKE BUTTON */}
              <button className="cursor-pointer inline-flex items-center justify-center h-9 w-9 bg-primary/10 hover:bg-primary/20 rounded-full absolute top-4 right-4 z-20 opacity-0 group-hover/container:opacity-100 transition-opacity duration-300">
                <card.iconLike className="size-4 stroke-white" />
              </button>

              {/* CARD UI */}
              <Card className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm border-none relative z-20">
                <CardHeader className="px-6">
                  <CardTitle className="font-semibold text-lg md:text-xl line-clamp-1">
                    {card.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="px-6 line-clamp-2 h-12">
                  {card.description}
                </CardContent>

                <CardFooter className="flex items-center px-6 justify-between gap-3 max-sm:flex-col max-sm:items-stretch flex-wrap">
                  <span className="text-xl font-semibold">{card.price}</span>

                  <button className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-8 transition-all duration-300">
                    <card.icon className="w-4 h-4 mr-2" />
                    {card.titleCart}
                  </button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
