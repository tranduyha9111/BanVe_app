"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Mail, Lock } from "lucide-react";
import Link from "next/link";

type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-xl text-center lg:text-2xl font-bold">Đăng Nhập</h1>

        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit((data) => {
              console.log(data);
            })}
          >
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
                      />
                    </FormControl>
                  </div>
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
                    <Link href="/auth/forgot" className="text-sm text-primary">
                      Quên mật khẩu ?
                    </Link>
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Nhập mật khẩu"
                        className="pl-10 h-10"
                      />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />

            <button
              type="submit"
              className="w-full h-10 rounded-full bg-primary text-white"
            >
              Đăng nhập
            </button>

            <div className="text-center text-sm">
              Chưa có tài khoản?
              <Link href="/auth/register" className="ml-1 text-primary">
                Đăng kí ngay
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
