"use client";

import { useAuth } from "./context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

import Link from "next/link";
import {
  DraftingCompass,
  Search,
  User,
  ShoppingCart,
  LogOut,
  Settings,
} from "lucide-react";
import { useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";

export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  
  
  const handleLogout = async () => {
    await logout();
    router.replace("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group hover:scale-[1.02] transition-transform duration-200"
          >
            <div className="flex items-center justify-center size-10 md:size-12 rounded-full bg-primary text-primary-foreground shadow-lg group-hover:shadow-xl transition-all">
              <DraftingCompass size={24} className="md:w-7 md:h-7" />
            </div>

            <div className="hidden sm:block">
              <h1 className="text-base lg:text-lg font-bold tracking-tight group-hover:text-primary transition-colors">
                Marketplace Blueprint
              </h1>
              <p className="text-xs text-muted-foreground font-medium">
                Premium Blueprints
              </p>
            </div>
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-xl mx-4 lg:mx-6">
            <div className="group">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <input
                  type="text"
                  onFocus={() => setVisible(true)}
                  onBlur={() => setVisible(false)}
                  placeholder="Tìm kiếm bản vẽ..."
                  className="w-full h-9 lg:h-10 rounded-full pl-10 pr-4 bg-gray-50 border border-gray-200 outline-none transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                />
              </div>

              <div
                className={`h-[2px] bg-primary transition-all duration-300 mt-1 ${
                  visible ? "w-full" : "w-0"
                }`}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 lg:gap-3">
            {/* AUTH */}
            {loading ? (
              // ✅ Loading skeleton
              <Skeleton className="h-10 w-24 rounded-full" />
            ) : !user ? (
              // 👉 CHƯA ĐĂNG NHẬP
              <Link href="/auth/login">
                <button className="flex items-center gap-2 h-9 lg:h-10 px-3 lg:px-4 rounded-full text-xs lg:text-sm font-medium border border-gray-300 bg-white hover:bg-black hover:text-white transition-all">
                  <User className="size-4" />
                  <span className="hidden sm:inline">Đăng nhập</span>
                </button>
              </Link>
            ) : (
              // 👉 ĐÃ ĐĂNG NHẬP
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 h-9 lg:h-10 px-2 rounded-full border border-gray-300 bg-white hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-primary/20">
                    <Avatar className="h-7 w-7 lg:h-8 lg:w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                        {user.username?.charAt(0)?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline text-sm font-medium pr-2">
                      {user.username}
                    </span>
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium">{user.username}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user.email}
                    </p>
                  </div>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem asChild>
                    <Link
                      href="/profile/personal"
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <User size={16} />
                      Trang cá nhân
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link
                      href="/settings"
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Settings size={16} />
                      Cài đặt
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-600 focus:text-red-600 cursor-pointer"
                  >
                    <LogOut size={16} />
                    Đăng xuất
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Cart */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="flex items-center justify-center size-9 lg:size-10 rounded-full border border-gray-300 bg-white hover:bg-black hover:text-white transition-all">
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

                  <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                    <ShoppingCart
                      size={64}
                      className="text-muted-foreground mb-4"
                    />
                    <h3 className="font-semibold text-lg mb-2">
                      Giỏ hàng của bạn đang trống
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm
                    </p>
                    <SheetClose asChild>
                      <Link href="/">
                        <button className="px-6 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition">
                          Khám phá sản phẩm
                        </button>
                      </Link>
                    </SheetClose>
                  </div>
                </div>

                <SheetClose className="absolute top-4 right-4">
                  <span className="sr-only">Close</span>
                </SheetClose>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
