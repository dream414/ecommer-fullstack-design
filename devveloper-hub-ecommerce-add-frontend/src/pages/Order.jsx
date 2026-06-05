import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiCall, API_ENDPOINTS } from "../api/config";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      if (!userId || !token) {
        navigate("/login");
        return;
      }

      const data = await apiCall(
        API_ENDPOINTS.GET_USER_ORDERS.replace(":userId", userId),
        "GET"
      );

      setOrders(data || []);
    } catch (error) {
      console.error("Failed to load orders:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow">

        <h1 className="text-2xl font-bold mb-6">
          My Orders ({orders.length})
        </h1>

        {orders.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 mb-4">No orders found</p>

            <Link
              to="/"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">

            {orders.map((order) => (
              <div
                key={order._id}
                className="border p-4 rounded-lg bg-white"
              >

                {/* Order Header */}
                <div className="flex justify-between mb-2">
                  <h2 className="font-semibold">
                    Order #{order._id.slice(-6)}
                  </h2>

                  <span
                    className={`text-sm px-2 py-1 rounded ${
                      order.status === "delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Items */}
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between text-sm"
                    >
                      <span>
                        {item.product?.name || "Product"}
                      </span>
                      <span>
                        {item.quantity} × ${item.price}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex justify-between mt-3 border-t pt-2 text-sm">
                  <span>Total:</span>
                  <span className="font-bold">
                    ${order.totalAmount}
                  </span>
                </div>

                <p className="text-xs text-gray-500 mt-1">
                  Shipping: {order.shippingAddress}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}