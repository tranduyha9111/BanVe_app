import { api, publicApi } from "@/lib/api";

/* ===== CATEGORIES (PUBLIC) ===== */
export const getCategories = (params?: {
  page?: number;
  limit?: number;
}) => 
  publicApi.get("/categories", { params }).then((r) => r.data);

export const getCategoryDetail = (id: string) =>
  publicApi.get(`/categories/${id}`).then((r) => r.data);

/* ===== CATEGORIES (PRIVATE) ===== */
export const createCategory = (data: {
  name: string;
  description?: string;
}) =>
  api.post("/categories", data).then((r) => r.data);

export const updateCategory = (id: string, data: {
  name?: string;
  description?: string;
}) =>
  api.put(`/categories/${id}`, data).then((r) => r.data);

export const deleteCategory = (id: string) =>
  api.delete(`/categories/${id}`).then((r) => r.data);
