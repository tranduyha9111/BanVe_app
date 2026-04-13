import OrderSuccess from "@/app/orders/[id]/success/components/OrderSuccess";

export default function OrderSuccessPage({ params }: { params: { id: string } }) {
  return <OrderSuccess orderId={params.id} />;
}
