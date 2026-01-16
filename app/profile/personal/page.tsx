import Profile from "@/app/profile/personal/components/Profile";
import ProtectedRoute from "../../components/ProtectedRoute";

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Profile />
      </div>
    </ProtectedRoute>
  );
}