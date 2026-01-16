"use client";

import AuthCarousel from "@/app/auth/AuthCarousel";
import OtpForm from "@/app/auth/register/components/OtpForm";
import RegisterForm from "@/app/auth/register/components/RegisterForm";
import { useState } from "react";

export default function Register() {
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState<string>("");

  return (
    <div className="min-h-screen flex font-sans">
      <AuthCarousel />

      {step === 1 && (
        <RegisterForm
          onNext={(registeredEmail: string) => {
            setEmail(registeredEmail);
            setStep(2);
          }}
        />
      )}

      {/* ✅ Check email trước khi render */}
      {step === 2 && email && (
        <OtpForm
          email={email}
          onBack={() => setStep(1)}
        />
      )}
    </div>
  );
}