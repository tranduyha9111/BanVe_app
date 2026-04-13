import { api } from "@/lib/api";

/* ===== ORDERS ===== */
export const createOrder = (data: {
  contentId: string;
  quantity: number;
  couponCode?: string;
  paymentMethod: string;
}) =>
  api.post("/orders", data).then((r) => r.data);

export const getOrders = (params?: {
  page?: number;
  limit?: number;
  status?: string;
}) =>
  api.get("/orders", { params }).then((r) => r.data);

export const getOrderDetail = (id: string) =>
  api.get(`/orders/${id}`).then((r) => r.data);

export const cancelOrder = (id: string, reason?: string) =>
  api.post(`/orders/${id}/cancel`, { reason }).then((r) => r.data);

/* ===== VN PAYMENT ===== */
export const getVnpayCallback = (params: Record<string, string>) =>
  api.get("/orders/vnpay/callback", { params }).then((r) => r.data);

export const getVnpayIPN = (params: Record<string, string>) =>
  api.get("/orders/vnpay/ipn", { params }).then((r) => r.data);
