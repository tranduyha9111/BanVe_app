"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SheetClose } from "@/components/ui/sheet";
import { Minus, Plus, Trash2, ShoppingCart, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import { getCart, removeFromCart, addToCart } from "@/app/services/cart";
import type { CartItem } from "@/types";

export default function CartSheetContent() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set());

  const fetchCart = async () => {
    try {
      setLoading(true);
      const data = await getCart();
      setCartItems(data?.items || []);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
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
      toast.success("Đã xóa sản phẩm");
    } catch (error) {
      console.error("Failed to remove item:", error);
      toast.error("Không thể xóa sản phẩm");
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.content?.price || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  if (loading) {
    return (
      <div className="flex flex-col h-full">
        <div className="p-6 border-b">
          <div className="flex items-center gap-2">
            <ShoppingCart size={24} />
            <div className="h-6 w-24 bg-gray-100 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="flex-1 p-6 space-y-4">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="h-20 bg-gray-100 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart size={24} />
            <h2 className="text-lg font-semibold">Giỏ hàng</h2>
            {cartItems.length > 0 && (
              <Badge variant="secondary">{cartItems.length}</Badge>
            )}
          </div>
          {cartItems.length > 0 && (
            <SheetClose asChild>
              <Link href="/cart">
                <Button variant="outline" size="sm">
                  Xem tất cả
                </Button>
              </Link>
            </SheetClose>
          )}
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
          <ShoppingCart
            size={64}
            className="text-muted-foreground mb-4"
          />
          <h3 className="font-semibold text-lg mb-2">
            Giỏ hàng của bạn đang trống
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm
          </p>
          <SheetClose asChild>
            <Link href="/">
              <Button>
                Khám phá sản phẩm
              </Button>
            </Link>
          </SheetClose>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.slice(0, 3).map((item) => (
              <div key={item.id} className="border rounded-lg p-3">
                <div className="flex gap-3">
                  <div className="w-16 h-16 relative flex-shrink-0">
                    {item.content?.image ? (
                      <Image
                        src={item.content.image}
                        alt={item.content.title}
                        fill
                        className="object-cover rounded-md"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 rounded-md flex items-center justify-center">
                        <ShoppingCart className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <div className="min-w-0">
                        <h4 className="font-medium text-sm truncate">{item.content?.title}</h4>
                        <div className="text-sm font-semibold text-primary">
                          {item.content?.price 
                            ? `${item.content.price.toLocaleString('vi-VN')} ₫`
                            : "Miễn phí"
                          }
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeItem(item.contentId)}
                        className="text-red-600 hover:text-red-700 h-8 w-8 p-0"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.contentId, item.quantity - 1)}
                        disabled={item.quantity <= 1 || updatingItems.has(item.contentId)}
                        className="h-7 w-7 p-0"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm font-medium w-8 text-center">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.contentId, item.quantity + 1)}
                        disabled={updatingItems.has(item.contentId)}
                        className="h-7 w-7 p-0"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {cartItems.length > 3 && (
              <div className="text-center text-sm text-muted-foreground">
                và {cartItems.length - 3} sản phẩm khác
              </div>
            )}
          </div>

          <div className="border-t p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Tổng cộng:</span>
              <span className="font-bold text-lg">
                {calculateTotal().toLocaleString('vi-VN')} ₫
              </span>
            </div>
            
            <SheetClose asChild>
              <Link href="/cart">
                <Button className="w-full">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Xem giỏ hàng đầy đủ
                </Button>
              </Link>
            </SheetClose>
          </div>
        </>
      )}
    </div>
  );
}
