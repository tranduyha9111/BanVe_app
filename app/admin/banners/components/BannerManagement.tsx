"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Edit, Trash2, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import {
  getAllBanners,
  createBanner,
  updateBanner,
  deleteBanner,
  getBannerDetail,
} from "@/app/services/banners";

interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  image?: string;
  button1Text?: string;
  button1Link?: string;
  button2Text?: string;
  button2Link?: string;
  isActive: boolean;
  displayOrder?: number;
  createdAt?: string;
  updatedAt?: string;
}

export default function BannerManagement() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    button1Text: "",
    button1Link: "",
    button2Text: "",
    button2Link: "",
    isActive: true,
    displayOrder: 0,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  // Fetch banners
  const fetchBanners = async () => {
    try {
      setLoading(true);
      const data = await getAllBanners();
      setBanners(data || []);
    } catch (error) {
      console.error("Failed to fetch banners:", error);
      toast.error("Không thể tải danh sách banner");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  // Reset form
  const resetForm = () => {
    setFormData({
      title: "",
      subtitle: "",
      button1Text: "",
      button1Link: "",
      button2Text: "",
      button2Link: "",
      isActive: true,
      displayOrder: 0,
    });
    setImageFile(null);
    setImagePreview("");
  };

  // Handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Create banner
  const handleCreateBanner = async () => {
    if (!formData.title) {
      toast.error("Vui lòng nhập tiêu đề");
      return;
    }

    if (!imageFile) {
      toast.error("Vui lòng chọn ảnh banner");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("Title", formData.title);
      formDataToSend.append("Subtitle", formData.subtitle);
      formDataToSend.append("ImageFile", imageFile);
      formDataToSend.append("Button1Text", formData.button1Text);
      formDataToSend.append("Button1Link", formData.button1Link);
      formDataToSend.append("Button2Text", formData.button2Text);
      formDataToSend.append("Button2Link", formData.button2Link);
      formDataToSend.append("IsActive", formData.isActive.toString());
      formDataToSend.append("DisplayOrder", formData.displayOrder.toString());

      await createBanner(formDataToSend);
      toast.success("Tạo banner thành công!");
      setIsCreateDialogOpen(false);
      resetForm();
      fetchBanners();
    } catch (error) {
      console.error("Failed to create banner:", error);
      toast.error("Không thể tạo banner");
    }
  };

  // Edit banner
  const handleEditBanner = async () => {
    if (!editingBanner || !formData.title) {
      toast.error("Vui lòng nhập tiêu đề");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("Title", formData.title);
      formDataToSend.append("Subtitle", formData.subtitle);
      if (imageFile) {
        formDataToSend.append("ImageFile", imageFile);
      }
      formDataToSend.append("Button1Text", formData.button1Text);
      formDataToSend.append("Button1Link", formData.button1Link);
      formDataToSend.append("Button2Text", formData.button2Text);
      formDataToSend.append("Button2Link", formData.button2Link);
      formDataToSend.append("IsActive", formData.isActive.toString());
      formDataToSend.append("DisplayOrder", formData.displayOrder.toString());

      await updateBanner(editingBanner.id, formDataToSend);
      toast.success("Cập nhật banner thành công!");
      setIsEditDialogOpen(false);
      setEditingBanner(null);
      resetForm();
      fetchBanners();
    } catch (error) {
      console.error("Failed to update banner:", error);
      toast.error("Không thể cập nhật banner");
    }
  };

  // Delete banner
  const handleDeleteBanner = async (id: string) => {
    try {
      await deleteBanner(id);
      toast.success("Xóa banner thành công!");
      fetchBanners();
    } catch (error) {
      console.error("Failed to delete banner:", error);
      toast.error("Không thể xóa banner");
    }
  };

  // Open edit dialog
  const openEditDialog = async (banner: Banner) => {
    try {
      const bannerDetail = await getBannerDetail(banner.id);
      setEditingBanner(bannerDetail);
      setFormData({
        title: bannerDetail.title || "",
        subtitle: bannerDetail.subtitle || "",
        button1Text: bannerDetail.button1Text || "",
        button1Link: bannerDetail.button1Link || "",
        button2Text: bannerDetail.button2Text || "",
        button2Link: bannerDetail.button2Link || "",
        isActive: bannerDetail.isActive,
        displayOrder: bannerDetail.displayOrder || 0,
      });
      setImagePreview(bannerDetail.image || "");
      setIsEditDialogOpen(true);
    } catch (error) {
      console.error("Failed to fetch banner detail:", error);
      toast.error("Không thể tải thông tin banner");
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Quản lý Banner</h1>
        </div>
        <div className="grid gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-100 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Quản lý Banner</h1>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Thêm Banner
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Thêm Banner Mới</DialogTitle>
              <DialogDescription>
                Tạo banner mới cho trang chủ
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Tiêu đề *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Nhập tiêu đề banner"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="displayOrder">Thứ tự hiển thị</Label>
                  <Input
                    id="displayOrder"
                    type="number"
                    value={formData.displayOrder}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        displayOrder: parseInt(e.target.value) || 0,
                      })
                    }
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subtitle">Tiêu đề phụ</Label>
                <Input
                  id="subtitle"
                  value={formData.subtitle}
                  onChange={(e) =>
                    setFormData({ ...formData, subtitle: e.target.value })
                  }
                  placeholder="Nhập tiêu đề phụ"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Ảnh Banner *</Label>
                <div className="flex items-center space-x-4">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="flex-1"
                  />
                  {imagePreview && (
                    <div className="w-16 h-16 relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="button1Text">Text Button 1</Label>
                  <Input
                    id="button1Text"
                    value={formData.button1Text}
                    onChange={(e) =>
                      setFormData({ ...formData, button1Text: e.target.value })
                    }
                    placeholder="Khám phá ngay"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="button1Link">Link Button 1</Label>
                  <Input
                    id="button1Link"
                    value={formData.button1Link}
                    onChange={(e) =>
                      setFormData({ ...formData, button1Link: e.target.value })
                    }
                    placeholder="/collections"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="button2Text">Text Button 2</Label>
                  <Input
                    id="button2Text"
                    value={formData.button2Text}
                    onChange={(e) =>
                      setFormData({ ...formData, button2Text: e.target.value })
                    }
                    placeholder="Xem thêm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="button2Link">Link Button 2</Label>
                  <Input
                    id="button2Link"
                    value={formData.button2Link}
                    onChange={(e) =>
                      setFormData({ ...formData, button2Link: e.target.value })
                    }
                    placeholder="/about"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked: boolean) =>
                    setFormData({ ...formData, isActive: checked })
                  }
                />
                <Label htmlFor="isActive">Hiển thị banner</Label>
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  Hủy
                </Button>
                <Button onClick={handleCreateBanner}>Tạo Banner</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách Banner</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ảnh</TableHead>
                <TableHead>Tiêu đề</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thứ tự</TableHead>
                <TableHead>Ngày tạo</TableHead>
                <TableHead>Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {banners.map((banner) => (
                <TableRow key={banner.id}>
                  <TableCell>
                    {banner.image ? (
                      <img
                        src={banner.image}
                        alt={banner.title}
                        className="w-16 h-10 object-cover rounded"
                      />
                    ) : (
                      <div className="w-16 h-10 bg-gray-100 rounded flex items-center justify-center">
                        <ImageIcon className="h-4 w-4 text-gray-400" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{banner.title}</div>
                      {banner.subtitle && (
                        <div className="text-sm text-gray-500">
                          {banner.subtitle}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={banner.isActive ? "default" : "secondary"}>
                      {banner.isActive ? "Hiển thị" : "Ẩn"}
                    </Badge>
                  </TableCell>
                  <TableCell>{banner.displayOrder || 0}</TableCell>
                  <TableCell>
                    {banner.createdAt
                      ? new Date(banner.createdAt).toLocaleDateString("vi-VN")
                      : "-"}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(banner)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
                            <AlertDialogDescription>
                              Bạn có chắc chắn muốn xóa banner "{banner.title}"? Hành
                              động này không thể hoàn tác.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Hủy</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteBanner(banner.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Xóa
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {banners.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Chưa có banner nào. Hãy tạo banner mới!
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa Banner</DialogTitle>
            <DialogDescription>
              Cập nhật thông tin banner
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Tiêu đề *</Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Nhập tiêu đề banner"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-displayOrder">Thứ tự hiển thị</Label>
                <Input
                  id="edit-displayOrder"
                  type="number"
                  value={formData.displayOrder}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      displayOrder: parseInt(e.target.value) || 0,
                    })
                  }
                  placeholder="0"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-subtitle">Tiêu đề phụ</Label>
              <Input
                id="edit-subtitle"
                value={formData.subtitle}
                onChange={(e) =>
                  setFormData({ ...formData, subtitle: e.target.value })
                }
                placeholder="Nhập tiêu đề phụ"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-image">Ảnh Banner</Label>
              <div className="flex items-center space-x-4">
                <Input
                  id="edit-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="flex-1"
                />
                {imagePreview && (
                  <div className="w-16 h-16 relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-button1Text">Text Button 1</Label>
                <Input
                  id="edit-button1Text"
                  value={formData.button1Text}
                  onChange={(e) =>
                    setFormData({ ...formData, button1Text: e.target.value })
                  }
                  placeholder="Khám phá ngay"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-button1Link">Link Button 1</Label>
                <Input
                  id="edit-button1Link"
                  value={formData.button1Link}
                  onChange={(e) =>
                    setFormData({ ...formData, button1Link: e.target.value })
                  }
                  placeholder="/collections"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-button2Text">Text Button 2</Label>
                <Input
                  id="edit-button2Text"
                  value={formData.button2Text}
                  onChange={(e) =>
                    setFormData({ ...formData, button2Text: e.target.value })
                  }
                  placeholder="Xem thêm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-button2Link">Link Button 2</Label>
                <Input
                  id="edit-button2Link"
                  value={formData.button2Link}
                  onChange={(e) =>
                    setFormData({ ...formData, button2Link: e.target.value })
                  }
                  placeholder="/about"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="edit-isActive"
                checked={formData.isActive}
                onCheckedChange={(checked: boolean) =>
                  setFormData({ ...formData, isActive: checked })
                }
              />
              <Label htmlFor="edit-isActive">Hiển thị banner</Label>
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditDialogOpen(false);
                  setEditingBanner(null);
                  resetForm();
                }}
              >
                Hủy
              </Button>
              <Button onClick={handleEditBanner}>Cập nhật Banner</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
