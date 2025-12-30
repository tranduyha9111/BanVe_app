"use client";

import { ChevronRight, Search, ChevronUp, Funnel, X } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useCallback, useState } from "react";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import Hero from "@/app/pages/collections/components/Hero";

/* ================== CONSTANT ================== */
const CATEGORIES = [
  { id: 1, name: "Điện tử" },
  { id: 2, name: "Điện tử" },
  { id: 3, name: "Điện tử" },
  { id: 4, name: "Điện tử" },
  { id: 5, name: "Điện tử" },
  { id: 6, name: "Điện tử" },
  { id: 7, name: "Điện tử" },
];

/* ================== SUB COMPONENT ================== */
function PriceInput({
  value,
  onChange,
  label,
}: {
  value: number;
  onChange: (v: number) => void;
  label: string;
}) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full px-3 py-2 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
      />
      <span className="text-xs text-gray-500">{label}</span>
    </div>
  );
}

/* ================== MAIN ================== */
export default function Sidebar() {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10_000_000);

  const form = useForm({
    defaultValues: { searchQuery: "" },
  });

  const formatVND = useCallback(
    (value: number) => value.toLocaleString("vi-VN") + " đ",
    []
  );

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
        <Link href="/">Trang chủ</Link>
        <ChevronRight size={15} />
        <Link href="/pages/collections">Sản phẩm</Link>
        <ChevronRight size={15} />
        <span className="text-gray-900 font-medium">Tất cả sản phẩm</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-64 shrink-0 space-y-6 md:block-hidden">
          <Form {...form}>
            <form className="sticky top-20 space-y-6">
              {/* SEARCH */}
              <div className="space-y-2">
                <h3>Tìm kiếm</h3>

                <FormField
                  control={form.control}
                  name="searchQuery"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Tìm theo tên sản phẩm....."
                            className="pl-10"
                          />
                        </FormControl>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              {/* CATEGORY */}
              <Collapsible>
                <CollapsibleTrigger className="flex items-center justify-between w-full pb-3 border-b [&[data-state=open]>svg]:rotate-180 transition">
                  <h3 className="font-medium text-gray-900">Danh mục</h3>
                  <ChevronUp size={15} className="text-gray-500" />
                </CollapsibleTrigger>

                <CollapsibleContent className="space-y-2 pt-3">
                  {CATEGORIES.map((item) => (
                    <FormItem
                      key={item.id}
                      className="flex items-center gap-5 space-y-0"
                    >
                      <FormControl>
                        <Checkbox className="size-4 rounded-[4px]" />
                      </FormControl>
                      <FormLabel className="text-sm text-gray-700 cursor-pointer">
                        {item.name}
                      </FormLabel>
                    </FormItem>
                  ))}
                </CollapsibleContent>
              </Collapsible>

              {/* PRICE */}
              <Collapsible>
                <CollapsibleTrigger className="flex items-center justify-between w-full pb-3 border-b [&[data-state=open]>svg]:rotate-180 transition">
                  <h3 className="font-medium text-gray-900">Giá</h3>
                  <ChevronUp size={15} className="text-gray-500" />
                </CollapsibleTrigger>

                <CollapsibleContent className="pt-6 space-y-4">
                  <Slider
                    defaultValue={[0, 10_000_000]}
                    min={0}
                    max={10_000_000}
                    step={100_000}
                  />

                  <div className="flex items-start justify-between gap-4">
                    <PriceInput
                      value={minPrice}
                      onChange={setMinPrice}
                      label={formatVND(minPrice)}
                    />

                    <span className="text-gray-400 mt-2">-</span>

                    <PriceInput
                      value={maxPrice}
                      onChange={setMaxPrice}
                      label={formatVND(maxPrice)}
                    />
                  </div>
                </CollapsibleContent>

                {/* ACTION */}
                <div className="space-y-3 mt-10">
                  <button className="w-full h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center gap-2 hover:bg-primary/90">
                    <Funnel size={16} />
                    Áp dụng bộ lọc
                  </button>

                  <button className="w-full h-9 rounded-full border flex items-center justify-center gap-2 hover:bg-primary hover:text-primary-foreground">
                    <X size={16} />
                    Xóa bộ lọc
                  </button>
                </div>
              </Collapsible>
            </form>
          </Form>
        </aside>
        <Hero />
      </div>
    </div>
  );
}
