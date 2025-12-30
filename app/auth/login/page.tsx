import AuthCarousel from "../AuthCarousel";
import LoginForm from "../login/components/LoginForm";
export default function LoginPage() {
  return (
    <div className="min-h-screen flex font-sans">
      <AuthCarousel />
      <LoginForm />
    </div>
  );
}
