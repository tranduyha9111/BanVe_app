"use client";

import { createContext, useContext, useEffect, useState } from "react";
import * as authApi from "@/app/services/auth";
import { toast } from "sonner";
import { isTokenExpired, shouldRefreshToken } from "@/lib/tokenUtils";
import { debugError, debugLog } from "@/lib/debug";
import { clearSessionCookie, setSessionCookie } from "@/lib/auth-cookie";
import type { User } from "@/types";

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

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const userStr = localStorage.getItem("user");

        if (!token || !userStr) {
          clearSessionCookie();
          setLoading(false);
          return;
        }

        if (isTokenExpired(token)) {
          debugLog("Token expired, attempting refresh...");
          const refreshSuccess = await handleRefreshToken();
          if (!refreshSuccess) {
            setLoading(false);
            return;
          }
        }

        setUser(JSON.parse(userStr));
        setSessionCookie();
      } catch (error) {
        debugError("Auth initialization error:", error);
        localStorage.clear();
        clearSessionCookie();
      } finally {
        setLoading(false);
      }
    };

    if (typeof window !== "undefined") {
      initAuth();
    }
  }, []);

  useEffect(() => {
    if (!user) return;

    const checkTokenExpiry = () => {
      const token = localStorage.getItem("accessToken");
      if (token && shouldRefreshToken(token)) {
        debugLog("Token expiring soon, refreshing...");
        handleRefreshToken();
      }
    };

    const interval = setInterval(checkTokenExpiry, 60000);
    return () => clearInterval(interval);
  }, [user]);

  const login = async (email: string, password: string, retryCount = 0) => {
    try {
      const res = await authApi.login({ email, password });
      const { accessToken, refreshToken, user: userData } = res.data || res;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      let profile = userData;
      if (!profile) {
        profile = await authApi.getProfile();
      }

      setUser(profile);
      localStorage.setItem("user", JSON.stringify(profile));
      setSessionCookie();
    } catch (error) {
      debugError("Login failed:", error);

      if (
        error &&
        typeof error === "object" &&
        "response" in error &&
        (error as { response?: { status?: number } }).response?.status === 500 &&
        retryCount === 0
      ) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return login(email, password, retryCount + 1);
      }

      throw error;
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } finally {
      localStorage.clear();
      clearSessionCookie();
      setUser(null);
      toast.success("Đăng xuất thành công");
    }
  };

  const updateUser = (u: User) => {
    setUser(u);
    localStorage.setItem("user", JSON.stringify(u));
  };

  const handleRefreshToken = async (): Promise<boolean> => {
    try {
      const storedRefreshToken = localStorage.getItem("refreshToken");
      if (!storedRefreshToken) {
        return false;
      }

      const response = await authApi.refreshToken({
        refreshToken: storedRefreshToken,
      });
      const { accessToken, refreshToken: newRefreshToken } = response;

      localStorage.setItem("accessToken", accessToken);
      if (newRefreshToken) {
        localStorage.setItem("refreshToken", newRefreshToken);
      }

      setSessionCookie();
      return true;
    } catch (error) {
      debugError("Refresh token failed:", error);
      await logout();
      return false;
    }
  };

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

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};
