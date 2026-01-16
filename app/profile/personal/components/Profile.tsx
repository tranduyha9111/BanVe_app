"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormItem } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import {
  User,
  ShoppingBag,
  History,
  Calendar,
  Save,
} from "lucide-react";
import Link from "next/link";
import { useProfile } from "@/app/hooks/useProfile";

export default function Profile() {
  const { profile, loading } = useProfile();

  if (loading) {
    return <div className="p-10 text-center">Đang tải thông tin...</div>;
  }

  if (!profile) {
    return <div className="p-10 text-center">Không có dữ liệu</div>;
  }

  return (
    <>
      {/* HEADER */}
      <div className="bg-primary">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
            Tài khoản của tôi
          </h1>
          <p className="text-white/80">
            Quản lý thông tin cá nhân và hoạt động của bạn
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* SIDEBAR */}
          <Card className="lg:col-span-1 py-6 sticky top-20">
            <CardContent className="p-0">
              <div className="text-center p-6 border-b">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarFallback>
                    {profile.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <h3 className="font-semibold">{profile.username}</h3>
                <p className="text-xs text-gray-500">{profile.email}</p>
              </div>

              <nav className="p-3 space-y-1">
                <Link
                  href="/profile/personal"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-900 text-white"
                >
                  <User size={18} /> Thông tin cá nhân
                </Link>

                <Link
                  href="/profile/order"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100"
                >
                  <ShoppingBag size={18} /> Đơn hàng
                </Link>

                <Link
                  href="/profile/history"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100"
                >
                  <History size={18} /> Lịch sử
                </Link>
              </nav>
            </CardContent>
          </Card>

          {/* MAIN */}
          <div className="lg:col-span-3 space-y-6">
            {/* ACCOUNT INFO */}
            <Card className="py-6">
              <CardHeader>
                <CardTitle>Thông tin tài khoản</CardTitle>
              </CardHeader>

              <CardContent className="grid md:grid-cols-2 gap-4">
                <Info
                  label="Ngày tạo"
                  value={new Date(profile.createdAt).toLocaleString()}
                />
                <Info
                  label="Cập nhật"
                  value={new Date(profile.updatedAt).toLocaleString()}
                />
              </CardContent>
            </Card>

            {/* PERSONAL INFO */}
            <Card className="py-6">
              <CardHeader>
                <CardTitle>Thông tin cá nhân</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <FormItem>
                    <Label>Tên đăng nhập</Label>
                    <input
                      value={profile.username}
                      disabled
                      className="border h-9 px-3 rounded-md"
                    />
                  </FormItem>

                  <FormItem>
                    <Label>Email</Label>
                    <input
                      value={profile.email}
                      disabled
                      className="border h-9 px-3 rounded-md"
                    />
                  </FormItem>
                </div>

                <div className="flex justify-end pt-6">
                  <button
                    disabled
                    className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-white opacity-50"
                  >
                    <Save size={16} /> Lưu thay đổi
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <Label className="text-sm text-muted-foreground">{label}</Label>
      <div className="flex items-center gap-2 mt-2 p-3 bg-muted rounded">
        <Calendar size={16} />
        <span className="text-sm">{value}</span>
      </div>
    </div>
  );
}
