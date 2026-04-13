"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { toast } from "sonner";
import { useState } from "react";

const loginSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(6),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data.email.trim(), data.password);
      toast.success("Đăng nhập thành công! 🎉");

      const returnUrl = searchParams.get("returnUrl") || "/";
      router.replace(returnUrl);
      router.refresh(); // ⭐ DÒNG QUAN TRỌNG
    } catch (error: any) {
      console.error("Login form error:", error);
      
      // Check if it's a backend 500 error
      if (error?.response?.status === 500) {
        toast.error("Máy chủ đang gặp sự cố. Vui lòng thử lại sau vài phút! 🛠️");
        return;
      }
      
      // Check if backend error message exists
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
        return;
      }
      
      // Default error
      toast.error("Email hoặc mật khẩu không chính xác");
    }
  };

  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-xl lg:text-2xl font-bold">Đăng Nhập</h1>
          <p className="text-sm text-muted-foreground">
            Chào mừng bạn trở lại!
          </p>
        </div>

        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
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

            {/* PASSWORD */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <FormLabel>Mật khẩu</FormLabel>
                    <Link
                      href="/auth/forgot"
                      className="text-sm text-primary hover:underline"
                    >
                      Quên mật khẩu?
                    </Link>
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                    <FormControl>
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        placeholder="Nhập mật khẩu"
                        className="pl-10 pr-10 h-10"
                        disabled={isSubmitting}
                      />
                    </FormControl>

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      disabled={isSubmitting}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-10 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>

            <div className="text-center text-sm">
              Chưa có tài khoản?
              <Link
                href="/auth/register"
                className="ml-1 text-primary hover:underline"
              >
                Đăng ký ngay
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
