import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { User, ShoppingBag, History } from "lucide-react";
import Link from "next/link";

export default function Collaborator() {
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

      {/* CONTENT */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* SIDEBAR */}
          <div className="lg:col-span-1">
            <Card className="rounded-xl py-6 sticky top-20 border shadow-sm">
              <CardContent className="p-0">
                <div className="text-center p-6 border-b">
                  <Avatar className="w-20 h-20 mx-auto mb-4 ring-4 ring-gray-100">
                    <AvatarFallback className="rounded-full bg-gray-900 text-white text-lg font-semibold">
                      TDH
                    </AvatarFallback>
                  </Avatar>

                  <h3 className="font-semibold text-base text-gray-900 mb-1">
                    Trần Duy Hà
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
                    className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-900 text-white shadow-sm"
                  >
                    <User className="size-5" />
                    <span className="text-sm font-medium">Cộng tác viên</span>
                  </Link>

                  <Link
                    href="/profile/order"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900"
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

          {/* MAIN */}
          <div className="lg:col-span-3">
            <Card className="rounded-xl border shadow-sm py-6">
              <CardHeader className="px-6 border-b pb-6">
                <CardTitle className="text-xl font-bold text-gray-900">
                  Đăng ký Cộng tác viên
                </CardTitle>
                <CardDescription>
                  Trở thành cộng tác viên để kiếm thêm thu nhập từ việc bán bản
                  vẽ
                </CardDescription>
              </CardHeader>

              <CardContent className="px-6 pt-6">
                <form className="space-y-5">
                  {/* BANK ACCOUNT */}
                  <div className="grid gap-2">
                    <Label>Số tài khoản ngân hàng</Label>
                    <input
                      name="bankAccount"
                      placeholder="Nhập số tài khoản"
                      className="h-10 rounded-md border px-3 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  {/* BANK NAME */}
                  <div className="grid gap-2">
                    <Label>Tên ngân hàng</Label>
                    <input
                      name="bankName"
                      placeholder="VD: Vietcombank, BIDV, ACB..."
                      className="h-10 rounded-md border px-3 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  {/* COMMISSION */}
                  <div className="grid gap-2">
                    <Label>Tỷ lệ hoa hồng mong muốn (%)</Label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      defaultValue={10}
                      name="commissionRate"
                      className="h-10 rounded-md border px-3 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-6 h-11 w-full rounded-full bg-primary text-primary-foreground text-sm font-medium shadow hover:bg-primary/90 transition"
                  >
                    Gửi đơn đăng ký
                  </button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
