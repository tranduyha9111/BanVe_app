"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { Building, ArrowRight } from "lucide-react";
import Link from "next/link";

const list1 = [
  {
    id: 1,
    icon: Building,
    text: "Điện tử",
    description: "Bản vẽ mạch điện tử và linh kiện",
  },
  {
    id: 2,
    icon: Building,
    text: "Điện tử",
    description: "Bản vẽ mạch điện tử và linh kiện",
  },
  {
    id: 3,
    icon: Building,
    text: "Điện tử",
    description: "Bản vẽ mạch điện tử và linh kiện",
  },
  {
    id: 4,
    icon: Building,
    text: "Điện tử",
    description: "Bản vẽ mạch điện tử và linh kiện",
  },
];

const list2 = [
  {
    id: 1,
    icon: Building,
    text: "Điện tử",
    description: "Bản vẽ mạch điện tử và linh kiện",
  },
  {
    id: 2,
    icon: Building,
    text: "Điện tử",
    description: "Bản vẽ mạch điện tử và linh kiện",
  },
  {
    id: 3,
    icon: Building,
    text: "Điện tử",
    description: "Bản vẽ mạch điện tử và linh kiện",
  },
];

/* --- COMPONENT CARD ITEM --- */
function CardItem({ item }: any) {
  const Icon = item.icon;

  return (
    <Card className="text-card-foreground flex flex-col gap-6 rounded-xl py-6 shadow-sm relative overflow-hidden border-0 bg-white/60 backdrop-blur-sm group cursor-pointer transition-all duration-300 hover:bg-white hover:shadow-xl hover:shadow-gray-200/40">
      {/* Background effects */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200/40 rounded-full blur-2xl -translate-y-8 translate-x-8 transition-all duration-500 group-hover:scale-150" />
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-gray-50/40 to-gray-100/20 rounded-full blur-xl translate-y-4 -translate-x-4 transition-all duration-500 group-hover:scale-125" />

      {/* Content */}
      <CardContent className="relative z-10 p-6 flex flex-col h-full">
        <div className="mb-6 relative">
          <div className="size-16 flex items-center justify-center mx-auto relative">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-700 rounded-full transition-all group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg" />
            <Icon className="relative z-10 w-7 h-7 text-white transition-transform group-hover:scale-110" />
          </div>
        </div>

        <div className="text-center flex flex-col flex-1">
          <h3 className="font-bold text-lg text-gray-900 mb-3 group-hover:text-gray-800">
            {item.text}
          </h3>

          <p className="text-sm text-gray-600 flex-1 group-hover:text-gray-700">
            {item.description}
          </p>

          <div className="flex items-center justify-center mt-3 gap-2 text-xs font-medium text-gray-500 group-hover:text-gray-700">
            <span>Khám phá</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/* --- COMPONENT SECTION --- */
export default function Section() {
  return (
    <section className="py-16 ">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Danh mục bản vẽ
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tìm kiếm bản vẽ kiến trúc phù hợp với dự án của bạn
          </p>
        </div>

        <div className="space-y-8 ">
          {/* CAROUSEL 1 */}
          <Link href="/pages/collections">
            <Carousel className="w-full flex justify-center items-center ">
              <CarouselContent className="relative z-10 p-6 flex flex-col h-full w-full">
                <div className="flex -ml-2 md:-ml-4 ">
                  {list1.map((item) => (
                    <CarouselItem
                      key={item.id}
                      className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 lg:basis-1/4"
                    >
                      <CardItem item={item} />
                    </CarouselItem>
                  ))}
                </div>
              </CarouselContent>
            </Carousel>
          </Link>

          {/* CAROUSEL 2 (reverse) */}
          <Link href="/pages/collections">
            <Carousel className="w-full px-10 md:px-24 flex justify-center items-center">
              <CarouselContent className="relative z-10 p-6 flex flex-col h-full w-full">
                <div className="flex -ml-2 md:-ml-4 flex-row-reverse">
                  {list2.map((item) => (
                    <CarouselItem
                      key={item.id}
                      className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3"
                    >
                      <CardItem item={item} />
                    </CarouselItem>
                  ))}
                </div>
              </CarouselContent>
            </Carousel>
          </Link>
        </div>
      </div>
    </section>
  );
}
