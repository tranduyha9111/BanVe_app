"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  BarChart3, 
  TrendingUp, 
  Eye, 
  Download, 
  DollarSign,
  Search,
  Filter,
  FileText,
  User
} from "lucide-react";
import { toast } from "sonner";
import { getAllContentStats } from "@/app/services/contentstats";
import type { ContentStat } from "@/types";

export default function AdminContentStats() {
  const [stats, setStats] = useState<ContentStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    keyword: '',
    collaboratorId: '',
    sortBy: 'Newest',
    sortDir: 'Desc',
  });

  const fetchStats = async () => {
    try {
      setLoading(true);
      const params = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== '')
      );
      const data = await getAllContentStats(params);
      setStats(data?.items || []);
    } catch (error) {
      console.error("Failed to fetch content stats:", error);
      toast.error("Không thể tải thống kê nội dung");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [filters]);

  const totalRevenue = stats.reduce((sum, item) => sum + item.revenue, 0);
  const totalDownloads = stats.reduce((sum, item) => sum + item.downloads, 0);
  const totalViews = stats.reduce((sum, item) => sum + item.views, 0);
  const avgPrice = stats.length > 0 ? stats.reduce((sum, item) => sum + item.price, 0) / stats.length : 0;

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <BarChart3 className="h-8 w-8" />
          <h1 className="text-3xl font-bold">Thống kê Nội dung</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-100 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <BarChart3 className="h-8 w-8" />
        <h1 className="text-3xl font-bold">Thống kê Nội dung</h1>
        <Badge variant="secondary">{stats.length} nội dung</Badge>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng Doanh thu</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {totalRevenue.toLocaleString('vi-VN')} ₫
            </div>
            <p className="text-xs text-muted-foreground">
              Từ tất cả nội dung
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng Lượt tải</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {totalDownloads.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Tổng số lượt tải
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng Lượt xem</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {totalViews.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Tổng số lượt xem
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Giá trung bình</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {avgPrice.toLocaleString('vi-VN')} ₫
            </div>
            <p className="text-xs text-muted-foreground">
              Giá trung bình/nội dung
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Bộ lọc
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Tìm kiếm nội dung..."
                value={filters.keyword}
                onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
                className="pl-10"
              />
            </div>
            
            <Input
              placeholder="ID Collaborator..."
              value={filters.collaboratorId}
              onChange={(e) => setFilters({ ...filters, collaboratorId: e.target.value })}
            />

            <Select value={filters.sortBy} onValueChange={(value) => setFilters({ ...filters, sortBy: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Sắp xếp" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Newest">Mới nhất</SelectItem>
                <SelectItem value="Price">Giá</SelectItem>
                <SelectItem value="Title">Tiêu đề</SelectItem>
                <SelectItem value="Sold">Đã bán</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.sortDir} onValueChange={(value) => setFilters({ ...filters, sortDir: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Thứ tự" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Desc">Giảm dần</SelectItem>
                <SelectItem value="Asc">Tăng dần</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Stats Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Thống kê chi tiết
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nội dung</TableHead>
                <TableHead>Tác giả</TableHead>
                <TableHead>Giá</TableHead>
                <TableHead>Lượt xem</TableHead>
                <TableHead>Lượt tải</TableHead>
                <TableHead>Doanh thu</TableHead>
                <TableHead>Tỷ lệ chuyển đổi</TableHead>
                <TableHead>Ngày tạo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stats.map((stat) => {
                const conversionRate = stat.views > 0 ? ((stat.downloads / stat.views) * 100).toFixed(1) : '0';
                return (
                  <TableRow key={stat.id}>
                    <TableCell>
                      <div className="font-medium max-w-xs truncate">{stat.title}</div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {stat.collaborator?.username ?? "—"}
                        </div>
                        <div className="text-sm text-gray-500">
                          {stat.collaborator?.email ?? ""}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {stat.price > 0 
                        ? `${stat.price.toLocaleString('vi-VN')} ₫`
                        : "Miễn phí"
                      }
                    </TableCell>
                    <TableCell>{stat.views.toLocaleString()}</TableCell>
                    <TableCell>{stat.downloads.toLocaleString()}</TableCell>
                    <TableCell className="font-semibold text-green-600">
                      {stat.revenue.toLocaleString('vi-VN')} ₫
                    </TableCell>
                    <TableCell>
                      <Badge variant={parseFloat(conversionRate) > 5 ? "default" : "secondary"}>
                        {conversionRate}%
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(stat.createdAt).toLocaleDateString('vi-VN')}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          {stats.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Không tìm thấy thống kê nào.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
