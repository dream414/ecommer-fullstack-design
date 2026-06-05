import { useEffect, useState } from "react";
import { apiCall, API_ENDPOINTS } from "../api/config";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const userId = localStorage.getItem("userId");

    const data = await apiCall(
      API_ENDPOINTS.GET_USER_ORDERS.replace(":userId", userId)
    );

    setOrders(data || []);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">My Orders</h1>

      {orders.map((o) => (
        <div key={o._id} className="border p-3 mb-3">
          <p>Order ID: {o._id}</p>
          <p>Total: ${o.totalAmount}</p>
          <p>Status: {o.status}</p>
        </div>
      ))}
    </div>
  );
}