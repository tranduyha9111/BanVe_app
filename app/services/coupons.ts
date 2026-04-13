import { api, publicApi } from "@/lib/api";

/* ===== COUPONS (PUBLIC) ===== */
export const getCouponByCode = (code: string) =>
  publicApi.get(`/coupons/${code}`).then((r) => r.data);

/* ===== COUPONS (ADMIN) ===== */
export const getCoupons = () =>
  api.get("/coupons").then((r) => r.data);

export const createCoupon = (data: {
  code: string;
  type: 'percent' | 'fixed';
  value: number;
  maxDiscount?: number;
  minOrderAmount?: number;
  usageLimit?: number;
  validFrom: string;
  validTo: string;
  isActive: boolean;
}) =>
  api.post("/coupons", data).then((r) => r.data);

export const updateCoupon = (id: string, data: {
  type?: 'percent' | 'fixed';
  value?: number;
  maxDiscount?: number;
  minOrderAmount?: number;
  usageLimit?: number;
  validFrom?: string;
  validTo?: string;
  isActive?: boolean;
}) =>
  api.put(`/coupons/${id}`, data).then((r) => r.data);

export const deleteCoupon = (id: string) =>
  api.delete(`/coupons/${id}`).then((r) => r.data);
