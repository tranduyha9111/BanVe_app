"use client";

import { createContext, useContext, useEffect, useState } from "react";
import * as authApi from "@/app/services/auth";
import { toast } from "sonner";

type User = {
  id: string;
  email: string;
  username?: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: User) => void;
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
        if (!token) return;

        // ✅ LẤY USER TỪ PROFILE
        const profile = await authApi.getProfile();

        setUser(profile);
        localStorage.setItem("user", JSON.stringify(profile));
      } catch {
        localStorage.clear();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // ================= LOGIN =================
  const login = async (email: string, password: string) => {
    const res = await authApi.login({ email, password });

    const { accessToken, refreshToken } = res.data;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    // ✅ GỌI PROFILE NGAY SAU LOGIN
    const profile = await authApi.getProfile();

    setUser(profile);
    localStorage.setItem("user", JSON.stringify(profile));
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

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateUser }}>
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
