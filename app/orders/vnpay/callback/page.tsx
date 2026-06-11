"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  ArrowRight,
  Home,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { getVnpayCallback } from "@/app/services/orders";

export default function VnpayCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "failed">(
    "loading"
  );

  type OrderInfo = {
    id: string;
    orderNumber: string;
  };

  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    processCallback();
  }, []);

  const processCallback = async () => {
    const params = Object.fromEntries(searchParams.entries());

    if (!params.vnp_TxnRef) {
      setStatus("failed");
      return;
    }

    setProcessing(true);
    try {
      const response = await getVnpayCallback(params);

      if (response.success) {
        setStatus("success");
        setOrderInfo(response.order);

        // Redirect to success page after a delay
        setTimeout(() => {
          router.push(`/orders/${response.order.id}/success`);
        }, 3000);
      } else {
        setStatus("failed");
        setOrderInfo(response.order);
      }
    } catch (error) {
      console.error("VNPay callback error:", error);
      setStatus("failed");
      toast.error("Có lỗi xảy ra khi xử lý thanh toán");
    } finally {
      setProcessing(false);
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case "loading":
        return <RefreshCw className="h-8 w-8 text-blue-600 animate-spin" />;
      case "success":
        return <CheckCircle className="h-8 w-8 text-green-600" />;
      case "failed":
        return <XCircle className="h-8 w-8 text-red-600" />;
      default:
        return <AlertTriangle className="h-8 w-8 text-yellow-600" />;
    }
  };

  const getStatusTitle = () => {
    switch (status) {
      case "loading":
        return "Đang xử lý thanh toán...";
      case "success":
        return "Thanh toán thành công!";
      case "failed":
        return "Thanh toán thất bại";
      default:
        return "Đang kiểm tra trạng thái";
    }
  };

  const getStatusMessage = () => {
    switch (status) {
      case "loading":
        return "Vui lòng đợi trong khi chúng tôi xác minh giao dịch của bạn...";
      case "success":
        return "Giao dịch đã được xác thực thành công. Bạn sẽ được chuyển hướng đến trang chi tiết đơn hàng.";
      case "failed":
        return "Giao dịch không thành công. Vui lòng kiểm tra lại thông tin hoặc thử phương thức thanh toán khác.";
      default:
        return "Đang kiểm tra trạng thái giao dịch...";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg mb-4">
              {getStatusIcon()}
            </div>
            <h1 className="text-3xl font-bold mb-2">{getStatusTitle()}</h1>
            <p className="text-gray-600">{getStatusMessage()}</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Thông tin giao dịch</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {searchParams.get("vnp_TxnRef") && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Mã giao dịch
                    </label>
                    <p className="font-medium">
                      {searchParams.get("vnp_TxnRef")}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Số tiền
                    </label>
                    <p className="font-medium">
                      {searchParams.get("vnp_Amount")
                        ? `${(
                            parseInt(searchParams.get("vnp_Amount")!) / 100
                          ).toLocaleString("vi-VN")} ₫`
                        : "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Mã phản hồi
                    </label>
                    <p className="font-medium">
                      {searchParams.get("vnp_ResponseCode") || "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Thời gian giao dịch
                    </label>
                    <p className="font-medium">
                      {searchParams.get("vnp_PayDate")
                        ? new Date(
                            parseInt(searchParams.get("vnp_PayDate")!)
                          ).toLocaleString("vi-VN")
                        : "N/A"}
                    </p>
                  </div>
                </div>
              )}

              {orderInfo && (
                <div className="border-t pt-4">
                  <h3 className="font-medium mb-2">Thông tin đơn hàng</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Mã đơn hàng
                      </label>
                      <p className="font-medium">{orderInfo.orderNumber}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Trạng thái
                      </label>
                      <div className="mt-1">
                        <Badge
                          variant={
                            status === "success" ? "default" : "destructive"
                          }
                        >
                          {status === "success"
                            ? "Đã thanh toán"
                            : "Thanh toán thất bại"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="border-t pt-4">
                <div className="space-y-2">
                  {status === "success" && (
                    <Link href={`/orders/${orderInfo?.id}/success`}>
                      <Button className="w-full">
                        <ArrowRight className="h-4 w-4 mr-2" />
                        Xem chi tiết đơn hàng
                      </Button>
                    </Link>
                  )}

                  {status === "failed" && (
                    <Link href="/cart">
                      <Button className="w-full">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Thử lại thanh toán
                      </Button>
                    </Link>
                  )}

                  <Link href="/pages/collections">
                    <Button variant="outline" className="w-full">
                      <Home className="h-4 w-4 mr-2" />
                      Về trang chủ
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
