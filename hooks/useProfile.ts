"use client";

import { useEffect, useState } from "react";
import { getProfile } from "@/app/services/auth";
import { useAuth } from "@/app/context/AuthContext";
import { toast } from "sonner";
import { getAxiosErrorMessage } from "@/lib/errors";
import type { Profile } from "@/types";

export type { Profile };

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, updateUser } = useAuth();

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await getProfile();
        setProfile(data);

        if (
          data.username !== user.username ||
          data.email !== user.email ||
          data.role !== user.role
        ) {
          updateUser({
            id: data.id,
            email: data.email,
            username: data.username,
            role: data.role,
            collaboratorStatus: data.collaboratorStatus,
          });
        }
      } catch (err: unknown) {
        const errorMessage = getAxiosErrorMessage(
          err,
          "Không thể tải thông tin người dùng"
        );
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
    } catch (err: unknown) {
      toast.error(getAxiosErrorMessage(err, "Không thể tải lại thông tin"));
    } finally {
      setLoading(false);
    }
  };

  return { profile, loading, error, refetch };
}
