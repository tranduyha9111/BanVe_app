import { api } from "@/lib/api";

/* ===== ADMIN USER MANAGEMENT ===== */
export const getAdminUsers = (params?: {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
  status?: string;
}) => api.get("/admin/users", { params }).then((r) => r.data);

export const updateUserStatus = (id: string, isActive: boolean) =>
  api.patch(`/admin/users/${id}/status`, { isActive }).then((r) => r.data);

export const deleteUser = (id: string) =>
  api.delete(`/admin/users/${id}`).then((r) => r.data);

/* ===== ADMIN DASHBOARD STATISTICS ===== */
export const getDashboardStats = (params?: {
  period?: "7days" | "30days" | "3months";
}) => api.get("/admin/stats", { params }).then((r) => r.data);

export const getUserStats = (params?: {
  period?: "7days" | "30days" | "3months";
}) => api.get("/admin/stats/users", { params }).then((r) => r.data);

export const getContentStats = (params?: {
  period?: "7days" | "30days" | "3months";
}) => api.get("/admin/stats/contents", { params }).then((r) => r.data);

export const getCollaboratorStats = (params?: {
  period?: "7days" | "30days" | "3months";
}) => api.get("/admin/stats/collaborators", { params }).then((r) => r.data);

export const getReviewStats = (params?: {
  period?: "7days" | "30days" | "3months";
}) => api.get("/admin/stats/reviews", { params }).then((r) => r.data);

/* ===== ADMIN CHART DATA ===== */
export const getChartData = (params?: {
  type?: "users" | "contents" | "revenue";
  period?: "7days" | "30days" | "3months";
}) => api.get("/admin/charts", { params }).then((r) => r.data);

/* ===== ADMIN MANAGEMENT ===== */
export const getAdminContents = (params?: {
  page?: number;
  limit?: number;
  status?: string;
}) => api.get("/admin/contents", { params }).then((r) => r.data);

export const getAdminCollaborators = (params?: {
  page?: number;
  limit?: number;
  status?: string;
}) => api.get("/admin/collaborators", { params }).then((r) => r.data);
