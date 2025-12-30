"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";

type ForgotFormValues = {
  email: string;
};

export default function ForgotForm() {
  const form = useForm<ForgotFormValues>({
    defaultValues: {
      email: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: ForgotFormValues) => {
    console.log("Forgot password:", data);
    // TODO: call API forgot-password
  };

  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
      <div className="w-full max-w-md space-y-8">
        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-xl lg:text-2xl font-bold">Quên mật khẩu</h1>
          <p className="text-sm text-muted-foreground">
            Nhập email để nhận liên kết đặt lại mật khẩu
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              rules={{ required: "Email là bắt buộc" }}
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
                </FormItem>
              )}
            />

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 w-full h-10 transition disabled:opacity-60 disabled:pointer-events-none"
            >
              {isSubmitting ? "Đang gửi..." : "Gửi liên kết đặt lại"}
            </button>

            {/* Back */}
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
