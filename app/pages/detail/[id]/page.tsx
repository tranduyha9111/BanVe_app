import ContentDetail from "@/app/pages/detail/[id]/components/ContentDetail";
import ReviewComment from "@/app/pages/detail/[id]/components/ReviewComment";

export default function DetailId() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary">
        <ContentDetail />
      </div>
      <div className="bg-white border-t">
        <ReviewComment />
      </div>
    </div>
  );
}
