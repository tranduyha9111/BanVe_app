"use client";

import { useEffect, useState } from "react";
import { getOrders } from "@/app/services/orders";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { Calendar, Package, Eye, Download } from "lucide-react";
import { toast } from "sonner";

interface Order {
  id: string;
  orderNumber: string;
  status: "pending" | "paid" | "completed" | "cancelled";
  totalAmount: number;
  createdAt: string;
  items: Array<{
    id: string;
    content: {
      id: string;
      title: string;
      thumbnail: string;
    };
    price: number;
  }>;
}

const statusConfig = {
  pending: { label: "Chờ thanh toán", color: "bg-yellow-100 text-yellow-800" },
  paid: { label: "Đã thanh toán", color: "bg-blue-100 text-blue-800" },
  completed: { label: "Hoàn thành", color: "bg-green-100 text-green-800" },
  cancelled: { label: "Đã hủy", color: "bg-red-100 text-red-800" },
};

export default function OrderList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        toast.error("Không thể tải danh sách đơn hàng");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-20 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Chưa có đơn hàng nào
          </h3>
          <p className="text-gray-600 mb-4">
            Bạn chưa thực hiện giao dịch nào. Hãy khám phá và mua sản phẩm nhé!
          </p>
          <Button onClick={() => window.location.href = "/pages/collections"}>
            Khám phá sản phẩm
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Đơn hàng của tôi</h2>
        <p className="text-gray-600">{orders.length} đơn hàng</p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">#{order.orderNumber}</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                </div>
                <Badge className={statusConfig[order.status].color}>
                  {statusConfig[order.status].label}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Order Items */}
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0">
                      <Image
                        src={item.content.thumbnail || "/placeholder.jpg"}
                        alt={item.content.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 64px, 64px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 truncate">
                        {item.content.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(item.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Total and Actions */}
              <div className="flex items-center justify-between pt-3 border-t">
                <div>
                  <p className="text-sm text-gray-600">Tổng cộng</p>
                  <p className="text-xl font-bold text-primary">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(order.totalAmount)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    Chi tiết
                  </Button>
                  {order.status === "completed" && (
                    <Button size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Tải xuống
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
