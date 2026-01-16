"use client";

import { REGEXP_ONLY_DIGITS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { resetPassword, forgotPassword } from "../../../services/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// ✅ Validation schema
const resetPasswordSchema = z.object({
  otp: z.string().length(6, "Mã OTP phải có đúng 6 chữ số"),
  newPassword: z
    .string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .max(100, "Mật khẩu không được quá 100 ký tự"),
  confirmPassword: z.string().min(1, "Vui lòng xác nhận mật khẩu"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Mật khẩu xác nhận không khớp",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof resetPasswordSchema>;

type ResetPasswordFormProps = {
  email: string;
  onBack: () => void;
};

export default function ResetPasswordForm({
  email,
  onBack,
}: ResetPasswordFormProps) {
  const router = useRouter();
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const form = useForm<FormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      otp: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  });

  const { isSubmitting } = form.formState;
  const otpValue = form.watch("otp");

  // ✅ Auto-submit khi đủ 6 số và form valid
  useEffect(() => {
    if (otpValue.length === 6 && !isSubmitting) {
      const { newPassword, confirmPassword } = form.getValues();
      if (newPassword && confirmPassword && newPassword === confirmPassword) {
        form.handleSubmit(onSubmit)();
      }
    }
  }, [otpValue]);

  // ✅ Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const onSubmit = async (data: FormValues) => {
    try {
      await resetPassword({
        email,
        otp: data.otp,
        newPassword: data.newPassword,
      });

      toast.success("Đặt lại mật khẩu thành công! 🎉");
      
      setTimeout(() => {
        router.push("/auth/login");
      }, 500);
    } catch (error: any) {
      if (process.env.NODE_ENV === "development") {
        console.error(error);
      }

      const errorMessage =
        error?.response?.data?.message ||
        "Mã OTP không đúng hoặc đã hết hạn";
      toast.error(errorMessage);
      
      // ✅ Clear OTP để user nhập lại
      form.setValue("otp", "");
    }
  };

  // ✅ Resend OTP
  const handleResend = async () => {
    if (!email) {
      toast.error("Email không hợp lệ");
      return;
    }

    if (countdown > 0) {
      toast.error(`Vui lòng đợi ${countdown}s trước khi gửi lại`);
      return;
    }

    try {
      setIsResending(true);
      await forgotPassword(email);
      form.setValue("otp", "");
      setCountdown(60);
      toast.success("Mã OTP mới đã được gửi đến email của bạn");
    } catch (error: any) {
      if (process.env.NODE_ENV === "development") {
        console.error(error);
      }

      const errorMessage =
        error?.response?.data?.message ||
        "Không thể gửi lại mã OTP, vui lòng thử lại sau";
      toast.error(errorMessage);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-2">
          <h1 className="text-xl text-center lg:text-2xl font-bold">
            Đặt lại mật khẩu
          </h1>
          <p className="text-center text-sm text-muted-foreground">
            Mã OTP đã được gửi đến{" "}
            <span className="font-medium text-foreground">{email}</span>
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* OTP INPUT */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex justify-center text-muted-foreground">
              Mã OTP
            </label>

            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS}
                value={otpValue}
                onChange={(val) => form.setValue("otp", val, {
                  shouldValidate: true,
                  shouldDirty: true,
                })}
                disabled={isSubmitting}
              >
                <InputOTPGroup>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <InputOTPSlot
                      key={i}
                      index={i}
                      className="h-12 w-12 border text-base shadow-sm"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>

            {form.formState.errors.otp && (
              <p className="text-sm text-red-500 text-center">
                {form.formState.errors.otp.message}
              </p>
            )}
          </div>

          {/* Resend OTP */}
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Không nhận được mã?
            </p>
            <button
              type="button"
              onClick={handleResend}
              disabled={isResending || countdown > 0 || isSubmitting}
              className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium text-primary hover:underline disabled:opacity-50 disabled:cursor-not-allowed disabled:no-underline"
            >
              {isResending
                ? "Đang gửi..."
                : countdown > 0
                ? `Gửi lại mã (${countdown}s)`
                : "Gửi lại mã"}
            </button>
          </div>

          {/* NEW PASSWORD */}
          <div className="grid gap-2">
            <label className="text-sm font-medium">Mật khẩu mới</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type={showNew ? "text" : "password"}
                placeholder="Nhập mật khẩu mới (ít nhất 6 ký tự)"
                className="pl-10 pr-10 h-10"
                disabled={isSubmitting}
                {...form.register("newPassword")}
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                disabled={isSubmitting}
              >
                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {form.formState.errors.newPassword && (
              <p className="text-sm text-red-500">
                {form.formState.errors.newPassword.message}
              </p>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="grid gap-2">
            <label className="text-sm font-medium">Xác nhận mật khẩu</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type={showConfirm ? "text" : "password"}
                placeholder="Nhập lại mật khẩu mới"
                className="pl-10 pr-10 h-10"
                disabled={isSubmitting}
                {...form.register("confirmPassword")}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                disabled={isSubmitting}
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {form.formState.errors.confirmPassword && (
              <p className="text-sm text-red-500">
                {form.formState.errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4 pt-2">
            <button
              type="button"
              onClick={onBack}
              disabled={isSubmitting}
              className="flex-1 h-10 rounded-full border border-input bg-background shadow-sm hover:bg-primary hover:text-primary-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Quay lại
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 h-10 rounded-full bg-primary text-primary-foreground shadow hover:bg-primary/90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Đang xử lý..." : "Đặt lại mật khẩu"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}