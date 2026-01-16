import axios, { AxiosRequestConfig } from "axios";

/* ================= PUBLIC API ================= */
export const publicApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

/* ================= PRIVATE API ================= */
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

/* ================= REQUEST INTERCEPTOR ================= */
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

/* ================= REFRESH TOKEN LOGIC ================= */
let isRefreshing = false;
let queue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  queue.forEach((p) => {
    error ? p.reject(error) : p.resolve(token);
  });
  queue = [];
};

interface RetryConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

/* ================= RESPONSE INTERCEPTOR ================= */
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retry) {
      if (
        original.url?.includes("/api/auth/login") ||
        original.url?.includes("/api/auth/refresh")
      ) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          queue.push({ resolve, reject });
        }).then((token) => {
          original.headers = original.headers || {};
          original.headers.Authorization = `Bearer ${token}`;
          return api(original);
        });
      }

      original._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) throw error;

        const res = await publicApi.post("/api/auth/refresh", {
          refreshToken,
        });

        const newAccessToken = res.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);

        processQueue(null, newAccessToken);

        original.headers = original.headers || {};
        original.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(original);
      } catch (err) {
        processQueue(err, null);
        localStorage.clear();
        window.location.href = "/auth/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
