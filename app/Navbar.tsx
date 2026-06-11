"use client";

import { useAuth } from "@/app/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import CartSheetContent from "@/components/CartSheetContent";

import Link from "next/link";
import {
  DraftingCompass,
  Search,
  User,
  ShoppingCart,
  LogOut,
  Settings,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useRouter } from "next/navigation";
import { getContents } from "@/app/services/contents";
import type { Content } from "@/types";

export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, loading, logout, isAdmin, isCollaborator } = useAuth();
  const router = useRouter();

  const trimmedQuery = useMemo(() => searchQuery.trim(), [searchQuery]);

  const goToSearch = () => {
    if (!trimmedQuery) return;
    router.push(`/pages/collections?q=${encodeURIComponent(trimmedQuery)}`);
  };

  const [searchSuggestions, setSearchSuggestions] = useState<
    Pick<Content, "id" | "title">[]
  >([]);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      const q = trimmedQuery;
      if (!q || q.length < 2) {
        setSearchSuggestions([]);
        return;
      }

      try {
        setSearchLoading(true);
        const results = await getContents({ keyword: q, pageSize: 6 });
        if (cancelled) return;
        const items = Array.isArray(results) ? results : [];
        setSearchSuggestions(
          items.map((item) => ({ id: item.id, title: item.title }))
        );
      } catch {
        if (!cancelled) setSearchSuggestions([]);
      } finally {
        if (!cancelled) setSearchLoading(false);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [trimmedQuery]);

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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setVisible(true)}
                  onBlur={() => {
                    // delay để click suggestion kịp chạy
                    setTimeout(() => setVisible(false), 120);
                  }}
                  placeholder="Tìm kiếm bản vẽ..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter") goToSearch();
                  }}
                  className="w-full h-9 lg:h-10 rounded-full pl-10 pr-4 bg-gray-50 border border-gray-200 outline-none transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                />

                {visible && (trimmedQuery.length >= 2 || searchLoading) && (
                  <div className="absolute left-0 right-0 top-[calc(100%+10px)] bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden z-50">
                    <div className="px-3 py-2 text-xs text-muted-foreground flex items-center gap-2">
                      <Search className="h-3.5 w-3.5" />
                      {searchLoading ? "Đang tìm kiếm..." : "Gợi ý tìm kiếm"}
                    </div>

                    {searchSuggestions.length === 0 && !searchLoading ? (
                      <div className="px-3 py-3 text-sm text-gray-500">
                        Không có gợi ý.
                      </div>
                    ) : (
                      <div>
                        {searchSuggestions.slice(0, 6).map((s) => (
                          <button
                            key={s.id}
                            type="button"
                            className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => {
                              router.push(`/pages/detail/${s.id}`);
                            }}
                          >
                            {s.title}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
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
                  <button className="flex items-center gap-2 h-9 lg:h-10 px-2 rounded-full border-2 border-transparent bg-gradient-to-r from-primary/10 to-primary/20 hover:from-primary/20 hover:to-primary/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/30 hover:scale-[1.02]">
                    <div className="relative">
                      <Avatar className="h-7 w-7 lg:h-8 lg:w-8 ring-2 ring-primary/20 ring-offset-2">
                        <AvatarImage
                          src={
                            user?.avatar ||
                            `https://ui-avatars.com/api/?name=${user?.username}&background=6366f1&color=fff&size=128`
                          }
                          alt={user?.username}
                          className="object-cover"
                        />
                        <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-white font-semibold text-sm shadow-lg">
                          {user?.username?.charAt(0)?.toUpperCase() ?? "?"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>

                    <div className="hidden md:flex flex-col items-start">
                      <span className="text-sm font-semibold text-gray-900">
                        {user.username}
                      </span>
                      <span className="text-xs text-gray-500">Online</span>
                    </div>
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-64 border-0 shadow-2xl"
                >
                  <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-4 rounded-t-lg">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 ring-2 ring-primary/30">
                        <AvatarImage
                          src={
                            user?.avatar ||
                            `https://ui-avatars.com/api/?name=${user?.username}&background=6366f1&color=fff&size=128`
                          }
                          alt={user?.username}
                          className="object-cover"
                        />
                        <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-white font-semibold shadow-lg">
                          {user?.username?.charAt(0)?.toUpperCase() ?? "?"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900">
                          {user.username}
                        </p>
                        <p className="text-xs text-gray-600 truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-2">
                    <DropdownMenuItem asChild>
                      <Link
                        href="/profile/personal"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600">
                          <User size={16} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Trang cá nhân</p>
                          <p className="text-xs text-gray-500">
                            Quản lý thông tin
                          </p>
                        </div>
                      </Link>
                    </DropdownMenuItem>

                    {/* Admin Dashboard */}
                    {isAdmin() && (
                      <DropdownMenuItem asChild>
                        <Link
                          href="/admin"
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-50 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-600">
                            <Settings size={16} />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">
                              Admin Dashboard
                            </p>
                            <p className="text-xs text-gray-500">
                              Quản lý hệ thống
                            </p>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                    )}

                    {/* Collaborator Dashboard */}
                    {isCollaborator() && (
                      <DropdownMenuItem asChild>
                        <Link
                          href="/profile/collaborator"
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-50 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600">
                            <Settings size={16} />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">
                              Collaborator Dashboard
                            </p>
                            <p className="text-xs text-gray-500">
                              Quản lý nội dung
                            </p>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                    )}

                    {/* Apply for Collaborator */}
                    {!isAdmin() && !isCollaborator() && (
                      <DropdownMenuItem asChild>
                        <Link
                          href="/profile/collaborator"
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-orange-50 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-600">
                            <Settings size={16} />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Đăng ký CTV</p>
                            <p className="text-xs text-gray-500">
                              Trở thành cộng tác viên
                            </p>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                    )}

                    <DropdownMenuItem asChild>
                      <Link
                        href="/settings"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-600">
                          <Settings size={16} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Cài đặt</p>
                          <p className="text-xs text-gray-500">
                            Tùy chỉnh tài khoản
                          </p>
                        </div>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600 group-hover:bg-red-200">
                        <LogOut size={16} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-red-600">
                          Đăng xuất
                        </p>
                        <p className="text-xs text-gray-500">
                          Thoát khỏi tài khoản
                        </p>
                      </div>
                    </DropdownMenuItem>
                  </div>
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
                <CartSheetContent />
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
