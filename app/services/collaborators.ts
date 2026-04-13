import { api } from "@/lib/api";

/* ===== COLLABORATORS (PUBLIC) ===== */
export const registerCollaborator = (data: {
  bankName: string;
  bankAccount: string;
  ownerName: string;
}) =>
  api.post("/collaborators", data).then((r) => r.data);

export const getCollaboratorInfo = () =>
  api.get("/collaborators/info").then((r) => r.data);

export const getCollaboratorContents = (params?: {
  page?: number;
  limit?: number;
}) =>
  api.get("/collaborators/contents", { params }).then((r) => r.data);

export const getCollaboratorRevenueStats = (params?: {
  period?: '7days' | '30days' | '3months';
}) =>
  api.get("/collaborators/revenuestats", { params }).then((r) => r.data);

/* ===== COLLABORATORS (ADMIN) ===== */
export const getCollaborators = (params?: {
  page?: number;
  limit?: number;
  status?: 'pending' | 'approved' | 'rejected';
}) =>
  api.get("/collaborators", { params }).then((r) => r.data);

export const updateCollaboratorStatus = (id: string, status: 'pending' | 'approved' | 'rejected') =>
  api.patch(`/collaborators/${id}/status`, { status }).then((r) => r.data);

export const getCollaboratorDetail = (id: string) =>
  api.get(`/collaborators/${id}`).then((r) => r.data);
