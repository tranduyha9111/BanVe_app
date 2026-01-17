"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      const returnUrl = encodeURIComponent(pathname);
      router.replace(`/auth/login?returnUrl=${returnUrl}`);
    }
  }, [loading, user, pathname, router]);

  // ✅ Loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gray-200 animate-pulse">
          <div className="container mx-auto px-4 py-12">
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-4 w-96" />
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <Skeleton className="h-96" />
            <div className="lg:col-span-3 space-y-6">
              <Skeleton className="h-64" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Chưa login thì return null (đang redirect)
  if (!user) {
    return null;
  }

  // ✅ Đã login thì render children
  return <>{children}</>;
}
