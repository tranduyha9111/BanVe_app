import { api } from "@/lib/api";

/* ===== WALLETS ===== */
export const getMyWallet = () =>
  api.get("/wallets/my").then((r) => r.data);

export const getWalletTransactions = (params?: {
  page?: number;
  limit?: number;
  type?: string;
  status?: string;
}) =>
  api.get("/wallets/my/transactions", { params }).then((r) => r.data);

export const getWalletStats = () =>
  api.get("/wallets/my/stats").then((r) => r.data);

/* ===== WITHDRAWALS ===== */
export const createWithdrawal = (data: {
  bankId: string;
  amount: number;
}) =>
  api.post("/withdrawals", data).then((r) => r.data);

export const getWithdrawals = (params?: {
  status?: string;
  fromDate?: string;
  toDate?: string;
  page?: number;
  pageSize?: number;
}) =>
  api.get("/withdrawals", { params }).then((r) => r.data);

export const getMyWithdrawals = () =>
  api.get("/withdrawals/my").then((r) => r.data);

export const getPendingWithdrawals = () =>
  api.get("/withdrawals/pending").then((r) => r.data);

export const approveWithdrawal = (id: string) =>
  api.post(`/withdrawals/${id}/approve`).then((r) => r.data);

export const rejectWithdrawal = (id: string, reason?: string) =>
  api.post(`/withdrawals/${id}/reject`, reason).then((r) => r.data);

export const markWithdrawalAsPaid = (id: string) =>
  api.post(`/withdrawals/${id}/paid`).then((r) => r.data);
