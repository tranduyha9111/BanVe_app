"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AdminProtectedRoute from "@/components/AdminProtectedRoute";
import { getDashboardStats } from "@/app/services/admin";
import { Users, FileText, UserCheck, MessageSquare, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { getAxiosErrorMessage } from "@/lib/errors";
import type { DashboardStats } from "@/types";

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setErrorMessage(null);
      const data = await getDashboardStats({ period: "30days" });
      setStats(data);
    } catch (error) {
      setErrorMessage(getAxiosErrorMessage(error, "Không thể tải thống kê"));
      toast.error(getAxiosErrorMessage(error, "Không thể tải thống kê"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Tổng Người Dùng",
      value: stats?.totalUsers || 0,
      growth: stats?.userGrowth || 0,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Tổng Nội Dung",
      value: stats?.totalContents || 0,
      growth: stats?.contentGrowth || 0,
      icon: FileText,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Tổng Cộng Tác Viên",
      value: stats?.totalCollaborators || 0,
      growth: stats?.collaboratorGrowth || 0,
      icon: UserCheck,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Tổng Bình Luận",
      value: stats?.totalReviews || 0,
      growth: stats?.reviewGrowth || 0,
      icon: MessageSquare,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  if (loading) {
    return (
      <AdminProtectedRoute>
        <div>
          <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow">
                <div className="h-4 bg-gray-200 rounded w-24 mb-2 animate-pulse" />
                <div className="h-8 bg-gray-200 rounded w-16 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </AdminProtectedRoute>
    );
  }

  return (
    <AdminProtectedRoute>
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <Button variant="outline" size="sm" onClick={fetchStats}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Tải lại
          </Button>
        </div>

        {errorMessage && !stats && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div key={index} className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-700">
                    {card.title}
                  </h3>
                  <div className={`${card.bgColor} p-2 rounded-lg`}>
                    <Icon className={`h-5 w-5 ${card.color}`} />
                  </div>
                </div>
                <p className={`text-3xl font-bold ${card.color}`}>
                  {card.value.toLocaleString()}
                </p>
                {card.growth !== 0 && (
                  <div className="mt-2">
                    <Badge
                      variant={card.growth > 0 ? "default" : "destructive"}
                      className="text-xs"
                    >
                      {card.growth > 0 ? "+" : ""}
                      {card.growth}% 30 ngày
                    </Badge>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </AdminProtectedRoute>
  );
}
