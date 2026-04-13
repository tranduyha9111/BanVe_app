import { api, publicApi } from "@/lib/api";

/* ===== COPYRIGHT REPORTS (USER) ===== */
export const createCopyrightReport = (data: {
  contentId: string;
  reason: string;
}) =>
  api.post("/copyrightreports", data).then((r) => r.data);

/* ===== COPYRIGHT REPORTS (ADMIN) ===== */
export const getCopyrightReports = () =>
  api.get("/copyrightreports/management").then((r) => r.data);

export const getCopyrightReportDetail = (id: string) =>
  api.get(`/copyrightreports/management/${id}`).then((r) => r.data);

export const approveCopyrightReport = (id: string) =>
  api.patch(`/copyrightreports/${id}/approve`).then((r) => r.data);

export const rejectCopyrightReport = (id: string) =>
  api.patch(`/copyrightreports/${id}/reject`).then((r) => r.data);
