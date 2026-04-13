"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormItem } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  User,
  ShoppingBag,
  History,
  Calendar,
  Save,
  Shield,
  Users,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/app/context/AuthContext";

export default function Profile() {
  const { profile, loading } = useProfile();
  const { user, isAdmin, isCollaborator, isUser } = useAuth();

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Đang tải thông tin...</p>
          </div>
        </div>
      </div>
    );
  }

  // Use profile data if available, otherwise use user data from auth
  const displayData = profile || user;

  if (!displayData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p>Không có dữ liệu người dùng</p>
          </div>
        </div>
      </div>
    );
  }

  // Get role information
  const getRoleInfo = () => {
    if (isAdmin()) {
      return {
        role: "Admin",
        color: "bg-purple-100 text-purple-800 border-purple-200",
        icon: <Shield className="w-4 h-4" />,
        description: "Quản trị viên hệ thống",
      };
    }
    if (isCollaborator()) {
      return {
        role: "Cộng tác viên",
        color: "bg-green-100 text-green-800 border-green-200",
        icon: <Users className="w-4 h-4" />,
        description: "Người sáng tạo nội dung",
      };
    }
    return {
      role: "Người dùng",
      color: "bg-blue-100 text-blue-800 border-blue-200",
      icon: <User className="w-4 h-4" />,
      description: "Người dùng thông thường",
    };
  };

  const roleInfo = getRoleInfo();

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
                    {displayData.username?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>

                <h3 className="font-semibold">
                  {displayData.username || "Unknown User"}
                </h3>
                <p className="text-xs text-gray-500">
                  {displayData.email || "No email"}
                </p>

                {/* Role Badge */}
                <div className="mt-3 flex justify-center">
                  <Badge
                    className={`flex items-center gap-1 ${roleInfo.color} border`}
                  >
                    {roleInfo.icon}
                    {roleInfo.role}
                  </Badge>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {roleInfo.description}
                </p>
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
                  href="/profile/purchases"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100"
                >
                  <ShoppingBag size={18} /> Đã mua
                </Link>

                <Link
                  href="/profile/reviews"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100"
                >
                  <History size={18} /> Đánh giá
                </Link>

                <Link
                  href="/profile/downloads"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100"
                >
                  <History size={18} /> Tải xuống
                </Link>

                {/* Admin Dashboard Link */}
                {isAdmin() && (
                  <Link
                    href="/admin"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-purple-100 text-purple-700"
                  >
                    <Shield size={18} /> Admin Dashboard
                  </Link>
                )}

                {/* Collaborator Dashboard Link */}
                {isCollaborator() && (
                  <Link
                    href="/profile/collaborator"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-green-100 text-green-700"
                  >
                    <Settings size={18} /> CTV Dashboard
                  </Link>
                )}

                {/* Apply for Collaborator */}
                {!isAdmin() && !isCollaborator() && (
                  <Link
                    href="/profile/collaborator"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-orange-100 text-orange-700"
                  >
                    <Users size={18} /> Đăng ký CTV
                  </Link>
                )}
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
                  value={
                    "createdAt" in displayData && displayData.createdAt
                      ? new Date(displayData.createdAt).toLocaleString()
                      : displayData.id
                        ? "Mock Account"
                        : "N/A"
                  }
                />
                <Info
                  label="Cập nhật"
                  value={
                    "updatedAt" in displayData && displayData.updatedAt
                      ? new Date(displayData.updatedAt).toLocaleString()
                      : displayData.id
                        ? "Mock Account"
                        : "N/A"
                  }
                />
                <Info label="Vai trò" value={roleInfo.role} />
                <Info label="ID" value={displayData.id || "N/A"} />
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
                      value={displayData.username || ""}
                      disabled
                      className="border h-9 px-3 rounded-md"
                    />
                  </FormItem>

                  <FormItem>
                    <Label>Email</Label>
                    <input
                      value={displayData.email || ""}
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
