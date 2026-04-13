"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  ArrowRight,
  ShoppingBag,
  Download,
  Calendar,
  CreditCard,
  Home,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { getOrderDetail } from "@/app/services/orders";
import DownloadFilesDialog from "@/components/DownloadFilesDialog";

interface Order {
  id: string;
  orderNumber: string;
  status: "pending" | "paid" | "completed" | "cancelled";
  totalAmount: number;
  paymentMethod: string;
  createdAt: string;
  items: Array<{
    id: string;
    content: {
      id: string;
      title: string;
      thumbnail: string;
    };
    price: number;
    quantity: number;
  }>;
}

interface OrderSuccessProps {
  orderId: string;
}

export default function OrderSuccess({ orderId }: OrderSuccessProps) {
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrderDetail();
  }, [orderId]);

  const fetchOrderDetail = async () => {
    try {
      const data = await getOrderDetail(orderId);
      setOrder(data);
    } catch (error) {
      console.error("Failed to fetch order detail:", error);
      toast.error("Không thể tải thông tin đơn hàng");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">Chờ thanh toán</Badge>;
      case "paid":
        return <Badge variant="default">Đã thanh toán</Badge>;
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800">Hoàn thành</Badge>
        );
      case "cancelled":
        return <Badge variant="destructive">Đã hủy</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("vi-VN");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="h-8 bg-gray-100 rounded animate-pulse"></div>
              <div className="h-64 bg-gray-100 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-2">Không tìm thấy đơn hàng</h2>
            <p className="text-gray-500 mb-6">
              Đơn hàng bạn tìm kiếm không tồn tại
            </p>
            <Link href="/profile/order">
              <Button>Xem đơn hàng của tôi</Button>
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
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Đặt hàng thành công!</h1>
            <p className="text-gray-600">
              Cảm ơn bạn đã đặt hàng. Mã đơn hàng của bạn là{" "}
              <strong>{order.orderNumber}</strong>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Order Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5" />
                    Thông tin đơn hàng
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Mã đơn hàng
                      </label>
                      <p className="font-medium">{order.orderNumber}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Trạng thái
                      </label>
                      <div className="mt-1">{getStatusBadge(order.status)}</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Ngày đặt
                      </label>
                      <p className="font-medium">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Phương thức thanh toán
                      </label>
                      <p className="font-medium">
                        {order.paymentMethod === "vnpay" ? "VNPay" : "COD"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Order Items */}
              <Card>
                <CardHeader>
                  <CardTitle>Sản phẩm đã đặt</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 p-4 border rounded-lg"
                    >
                      {item.content.thumbnail && (
                        <img
                          src={item.content.thumbnail}
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
                          {(item.price * item.quantity).toLocaleString("vi-VN")}{" "}
                          ₫
                        </div>
                        <div className="text-sm text-gray-500">
                          {item.price.toLocaleString("vi-VN")} ₫ / sản phẩm
                        </div>
                      </div>
                      {order.status === "completed" && (
                        <DownloadFilesDialog
                          contentId={item.content.id}
                          contentTitle={item.content.title}
                        >
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Tải xuống
                          </Button>
                        </DownloadFilesDialog>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Tóm tắt đơn hàng</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between text-sm"
                      >
                        <span>
                          {item.content.title} x{item.quantity}
                        </span>
                        <span>
                          {(item.price * item.quantity).toLocaleString("vi-VN")}{" "}
                          ₫
                        </span>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Tổng cộng:</span>
                    <span>{order.totalAmount.toLocaleString("vi-VN")} ₫</span>
                  </div>

                  <div className="space-y-2">
                    <Link href="/profile/order">
                      <Button variant="outline" className="w-full">
                        Xem đơn hàng của tôi
                      </Button>
                    </Link>

                    <Link href="/pages/collections">
                      <Button className="w-full">
                        <Home className="h-4 w-4 mr-2" />
                        Tiếp tục mua sắm
                      </Button>
                    </Link>
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
