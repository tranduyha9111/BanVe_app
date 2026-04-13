"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Wallet, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Calendar,
  Search,
  Filter,
  DollarSign,
  Banknote,
  History,
  Download,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";
import { 
  createWithdrawal,
} from "@/app/services/wallets";

interface Wallet {
  id: string;
  balance: number;
  availableBalance: number;
  pendingBalance: number;
  totalEarnings: number;
  totalWithdrawn: number;
  currency: string;
  createdAt: string;
}

interface Transaction {
  id: string;
  type: "earning" | "withdrawal" | "refund" | "bonus";
  amount: number;
  description: string;
  status: "completed" | "pending" | "failed";
  createdAt: string;
  metadata?: {
    contentId?: string;
    contentTitle?: string;
    orderId?: string;
  };
}

interface WalletStats {
  totalEarnings: number;
  monthlyEarnings: number;
  weeklyEarnings: number;
  dailyEarnings: number;
  totalWithdrawals: number;
  pendingWithdrawals: number;
  commissionRate: number;
  totalSales: number;
  monthlySales: number;
}

export default function MyWallet() {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState<WalletStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [showWithdrawalDialog, setShowWithdrawalDialog] = useState(false);
  const [withdrawalForm, setWithdrawalForm] = useState({
    amount: "",
    bankId: "",
  });
  const [submittingWithdrawal, setSubmittingWithdrawal] = useState(false);
  const [filters, setFilters] = useState({
    keyword: '',
    type: '',
    status: '',
    sortBy: 'Newest',
    sortDir: 'Desc',
  });

  // Mock data for now - would come from API
  useEffect(() => {
    const mockWallet: Wallet = {
      id: "wallet-1",
      balance: 15420000,
      availableBalance: 12420000,
      pendingBalance: 3000000,
      totalEarnings: 25000000,
      totalWithdrawn: 9580000,
      currency: "VND",
      createdAt: "2025-06-01T00:00:00Z",
    };

    const mockTransactions: Transaction[] = [
      {
        id: "tx-1",
        type: "earning",
        amount: 2500000,
        description: "Doanh thu từ bán nội dung: Bộ template thiết kế website",
        status: "completed",
        createdAt: "2026-01-15T10:30:00Z",
        metadata: {
          contentId: "content-1",
          contentTitle: "Bộ template thiết kế website",
        },
      },
      {
        id: "tx-2",
        type: "withdrawal",
        amount: -5000000,
        description: "Rút tiền về tài khoản ngân hàng",
        status: "completed",
        createdAt: "2026-01-10T15:45:00Z",
      },
      {
        id: "tx-3",
        type: "earning",
        amount: 1800000,
        description: "Doanh thu từ bán nội dung: Khóa học React",
        status: "completed",
        createdAt: "2026-01-08T09:20:00Z",
        metadata: {
          contentId: "content-2",
          contentTitle: "Khóa học React",
        },
      },
      {
        id: "tx-4",
        type: "withdrawal",
        amount: -3000000,
        description: "Yêu cầu rút tiền đang chờ xử lý",
        status: "pending",
        createdAt: "2026-01-05T14:15:00Z",
      },
      {
        id: "tx-5",
        type: "bonus",
        amount: 500000,
        description: "Thưởng doanh thu tháng 12",
        status: "completed",
        createdAt: "2026-01-01T00:00:00Z",
      },
    ];

    const mockStats: WalletStats = {
      totalEarnings: 25000000,
      monthlyEarnings: 5200000,
      weeklyEarnings: 1200000,
      dailyEarnings: 180000,
      totalWithdrawals: 9580000,
      pendingWithdrawals: 3000000,
      commissionRate: 70,
      totalSales: 45,
      monthlySales: 8,
    };

    setTimeout(() => {
      setWallet(mockWallet);
      setTransactions(mockTransactions);
      setStats(mockStats);
      setLoading(false);
    }, 1000);
  }, []);

  const handleWithdrawal = async () => {
    if (!withdrawalForm.amount || parseFloat(withdrawalForm.amount) <= 0) {
      toast.error("Vui lòng nhập số tiền hợp lệ");
      return;
    }

    if (!wallet || parseFloat(withdrawalForm.amount) > wallet.availableBalance) {
      toast.error("Số tiền rút vượt quá số dư khả dụng");
      return;
    }

    if (!withdrawalForm.bankId) {
      toast.error("Vui lòng chọn tài khoản ngân hàng");
      return;
    }

    setSubmittingWithdrawal(true);
    try {
      await createWithdrawal({
        amount: parseFloat(withdrawalForm.amount),
        bankId: withdrawalForm.bankId,
      });
      
      toast.success("Yêu cầu rút tiền đã được gửi thành công!");
      setShowWithdrawalDialog(false);
      setWithdrawalForm({
        amount: "",
        bankId: "",
      });
      
      // Refresh data
      // fetchWalletData();
    } catch (error) {
      console.error("Withdrawal failed:", error);
      toast.error("Không thể gửi yêu cầu rút tiền");
    } finally {
      setSubmittingWithdrawal(false);
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'earning':
        return <ArrowUpRight className="h-4 w-4 text-green-500" />;
      case 'withdrawal':
        return <ArrowDownRight className="h-4 w-4 text-red-500" />;
      case 'refund':
        return <DollarSign className="h-4 w-4 text-blue-500" />;
      case 'bonus':
        return <TrendingUp className="h-4 w-4 text-purple-500" />;
      default:
        return <DollarSign className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTransactionBadge = (type: string) => {
    switch (type) {
      case 'earning':
        return <Badge className="bg-green-100 text-green-800">Doanh thu</Badge>;
      case 'withdrawal':
        return <Badge className="bg-red-100 text-red-800">Rút tiền</Badge>;
      case 'refund':
        return <Badge className="bg-blue-100 text-blue-800">Hoàn tiền</Badge>;
      case 'bonus':
        return <Badge className="bg-purple-100 text-purple-800">Thưởng</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Hoàn thành</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Chờ xử lý</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800">Thất bại</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-6">
            <div className="h-8 bg-gray-100 rounded animate-pulse"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-100 rounded-lg animate-pulse"></div>
              ))}
            </div>
            <div className="h-96 bg-gray-100 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3">
            <Wallet className="h-8 w-8" />
            <h1 className="text-3xl font-bold">Ví của tôi</h1>
          </div>

          {/* Wallet Balance Cards */}
          {wallet && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Số dư khả dụng</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {formatCurrency(wallet.availableBalance)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Có thể rút ngay
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Đang chờ xử lý</CardTitle>
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">
                    {formatCurrency(wallet.pendingBalance)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Doanh thu đang chờ xác nhận
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tổng số dư</CardTitle>
                  <Wallet className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">
                    {formatCurrency(wallet.balance)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Tổng số tiền trong ví
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Stats Overview */}
          {stats && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Thống kê doanh thu
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <p className="text-2xl font-bold text-green-600">
                      {formatCurrency(stats.totalEarnings)}
                    </p>
                    <p className="text-sm text-gray-600">Tổng doanh thu</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">
                      {formatCurrency(stats.monthlyEarnings)}
                    </p>
                    <p className="text-sm text-gray-600">Doanh thu tháng</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">
                      {stats.commissionRate}%
                    </p>
                    <p className="text-sm text-gray-600">Tỷ lệ hoa hồng</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <p className="text-2xl font-bold text-orange-600">
                      {stats.totalSales}
                    </p>
                    <p className="text-sm text-gray-600">Tổng đơn hàng</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="overview">Tổng quan</TabsTrigger>
              <TabsTrigger value="transactions">Lịch sử giao dịch</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Thao tác nhanh</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    onClick={() => setShowWithdrawalDialog(true)}
                    className="w-full"
                    disabled={!wallet || wallet.availableBalance <= 0}
                  >
                    <Banknote className="h-4 w-4 mr-2" />
                    Yêu cầu rút tiền
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Tải báo cáo doanh thu
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Transactions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <History className="h-5 w-5" />
                    Giao dịch gần đây
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transactions.slice(0, 5).map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          {getTransactionIcon(transaction.type)}
                          <div>
                            <p className="font-medium">{transaction.description}</p>
                            <p className="text-sm text-gray-500">{formatDate(transaction.createdAt)}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold ${
                            transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {formatCurrency(transaction.amount)}
                          </p>
                          {getStatusBadge(transaction.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="transactions" className="space-y-6">
              {/* Transaction Filters */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Bộ lọc giao dịch
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Tìm kiếm giao dịch..."
                        value={filters.keyword}
                        onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
                        className="pl-10"
                      />
                    </div>
                    
                    <Select value={filters.type} onValueChange={(value) => setFilters({ ...filters, type: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Loại giao dịch" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Tất cả</SelectItem>
                        <SelectItem value="earning">Doanh thu</SelectItem>
                        <SelectItem value="withdrawal">Rút tiền</SelectItem>
                        <SelectItem value="refund">Hoàn tiền</SelectItem>
                        <SelectItem value="bonus">Thưởng</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Trạng thái" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Tất cả</SelectItem>
                        <SelectItem value="completed">Hoàn thành</SelectItem>
                        <SelectItem value="pending">Chờ xử lý</SelectItem>
                        <SelectItem value="failed">Thất bại</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={filters.sortBy} onValueChange={(value) => setFilters({ ...filters, sortBy: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sắp xếp" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Newest">Mới nhất</SelectItem>
                        <SelectItem value="Oldest">Cũ nhất</SelectItem>
                        <SelectItem value="Amount">Số tiền</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Transactions Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Lịch sử giao dịch</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Loại</TableHead>
                        <TableHead>Mô tả</TableHead>
                        <TableHead>Số tiền</TableHead>
                        <TableHead>Trạng thái</TableHead>
                        <TableHead>Ngày tạo</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getTransactionIcon(transaction.type)}
                              {getTransactionBadge(transaction.type)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{transaction.description}</p>
                              {transaction.metadata?.contentTitle && (
                                <p className="text-sm text-gray-500">
                                  Nội dung: {transaction.metadata.contentTitle}
                                </p>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <p className={`font-semibold ${
                              transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {formatCurrency(transaction.amount)}
                            </p>
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(transaction.status)}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 text-sm">
                              <Calendar className="h-4 w-4 text-gray-400" />
                              {formatDate(transaction.createdAt)}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Withdrawal Dialog */}
      {showWithdrawalDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Yêu cầu rút tiền</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="amount">Số tiền rút (VND)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Nhập số tiền"
                  value={withdrawalForm.amount}
                  onChange={(e) => setWithdrawalForm({ ...withdrawalForm, amount: e.target.value })}
                />
                {wallet && (
                  <p className="text-sm text-gray-500 mt-1">
                    Số dư khả dụng: {formatCurrency(wallet.availableBalance)}
                  </p>
                )}
              </div>
              
              <div>
                <Label htmlFor="bankId">Tài khoản ngân hàng</Label>
                <Select value={withdrawalForm.bankId} onValueChange={(value) => setWithdrawalForm({ ...withdrawalForm, bankId: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn tài khoản ngân hàng" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank-1">Vietcombank - 1234567890 (Nguyen Van A)</SelectItem>
                    <SelectItem value="bank-2">Techcombank - 0987654321 (Le Thi B)</SelectItem>
                    <SelectItem value="bank-3">ACB - 1122334455 (Tran Van C)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button
                  onClick={handleWithdrawal}
                  disabled={submittingWithdrawal}
                  className="flex-1"
                >
                  {submittingWithdrawal ? "Đang xử lý..." : "Gửi yêu cầu"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowWithdrawalDialog(false)}
                  disabled={submittingWithdrawal}
                  className="flex-1"
                >
                  Hủy
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
