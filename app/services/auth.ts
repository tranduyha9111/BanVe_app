import { api, publicApi } from "@/lib/api";
import { debugError, debugLog } from "@/lib/debug";
import type { Profile } from "@/types";

/* ===== REGISTER ===== */
export const register = (data: {
  email: string;
  username: string;
  password: string;
}) => publicApi.post("/auth/register", data).then((r) => r.data);

/* ===== OTP (PUBLIC) ===== */
export const verifyOtp = (data: { email: string; otp: string }) =>
  publicApi.post("/auth/verifyotp", data).then((r) => r.data);

export const resendOtp = (email: string) =>
  publicApi.post("/auth/resendotp", { email }).then((r) => r.data);

/* ===== FORGOT PASSWORD ===== */
export const forgotPassword = (email: string) =>
  publicApi.post("/auth/forgotpassword", { email }).then((r) => r.data);

export const resetPassword = (payload: {
  email: string;
  otp: string;
  newPassword: string;
}) => publicApi.post("/auth/resetpassword", payload).then((r) => r.data);

/* ===== LOGIN ===== */
export const login = (payload: { email: string; password: string }) => {
  debugLog("Login payload:", { email: payload.email, password: "***" });
  return publicApi.post("/auth/login", payload).then((r) => r.data);
};

/* ===== LOGOUT ===== */
export const logout = () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (refreshToken) {
    return publicApi.post("/auth/logout", { refreshToken }).then((r) => r.data);
  }
};

/* ===== REFRESH TOKEN ===== */
export const refreshToken = (data: { refreshToken: string }) =>
  publicApi.post("/auth/refresh", data).then((r) => r.data);

/* ===== PROFILE ===== */
export const getProfile = async (): Promise<Profile> => {
  try {
    debugLog("Fetching profile from /auth/profile");
    const res = await api.get("/auth/profile");
    const backendProfile = res.data;

    const frontendProfile: Profile = {
      id: backendProfile.id,
      email: backendProfile.email,
      username: backendProfile.username,
      role: backendProfile.isCollaborator
        ? "collaborator"
        : backendProfile.isAdmin
          ? "admin"
          : "user",
      collaboratorStatus: backendProfile.collaboratorStatus || null,
      createdAt: backendProfile.createdAt || new Date().toISOString(),
      updatedAt: backendProfile.updatedAt || new Date().toISOString(),
    };

    debugLog("Mapped profile:", frontendProfile);
    return frontendProfile;
  } catch (error) {
    debugError("GetProfile API error:", error);
    throw error;
  }
};
