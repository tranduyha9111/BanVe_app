"use client";

import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function ResetPassword() {
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-xl text-center lg:text-2xl font-bold">
          Đặt lại mật khẩu
        </h1>

        <p className="text-center text-muted-foreground">
          Mã OTP đã được gửi đến{" "}
          <span className="font-medium text-foreground">
            admins@meu-solutions.com
          </span>
        </p>

        {/* OTP */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex justify-center text-muted-foreground">
            Mã OTP
          </label>

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
        </div>

        {/* New password */}
        <div className="grid gap-2">
          <label className="text-sm font-medium">Mật khẩu mới</label>
          <div className="relative">
            <Input type={showNew ? "text" : "password"} />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Confirm password */}
        <div className="grid gap-2">
          <label className="text-sm font-medium">Xác nhận mật khẩu</label>
          <div className="relative">
            <Input type={showConfirm ? "text" : "password"} />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <button className="w-full h-12 rounded-full bg-primary text-white font-medium">
          Đặt lại mật khẩu
        </button>

        <button className="w-full h-9 rounded-full border">Quay lại</button>
      </div>
      2
    </div>
  );
}
