"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingCart,
  ArrowRight,
  CreditCard,
  Smartphone,
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { getCart } from "@/app/services/cart";
import { createOrder } from "@/app/services/orders";
import CouponInput from "@/components/CouponInput";
import type { AppliedCoupon, CartItem } from "@/types";

export default function Checkout() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(
    null
  );
  const [paymentMethod, setPaymentMethod] = useState("vnpay");

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const data = await getCart();
      setCartItems(data?.items || []);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      toast.error("Không thể tải giỏ hàng");
    } finally {
      setLoading(false);
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.content?.price || 0;
      return total + price * item.quantity;
    }, 0);
  };

  const calculateDiscount = () => {
    if (!appliedCoupon) return 0;

    const subtotal = calculateSubtotal();

    if (appliedCoupon.type === "percent") {
      const discount = subtotal * (appliedCoupon.value / 100);
      return appliedCoupon.maxDiscount > 0
        ? Math.min(discount, appliedCoupon.maxDiscount)
        : discount;
    } else {
      return Math.min(appliedCoupon.value, subtotal);
    }
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount();
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast.error("Giỏ hàng trống");
      return;
    }

    if (cartItems.length > 1) {
      toast.error(
        "Hiện tại chỉ hỗ trợ thanh toán một sản phẩm tại một thời điểm"
      );
      return;
    }

    setSubmitting(true);
    try {
      const orderData = {
        contentId: cartItems[0].contentId,
        quantity: cartItems[0].quantity,
        couponCode: appliedCoupon?.code,
        paymentMethod: paymentMethod,
      };

      const order = await createOrder(orderData);

      if (paymentMethod === "vnpay" && order.paymentUrl) {
        // Redirect to VNPay
        window.location.href = order.paymentUrl;
      } else {
        // Redirect to order success page
        router.push(`/orders/${order.id}/success`);
      }
    } catch (error) {
      console.error("Checkout failed:", error);
      toast.error("Không thể tạo đơn hàng");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="h-8 bg-gray-100 rounded animate-pulse"></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="h-32 bg-gray-100 rounded-lg animate-pulse"
                    ></div>
                  ))}
                </div>
                <div className="h-64 bg-gray-100 rounded-lg animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <ShoppingCart className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Giỏ hàng trống</h2>
            <p className="text-gray-500 mb-6">
              Bạn chưa có sản phẩm nào trong giỏ hàng
            </p>
            <Link href="/pages/collections">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Tiếp tục mua sắm
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/cart"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại giỏ hàng
            </Link>
            <h1 className="text-3xl font-bold">Thanh toán</h1>
            <p className="text-gray-600">Hoàn tất thông tin để đặt hàng</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Items */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    Sản phẩm
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 p-4 border rounded-lg"
                    >
                      {item.content.image && (
                        <img
                          src={item.content.image}
                          alt={item.content.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="font-medium">{item.content.title}</h3>
                        <p className="text-sm text-gray-500">
                          Số lượng: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">
                          {(
                            (item.content?.price || 0) * item.quantity
                          ).toLocaleString("vi-VN")}{" "}
                          ₫
                        </div>
                        <div className="text-sm text-gray-500">
                          {item.content?.price?.toLocaleString("vi-VN")} ₫ / sản
                          phẩm
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Phương thức thanh toán
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <input
                        type="radio"
                        id="vnpay"
                        name="paymentMethod"
                        value="vnpay"
                        checked={paymentMethod === "vnpay"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4"
                      />
                      <Label
                        htmlFor="vnpay"
                        className="flex items-center gap-2 cursor-pointer flex-1"
                      >
                        <Smartphone className="h-4 w-4" />
                        <div>
                          <div className="font-medium">VNPay</div>
                          <div className="text-sm text-gray-500">
                            Thanh toán qua ví điện tử VNPay
                          </div>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <input
                        type="radio"
                        id="cod"
                        name="paymentMethod"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4"
                      />
                      <Label
                        htmlFor="cod"
                        className="flex items-center gap-2 cursor-pointer flex-1"
                      >
                        <CreditCard className="h-4 w-4" />
                        <div>
                          <div className="font-medium">
                            Thanh toán khi nhận hàng (COD)
                          </div>
                          <div className="text-sm text-gray-500">
                            Thanh toán bằng tiền mặt khi nhận sản phẩm
                          </div>
                        </div>
                      </Label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Coupon */}
              <CouponInput
                onCouponApplied={setAppliedCoupon}
                onCouponRemoved={() => setAppliedCoupon(null)}
                orderTotal={calculateSubtotal()}
              />
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Tóm tắt đơn hàng</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Tạm tính:</span>
                    <span className="font-semibold">
                      {calculateSubtotal().toLocaleString("vi-VN")} ₫
                    </span>
                  </div>

                  {calculateDiscount() > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Giảm giá:</span>
                      <span className="font-semibold">
                        -{calculateDiscount().toLocaleString("vi-VN")} ₫
                      </span>
                    </div>
                  )}

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Tổng cộng:</span>
                    <span>{calculateTotal().toLocaleString("vi-VN")} ₫</span>
                  </div>

                  {cartItems.length > 1 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-yellow-800">
                        <AlertTriangle className="h-4 w-4" />
                        <span className="text-sm">
                          Hiện tại chỉ hỗ trợ thanh toán một sản phẩm tại một
                          thời điểm
                        </span>
                      </div>
                    </div>
                  )}

                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handleCheckout}
                    disabled={submitting || cartItems.length > 1}
                  >
                    {submitting ? (
                      "Đang xử lý..."
                    ) : (
                      <>
                        <ArrowRight className="h-4 w-4 mr-2" />
                        Đặt hàng
                      </>
                    )}
                  </Button>

                  <div className="text-xs text-gray-500 text-center">
                    Bằng việc đặt hàng, bạn đồng ý với điều khoản sử dụng của
                    chúng tôi
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
