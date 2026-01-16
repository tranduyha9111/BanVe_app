import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { AvatarFallback } from "@radix-ui/react-avatar";
import next from "next";
import Link from "next/link";

import { User, ShoppingBag, History, Search } from "lucide-react";
export default function Order() {
  return (
    <>
      {/* HEADER */}
      <div className="bg-primary">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
            Tài khoản của tôi
          </h1>
          <p className="text-white/80 text-sm lg:text-base">
            Quản lý thông tin cá nhân và hoạt động của bạn
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Card className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl py-6 sticky top-20 border border-gray-200 shadow-sm">
              <CardContent className="p-0">
                <div className="text-center p-6 border-b border-gray-100">
                  <Avatar className="relative flex size-8 shrink-0 overflow-hidden rounded-full w-20 h-20 mx-auto mb-4 ring-4 ring-gray-100">
                    <AvatarFallback className="flex size-full items-center justify-center rounded-full text-lg font-semibold bg-gray-900 text-white">
                      TDH
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-base text-gray-900 mb-1">
                    Tran Duy Ha
                  </h3>
                  <p className="text-xs text-gray-500 truncate px-2">
                    tranduy.ha911@gmail.com
                  </p>
                </div>
                <nav className="p-3 space-y-1">
                  <Link
                    href="/profile/personal"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  >
                    <User className="size-5" />
                    <span className="text-sm font-medium">
                      Thông tin cá nhân
                    </span>
                  </Link>

                  <Link
                    href="/profile/collaborator"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  >
                    <User className="size-5" />
                    <span className="text-sm font-medium">Cộng tác viên</span>
                  </Link>

                  <Link
                    href="/profile/order"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-900 text-white shadow-sm"
                  >
                    <ShoppingBag className="size-5" />
                    <span className="text-sm font-medium">
                      Đơn hàng của tôi
                    </span>
                  </Link>

                  <Link
                    href="/profile/history"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  >
                    <History className="size-5" />
                    <span className="text-sm font-medium">Lịch sử</span>
                  </Link>
                </nav>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-3">
            <div className="space-y-6">
              <div className="space-y-6">
                <Card className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl py-6 border border-gray-200 shadow-sm">
                  <CardContent className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                        <Search className="lucide lucide-search-x w-10 h-10 text-gray-400" />
                      </div>
                      <h3 className="font-semibold text-lg text-gray-900 mb-2">
                        Chưa có đơn hàng
                      </h3>
                      <p className="text-sm text-gray-500 max-w-sm">
                        Bạn chưa có đơn hàng nào. Hãy khám phá và mua sắm ngay!
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
