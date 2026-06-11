export interface Order {
  id: string;
  orderNumber: string;
  status?: string;
  total?: number;
  createdAt?: string;
  paymentMethod?: string;
}

export interface AppliedCoupon {
  type: "percent" | "fixed";
  value: number;
  maxDiscount: number;
  code?: string;
}
