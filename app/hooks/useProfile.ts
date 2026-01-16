"use client";

import { useEffect, useState } from "react";
import { getProfile } from "@/app/services/auth";
import { useAuth } from "@/app/context/AuthContext";
import { toast } from "sonner";

export type Profile = {
  id: string;
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
};

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, updateUser } = useAuth();

  useEffect(() => {
    // ✅ Nếu chưa đăng nhập thì không fetch
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await getProfile();
        setProfile(data);

        // ✅ Sync với AuthContext nếu có thay đổi
        if (
          data.username !== user.username ||
          data.email !== user.email
        ) {
          updateUser({
            id: data.id,
            email: data.email,
            username: data.username,
          });
        }
      } catch (err: any) {
        if (process.env.NODE_ENV === "development") {
          console.error("Fetch profile error:", err);
        }

        const errorMessage =
          err?.response?.data?.message || "Không thể tải thông tin người dùng";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const refetch = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const data = await getProfile();
      setProfile(data);
    } catch (err: any) {
      if (process.env.NODE_ENV === "development") {
        console.error("Refetch profile error:", err);
      }
      toast.error("Không thể tải lại thông tin");
    } finally {
      setLoading(false);
    }
  };

  return { profile, loading, error, refetch };
}