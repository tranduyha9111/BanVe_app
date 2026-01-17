"use client";

import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Check, Shield } from "lucide-react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { verifyOtp, resendOtp } from "../../../services/auth";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";

interface OtpFormProps {
  email: string;
  onBack: () => void;
}

type OtpFormValues = {
  otp: string;
};

export default function OtpForm({ email, onBack }: OtpFormProps) {
  const router = useRouter();
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const submittedRef = useRef(false);

  const COUNTDOWN_KEY = `otp_countdown_${email}`;

  const form = useForm<OtpFormValues>({
    defaultValues: { otp: "" },
  });

  const { isSubmitting } = form.formState;
  const otpValue = form.watch("otp");

  /* ===== RESET WHEN EMAIL CHANGE ===== */
  useEffect(() => {
    submittedRef.current = false;
    form.reset({ otp: "" });
  }, [email, form]);

  /* ===== AUTO SUBMIT ===== */
  useEffect(() => {
    if (otpValue.length === 6 && !submittedRef.current && !isSubmitting) {
      submittedRef.current = true;
      form.handleSubmit(onSubmit)();
    }
  }, [otpValue, isSubmitting]);

  /* ===== LOAD COUNTDOWN ===== */
  useEffect(() => {
    const saved = localStorage.getItem(COUNTDOWN_KEY);
    if (saved) setCountdown(Number(saved));
  }, [COUNTDOWN_KEY]);

  /* ===== COUNTDOWN ===== */
  useEffect(() => {
    if (countdown > 0) {
      localStorage.setItem(COUNTDOWN_KEY, countdown.toString());
      const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      localStorage.removeItem(COUNTDOWN_KEY);
    }
  }, [countdown, COUNTDOWN_KEY]);

  /* ===== SUBMIT OTP ===== */
  const onSubmit = async (data: OtpFormValues) => {
    if (data.otp.length !== 6) return;

    try {
      await verifyOtp({ email, otp: data.otp });
      toast.success("Xác thực thành công! 🎉");

      setTimeout(() => router.push("/auth/login"), 500);
    } catch (error: any) {
      submittedRef.current = false;
      form.setValue("otp", "");
      toast.error(
        error?.response?.data?.message || "Mã OTP không đúng hoặc đã hết hạn"
      );
    }
  };

  /* ===== RESEND ===== */
  const handleResend = async () => {
    if (countdown > 0) return;

    try {
      setIsResending(true);
      await resendOtp(email);
      submittedRef.current = false;
      form.setValue("otp", "");
      setCountdown(60);
      toast.success("Mã OTP mới đã được gửi");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Không thể gửi lại mã OTP");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-xl text-center lg:text-2xl font-bold">Đăng ký</h1>

        {/* STEP */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white">
              <Check className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium">Thông tin cá nhân</p>
              <p className="text-xs text-muted-foreground">
                Điền thông tin cơ bản
              </p>
            </div>
          </div>

          <div className="flex-1 h-0.5 bg-primary mx-2" />

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white">
              <Shield className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-medium">Xác thực OTP</p>
              <p className="text-xs text-muted-foreground">
                Xác thực email của bạn
              </p>
            </div>
          </div>
        </div>

        {/* INFO */}
        <div className="text-center space-y-1">
          <p className="text-sm text-muted-foreground">
            Chúng tôi đã gửi mã xác thực 6 chữ số tới
          </p>
          <p className="text-sm font-medium">{email}</p>
        </div>

        {/* OTP FORM */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormItem>
              <FormLabel className="sr-only">Mã OTP</FormLabel>
              <FormControl>
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    pattern={REGEXP_ONLY_DIGITS}
                    autoComplete="one-time-code"
                    value={otpValue}
                    onChange={(value) =>
                      form.setValue("otp", value, {
                        shouldDirty: true,
                        shouldTouch: true,
                        shouldValidate: true,
                      })
                    }
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
              </FormControl>
            </FormItem>

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

            {/* Buttons */}
            <div className="flex gap-4 md:gap-6">
              <button
                type="button"
                onClick={onBack}
                disabled={isSubmitting}
                className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium border border-input bg-background shadow-sm hover:bg-primary hover:text-primary-foreground px-4 py-2 flex-1 h-10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Quay lại
              </button>

              <button
                type="submit"
                disabled={isSubmitting || otpValue.length !== 6}
                className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 px-4 py-2 flex-1 h-10 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
              >
                {isSubmitting ? "Đang xác thực..." : "Xác thực"}
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
