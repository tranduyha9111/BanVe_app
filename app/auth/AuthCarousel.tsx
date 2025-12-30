"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

const slide = [
  {
    id: 1,
    img: "https://static.wikia.nocookie.net/houkai-star-rail/images/e/ed/Character_Cyrene_Introduction.png/revision/latest/scale-to-width-down/1200?cb=20250909040027",
    content: "10,000+ templates",
    title: "Thiết kế chuyên nghiệp",
    des: "Tạo ra những bản thiết kế đẹp mắt với bộ công cụ mạnh mẽ và trực quan",
  },
  {
    id: 2,
    img: "https://pic.bittopup.com/apiUpload/cc1e3d9236b954588f5d1ff146c74d60.jpg",
    content: "10,000+ templates",
    title: "Thiết kế chuyên nghiệp",
    des: "Tạo ra những bản thiết kế đẹp mắt với bộ công cụ mạnh mẽ và trực quan",
  },
  {
    id: 3,
    img: "https://cdn-media.sforum.vn/storage/app/media/Bookgrinder2/honkai-star-rail-build-castorice-1.jpg",
    content: "10,000+ templates",
    title: "Thiết kế chuyên nghiệp",
    des: "Tạo ra những bản thiết kế đẹp mắt với bộ công cụ mạnh mẽ và trực quan",
  },
];

export default function AuthCarousel() {
  const autoplay = useRef(
    Autoplay({
      delay: 4000, // ⏱ 4 giây
      stopOnInteraction: false, // không dừng khi hover
    })
  );

  return (
    <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden min-h-screen">
      <Carousel
        className="w-full h-full"
        opts={{ loop: true }} // 🔁 LẶP VÔ HẠN
        plugins={[autoplay.current]}
      >
        <CarouselContent className="h-full ml-0 pl-0">
          {slide.map((item) => (
            <CarouselItem key={item.id} className="relative w-full h-screen">
              {/* IMAGE */}
              <Image
                src={item.img}
                alt="slide"
                fill
                className="object-cover"
                priority={item.id === 1}
              />

              {/* CONTENT */}
              <div className="relative z-10 h-full w-full flex items-center justify-center text-center px-6">
                <div className="space-y-6">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary text-white">
                    <span className="text-sm font-medium">{item.content}</span>
                  </div>

                  <h2 className="text-3xl lg:text-4xl font-bold text-primary">
                    {item.title}
                  </h2>

                  <p className="text-primary text-lg max-w-md mx-auto">
                    {item.des}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
