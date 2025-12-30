"use client";

import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { Check, Shield } from "lucide-react";
import { useForm } from "react-hook-form";

import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface OtpFormProps {
  onBack: () => void;
}
export default function OtpForm({ onBack }: OtpFormProps) {
  const form = useForm({
    defaultValues: {
      otp: "",
    },
  });

  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-xl text-center lg:text-2xl font-bold">Đăng kí</h1>

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
          <p className="text-sm font-medium">admins@meu-solutions.com</p>
        </div>

        {/* OTP FORM */}
        <Form {...form}>
          <form className="space-y-6">
            <FormItem>
              <FormLabel className="sr-only">Mã OTP</FormLabel>

              <FormControl>
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                    autoComplete="one-time-code"
                  >
                    <InputOTPGroup>
                      {Array.from({ length: 6 }).map((_, i) => (
                        <InputOTPSlot
                          key={i}
                          index={i}
                          className="h-9 w-9 border text-sm shadow-sm"
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </FormControl>
            </FormItem>
          </form>
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              không nhận được mã ?
            </p>
            <button className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:bg-muted disabled:text-gray-500 disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 underline-offset-4 p-0 h-auto font-medium text-primary hover:underline">
              Gửi lại mã
            </button>
          </div>
          <div className="flex gap-4 md:gap-6">
            <button
              className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:bg-muted disabled:text-gray-500 disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-primary hover:text-primary-foreground px-4 py-2 flex-1 h-10"
              type="button"
              onClick={onBack}
            >
              Quay lại
            </button>
            <button
              className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:bg-muted disabled:text-gray-500 disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 px-4 py-2 flex-1 h-10"
              type="button"
            >
              Xác thực
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
