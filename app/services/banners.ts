import { api, publicApi } from "@/lib/api";

/* ===== BANNERS (PUBLIC) ===== */
export const getActiveBanners = () =>
  publicApi.get("/banners").then((r) => r.data);

export const getAllBanners = () =>
  publicApi.get("/banners/all").then((r) => r.data);

export const getBannerDetail = (id: string) =>
  publicApi.get(`/banners/${id}`).then((r) => r.data);

/* ===== BANNERS (PRIVATE) ===== */
export const createBanner = (formData: FormData) =>
  api.post("/banners", formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then((r) => r.data);

export const updateBanner = (id: string, formData: FormData) =>
  api.put(`/banners/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then((r) => r.data);

export const deleteBanner = (id: string) =>
  api.delete(`/banners/${id}`).then((r) => r.data);
