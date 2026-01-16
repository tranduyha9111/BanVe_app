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
import { User, Shield, Mail, Lock } from "lucide-react";
import Link from "next/link";
import { register } from "../../../services/auth";
import { toast } from "sonner"; // hoặc "react-hot-toast"

// ✅ Validation schema với Zod
const registerSchema = z.object({
  email: z
    .string()
    .min(1, "Email không được để trống")
    .email("Email không hợp lệ"),
  name: z
    .string()
    .min(2, "Họ tên phải có ít nhất 2 ký tự")
    .max(50, "Họ tên không được quá 50 ký tự"),
  password: z
    .string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .max(100, "Mật khẩu không được quá 100 ký tự"),
  confirmPassword: z.string().min(1, "Vui lòng xác nhận mật khẩu"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Mật khẩu xác nhận không khớp",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

type RegisterFormProps = {
  onNext: (email: string) => void;
};

export default function RegisterForm({ onNext }: RegisterFormProps) {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur", // ✅ Validate khi blur
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await register({
        email: data.email.trim(),
        username: data.name.trim(),
        password: data.password,
      });

      toast.success("Đăng ký thành công! Vui lòng kiểm tra email.");
      onNext(data.email.trim());
    } catch (error: any) {
      if (process.env.NODE_ENV === "development") {
        console.error("REGISTER ERROR:", error);
      }

      const errorMessage =
        error?.response?.data?.message ||
        "Đăng ký thất bại, vui lòng thử lại";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-8">
          <h1 className="text-xl text-center lg:text-2xl font-bold">Đăng ký</h1>

          {/* STEP HEADER */}
          <div className="flex justify-center">
            <div className="flex items-center flex-1 justify-between gap-2">
              <div className="flex items-center">
                <div className="flex items-center justify-center rounded-full border-2 border-primary bg-primary text-primary-foreground h-10 w-10">
                  <User className="w-4 h-4" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">Thông tin cá nhân</p>
                  <p className="text-xs text-muted-foreground">
                    Điền thông tin cơ bản
                  </p>
                </div>
              </div>
              <div className="h-0.5 flex-1 bg-muted"></div>
              <div className="flex items-center text-muted-foreground">
                <div className="flex items-center justify-center rounded-full border-2 h-10 w-10">
                  <Shield className="w-4 h-4" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">Xác thực OTP</p>
                  <p className="text-xs">Xác thực email</p>
                </div>
              </div>
            </div>
          </div>

          {/* FORM */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* HỌ TÊN */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>Họ và tên</FormLabel>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Nguyễn Văn A"
                          className="pl-10 h-10"
                          disabled={isSubmitting}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* EMAIL */}
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

              {/* MẬT KHẨU */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>Mật khẩu</FormLabel>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Nhập mật khẩu (ít nhất 6 ký tự)"
                          className="pl-10 h-10"
                          disabled={isSubmitting}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* XÁC NHẬN */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>Xác nhận mật khẩu</FormLabel>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Nhập lại mật khẩu"
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
                className="w-full h-10 rounded-full bg-primary text-primary-foreground mt-6 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
              >
                {isSubmitting ? "Đang xử lý..." : "Tiếp tục"}
              </button>

              <div className="text-center text-sm">
                Đã có tài khoản?
                <Link href="/auth/login" className="ml-1 text-primary hover:underline">
                  Đăng nhập ngay
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}