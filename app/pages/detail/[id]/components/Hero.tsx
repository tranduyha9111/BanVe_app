"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Ellipsis, Star, ShoppingCart, Download } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Hero() {
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [bgPos, setBgPos] = useState({ x: 0, y: 0 });

  const zoom = 10; // độ phóng to kính lúp
  const lensSize = 180;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const bgX = (x / rect.width) * 100;
    const bgY = (y / rect.height) * 100;

    setPos({ x, y });
    setBgPos({ x: bgX, y: bgY });
  };

  return (
    <div className="container mx-auto px-4 py-12 lg:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white rounded-xl overflow-hidden shadow-lg">
            <div
              className="relative rounded-xl"
              onMouseEnter={() => setShow(true)}
              onMouseLeave={() => setShow(false)}
              onMouseMove={handleMove}
            >
              {/* IMAGE GỐC */}
              <Image
                src="https://images.pexels.com/photos/1404948/pexels-photo-1404948.jpeg"
                alt="img"
                width={1200}
                height={800}
                className="w-full h-[400px] lg:h-[550px] object-cover"
              />

              {/* KÍNH LÚP */}
              {show && (
                <div
                  className="pointer-events-none absolute rounded-full border-4 border-white shadow-xl"
                  style={{
                    width: lensSize,
                    height: lensSize,
                    left: pos.x - lensSize / 2,
                    top: pos.y - lensSize / 2,
                    backgroundImage:
                      "url(https://images.pexels.com/photos/1404948/pexels-photo-1404948.jpeg)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: `${zoom * 100}%`,
                    backgroundPosition: `${bgPos.x}% ${bgPos.y}%`,
                  }}
                />
              )}
            </div>
          </div>
          <Carousel className="relative w-full">
            <CarouselContent className="overflow-hidden">
              <div
                className="flex -ml-2"
                style={{ transform: "translate3d(0px, 0px, 0px)" }}
              >
                <CarouselItem className="min-w-0 shrink-0 grow-0 pl-2 basis-1/4 md:basis-1/5">
                  <button className="aspect-square bg-white rounded-lg overflow-hidden border-2 transition-all duration-200 w-full border-white ring-2 ring-white/50 shadow-md">
                    <Image
                      className="w-full h-full object-cover"
                      alt="Preview 1"
                      src="https://images.pexels.com/photos/1404948/pexels-photo-1404948.jpeg"
                      width={1200}
                      height={800}
                    />
                  </button>
                </CarouselItem>
                <CarouselItem className="min-w-0 shrink-0 grow-0 pl-2 basis-1/4 md:basis-1/5">
                  <button className="aspect-square bg-white rounded-lg overflow-hidden border-2 transition-all duration-200 w-full border-white ring-2 ring-white/50 shadow-md">
                    <Image
                      className="w-full h-full object-cover"
                      alt="Preview 2"
                      src="https://images.pexels.com/photos/1404948/pexels-photo-1404948.jpeg"
                      width={1200}
                      height={800}
                    />
                  </button>
                </CarouselItem>
                <CarouselItem className="min-w-0 shrink-0 grow-0 pl-2 basis-1/4 md:basis-1/5">
                  <button className="aspect-square bg-white rounded-lg overflow-hidden border-2 transition-all duration-200 w-full border-white ring-2 ring-white/50 shadow-md">
                    <Image
                      className="w-full h-full object-cover"
                      alt="Preview 3"
                      src="https://images.pexels.com/photos/1404948/pexels-photo-1404948.jpeg"
                      width={1200}
                      height={800}
                    />
                  </button>
                </CarouselItem>
                <CarouselItem className="min-w-0 shrink-0 grow-0 pl-2 basis-1/4 md:basis-1/5">
                  <button className="aspect-square bg-white rounded-lg overflow-hidden border-2 transition-all duration-200 w-full border-white ring-2 ring-white/50 shadow-md">
                    <Image
                      className="w-full h-full object-cover"
                      alt="Preview 4"
                      src="https://images.pexels.com/photos/1404948/pexels-photo-1404948.jpeg"
                      width={1200}
                      height={800}
                    />
                  </button>
                </CarouselItem>
                <CarouselItem className="min-w-0 shrink-0 grow-0 pl-2 basis-1/4 md:basis-1/5">
                  <button className="aspect-square bg-white rounded-lg overflow-hidden border-2 transition-all duration-200 w-full border-white ring-2 ring-white/50 shadow-md">
                    <Image
                      className="w-full h-full object-cover"
                      alt="Preview 5"
                      src="https://images.pexels.com/photos/1404948/pexels-photo-1404948.jpeg"
                      width={1200}
                      height={800}
                    />
                  </button>
                </CarouselItem>
              </div>
            </CarouselContent>
          </Carousel>
        </div>
        <div className="lg:col-span-2 space-y-6 bg-white/5 p-6 rounded-xl shadow-lg h-fit">
          <div className="flex items-start justify-between gap-3 ">
            <h1 className="text-2xl lg:text-3xl font-bold text-white leading-tight flex-1">
              Bản vẽ bố trí nội thất căn hộ studio
            </h1>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:bg-muted disabled:text-gray-500 disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-9 w-9 text-white/70 hover:text-white hover:bg-white/10">
                  <Ellipsis className="size-5" />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem>Yêu thích</DropdownMenuItem>
                <DropdownMenuItem>Chia sẻ</DropdownMenuItem>
                <DropdownMenuItem className="text-red-500">
                  Báo cáo vi phạm
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="space-y-3 pb-6 border-b border-white/10">
            <div className="text-3xl lg:text-4xl font-bold text-white">
              10 ₫
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <Star className="lucide lucide-star w-4 h-4 text-yellow-400 fill-yellow-400" />
                <Star className="lucide lucide-star w-4 h-4 text-yellow-400 fill-yellow-400" />
                <Star className="lucide lucide-star w-4 h-4 text-yellow-400 fill-yellow-400" />
                <Star className="lucide lucide-star w-4 h-4 text-yellow-400 fill-yellow-400" />
                <Star className="lucide lucide-star w-4 h-4 text-white/20" />
              </div>
              <span className="text-sm text-white/60">4/5</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 py-6 border-b border-white/10">
            <div className="space-y-1.5">
              <div className="text-xs text-white/50 uppercase tracking-wide">
                Loại file
              </div>
              <div className="font-medium text-white">Vector</div>
            </div>
            <div className="space-y-1.5">
              <div className="text-xs text-white/50 uppercase tracking-wide">
                Kích thước
              </div>
              <div className="font-medium text-white">492.6 KB</div>
            </div>
            <div className="space-y-1.5">
              <div className="text-xs text-white/50 uppercase tracking-wide">
                Định dạng
              </div>
              <div className="font-medium text-white">AI, PDF, PNG</div>
            </div>
            <div className="space-y-1.5">
              <div className="text-xs text-white/50 uppercase tracking-wide">
                Danh mục
              </div>
              <div className="font-medium text-white">Nội thất</div>
            </div>
          </div>
          <div className="py-4">
            <p className="text-white/80 leading-relaxed text-sm">
              Bản vẽ thể hiện phương án bố trí nội thất căn hộ studio, bao gồm
              khu vực sinh hoạt, nghỉ ngơi, bếp và vệ sinh. Thiết kế tối ưu diện
              tích sử dụng, đảm bảo tính tiện nghi và thẩm mỹ.
            </p>
          </div>
          <div className="space-y-3 pt-4">
            <div className="flex gap-3">
              <button className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:bg-muted disabled:text-gray-500 disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow px-8 flex-1 h-12 bg-white text-gray-900 hover:bg-white/90 font-semibold hover:text-gray-900">
                <ShoppingCart className="lucide lucide-shopping-cart w-5 h-5 mr-2" />
                Thêm vào giỏ
              </button>
              <button className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:bg-muted disabled:text-gray-500 disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 px-8 flex-1 h-12 font-semibold">
                Mua ngay
              </button>
            </div>
            <button className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:bg-muted disabled:text-gray-500 disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border bg-background shadow-sm px-8 w-full h-12 font-semibold border-white/20 text-gray-700 hover:bg-white/80 hover:text-gray-900">
              <Download className="lucide lucide-download w-5 h-5 mr-2" />
              Xem trước miễn phí
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
