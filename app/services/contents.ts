import { api, publicApi } from "@/lib/api";

/* ===== CONTENTS (PUBLIC) ===== */
export const getContents = (params?: {
  page?: number;
  pageSize?: number;
  keyword?: string;
  categoryName?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'Newest' | 'Price' | 'Title' | 'Sold';
  sortDir?: 'Asc' | 'Desc';
}) => 
  publicApi.get("/contents", { params }).then((r) => r.data);

export const getContentDetail = (id: string) =>
  publicApi.get(`/contents/${id}`).then((r) => r.data);

/* ===== CONTENTS (PRIVATE) ===== */
export const createContent = (formData: FormData) =>
  api.post("/contents", formData, { 
    headers: { 'Content-Type': 'multipart/form-data' } 
  }).then((r) => r.data);

export const updateContent = (id: string, formData: FormData) =>
  api.put(`/contents/${id}`, formData, { 
    headers: { 'Content-Type': 'multipart/form-data' } 
  }).then((r) => r.data);

export const deleteContent = (id: string) =>
  api.delete(`/contents/${id}`).then((r) => r.data);

/* ===== CONTENTS MANAGEMENT ===== */
export const getManagementContents = (params?: {
  page?: number;
  pageSize?: number;
  keyword?: string;
  categoryName?: string;
  status?: 'draft' | 'published' | 'archived';
  collaboratorId?: string;
  sortBy?: 'Newest' | 'Price' | 'Title' | 'Sold';
  sortDir?: 'Asc' | 'Desc';
}) =>
  api.get("/contents/management", { params }).then((r) => r.data);

export const getManagementContentDetail = (id: string) =>
  api.get(`/contents/management/${id}`).then((r) => r.data);

export const updateContentStatus = (id: string, publish: boolean) =>
  api.patch(`/contents/${id}/status`, publish).then((r) => r.data);

/* ===== MY PURCHASES ===== */
export const getMyPurchases = (params?: {
  page?: number;
  pageSize?: number;
  keyword?: string;
  categoryName?: string;
  sortBy?: 'Newest' | 'Price' | 'Title' | 'Sold';
  sortDir?: 'Asc' | 'Desc';
}) =>
  api.get("/contents/mypurchases", { params }).then((r) => r.data);
