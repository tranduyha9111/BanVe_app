"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/app/Navbar";
import Footer from "@/app/Footer";
import { Toaster } from "sonner";
import { AuthProvider } from "@/app/context/AuthContext";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith("/auth");

  useEffect(() => {
    setMounted(true);
  }, []);

  // Show minimal loading state to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-background">
        <div className="h-16 bg-white/80"></div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        {!isAuthPage && <Navbar />}
        <main>{children}</main>
        {!isAuthPage && <Footer />}
        <Toaster position="top-center" richColors duration={3000} />
      </div>
    </AuthProvider>
  );
}
