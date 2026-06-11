"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { User, ShoppingBag, History, TrendingUp, FileText, DollarSign, BarChart3 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import {
  getCollaboratorInfo,
  getCollaboratorContents,
  getCollaboratorRevenueStats,
  registerCollaborator,
} from "@/app/services/collaborators";
import { getMyWallet } from "@/app/services/wallets";

interface CollaboratorInfo {
  id: string;
  user: {
    id: string;
    email: string;
    username?: string;
  };
  bankName: string;
  bankAccount: string;
  ownerName: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

interface ContentItem {
  id: string;
  title: string;
  price?: number;
  downloads: number;
  revenue: number;
  createdAt: string;
}

interface RevenueStats {
  totalRevenue: number;
  monthlyRevenue: number;
  totalDownloads: number;
  monthlyDownloads: number;
  commissionRate: number;
}

export default function Collaborator() {
  const [collaboratorInfo, setCollaboratorInfo] = useState<CollaboratorInfo | null>(null);
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [revenueStats, setRevenueStats] = useState<RevenueStats | null>(null);
  type Wallet = {
    availableBalance: number;
    pendingBalance: number;
  };

  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
  const [registerForm, setRegisterForm] = useState({
    bankName: "",
    bankAccount: "",
    ownerName: "",
  });
  const [registering, setRegistering] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [infoData, contentsData, statsData, walletData] = await Promise.all([
        getCollaboratorInfo().catch(() => null),
        getCollaboratorContents({ limit: 10 }).catch(() => []),
        getCollaboratorRevenueStats().catch(() => null),
        getMyWallet().catch(() => null),
      ]);

      setCollaboratorInfo(infoData);
      setContents(contentsData || []);
      setRevenueStats(statsData);
      setWallet(walletData);
    } catch (error) {
      console.error("Failed to fetch collaborator data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!registerForm.bankName || !registerForm.bankAccount || !registerForm.ownerName) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }

    setRegistering(true);
    try {
      await registerCollaborator(registerForm);
      toast.success("Đăng ký trở thành cộng tác viên thành công!");
      setIsRegisterDialogOpen(false);
      setRegisterForm({ bankName: "", bankAccount: "", ownerName: "" });
      fetchData();
    } catch (error) {
      console.error("Failed to register:", error);
      toast.error("Không thể đăng ký cộng tác viên");
    } finally {
      setRegistering(false);
    }
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">Chờ duyệt</Badge>;
      case 'approved':
        return <Badge variant="default">Đã duyệt</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Đã từ chối</Badge>;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="h-64 bg-gray-100 rounded-lg animate-pulse"></div>
            <div className="lg:col-span-3 space-y-6">
              <div className="h-32 bg-gray-100 rounded-lg animate-pulse"></div>
              <div className="h-48 bg-gray-100 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
                  {collaboratorInfo && getStatusBadge(collaboratorInfo.status)}
                </div>

                <nav className="p-3 space-y-1">
                  <Link
                    href="/profile/personal"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  >
                    <User className="size-5" />
                    Thông tin cá nhân
                  </Link>

                  <Link
                    href="/profile/collaborator"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-900 text-white shadow-sm"
                  >
                    <ShoppingBag className="size-5" />
                    Cộng tác viên
                  </Link>

                  <Link
                    href="/profile/collaborator/stats"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  >
                    <BarChart3 className="size-5" />
                    Thống kê
                  </Link>

                  <Link
                    href="/profile/order"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  >
                    <History className="size-5" />
                    Lịch sử
                  </Link>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* MAIN CONTENT */}
          <div className="lg:col-span-3 space-y-6">
            {!collaboratorInfo ? (
              // Registration Card
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5" />
                    Trở thành Cộng tác viên
                  </CardTitle>
                  <CardDescription>
                    Đăng ký trở thành cộng tác viên để bắt đầu bán nội dung và kiếm thu nhập
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <h4 className="font-semibold">Hoa hồng hấp dẫn</h4>
                      <p className="text-sm text-gray-600">Nhận đến 70% doanh thu</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <h4 className="font-semibold">Thống kê chi tiết</h4>
                      <p className="text-sm text-gray-600">Theo dõi doanh thu real-time</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <FileText className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <h4 className="font-semibold">Quản lý dễ dàng</h4>
                      <p className="text-sm text-gray-600">Tải lên và quản lý nội dung</p>
                    </div>
                  </div>

                  <Dialog open={isRegisterDialogOpen} onOpenChange={setIsRegisterDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full">
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        Đăng ký ngay
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Đăng ký Cộng tác viên</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="bankName">Tên ngân hàng</Label>
                          <Input
                            id="bankName"
                            value={registerForm.bankName}
                            onChange={(e) =>
                              setRegisterForm({ ...registerForm, bankName: e.target.value })
                            }
                            placeholder="VD: Vietcombank"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="bankAccount">Số tài khoản</Label>
                          <Input
                            id="bankAccount"
                            value={registerForm.bankAccount}
                            onChange={(e) =>
                              setRegisterForm({ ...registerForm, bankAccount: e.target.value })
                            }
                            placeholder="VD: 123456789"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="ownerName">Chủ tài khoản</Label>
                          <Input
                            id="ownerName"
                            value={registerForm.ownerName}
                            onChange={(e) =>
                              setRegisterForm({ ...registerForm, ownerName: e.target.value })
                            }
                            placeholder="VD: Nguyễn Văn A"
                          />
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            onClick={() => setIsRegisterDialogOpen(false)}
                          >
                            Hủy
                          </Button>
                          <Button onClick={handleRegister} disabled={registering}>
                            {registering ? "Đang đăng ký..." : "Đăng ký"}
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Status Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Trạng thái Cộng tác viên</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Trạng thái hiện tại</p>
                        <div className="mt-1">{getStatusBadge(collaboratorInfo.status)}</div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Ngày đăng ký</p>
                        <p className="font-medium">
                          {new Date(collaboratorInfo.createdAt).toLocaleDateString('vi-VN')}
                        </p>
                      </div>
                    </div>
                    {collaboratorInfo.status === 'approved' && (
                      <div className="mt-4 p-4 bg-green-50 rounded-lg">
                        <p className="text-green-800">
                          Chúc mừng! Bạn đã trở thành cộng tác viên. Bắt đầu tải lên nội dung để kiếm thu nhập ngay.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Revenue Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {revenueStats && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <TrendingUp className="h-5 w-5" />
                          Thống kê doanh thu
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-3 border rounded-lg">
                            <p className="text-xl font-bold text-green-600">
                              {revenueStats.totalRevenue.toLocaleString('vi-VN')} ₫
                            </p>
                            <p className="text-xs text-gray-600">Tổng doanh thu</p>
                          </div>
                          <div className="text-center p-3 border rounded-lg">
                            <p className="text-xl font-bold text-blue-600">
                              {revenueStats.monthlyRevenue.toLocaleString('vi-VN')} ₫
                            </p>
                            <p className="text-xs text-gray-600">Doanh thu tháng</p>
                          </div>
                          <div className="text-center p-3 border rounded-lg">
                            <p className="text-xl font-bold text-purple-600">
                              {revenueStats.totalDownloads}
                            </p>
                            <p className="text-xs text-gray-600">Tổng lượt tải</p>
                          </div>
                          <div className="text-center p-3 border rounded-lg">
                            <p className="text-xl font-bold text-orange-600">
                              {revenueStats.commissionRate}%
                            </p>
                            <p className="text-xs text-gray-600">Hoa hồng</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {wallet && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <DollarSign className="h-5 w-5" />
                          Thông tin ví
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="text-center p-3 border rounded-lg">
                            <p className="text-xl font-bold text-green-600">
                              {wallet.availableBalance.toLocaleString('vi-VN')} ₫
                            </p>
                            <p className="text-xs text-gray-600">Số dư khả dụng</p>
                          </div>
                          <div className="text-center p-3 border rounded-lg">
                            <p className="text-xl font-bold text-yellow-600">
                              {wallet.pendingBalance.toLocaleString('vi-VN')} ₫
                            </p>
                            <p className="text-xs text-gray-600">Đang chờ xử lý</p>
                          </div>
                          <Link href="/profile/wallet">
                            <Button className="w-full">
                              <DollarSign className="h-4 w-4 mr-2" />
                              Quản lý ví
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
                    {/* Recent Contents */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Nội dung gần đây
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {contents.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        Bạn chưa có nội dung nào.
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {contents.map((content) => (
                          <div key={content.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <h4 className="font-medium">{content.title}</h4>
                              <p className="text-sm text-gray-600">
                                {content.downloads} lượt tải • {content.revenue.toLocaleString('vi-VN')} ₫
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">
                                {content.price ? `${content.price.toLocaleString('vi-VN')} ₫` : "Miễn phí"}
                              </p>
                              <p className="text-xs text-gray-500">
                                {new Date(content.createdAt).toLocaleDateString('vi-VN')}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
