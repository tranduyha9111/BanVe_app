import { api } from "@/lib/api";

/* ===== CART ===== */
export const getCart = () =>
  api.get("/cart").then((r) => r.data);

export const addToCart = (data: {
  contentId: string;
  quantity?: number;
}) =>
  api.post("/cart", data).then((r) => r.data);

export const removeFromCart = (contentId: string) =>
  api.delete(`/cart/${contentId}`).then((r) => r.data);

export const clearCart = () =>
  api.delete("/cart/clear").then((r) => r.data);
