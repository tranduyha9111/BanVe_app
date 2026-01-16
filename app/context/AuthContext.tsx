"use client";

import { createContext, useContext, useEffect, useState } from "react";
import * as authApi from "@/app/services/auth";

export type User = {
  id: string;
  email: string;
  username: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  /* ===== INIT AUTH ===== */
  useEffect(() => {
    const initAuth = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const storedUser = localStorage.getItem("user");

        if (!accessToken || !storedUser) return;

        setUser(JSON.parse(storedUser));

        // verify token ngầm
        await authApi.getProfile();
      } catch {
        localStorage.clear();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  /* ===== LOGIN ===== */
  const login = async (email: string, password: string) => {
    const res = await authApi.login({ email, password });

    localStorage.setItem("accessToken", res.accessToken);
    localStorage.setItem("refreshToken", res.refreshToken);
    localStorage.setItem("user", JSON.stringify(res.user));

    setUser(res.user);
  };

  /* ===== LOGOUT ===== */
  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  if (loading) return null;

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

/* ===== HOOK ===== */
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};
