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
  Download, 
  Search, 
  Filter,
  Calendar,
  FileText,
  Image,
  Video,
  Music,
  Archive,
  HardDrive,
  Eye
} from "lucide-react";
import { toast } from "sonner";

interface DownloadHistoryItem {
  id: string;
  contentId: string;
  contentTitle: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  downloadedAt: string;
  downloadCount: number;
}

export default function DownloadHistory() {
  const [downloads, setDownloads] = useState<DownloadHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    keyword: '',
    fileType: '',
    sortBy: 'Newest',
    sortDir: 'Desc',
  });

  // Mock data for now - would come from API
  useEffect(() => {
    const mockDownloads: DownloadHistoryItem[] = [
      {
        id: "1",
        contentId: "content-1",
        contentTitle: "Nội dung thiết kế 3D",
        fileName: "design_3d_model.fbx",
        fileType: "application/octet-stream",
        fileSize: 15728640,
        downloadedAt: "2026-01-15T10:30:00Z",
        downloadCount: 3,
      },
      {
        id: "2",
        contentId: "content-2",
        contentTitle: "Bộ icon vector",
        fileName: "icons_vector_set.ai",
        fileType: "application/illustrator",
        fileSize: 5242880,
        downloadedAt: "2026-01-14T15:45:00Z",
        downloadCount: 1,
      },
      {
        id: "3",
        contentId: "content-3",
        contentTitle: "Video hướng dẫn",
        fileName: "tutorial_video.mp4",
        fileType: "video/mp4",
        fileSize: 104857600,
        downloadedAt: "2026-01-13T09:20:00Z",
        downloadCount: 5,
      },
    ];

    setTimeout(() => {
      setDownloads(mockDownloads);
      setLoading(false);
    }, 1000);
  }, []);

  const getFileIcon = (type: string) => {
    const typeLower = type.toLowerCase();
    if (typeLower.includes('image') || typeLower.includes('jpg') || typeLower.includes('png') || typeLower.includes('gif')) {
      return <Image className="h-4 w-4 text-green-500" />;
    }
    if (typeLower.includes('video') || typeLower.includes('mp4') || typeLower.includes('avi')) {
      return <Video className="h-4 w-4 text-purple-500" />;
    }
    if (typeLower.includes('audio') || typeLower.includes('mp3') || typeLower.includes('wav')) {
      return <Music className="h-4 w-4 text-blue-500" />;
    }
    if (typeLower.includes('zip') || typeLower.includes('rar') || typeLower.includes('7z')) {
      return <Archive className="h-4 w-4 text-orange-500" />;
    }
    return <FileText className="h-4 w-4 text-gray-500" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Download className="h-8 w-8" />
              <h1 className="text-3xl font-bold">Lịch sử Tải xuống</h1>
            </div>
            <div className="grid gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-100 rounded-lg animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3">
            <Download className="h-8 w-8" />
            <h1 className="text-3xl font-bold">Lịch sử Tải xuống</h1>
            <Badge variant="secondary">{downloads.length} file</Badge>
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
                    placeholder="Tìm kiếm file..."
                    value={filters.keyword}
                    onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
                    className="pl-10"
                  />
                </div>
                
                <Select value={filters.fileType} onValueChange={(value) => setFilters({ ...filters, fileType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Loại file" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Tất cả</SelectItem>
                    <SelectItem value="image">Hình ảnh</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="audio">Audio</SelectItem>
                    <SelectItem value="document">Tài liệu</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filters.sortBy} onValueChange={(value) => setFilters({ ...filters, sortBy: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sắp xếp" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Newest">Mới nhất</SelectItem>
                    <SelectItem value="Oldest">Cũ nhất</SelectItem>
                    <SelectItem value="Name">Tên file</SelectItem>
                    <SelectItem value="Size">Kích thước</SelectItem>
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

          {/* Downloads Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Danh sách File đã tải
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>File</TableHead>
                    <TableHead>Nội dung</TableHead>
                    <TableHead>Kích thước</TableHead>
                    <TableHead>Loại</TableHead>
                    <TableHead>Lượt tải</TableHead>
                    <TableHead>Ngày tải</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {downloads.map((download) => (
                    <TableRow key={download.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {getFileIcon(download.fileType)}
                          <div>
                            <div className="font-medium">{download.fileName}</div>
                            <div className="text-sm text-gray-500">{download.fileType}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{download.contentTitle}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <HardDrive className="h-4 w-4 text-gray-400" />
                          {formatFileSize(download.fileSize)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {download.fileType.split('/')[1]?.toUpperCase() || 'FILE'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4 text-gray-400" />
                          {download.downloadCount}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          {formatDateTime(download.downloadedAt)}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {downloads.length === 0 && (
                <div className="text-center py-16">
                  <Download className="h-24 w-24 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Chưa có lịch sử tải xuống</h3>
                  <p className="text-gray-500">Bạn chưa tải xuống file nào</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
