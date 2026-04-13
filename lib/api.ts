import axios, { AxiosRequestConfig } from "axios";

/* ===== PUBLIC ===== */
export const publicApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

/* ===== PRIVATE ===== */
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

/* ===== REQUEST ===== */
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

/* ===== REFRESH ===== */
let isRefreshing = false;
let queue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null) => {
  queue.forEach((p) => (error ? p.reject(error) : token && p.resolve(token)));
  queue = [];
};

interface RetryConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

/* ===== RESPONSE ===== */
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config as RetryConfig;

    // Handle 500 errors gracefully
    if (error.response?.status === 500) {
      console.warn("⚠️ Backend server error (500), returning empty data");
      return Promise.resolve({ data: [] });
    }

    if (error.response?.status === 401 && !original._retry) {
      if (isRefreshing) {
        // Queue the request if already refreshing
        return new Promise((resolve, reject) => {
          queue.push({ resolve, reject });
        })
          .then((token) => {
            if (original.headers) {
              original.headers.Authorization = `Bearer ${token}`;
            }
            return api(original);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      original._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          processQueue(new Error("No refresh token"), null);
          localStorage.clear();
          window.location.href = "/auth/login";
          return Promise.reject(error);
        }

        const res = await publicApi.post("/auth/refresh", { refreshToken });
        const { accessToken, refreshToken: newRefresh } = res.data;

        localStorage.setItem("accessToken", accessToken);
        if (newRefresh) {
          localStorage.setItem("refreshToken", newRefresh);
        }

        processQueue(null, accessToken);
        if (original.headers) {
          original.headers.Authorization = `Bearer ${accessToken}`;
        }
        return api(original);
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.clear();
        window.location.href = "/auth/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
