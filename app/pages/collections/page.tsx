import { ChevronRight } from "lucide-react";
import Link from "next/link";
import ContentGrid from "./components/ContentGrid";

export default function collections() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-6">
          <Link href="/" className="text-gray-600 hover:text-primary">
            Trang chủ
          </Link>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <span className="text-gray-900 font-medium">Danh sách nội dung</span>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Danh sách nội dung
          </h1>
          <p className="text-gray-600">
            Khám phá bộ sưu tập bản vẽ kiến trúc đa dạng và chất lượng cao
          </p>
        </div>

        <ContentGrid />
      </div>
    </div>
  );
}
