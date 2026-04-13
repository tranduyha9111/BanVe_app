import { api } from "@/lib/api";

/* ===== DOWNLOADS ===== */
export const getDownloadFiles = (contentId: string) =>
  api.get(`/contents/${contentId}/downloads`).then((r) => r.data);

export const downloadFile = (contentId: string, fileId: string) => {
  // Create download URL for file
  return `${process.env.NEXT_PUBLIC_API_URL}/api/${contentId}/downloads/${fileId}`;
};
