import AuthCarousel from "@/app/auth/AuthCarousel";
import ResetPassword from "@/app/auth/forgot/components/ResetPassword";
import ForgotForm from "@/app/auth/forgot/components/ForgotForm";
import next from "next";

export default function forgot() {
  return (
    <div className="min-h-screen flex font-sans">
      <AuthCarousel />
      <ForgotForm />
      {/* <ResetPassword /> */}
    </div>
  );
}
