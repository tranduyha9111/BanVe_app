"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Shield, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { createCopyrightReport } from "@/app/services/copyrightreports";

interface CopyrightReportButtonProps {
  contentId: string;
  contentTitle: string;
}

export default function CopyrightReportButton({ contentId, contentTitle }: CopyrightReportButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reason.trim()) {
      toast.error("Vui lòng nhập lý do báo cáo");
      return;
    }

    setIsSubmitting(true);
    try {
      await createCopyrightReport({
        contentId,
        reason: reason.trim(),
      });
      
      toast.success("Đã gửi báo cáo bản quyền. Chúng tôi sẽ xem xét và xử lý sớm.");
      setReason("");
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to submit copyright report:", error);
      toast.error("Không thể gửi báo cáo. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Shield className="h-4 w-4 mr-2" />
          Báo cáo bản quyền
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Báo cáo vi phạm bản quyền
          </DialogTitle>
          <DialogDescription>
            Báo cáo nội dung: <strong>{contentTitle}</strong>
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reason">Lý do báo cáo *</Label>
            <Textarea
              id="reason"
              placeholder="Vui lòng mô tả chi tiết lý do bạn cho rằng nội dung này vi phạm bản quyền..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
              required
            />
            <p className="text-xs text-gray-500">
              Vui lòng cung cấp thông tin chi tiết để chúng tôi có thể xử lý báo cáo của bạn một cách hiệu quả.
            </p>
          </div>
          
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
            <p className="text-sm text-orange-800">
              <strong>Lưu ý:</strong> Các báo cáo sai phạm sẽ bị xem xét kỹ lưỡng. 
              Báo cáo sai mục đích có thể dẫn đến hạn chế tài khoản của bạn.
            </p>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isSubmitting}
            >
              Hủy
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !reason.trim()}
            >
              {isSubmitting ? "Đang gửi..." : "Gửi báo cáo"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
