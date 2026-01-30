import { Suspense } from "react";
import AuthCarousel from "../AuthCarousel";
import LoginForm from "../login/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex font-sans">
      <AuthCarousel />
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
