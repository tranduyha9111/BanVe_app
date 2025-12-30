import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { MessageSquareOff, Star, Shield, ThumbsUp } from "lucide-react";

export default function ReviewComment() {
  return (
    <div className="container mx-auto px-4 py-12 lg:py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* LEFT */}
      <div className="col-span-2">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Đánh giá & Nhận xét
          </h2>
          <p className="text-sm text-gray-600">
            Chia sẻ trải nghiệm của bạn về sản phẩm này
          </p>
        </div>

        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-4 rounded-full bg-gray-100 p-4">
            <MessageSquareOff className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">
            Không có bình luận nào
          </h3>
          <p className="mt-2 text-gray-600">
            Hãy là người đầu tiên bình luận về mục này!
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-col gap-6 w-full">
        {/* OVERALL */}
        <Card className="flex flex-col gap-6 p-6 rounded-xl">
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold">4.5</span>
            <span className="text-muted-foreground">/ 5</span>
          </div>

          <div className="flex gap-1">
            {[1, 2, 3, 4].map((i) => (
              <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
            ))}
            <Star className="h-5 w-5 text-muted" />
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium">1,248</span>
            <span className="text-muted-foreground">đánh giá</span>
          </div>

          <div className="pt-2 border-t">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Đã xác thực</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold">
                <Shield className="h-3 w-3" />
                89 %
              </span>
            </div>
          </div>
        </Card>

        {/* DISTRIBUTION */}
        <Card className="flex flex-col gap-4 p-6 rounded-xl">
          <h3 className="text-sm font-semibold">Phân bổ đánh giá</h3>

          {[
            { star: 5, value: 68.6, count: 856 },
            { star: 4, value: 21.2, count: 265 },
            { star: 3, value: 7, count: 87 },
            { star: 2, value: 2, count: 25 },
            { star: 1, value: 1.2, count: 15 },
          ].map((item) => (
            <div key={item.star} className="flex items-center gap-3">
              <div className="flex items-center gap-1 w-12">
                <span className="text-sm">{item.star}</span>
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              </div>

              <div className="relative flex-1 h-2 rounded-full bg-primary/20 overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{
                    width: `${item.value}%`,
                  }}
                />
              </div>

              <span className="text-xs w-12 text-right text-muted-foreground">
                {item.count}
              </span>
            </div>
          ))}
        </Card>

        {/* HELPFUL */}
        <Card className="flex flex-col gap-6 p-6 rounded-xl">
          <h3 className="text-sm font-semibold">Đánh giá hữu ích</h3>

          {[
            { name: "Nguyễn Văn A", letter: "N", like: 245 },
            { name: "Trần Thị B", letter: "T", like: 189 },
          ].map((user) => (
            <div
              key={user.name}
              className="flex flex-col gap-2 pb-4 border-b last:border-0"
            >
              <div className="flex items-center gap-2">
                
                <Avatar className="size-8">
                  <AvatarFallback className="rounded-full bg-primary/10 text-primary text-xs font-medium">
                    {user.letter}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium truncate">{user.name}</p>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-3 w-3 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2">
                Sản phẩm chất lượng tốt, giao hàng nhanh...
              </p>

              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <ThumbsUp className="h-3 w-3" />
                {user.like} người thấy hữu ích
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
