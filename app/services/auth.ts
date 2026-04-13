import { api, publicApi } from "@/lib/api";

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
  console.log("📤 Payload:", { email: payload.email, password: "***" });

  // Real API call for all users
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
export const getProfile = async () => {
  try {
    console.log("👤 Making getProfile API call to:", "/auth/profile");

    // Real API call for all users
    const res = await api.get("/auth/profile");
    console.log("📥 Profile API response:", res);
    console.log("� Profile data:", res.data);

    // Map backend response to frontend format
    const backendProfile = res.data;
    const frontendProfile = {
      id: backendProfile.id,
      email: backendProfile.email,
      username: backendProfile.username,
      role: (backendProfile.isCollaborator
        ? "collaborator"
        : backendProfile.isAdmin
          ? "admin"
          : "user") as "user" | "collaborator" | "admin",
      collaboratorStatus: backendProfile.collaboratorStatus || null,
      createdAt: backendProfile.createdAt || new Date().toISOString(),
      updatedAt: backendProfile.updatedAt || new Date().toISOString(),
    };

    console.log("✨ Mapped profile data:", frontendProfile);
    return frontendProfile;
  } catch (error) {
    console.error("❌ GetProfile API error:", error);

    // Check if it's an Axios error
    if (error && typeof error === "object" && "response" in error) {
      const axiosError = error as {
        response?: {
          status?: number;
          data?: unknown;
          headers?: unknown;
        };
      };
      console.error("❌ Profile error status:", axiosError.response?.status);
      console.error("❌ Profile error data:", axiosError.response?.data);
      console.error("❌ Profile error headers:", axiosError.response?.headers);
    }

    throw error;
  }
};
