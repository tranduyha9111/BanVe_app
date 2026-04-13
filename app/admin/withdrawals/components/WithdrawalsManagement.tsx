"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  DollarSign, 
  Search, 
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Calendar,
  User,
  CreditCard,
  Eye,
  MessageSquare,
  Banknote
} from "lucide-react";
import { toast } from "sonner";
import {
  getWithdrawals,
  getPendingWithdrawals,
  approveWithdrawal,
  rejectWithdrawal,
  markWithdrawalAsPaid,
} from "@/app/services/wallets";

interface Withdrawal {
  id: string;
  amount: number;
  status: "pending" | "approved" | "rejected" | "paid";
  bankInfo: {
    bankName: string;
    bankAccount: string;
    accountHolder: string;
  };
  user: {
    id: string;
    username: string;
    email: string;
  };
  createdAt: string;
  updatedAt?: string;
  processedAt?: string;
  processedBy?: string;
  rejectionReason?: string;
}

export default function WithdrawalsManagement() {
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [pendingWithdrawals, setPendingWithdrawals] = useState<Withdrawal[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<Withdrawal | null>(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [filters, setFilters] = useState({
    keyword: '',
    status: '',
    fromDate: '',
    toDate: '',
    sortBy: 'Newest',
    sortDir: 'Desc',
  });

  // Mock data for now - would come from API
  useEffect(() => {
    const mockWithdrawals: Withdrawal[] = [
      {
        id: "wd-1",
        amount: 5000000,
        status: "pending",
        bankInfo: {
          bankName: "Vietcombank",
          bankAccount: "1234567890",
          accountHolder: "Nguyen Van A",
        },
        user: {
          id: "user-1",
          username: "tranduy.ha",
          email: "tranduy.ha911@gmail.com",
        },
        createdAt: "2026-01-15T10:30:00Z",
      },
      {
        id: "wd-2",
        amount: 3000000,
        status: "approved",
        bankInfo: {
          bankName: "Techcombank",
          bankAccount: "0987654321",
          accountHolder: "Le Thi B",
        },
        user: {
          id: "user-2",
          username: "lethib",
          email: "lethib@example.com",
        },
        createdAt: "2026-01-10T15:45:00Z",
        updatedAt: "2026-01-11T09:20:00Z",
        processedAt: "2026-01-11T09:20:00Z",
        processedBy: "admin-1",
      },
      {
        id: "wd-3",
        amount: 7500000,
        status: "rejected",
        bankInfo: {
          bankName: "ACB",
          bankAccount: "1122334455",
          accountHolder: "Tran Van C",
        },
        user: {
          id: "user-3",
          username: "tranvanc",
          email: "tranvanc@example.com",
        },
        createdAt: "2026-01-08T14:15:00Z",
        updatedAt: "2026-01-09T11:30:00Z",
        processedAt: "2026-01-09T11:30:00Z",
        processedBy: "admin-1",
        rejectionReason: "Thông tin ngân hàng không chính xác",
      },
      {
        id: "wd-4",
        amount: 2000000,
        status: "paid",
        bankInfo: {
          bankName: "Vietcombank",
          bankAccount: "5566778899",
          accountHolder: "Pham Van D",
        },
        user: {
          id: "user-4",
          username: "phamvand",
          email: "phamvand@example.com",
        },
        createdAt: "2026-01-05T09:20:00Z",
        updatedAt: "2026-01-06T16:45:00Z",
        processedAt: "2026-01-06T16:45:00Z",
        processedBy: "admin-1",
      },
    ];

    const mockPendingWithdrawals = mockWithdrawals.filter(w => w.status === "pending");

    setTimeout(() => {
      setWithdrawals(mockWithdrawals);
      setPendingWithdrawals(mockPendingWithdrawals);
      setLoading(false);
    }, 1000);
  }, []);

  const handleApprove = async (withdrawalId: string) => {
    try {
      await approveWithdrawal(withdrawalId);
      setWithdrawals(withdrawals.map(w => 
        w.id === withdrawalId 
          ? { ...w, status: "approved" as const, updatedAt: new Date().toISOString(), processedAt: new Date().toISOString() }
          : w
      ));
      setPendingWithdrawals(pendingWithdrawals.filter(w => w.id !== withdrawalId));
      toast.success("Đã duyệt yêu cầu rút tiền");
    } catch (error) {
      toast.error("Không thể duyệt yêu cầu rút tiền");
    }
  };

  const handleReject = async (withdrawalId: string) => {
    if (!rejectionReason.trim()) {
      toast.error("Vui lòng nhập lý do từ chối");
      return;
    }

    setSubmitting(true);
    try {
      await rejectWithdrawal(withdrawalId, rejectionReason);
      setWithdrawals(withdrawals.map(w => 
        w.id === withdrawalId 
          ? { ...w, status: "rejected" as const, updatedAt: new Date().toISOString(), processedAt: new Date().toISOString(), rejectionReason }
          : w
      ));
      setPendingWithdrawals(pendingWithdrawals.filter(w => w.id !== withdrawalId));
      setShowRejectDialog(false);
      setRejectionReason("");
      toast.success("Đã từ chối yêu cầu rút tiền");
    } catch (error) {
      toast.error("Không thể từ chối yêu cầu rút tiền");
    } finally {
      setSubmitting(false);
    }
  };

  const handleMarkAsPaid = async (withdrawalId: string) => {
    try {
      await markWithdrawalAsPaid(withdrawalId);
      setWithdrawals(withdrawals.map(w => 
        w.id === withdrawalId 
          ? { ...w, status: "paid" as const, updatedAt: new Date().toISOString(), processedAt: new Date().toISOString() }
          : w
      ));
      toast.success("Đã đánh dấu là đã thanh toán");
    } catch (error) {
      toast.error("Không thể cập nhật trạng thái thanh toán");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Chờ duyệt</Badge>;
      case 'approved':
        return <Badge className="bg-blue-100 text-blue-800">Đã duyệt</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Đã từ chối</Badge>;
      case 'paid':
        return <Badge className="bg-green-100 text-green-800">Đã thanh toán</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'paid':
        return <Banknote className="h-4 w-4 text-green-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
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

  const filteredWithdrawals = withdrawals.filter(withdrawal => {
    const matchesKeyword = !filters.keyword || 
      withdrawal.user.username.toLowerCase().includes(filters.keyword.toLowerCase()) ||
      withdrawal.user.email.toLowerCase().includes(filters.keyword.toLowerCase()) ||
      withdrawal.bankInfo.bankName.toLowerCase().includes(filters.keyword.toLowerCase()) ||
      withdrawal.bankInfo.accountHolder.toLowerCase().includes(filters.keyword.toLowerCase());
    
    const matchesStatus = !filters.status || withdrawal.status === filters.status;
    
    return matchesKeyword && matchesStatus;
  });

  const stats = {
    total: withdrawals.length,
    pending: withdrawals.filter(w => w.status === 'pending').length,
    approved: withdrawals.filter(w => w.status === 'approved').length,
    rejected: withdrawals.filter(w => w.status === 'rejected').length,
    paid: withdrawals.filter(w => w.status === 'paid').length,
    totalAmount: withdrawals.reduce((sum, w) => sum + w.amount, 0),
    pendingAmount: withdrawals.filter(w => w.status === 'pending').reduce((sum, w) => sum + w.amount, 0),
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-6">
            <div className="h-8 bg-gray-100 rounded animate-pulse"></div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-100 rounded-lg animate-pulse"></div>
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
            <DollarSign className="h-8 w-8" />
            <h1 className="text-3xl font-bold">Quản lý Rút tiền</h1>
            <Badge variant="secondary">{stats.total} yêu cầu</Badge>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Tổng số</p>
                    <p className="text-2xl font-bold">{stats.total}</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Chờ duyệt</p>
                    <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Đã duyệt</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.approved}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Đã thanh toán</p>
                    <p className="text-2xl font-bold text-green-600">{stats.paid}</p>
                  </div>
                  <Banknote className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Tổng tiền chờ duyệt</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {formatCurrency(stats.pendingAmount)}
                    </p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Bộ lọc
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Tìm kiếm yêu cầu..."
                    value={filters.keyword}
                    onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
                    className="pl-10"
                  />
                </div>
                
                <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Tất cả</SelectItem>
                    <SelectItem value="pending">Chờ duyệt</SelectItem>
                    <SelectItem value="approved">Đã duyệt</SelectItem>
                    <SelectItem value="rejected">Đã từ chối</SelectItem>
                    <SelectItem value="paid">Đã thanh toán</SelectItem>
                  </SelectContent>
                </Select>

                <Input
                  type="date"
                  placeholder="Từ ngày"
                  value={filters.fromDate}
                  onChange={(e) => setFilters({ ...filters, fromDate: e.target.value })}
                />

                <Input
                  type="date"
                  placeholder="Đến ngày"
                  value={filters.toDate}
                  onChange={(e) => setFilters({ ...filters, toDate: e.target.value })}
                />

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

          {/* Withdrawals Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Danh sách yêu cầu rút tiền
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Người dùng</TableHead>
                    <TableHead>Số tiền</TableHead>
                    <TableHead>Thông tin ngân hàng</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Ngày tạo</TableHead>
                    <TableHead>Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredWithdrawals.map((withdrawal) => (
                    <TableRow key={withdrawal.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{withdrawal.user.username}</div>
                          <div className="text-sm text-gray-500">{withdrawal.user.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-semibold text-green-600">
                          {formatCurrency(withdrawal.amount)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="font-medium">{withdrawal.bankInfo.bankName}</div>
                          <div className="text-gray-500">{withdrawal.bankInfo.accountHolder}</div>
                          <div className="text-gray-500">{withdrawal.bankInfo.bankAccount}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(withdrawal.status)}
                          {getStatusBadge(withdrawal.status)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          {formatDate(withdrawal.createdAt)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedWithdrawal(withdrawal);
                              setShowDetailDialog(true);
                            }}
                            className="h-8 w-8 p-0"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {withdrawal.status === 'pending' && (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleApprove(withdrawal.id)}
                                className="h-8 w-8 p-0 text-green-600"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedWithdrawal(withdrawal);
                                  setShowRejectDialog(true);
                                }}
                                className="h-8 w-8 p-0 text-red-600"
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          {withdrawal.status === 'approved' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleMarkAsPaid(withdrawal.id)}
                              className="h-8 w-8 p-0 text-blue-600"
                            >
                              <Banknote className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {filteredWithdrawals.length === 0 && (
                <div className="text-center py-16">
                  <DollarSign className="h-24 w-24 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Không có yêu cầu rút tiền nào</h3>
                  <p className="text-gray-500">Không tìm thấy yêu cầu rút tiền nào phù hợp với bộ lọc</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Detail Dialog */}
      {showDetailDialog && selectedWithdrawal && (
        <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Chi tiết yêu cầu rút tiền</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Thông tin người dùng</h4>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Username:</span> {selectedWithdrawal.user.username}</p>
                    <p><span className="font-medium">Email:</span> {selectedWithdrawal.user.email}</p>
                    <p><span className="font-medium">ID:</span> {selectedWithdrawal.user.id}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Thông tin yêu cầu</h4>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Số tiền:</span> {formatCurrency(selectedWithdrawal.amount)}</p>
                    <p><span className="font-medium">Trạng thái:</span> {getStatusBadge(selectedWithdrawal.status)}</p>
                    <p><span className="font-medium">Ngày tạo:</span> {formatDate(selectedWithdrawal.createdAt)}</p>
                    {selectedWithdrawal.processedAt && (
                      <p><span className="font-medium">Ngày xử lý:</span> {formatDate(selectedWithdrawal.processedAt)}</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Thông tin ngân hàng</h4>
                <div className="space-y-1 text-sm">
                  <p><span className="font-medium">Ngân hàng:</span> {selectedWithdrawal.bankInfo.bankName}</p>
                  <p><span className="font-medium">Chủ tài khoản:</span> {selectedWithdrawal.bankInfo.accountHolder}</p>
                  <p><span className="font-medium">Số tài khoản:</span> {selectedWithdrawal.bankInfo.bankAccount}</p>
                </div>
              </div>
              
              {selectedWithdrawal.rejectionReason && (
                <div>
                  <h4 className="font-semibold mb-2">Lý do từ chối</h4>
                  <p className="text-sm text-red-600">{selectedWithdrawal.rejectionReason}</p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Reject Dialog */}
      {showRejectDialog && selectedWithdrawal && (
        <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Từ chối yêu cầu rút tiền</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">
                  Yêu cầu rút tiền từ: <span className="font-semibold">{selectedWithdrawal.user.username}</span>
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  Số tiền: <span className="font-semibold text-green-600">{formatCurrency(selectedWithdrawal.amount)}</span>
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Lý do từ chối</label>
                <Textarea
                  placeholder="Nhập lý do từ chối..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  rows={3}
                />
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button
                  onClick={() => handleReject(selectedWithdrawal.id)}
                  disabled={submitting}
                  className="flex-1"
                >
                  {submitting ? "Đang xử lý..." : "Xác nhận từ chối"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowRejectDialog(false);
                    setRejectionReason("");
                    setSelectedWithdrawal(null);
                  }}
                  disabled={submitting}
                  className="flex-1"
                >
                  Hủy
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
