import OrderList from "./components/OrderList";

export default function page() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
            Đơn hàng của tôi
          </h1>
          <p className="text-white/80 text-sm lg:text-base">
            Quản lý và theo dõi các đơn hàng của bạn
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <OrderList />
      </div>
    </div>
  );
}
