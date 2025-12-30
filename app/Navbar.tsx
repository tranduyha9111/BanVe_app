"use client";

import Link from "next/link";
import {
  DraftingCompass,
  Search,
  User,
  ShoppingCart,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header>
      <div className="container mx-auto px-4 z-100 bg-white/40 backdrop-blur-xs">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group hover:scale-[1.02] transition-transform duration-200"
          >
            <div className="flex items-center justify-center size-10 md:size-12 rounded-full bg-gray-700 text-white shadow-lg group-hover:shadow-xl transition-all">
              <DraftingCompass size={32} />
            </div>

            <div className="hidden sm:block">
              <h1 className="text-lg font-bold tracking-tight group-hover:text-primary transition-colors">
                Marketplace Blueprint
              </h1>
              <p className="text-xs text-muted-foreground font-medium">
                Premium Blueprints
              </p>
            </div>
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-xl mx-6">
            <div className="group">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                <input
                  type="text"
                  onFocus={() => setVisible(true)}
                  onBlur={() => setVisible(false)}
                  placeholder="Tìm kiếm bản vẽ theo tên, lĩnh vực..."
                  className="w-full h-9 rounded-full pl-12 pr-4 bg-gray-100 border border-gray-300 outline-none transition-all focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div
                className={`h-[2px] bg-primary transition-all duration-300 mt-2 ${
                  visible ? "w-full" : "w-0"
                }`}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Login */}
            <Link href="/auth/login">
              <button className="flex items-center gap-2 h-10 px-4 rounded-full text-xs font-medium border border-gray-300 bg-white hover:bg-black hover:text-white transition-all">
                <User className="size-4" />
                <span className="hidden sm:inline">Đăng nhập</span>
              </button>
            </Link>

            {/* Cart – render client only */}
            {mounted && (
              <Sheet>
                <SheetTrigger asChild>
                  <button className="flex items-center justify-center size-10 rounded-full border border-gray-300 bg-white hover:bg-black hover:text-white transition-all">
                    <ShoppingCart className="size-4" />
                  </button>
                </SheetTrigger>

                <SheetContent>
                  <div className="flex flex-col h-full">
                    <div className="p-6 border-b">
                      <SheetHeader>
                        <SheetTitle className="flex items-center gap-2">
                          <ShoppingCart size={24} />
                          Giỏ hàng
                        </SheetTitle>
                      </SheetHeader>
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center text-center">
                      <ShoppingCart size={64} className="text-muted-foreground mb-4" />
                      <h3 className="font-semibold text-lg mb-2">
                        Giỏ hàng của bạn đang trống
                      </h3>
                      <p className="text-sm text-muted-foreground mb-6">
                        Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm
                      </p>
                    </div>
                  </div>

                  <SheetClose className="absolute top-4 right-4">
                    <span className="sr-only">Close</span>
                  </SheetClose>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
