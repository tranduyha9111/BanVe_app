import { api } from "@/lib/api";

/* ===== CONTENT STATS (COLLABORATOR) ===== */
export const getContentStats = (params?: {
  page?: number;
  pageSize?: number;
  keyword?: string;
}) =>
  api.get("/contentstats", { params }).then((r) => r.data);

/* ===== CONTENT STATS (ADMIN) ===== */
export const getAllContentStats = (params?: {
  page?: number;
  pageSize?: number;
  keyword?: string;
  collaboratorId?: string;
  sortBy?: 'Newest' | 'Price' | 'Title' | 'Sold';
  sortDir?: 'Asc' | 'Desc';
}) =>
  api.get("/contentstats/all", { params }).then((r) => r.data);
