"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Ticket, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import { getCouponByCode } from "@/app/services/coupons";

type Coupon = {
  code: string;
  type: "percent" | "fixed";
  value: number;
  maxDiscount: number;
  validFrom: string;
  validTo: string;
  isActive: boolean;
  usageLimit: number;
  usedCount: number;
  minOrderAmount: number;
};

interface CouponInputProps {
  onCouponApplied?: (coupon: Coupon) => void;
  onCouponRemoved?: () => void;
  orderTotal?: number;
}

export default function CouponInput({
  onCouponApplied,
  onCouponRemoved,
  orderTotal = 0,
}: CouponInputProps) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  const handleApplyCoupon = async () => {
    if (!code.trim()) {
      toast.error("Vui lòng nhập mã giảm giá");
      return;
    }

    setLoading(true);
    try {
      const coupon = await getCouponByCode(code.trim().toUpperCase());

      // Validate coupon
      const now = new Date();
      const validFrom = new Date(coupon.validFrom);
      const validTo = new Date(coupon.validTo);

      if (!coupon.isActive) {
        toast.error("Mã giảm giá đã bị vô hiệu");
        return;
      }

      if (now < validFrom || now > validTo) {
        toast.error("Mã giảm giá không còn hiệu lực");
        return;
      }

      if (coupon.usageLimit > 0 && coupon.usedCount >= coupon.usageLimit) {
        toast.error("Mã giảm giá đã hết lượt sử dụng");
        return;
      }

      if (coupon.minOrderAmount > 0 && orderTotal < coupon.minOrderAmount) {
        toast.error(
          `Đơn hàng tối thiểu ${coupon.minOrderAmount.toLocaleString(
            "vi-VN"
          )} ₫ để áp dụng mã này`
        );
        return;
      }

      setAppliedCoupon(coupon);
      setCode("");
      onCouponApplied?.(coupon);
      toast.success("Áp dụng mã giảm giá thành công!");
    } catch (error: unknown) {
      console.error("Failed to apply coupon:", error);

      const axiosLike = error as {
        response?: { status?: number };
      };

      if (axiosLike.response?.status === 404) {
        toast.error("Mã giảm giá không tồn tại");
      } else {
        toast.error("Không thể áp dụng mã giảm giá");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    onCouponRemoved?.();
    toast.success("Đã xóa mã giảm giá");
  };

  const calculateDiscount = () => {
    if (!appliedCoupon) return 0;

    if (appliedCoupon.type === "percent") {
      const discount = orderTotal * (appliedCoupon.value / 100);
      return appliedCoupon.maxDiscount > 0
        ? Math.min(discount, appliedCoupon.maxDiscount)
        : discount;
    } else {
      return Math.min(appliedCoupon.value, orderTotal);
    }
  };

  const discountAmount = calculateDiscount();

  if (appliedCoupon) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <div className="font-medium">{appliedCoupon.code}</div>
                <div className="text-sm text-green-600">
                  Giảm {discountAmount.toLocaleString("vi-VN")} ₫
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRemoveCoupon}
              className="text-red-600 hover:text-red-700"
            >
              <XCircle className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <Ticket className="h-4 w-4" />
            Mã giảm giá
          </Label>
          <div className="flex gap-2">
            <Input
              placeholder="Nhập mã giảm giá"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              onKeyPress={(e) => e.key === "Enter" && handleApplyCoupon()}
              className="flex-1"
            />
            <Button
              onClick={handleApplyCoupon}
              disabled={loading || !code.trim()}
              size="sm"
            >
              {loading ? "Đang áp dụng..." : "Áp dụng"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
