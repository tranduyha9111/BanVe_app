import { api, publicApi } from "@/lib/api";

/* ===== REVIEWS (PUBLIC) ===== */
export const getContentReviews = (contentId: string, params?: {
  page?: number;
  limit?: number;
}) =>
  publicApi.get(`/reviews/contents/${contentId}`, { params }).then((r) => r.data);

/* ===== REVIEWS (PRIVATE) ===== */
export const createReview = (contentId: string, data: {
  rating: number;
  comment: string;
}) =>
  api.post(`/reviews/contents/${contentId}`, data).then((r) => r.data);

export const updateReview = (reviewId: string, data: {
  rating?: number;
  comment?: string;
}) =>
  api.put(`/reviews/${reviewId}`, data).then((r) => r.data);

export const deleteReview = (reviewId: string) =>
  api.delete(`/reviews/${reviewId}`).then((r) => r.data);
