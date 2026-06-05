import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiCall, API_ENDPOINTS } from "../api/config";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  const removeItem = (id) => {
    const updated = cartItems.filter((i) => i._id !== id);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const getTotal = () =>
    cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const checkout = async () => {
    const token = localStorage.getItem("token");

    const orderData = {
      items: cartItems.map((i) => ({
        product: i._id,
        quantity: i.quantity,
      })),
      shippingAddress: address,
    };

    await apiCall(API_ENDPOINTS.CREATE_ORDER, "POST", orderData);

    localStorage.removeItem("cart");
    setCartItems([]);

    alert("Order placed!");
    navigate("/orders");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Cart</h1>

      {cartItems.map((item) => (
        <div key={item._id} className="flex justify-between border p-2 mb-2">
          <div>
            {item.name} - ${item.price}
          </div>

          <button onClick={() => removeItem(item._id)}>Remove</button>
        </div>
      ))}

      <textarea
        placeholder="Shipping Address"
        className="border w-full p-2 mt-3"
        onChange={(e) => setAddress(e.target.value)}
      />

      <h2 className="mt-3">Total: ${getTotal()}</h2>

      <button
        onClick={checkout}
        className="bg-green-600 text-white px-4 py-2 mt-3"
      >
        Checkout
      </button>
    </div>
  );
}