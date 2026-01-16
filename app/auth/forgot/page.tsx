"use client";

import { useState } from "react";
import AuthCarousel from "@/app/auth/AuthCarousel";
import ForgotForm from "@/app/auth/forgot/components/ForgotForm";
import ResetPasswordForm from "@/app/auth/forgot/components/ResetPassword";

export default function ForgotPage() {
  const [step, setStep] = useState<"forgot" | "reset">("forgot");
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen flex font-sans">
      <AuthCarousel />

      {step === "forgot" && (
        <ForgotForm
          onSuccess={(email) => {
            setEmail(email);
            setStep("reset");
          }}
        />
      )}

      {/* ✅ Check email trước khi render */}
      {step === "reset" && email && (
        <ResetPasswordForm
          email={email}
          onBack={() => setStep("forgot")}
        />
      )}
    </div>
  );
}