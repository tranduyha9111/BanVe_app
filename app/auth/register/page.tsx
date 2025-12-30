"use client";

import AuthCarousel from "@/app/auth/AuthCarousel";
import OtpForm from "@/app/auth/register/components/OtpForm";
import RegisterForm from "@/app/auth/register/components/RegisterForm";
import next from "next";
import { useState } from "react";

export default function register() {
  const [step, setStep] = useState<1 | 2>(1);
  return (
    <div className="min-h-screen flex font-sans">
      <AuthCarousel />
      {step === 1 && <RegisterForm onNext={() => setStep(2)} />}
      {step === 2 && <OtpForm onBack={() => setStep(1)} />}
    </div>
  );
}
