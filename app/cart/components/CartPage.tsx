"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Minus, Plus, Trash2, ShoppingCart, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import {
  getCart,
  removeFromCart,
  clearCart,
  addToCart,
} from "@/app/services/cart";
import CouponInput from "@/components/CouponInput";

interface CartItem {
  id: string;
  contentId: string;
  content: {
    id: string;
    title: string;
    description?: string;
    price?: number;
    image?: string;
    category?: {
      name: string;
    };
  };
  quantity: number;
  createdAt: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set());
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const data = await getCart();
      setCartItems(data?.items || []);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      toast.error("Không thể tải giỏ hàng");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (contentId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setUpdatingItems((prev) => new Set(prev).add(contentId));
    try {
      await addToCart({ contentId, quantity: newQuantity });
      await fetchCart();
      toast.success("Cập nhật số lượng thành công");
    } catch (error) {
      console.error("Failed to update quantity:", error);
      toast.error("Không thể cập nhật số lượng");
    } finally {
      setUpdatingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(contentId);
        return newSet;
      });
    }
  };

  const removeItem = async (contentId: string) => {
    try {
      await removeFromCart(contentId);
      await fetchCart();
      toast.success("Đã xóa sản phẩm khỏi giỏ hàng");
    } catch (error) {
      console.error("Failed to remove item:", error);
      toast.error("Không thể xóa sản phẩm");
    }
  };

  const clearAllItems = async () => {
    try {
      await clearCart();
      setCartItems([]);
      toast.success("Đã xóa toàn bộ giỏ hàng");
    } catch (error) {
      console.error("Failed to clear cart:", error);
      toast.error("Không thể xóa giỏ hàng");
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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <ShoppingCart className="h-8 w-8" />
            <h1 className="text-3xl font-bold">Giỏ hàng</h1>
          </div>
          <div className="grid gap-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-32 bg-gray-100 rounded-lg animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <ShoppingCart className="h-8 w-8" />
            <h1 className="text-3xl font-bold">Giỏ hàng</h1>
            <Badge variant="secondary">{cartItems.length} sản phẩm</Badge>
          </div>

          {cartItems.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Xóa tất cả
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
                  <AlertDialogDescription>
                    Bạn có chắc chắn muốn xóa toàn bộ sản phẩm trong giỏ hàng?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Hủy</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={clearAllItems}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Xóa tất cả
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>

        {cartItems.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <ShoppingCart className="h-24 w-24 text-gray-300 mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Giỏ hàng trống</h2>
              <p className="text-gray-500 mb-6">
                Bạn chưa có sản phẩm nào trong giỏ hàng
              </p>
              <Link href="/">
                <Button>
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Tiếp tục mua sắm
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="w-20 h-20 relative flex-shrink-0">
                        {item.content?.image ? (
                          <Image
                            src={item.content.image}
                            alt={item.content.title}
                            fill
                            className="object-cover rounded-md"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-100 rounded-md flex items-center justify-center">
                            <ShoppingCart className="h-8 w-8 text-gray-400" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <div className="min-w-0">
                            <h3 className="font-medium truncate">
                              {item.content?.title}
                            </h3>
                            {item.content?.category && (
                              <Badge variant="outline" className="mt-1">
                                {item.content.category.name}
                              </Badge>
                            )}
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">
                              {item.content?.price
                                ? `${item.content.price.toLocaleString("vi-VN")} ₫`
                                : "Miễn phí"}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                updateQuantity(
                                  item.contentId,
                                  item.quantity - 1,
                                )
                              }
                              disabled={
                                item.quantity <= 1 ||
                                updatingItems.has(item.contentId)
                              }
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => {
                                const newQty = parseInt(e.target.value) || 1;
                                updateQuantity(item.contentId, newQty);
                              }}
                              className="w-16 text-center"
                              min="1"
                              disabled={updatingItems.has(item.contentId)}
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                updateQuantity(
                                  item.contentId,
                                  item.quantity + 1,
                                )
                              }
                              disabled={updatingItems.has(item.contentId)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeItem(item.contentId)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Tổng tiền</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CouponInput
                    onCouponApplied={setAppliedCoupon}
                    onCouponRemoved={() => setAppliedCoupon(null)}
                    orderTotal={calculateSubtotal()}
                  />

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

                  <Link href="/checkout">
                    <Button className="w-full" size="lg">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Tiến hành thanh toán
                    </Button>
                  </Link>

                  <Link href="/">
                    <Button variant="outline" className="w-full">
                      Tiếp tục mua sắm
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
