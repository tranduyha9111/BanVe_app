"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Ticket, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar,
  Percent,
  DollarSign,
  CheckCircle,
  XCircle
} from "lucide-react";
import { toast } from "sonner";
import {
  getCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,
} from "@/app/services/coupons";

interface Coupon {
  id: string;
  code: string;
  type: 'percent' | 'fixed';
  value: number;
  maxDiscount?: number;
  minOrderAmount?: number;
  usageLimit?: number;
  usedCount: number;
  validFrom: string;
  validTo: string;
  isActive: boolean;
  createdAt: string;
}

export default function CouponsManagement() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    code: '',
    type: 'percent' as 'percent' | 'fixed',
    value: 0,
    maxDiscount: 0,
    minOrderAmount: 0,
    usageLimit: 0,
    validFrom: '',
    validTo: '',
    isActive: true,
  });

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const data = await getCoupons();
      setCoupons(data?.items || []);
    } catch (error) {
      console.error("Failed to fetch coupons:", error);
      toast.error("Không thể tải danh sách mã giảm giá");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const resetForm = () => {
    setFormData({
      code: '',
      type: 'percent',
      value: 0,
      maxDiscount: 0,
      minOrderAmount: 0,
      usageLimit: 0,
      validFrom: '',
      validTo: '',
      isActive: true,
    });
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.code || !formData.validFrom || !formData.validTo) {
      toast.error("Vui lòng điền đầy đủ thông tin bắt buộc");
      return;
    }

    setSubmitting(true);
    try {
      await createCoupon(formData);
      toast.success("Đã tạo mã giảm giá thành công");
      setIsCreateDialogOpen(false);
      resetForm();
      fetchCoupons();
    } catch (error) {
      console.error("Failed to create coupon:", error);
      toast.error("Không thể tạo mã giảm giá");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
    setFormData({
      code: coupon.code,
      type: coupon.type,
      value: coupon.value,
      maxDiscount: coupon.maxDiscount || 0,
      minOrderAmount: coupon.minOrderAmount || 0,
      usageLimit: coupon.usageLimit || 0,
      validFrom: new Date(coupon.validFrom).toISOString().split('T')[0],
      validTo: new Date(coupon.validTo).toISOString().split('T')[0],
      isActive: coupon.isActive,
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCoupon) return;

    setSubmitting(true);
    try {
      await updateCoupon(selectedCoupon.id, formData);
      toast.success("Đã cập nhật mã giảm giá thành công");
      setIsEditDialogOpen(false);
      setSelectedCoupon(null);
      resetForm();
      fetchCoupons();
    } catch (error) {
      console.error("Failed to update coupon:", error);
      toast.error("Không thể cập nhật mã giảm giá");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa mã giảm giá này?")) return;
    
    try {
      await deleteCoupon(id);
      toast.success("Đã xóa mã giảm giá");
      fetchCoupons();
    } catch (error) {
      console.error("Failed to delete coupon:", error);
      toast.error("Không thể xóa mã giảm giá");
    }
  };

  const getStatusBadge = (isActive: boolean, validTo: string) => {
    const now = new Date();
    const expiry = new Date(validTo);
    
    if (!isActive) {
      return <Badge variant="secondary">Đã vô hiệu</Badge>;
    }
    if (expiry < now) {
      return <Badge variant="destructive">Đã hết hạn</Badge>;
    }
    return <Badge variant="default">Đang hoạt động</Badge>;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const formatValue = (type: string, value: number) => {
    if (type === 'percent') {
      return `${value}%`;
    }
    return `${value.toLocaleString('vi-VN')} ₫`;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Ticket className="h-8 w-8" />
          <h1 className="text-3xl font-bold">Quản lý Mã giảm giá</h1>
        </div>
        <div className="grid gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-20 bg-gray-100 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Ticket className="h-8 w-8" />
          <h1 className="text-3xl font-bold">Quản lý Mã giảm giá</h1>
          <Badge variant="secondary">{coupons.length} mã</Badge>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Tạo mã giảm giá
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tạo Mã giảm giá Mới</DialogTitle>
              <DialogDescription>
                Tạo mã giảm giá mới cho chương trình khuyến mãi
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="code">Mã giảm giá *</Label>
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    placeholder="VD: SALE20"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Loại giảm giá</Label>
                  <Select value={formData.type} onValueChange={(value: 'percent' | 'fixed') => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percent">Phần trăm (%)</SelectItem>
                      <SelectItem value="fixed">Cố định (₫)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="value">Giá trị giảm *</Label>
                  <div className="relative">
                    <Input
                      id="value"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.value}
                      onChange={(e) => setFormData({ ...formData, value: parseFloat(e.target.value) || 0 })}
                      placeholder={formData.type === 'percent' ? "VD: 20" : "VD: 50000"}
                      required
                    />
                    <div className="absolute right-3 top-3 text-gray-500">
                      {formData.type === 'percent' ? '%' : '₫'}
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxDiscount">Giảm tối đa</Label>
                  <div className="relative">
                    <Input
                      id="maxDiscount"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.maxDiscount}
                      onChange={(e) => setFormData({ ...formData, maxDiscount: parseFloat(e.target.value) || 0 })}
                      placeholder="0 = Không giới hạn"
                    />
                    <div className="absolute right-3 top-3 text-gray-500">₫</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minOrderAmount">Đơn hàng tối thiểu</Label>
                  <div className="relative">
                    <Input
                      id="minOrderAmount"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.minOrderAmount}
                      onChange={(e) => setFormData({ ...formData, minOrderAmount: parseFloat(e.target.value) || 0 })}
                      placeholder="0 = Không yêu cầu"
                    />
                    <div className="absolute right-3 top-3 text-gray-500">₫</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="usageLimit">Giới hạn sử dụng</Label>
                  <Input
                    id="usageLimit"
                    type="number"
                    min="0"
                    value={formData.usageLimit}
                    onChange={(e) => setFormData({ ...formData, usageLimit: parseInt(e.target.value) || 0 })}
                    placeholder="0 = Không giới hạn"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="validFrom">Ngày bắt đầu *</Label>
                  <Input
                    id="validFrom"
                    type="date"
                    value={formData.validFrom}
                    onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="validTo">Ngày kết thúc *</Label>
                  <Input
                    id="validTo"
                    type="date"
                    value={formData.validTo}
                    onChange={(e) => setFormData({ ...formData, validTo: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                />
                <Label htmlFor="isActive">Kích hoạt mã giảm giá</Label>
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                  disabled={submitting}
                >
                  Hủy
                </Button>
                <Button type="submit" disabled={submitting}>
                  {submitting ? "Đang tạo..." : "Tạo mã"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Coupons Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Ticket className="h-5 w-5" />
            Danh sách Mã giảm giá
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã</TableHead>
                <TableHead>Loại</TableHead>
                <TableHead>Giá trị</TableHead>
                <TableHead>Đơn hàng tối thiểu</TableHead>
                <TableHead>Sử dụng</TableHead>
                <TableHead>Thời hạn</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coupons.map((coupon) => (
                <TableRow key={coupon.id}>
                  <TableCell>
                    <div className="font-mono font-semibold">{coupon.code}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {coupon.type === 'percent' ? (
                        <Percent className="h-4 w-4 text-blue-500" />
                      ) : (
                        <DollarSign className="h-4 w-4 text-green-500" />
                      )}
                      {coupon.type === 'percent' ? 'Phần trăm' : 'Cố định'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-semibold">
                      {formatValue(coupon.type, coupon.value)}
                    </div>
                    {coupon.maxDiscount && coupon.maxDiscount > 0 && (
                      <div className="text-xs text-gray-500">
                        Tối đa: {coupon.maxDiscount.toLocaleString('vi-VN')} ₫
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    {coupon.minOrderAmount && coupon.minOrderAmount > 0 
                      ? `${coupon.minOrderAmount.toLocaleString('vi-VN')} ₫`
                      : "Không yêu cầu"
                    }
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{coupon.usedCount}</div>
                      {coupon.usageLimit && coupon.usageLimit > 0 && (
                        <div className="text-gray-500">/ {coupon.usageLimit}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{formatDate(coupon.validFrom)}</div>
                      <div className="text-gray-500">{formatDate(coupon.validTo)}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(coupon.isActive, coupon.validTo)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(coupon)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(coupon.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {coupons.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Không tìm thấy mã giảm giá nào.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cập nhật Mã giảm giá</DialogTitle>
            <DialogDescription>
              Cập nhật thông tin mã giảm giá: {selectedCoupon?.code}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-type">Loại giảm giá</Label>
                <Select value={formData.type} onValueChange={(value: 'percent' | 'fixed') => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percent">Phần trăm (%)</SelectItem>
                    <SelectItem value="fixed">Cố định (₫)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-value">Giá trị giảm *</Label>
                <div className="relative">
                  <Input
                    id="edit-value"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: parseFloat(e.target.value) || 0 })}
                    required
                  />
                  <div className="absolute right-3 top-3 text-gray-500">
                    {formData.type === 'percent' ? '%' : '₫'}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
                disabled={submitting}
              >
                Hủy
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? "Đang cập nhật..." : "Cập nhật"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
