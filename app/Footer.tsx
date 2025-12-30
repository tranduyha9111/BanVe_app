"use client";

import {
  Ruler,
  Facebook,
  Instagram,
  Youtube,
  CloudLightning,
  Droplet,
  Cpu,
  Armchair,
  MapPin,
  PhoneCall,
  AlignEndVertical,
  Clock,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-300 bg-white mt-16">
      <div className="container mx-auto px-4 py-12">
        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* BRAND */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Ruler size={35} />
              <span className="font-bold text-2xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Blueprint Marketplace
              </span>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed">
              Giải pháp thiết kế kiến trúc chuyên nghiệp cho mọi công trình từ
              nhà ở đến dự án thương mại.
            </p>

            <div className="flex gap-3">
              <Link
                className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                href="#"
              >
                <Facebook size={20} />
              </Link>
              <Link
                className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                href="#"
              >
                <Instagram size={20} />
              </Link>
              <Link
                className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                href="#"
              >
                <Youtube size={20} />
              </Link>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-primary rounded-full"></span>
              Liên kết nhanh
            </h3>
            <ul className="space-y-3 text-gray-600">
              {[
                "Trang chủ",
                "Mẫu thiết kế",
                "Dịch vụ",
                "Về chúng tôi",
                "Liên hệ",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="flex items-center gap-2 group hover:text-primary transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 group-hover:bg-primary transition-colors"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CATEGORY */}
          <div>
            <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-primary rounded-full"></span>
              Danh mục
            </h3>
            <ul className="space-y-3 text-gray-600">
              {[
                { icon: Ruler, text: "Xây dựng" },
                { icon: CloudLightning, text: "Điện" },
                { icon: Droplet, text: "Cấp thoát nước" },
                { icon: Cpu, text: "Điện tử" },
                { icon: Armchair, text: "Nội thất" },
              ].map((item) => (
                <li key={item.text}>
                  <Link
                    href="#"
                    className="flex items-center gap-2 group hover:text-primary transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 group-hover:bg-primary transition-colors"></span>
                    <item.icon size={16} />
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-primary rounded-full"></span>
              Thông tin liên hệ
            </h3>

            <ul className="space-y-4 text-gray-600">
              <li className="flex gap-3">
                <MapPin size={18} />
                <span>
                  Số 123, Đường Thiết Kế, P. Sáng Tạo, Q. Đổi Mới, TP. Hồ Chí
                  Minh
                </span>
              </li>

              <li className="flex gap-3 items-center">
                <PhoneCall size={18} />
                <Link
                  href="tel:+84123456789"
                  className="hover:text-primary transition-colors"
                >
                  +84 123 456 789
                </Link>
              </li>

              <li className="flex gap-3 items-center">
                <AlignEndVertical size={18} />
                <Link
                  href="mailto:info@bandoviet.com"
                  className="hover:text-primary transition-colors"
                >
                  info@bandoviet.com
                </Link>
              </li>

              <li className="flex gap-3 items-center">
                <Clock size={18} />
                <span>Thứ 2 - Thứ 7: 8:00 - 18:00</span>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-gray-300 mt-12 pt-6 text-center text-sm text-gray-600">
          <p>2023 Bản Vẽ Chuyên Nghiệp. Tất cả các quyền được bảo lưu.</p>

          <div className="flex flex-wrap justify-center gap-4 mt-2">
            <Link href="#" className="hover:text-black transition-colors">
              Điều khoản sử dụng
            </Link>
            <Link href="#" className="hover:text-black transition-colors">
              Chính sách bảo mật
            </Link>
            <Link href="#" className="hover:text-black transition-colors">
              Chính sách cookie
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
