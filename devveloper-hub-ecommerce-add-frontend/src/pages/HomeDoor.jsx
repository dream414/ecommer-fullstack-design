import { useEffect, useState } from "react";
import { apiCall, API_ENDPOINTS } from "../api/config";
import { useNavigate } from "react-router-dom";

export default function HomeProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await apiCall(API_ENDPOINTS.GET_PRODUCTS);
      setProducts(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const found = cart.find((i) => i._id === product._id);

    if (found) {
      found.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart");
  };

  return (
    <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
      {products.map((p) => (
        <div key={p._id} className="border p-3 rounded">
          <img src={p.image} className="h-32 object-cover" />

          <h3 className="font-bold">{p.name}</h3>
          <p>${p.price}</p>

          <button
            onClick={() => addToCart(p)}
            className="bg-blue-600 text-white w-full mt-2 py-1"
          >
            Add To Cart
          </button>
        </div>
      ))}
    </div>
  );
}