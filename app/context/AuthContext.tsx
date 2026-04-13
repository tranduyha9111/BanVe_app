"use client";

import { createContext, useContext, useEffect, useState } from "react";
import * as authApi from "@/app/services/auth";
import { toast } from "sonner";
import { isTokenExpired, shouldRefreshToken } from "@/lib/tokenUtils";

type User = {
  _id?: string;
  id: string;
  email: string;
  username?: string;
  avatar?: string;
  role?: "user" | "admin" | "collaborator";
  collaboratorStatus?: "pending" | "approved" | "rejected" | null;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: User) => void;
  refreshToken: () => Promise<boolean>;
  isAdmin: () => boolean;
  isCollaborator: () => boolean;
  isUser: () => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // ================= INIT AUTH =================
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const userStr = localStorage.getItem("user");

        if (!token || !userStr) {
          setLoading(false);
          return;
        }

        // Check if token is expired
        if (isTokenExpired(token)) {
          console.log("Token expired, attempting refresh...");
          const refreshSuccess = await handleRefreshToken();
          if (!refreshSuccess) {
            setLoading(false);
            return;
          }
        }

        const user = JSON.parse(userStr);
        setUser(user);
      } catch (error) {
        console.error("Auth initialization error:", error);
        localStorage.clear();
      } finally {
        setLoading(false);
      }
    };

    // Only run on client side
    if (typeof window !== "undefined") {
      initAuth();
    }
  }, []);

  // ================= AUTO REFRESH TOKEN =================
  useEffect(() => {
    if (!user) return;

    const checkTokenExpiry = () => {
      const token = localStorage.getItem("accessToken");
      if (token && shouldRefreshToken(token)) {
        console.log("Token expiring soon, refreshing...");
        handleRefreshToken();
      }
    };

    // Check every minute
    const interval = setInterval(checkTokenExpiry, 60000);

    return () => clearInterval(interval);
  }, [user]);

  // ================= LOGIN =================
  const login = async (email: string, password: string, retryCount = 0) => {
    try {
      console.log("🔐 Attempting login with:", { email, password: "***" });
      console.log("🌐 API URL:", process.env.NEXT_PUBLIC_API_URL);

      const res = await authApi.login({ email, password });
      console.log("✅ Login response:", res);

      // Handle both mock and real API responses
      const { accessToken, refreshToken, user: userData } = res.data || res;
      console.log("🔑 Tokens received:", {
        accessToken: "***",
        refreshToken: "***",
      });

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // Use user data from login response or fetch profile
      let profile = userData;
      if (!profile) {
        console.log("👤 Fetching user profile...");
        profile = await authApi.getProfile();
        console.log("✅ Profile fetched:", profile);
      } else {
        console.log("✅ Using user data from login response:", profile);
      }

      setUser(profile);
      localStorage.setItem("user", JSON.stringify(profile));
      console.log("🎉 Login successful!");
    } catch (error) {
      console.error("❌ Login failed:", error);

      // Retry logic for 500 errors
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as any;

        // Retry once for 500 errors (server issues)
        if (axiosError.response?.status === 500 && retryCount === 0) {
          console.log("🔄 Retrying login due to server error...");
          await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2 seconds
          return login(email, password, retryCount + 1);
        }

        console.error("Axios error response:", axiosError.response);
        console.error("Axios error status:", axiosError.response?.status);
        console.error("Axios error data:", axiosError.response?.data);
      }

      // Log detailed error information
      if (error instanceof Error) {
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
      }

      throw error;
    }
  };

  // ================= LOGOUT =================
  const logout = async () => {
    try {
      await authApi.logout();
    } finally {
      localStorage.clear();
      setUser(null);
      toast.success("Đăng xuất thành công");
    }
  };

  // ================= UPDATE USER =================
  const updateUser = (u: User) => {
    setUser(u);
    localStorage.setItem("user", JSON.stringify(u));
  };

  // ================= REFRESH TOKEN =================
  const handleRefreshToken = async (): Promise<boolean> => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        return false;
      }

      const response = await authApi.refreshToken({ refreshToken });
      const { accessToken, refreshToken: newRefreshToken } = response;

      localStorage.setItem("accessToken", accessToken);
      if (newRefreshToken) {
        localStorage.setItem("refreshToken", newRefreshToken);
      }

      return true;
    } catch (error) {
      console.error("Refresh token failed:", error);
      // Force logout on refresh failure
      await logout();
      return false;
    }
  };

  // Role checking functions
  const isAdmin = () => user?.role === "admin";
  const isCollaborator = () => user?.role === "collaborator";
  const isUser = () => user?.role === "user" || !user?.role;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        updateUser,
        refreshToken: handleRefreshToken,
        isAdmin,
        isCollaborator,
        isUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ================= HOOK =================
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};
