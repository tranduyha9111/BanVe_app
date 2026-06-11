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
import { useRef, useEffect, useState } from "react";
import { getActiveBanners } from "@/app/services/banners";
import { Skeleton } from "@/components/ui/skeleton";
import { debugError, debugLog, debugWarn } from "@/lib/debug";
import type { BannerSlide } from "@/types";

export default function BannerSlider() {
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));
  const [banners, setBanners] = useState<BannerSlide[]>([]);
  const [loading, setLoading] = useState(true);

  // Fallback data
  const fallbackBanners = [
    {
      id: "fallback-1",
      img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1600&h=900&fit=crop&auto=format&q=80",
      title: "Bản vẽ Kiến trúc",
      title1: "Chuyên nghiệp & Sáng tạo",
      description:
        "Giải pháp thiết kế toàn diện, sáng tạo và tối ưu cho mọi dự án của bạn. Khám phá ngay bộ sưu tập bản vẽ kiến trúc độc đáo",
      button: "Khám phá ngay",
      button1: "Xem dự án mẫu",
    },
    {
      id: "fallback-2",
      img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&h=900&fit=crop&auto=format&q=80",
      title: "Thiết kế Nội thất",
      title1: "Hiện đại & Đẳng cấp",
      description:
        "Biến không gian sống của bạn thành tác phẩm nghệ thuật với các giải pháp thiết kế nội thất chuyên nghiệp và đẳng cấp",
      button: "Xem thêm",
      button1: "Liên hệ tư vấn",
    },
    {
      id: "fallback-3",
      img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&h=900&fit=crop&auto=format&q=80",
      title: "Bản vẽ 3D",
      title1: "Công nghệ & Tương lai",
      description:
        "Trải nghiệm công nghệ bản vẽ 3D tiên tiến, trực quan hóa ý tưởng thiết kế của bạn với chất lượng đỉnh cao",
      button: "Dùng thử",
      button1: "Xem demo",
    },
  ];

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        debugLog("🎨 Fetching banners...");
        setLoading(true);

        const response = await getActiveBanners();
        debugLog("📥 Banner response:", response);

        // Handle different response structures
        let bannersData: unknown = response;

        // If response has data property and it's not an array
        if (
          response &&
          typeof response === "object" &&
          !Array.isArray(response) &&
          "data" in response
        ) {
          const maybe = response as { data?: unknown };
          if (maybe.data) bannersData = maybe.data;
        }

        // Check if data is an array before mapping
        if (Array.isArray(bannersData) && bannersData.length > 0) {
          const transformedBanners: BannerSlide[] = bannersData
            .map((banner) => {
              if (!banner || typeof banner !== "object") return null;

              const b = banner as Record<string, unknown>;
              const id =
                (typeof b.id === "string" && b.id) ||
                (typeof b._id === "string" && (b._id as string)) ||
                `banner-${Math.random()}`;

              const img =
                (typeof b.image === "string" && b.image) ||
                (typeof b.img === "string" && b.img) ||
                (typeof b.imageUrl === "string" && b.imageUrl) ||
                "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1600&h=900&fit=crop&auto=format&q=80";

              const title =
                (typeof b.title === "string" && b.title) || "Bản vẽ Kiến trúc";

              const title1 =
                (typeof b.subtitle === "string" && b.subtitle) ||
                (typeof b.title1 === "string" && b.title1) ||
                "Chuyên nghiệp & Sáng tạo";

              const description =
                (typeof b.description === "string" && b.description) ||
                "Giải pháp thiết kế toàn diện, sáng tạo và tối ưu cho mọi dự án của bạn";

              const button =
                (typeof b.buttonText === "string" && b.buttonText) ||
                (typeof b.button === "string" && b.button) ||
                "Khám phá ngay";

              const button1 =
                (typeof b.secondaryButtonText === "string" && b.secondaryButtonText) ||
                (typeof b.button1 === "string" && b.button1) ||
                "Xem dự án mẫu";

              return { id, img, title, title1, description, button, button1 };
            })
            .filter((x): x is BannerSlide => x !== null);

          if (transformedBanners.length > 0) {
            debugLog("✨ Transformed banners:", transformedBanners);
            setBanners(transformedBanners);
          } else {
            setBanners(fallbackBanners);
          }
        } else {
          debugWarn("⚠️ API response is not a valid array");
          setBanners(fallbackBanners);
        }
      } catch (error) {
        debugError("❌ Failed to fetch banners:", error);

        // Enhanced error logging
        if (error instanceof Error) {
          debugError("❌ Error message:", error.message);
        }

        // Check if it's an Axios error for more details
        if (error && typeof error === "object" && "response" in error) {
          const axiosError = error as { response?: { status?: number } };
          debugError("❌ Axios error status:", axiosError.response?.status);

          // If 500 error, backend is likely down
          if (axiosError.response?.status === 500) {
            debugWarn("⚠️ Backend server returned 500 error - using fallback data");
          }
        }

        // Always use fallback data on error
        debugLog("🔄 Using fallback banner data");
        setBanners(fallbackBanners);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  const displayBanners = banners.length > 0 ? banners : fallbackBanners;

  if (loading) {
    return (
      <div className="relative w-full h-[600px] overflow-hidden">
        <Skeleton className="w-full h-full" />
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      <Carousel
        className="w-full max-h-[650px]"
        opts={{ loop: true }} // 🔁 lặp vô hạn
        plugins={[plugin.current]} // ▶ autoplay
      >
        <CarouselContent>
          {displayBanners.map((slide, index) => (
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
                    priority={index === 0}
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
