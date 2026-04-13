"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  FileText, 
  Image, 
  Video, 
  Music, 
  Archive,
  Eye,
  Calendar,
  HardDrive
} from "lucide-react";
import { toast } from "sonner";
import { getDownloadFiles, downloadFile } from "@/app/services/downloads";

interface DownloadFile {
  id: string;
  name: string;
  type: string;
  size: number;
  downloadCount: number;
  createdAt: string;
}

interface DownloadFilesDialogProps {
  contentId: string;
  contentTitle: string;
  children: React.ReactNode;
}

export default function DownloadFilesDialog({ 
  contentId, 
  contentTitle, 
  children 
}: DownloadFilesDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [files, setFiles] = useState<DownloadFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState<Set<string>>(new Set());

  const fetchFiles = async () => {
    if (!contentId) return;
    
    setLoading(true);
    try {
      const data = await getDownloadFiles(contentId);
      setFiles(data?.items || []);
    } catch (error) {
      console.error("Failed to fetch download files:", error);
      toast.error("Không thể tải danh sách file");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchFiles();
    }
  }, [isOpen, contentId]);

  const handleDownload = async (file: DownloadFile) => {
    setDownloading((prev) => new Set(prev).add(file.id));
    
    try {
      const downloadUrl = downloadFile(contentId, file.id);
      
      // Create temporary link and trigger download
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = file.name;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success(`Đang tải ${file.name}`);
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Không thể tải file");
    } finally {
      setDownloading((prev) => {
        const newSet = new Set(prev);
        newSet.delete(file.id);
        return newSet;
      });
    }
  };

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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Tải xuống: {contentTitle}
          </DialogTitle>
          <DialogDescription>
            Chọn file bạn muốn tải xuống
          </DialogDescription>
        </DialogHeader>
        
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse"></div>
            ))}
          </div>
        ) : files.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Không có file nào</h3>
            <p className="text-gray-500">Nội dung này chưa có file để tải xuống</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>File</TableHead>
                <TableHead>Kích thước</TableHead>
                <TableHead>Loại</TableHead>
                <TableHead>Lượt tải</TableHead>
                <TableHead>Ngày tạo</TableHead>
                <TableHead>Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {files.map((file) => (
                <TableRow key={file.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {getFileIcon(file.type)}
                      <div>
                        <div className="font-medium">{file.name}</div>
                        <div className="text-sm text-gray-500">{file.type}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <HardDrive className="h-4 w-4 text-gray-400" />
                      {formatFileSize(file.size)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {file.type.split('/')[1]?.toUpperCase() || 'FILE'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4 text-gray-400" />
                      {file.downloadCount}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      {formatDate(file.createdAt)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      onClick={() => handleDownload(file)}
                      disabled={downloading.has(file.id)}
                    >
                      {downloading.has(file.id) ? (
                        "Đang tải..."
                      ) : (
                        <>
                          <Download className="h-4 w-4 mr-2" />
                          Tải xuống
                        </>
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </DialogContent>
    </Dialog>
  );
}
