import Hero from "@/app/pages/detail/[id]/components/Hero";
import ReviewComment from "@/app/pages/detail/[id]/components/ReviewComment";
import next from "next";

export default function DetailId() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary">
        <Hero />
      </div>
      <div className="bg-white border-t">
        <ReviewComment />
      </div>
    </div>
  );
}
