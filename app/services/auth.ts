import { api } from "@/lib/api";
import { publicApi } from "@/lib/publicApi";

/* ===== REGISTER ===== */
export const register = (data: {
  email: string;
  username: string;
  password: string;
}) => publicApi.post("/api/auth/register", data).then(r => r.data);

/* ===== OTP ===== */
export const verifyOtp = (data: { email: string; otp: string }) =>
  publicApi.post("/api/auth/verify-otp", data).then(r => r.data);

export const resendOtp = (email: string) =>
  publicApi.post("/api/auth/resend-otp", { email }).then(r => r.data);

/* ===== FORGOT PASSWORD ===== */
export const forgotPassword = (email: string) =>
  publicApi.post("/api/auth/forgot-password", { email }).then(r => r.data);

export const resetPassword = (payload: {
  email: string;
  otp: string;
  newPassword: string;
}) =>
  publicApi.post("/api/auth/reset-password", payload).then(r => r.data);

/* ===== LOGIN ===== */
export const login = async (payload: {
  email: string;
  password: string;
}) => {
  const res = await publicApi.post("/api/auth/login", payload);

  const data = res.data;

  if (!data?.accessToken || !data?.user) {
    throw {
      response: {
        data: {
          message: data?.message || "Đăng nhập thất bại",
        },
      },
    };
  }

  return data;
};


/* ===== LOGOUT (CLIENT SIDE) ===== */
export const logout = () => {
  localStorage.clear();
};

/* ===== PROFILE ===== */
export const getProfile = async () => {
  try {
    const res = await api.get("/api/auth/profile");
    return res.data;
  } catch (error) {
    throw error;
  }
};
