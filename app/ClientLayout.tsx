"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/app/Navbar";
import Footer from "@/app/Footer";
import { Toaster } from "sonner";
import { AuthProvider } from "@/app/context/AuthContext";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith("/auth");

  return (
    // <AuthProvider>
      <div className="min-h-screen bg-background">
        {!isAuthPage && <Navbar />}
        {children}
        {!isAuthPage && <Footer />}
        <Toaster position="top-center" richColors duration={3000} />
      </div>
    // </AuthProvider>
  );
}