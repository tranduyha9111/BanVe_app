"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

const Banner = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1600&h=900&fit=crop&auto=format&q=80",
    title: "Bản vẽ Kiến trúc",
    title1: "Chuyên nghiệp & Sáng tạo",
    description:
      "Giải pháp thiết kế toàn diện, sáng tạo và tối ưu cho mọi dự án của bạn. Khám phá ngay bộ sưu tập bản vẽ kiến trúc độc đáo",
    button: "Khám phá ngay",
    button1: "Xem dự án mẫu",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&h=900&fit=crop&auto=format&q=80",
    title: "Bản vẽ Kiến trúc",
    title1: "Chuyên nghiệp & Sáng tạo",
    description:
      "Giải pháp thiết kế toàn diện, sáng tạo và tối ưu cho mọi dự án của bạn. Khám phá ngay bộ sưu tập bản vẽ kiến trúc độc đáo",
    button: "Khám phá ngay",
    button1: "Xem dự án mẫu",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1448630360428-65456885c650?w=1600&h=900&fit=crop&auto=format&q=80",
    title: "Bản vẽ Kiến trúc",
    title1: "Chuyên nghiệp & Sáng tạo",
    description:
      "Giải pháp thiết kế toàn diện, sáng tạo và tối ưu cho mọi dự án của bạn. Khám phá ngay bộ sưu tập bản vẽ kiến trúc độc đáo",
    button: "Khám phá ngay",
    button1: "Xem dự án mẫu",
  },
];

export default function BannerSlider() {
  const autoplay = useRef(
    Autoplay({
      delay: 5000, // ⏱ 5 giây
      stopOnInteraction: false,
    })
  );
  return (
    <div className="relative overflow-hidden">
      <Carousel
        className="w-full max-h-[650px]"
        opts={{ loop: true }} // 🔁 lặp vô hạn
        plugins={[autoplay.current]} // ▶ autoplay
      >
        <CarouselContent>
          {Banner.map((slide) => (
            <CarouselItem
              key={slide.id}
              className="min-w-0 shrink-0 grow-0 basis-full"
            >
              <div className="relative h-[600px] md:h-[700px] flex items-center">
                {/* Hình nền */}
                <div className="absolute inset-0">
                  <Image
                    src={slide.img}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    priority={slide.id === 1}
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
                </div>

                {/* Nội dung */}
                <div className="relative z-10 container mx-auto px-4">
                  <div className="max-w-2xl">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-white drop-shadow-lg">
                      {slide.title}
                      <br />
                      {slide.title1}
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl leading-relaxed drop-shadow-md">
                      {slide.description}
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button className="h-10 px-8 rounded-full bg-primary text-white font-medium shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300">
                        {slide.button}
                      </button>
                      <button className="h-10 px-8 rounded-full bg-white/10 border border-white/20 text-white backdrop-blur-sm hover:bg-white/20 hover:border-white/30 font-medium shadow-sm transition duration-300">
                        {slide.button1}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Arrow navigation */}
        <CarouselPrevious className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border shadow-sm hover:text-primary-foreground size-8 rounded-full absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 border-white/20 text-white backdrop-blur-sm hover:bg-white/20 hover:border-white/30 hover:scale-110 transition-all duration-300 w-12 h-12" />
        <CarouselNext className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border shadow-sm hover:text-primary-foreground size-8 rounded-full absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 border-white/20 text-white backdrop-blur-sm hover:bg-white/20 hover:border-white/30 hover:scale-110 transition-all duration-300 w-12 h-12" />
      </Carousel>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        <button className="size-4 rounded-full transition-all duration-300 bg-white/60 hover:bg-white/80"></button>
        <button className="size-4 rounded-full transition-all duration-300 bg-white/60 hover:bg-white/80"></button>
        <button className="size-4 rounded-full transition-all duration-300 bg-white/60 hover:bg-white/80"></button>
      </div>
    </div>
  );
}
