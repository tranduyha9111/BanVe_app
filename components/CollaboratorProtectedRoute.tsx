"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface CollaboratorProtectedRouteProps {
  children: React.ReactNode;
}

export default function CollaboratorProtectedRoute({ children }: CollaboratorProtectedRouteProps) {
  const { user, loading, isCollaborator } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/auth/login");
        return;
      }
      
      if (!isCollaborator()) {
        router.push("/profile/personal");
        return;
      }
    }
  }, [user, loading, isCollaborator, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user || !isCollaborator()) {
    return null;
  }

  return <>{children}</>;
}
