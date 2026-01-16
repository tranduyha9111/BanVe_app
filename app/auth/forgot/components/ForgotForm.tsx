"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { forgotPassword } from "../../../services/auth";
import { toast } from "sonner";

// ✅ Validation schema
const forgotSchema = z.object({
  email: z
    .string()
    .min(1, "Email không được để trống")
    .email("Email không hợp lệ"),
});

type ForgotFormValues = z.infer<typeof forgotSchema>;

type ForgotFormProps = {
  onSuccess: (email: string) => void;
};

export default function ForgotForm({ onSuccess }: ForgotFormProps) {
  const form = useForm<ForgotFormValues>({
    resolver: zodResolver(forgotSchema),
    defaultValues: {
      email: "",
    },
    mode: "onBlur",
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (data: ForgotFormValues) => {
    try {
      const email = data.email.trim();
      await forgotPassword(email);

      toast.success("Mã OTP đã được gửi đến email của bạn");
      onSuccess(email);
    } catch (error: any) {
      if (process.env.NODE_ENV === "development") {
        console.error("Forgot Password Error:", error);
      }

      const errorMessage =
        error?.response?.data?.message ||
        "Không thể gửi OTP. Vui lòng kiểm tra email và thử lại.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-xl lg:text-2xl font-bold">Quên mật khẩu</h1>
          <p className="text-sm text-muted-foreground">
            Nhập email để nhận mã OTP đặt lại mật khẩu
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel>Email</FormLabel>

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        autoComplete="email"
                        placeholder="email@vidu.com"
                        className="pl-10 h-10"
                        disabled={isSubmitting}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 w-full h-10 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Đang gửi..." : "Gửi mã OTP"}
            </button>

            <div className="text-center text-sm">
              <Link
                href="/auth/login"
                className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary transition"
              >
                <ArrowLeft className="h-4 w-4" />
                Quay lại đăng nhập
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}