import React, { useState, useEffect } from "react";
import { apiCall, API_ENDPOINTS } from "../api/config";

export default function ProductsSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const data = await apiCall(API_ENDPOINTS.GET_PRODUCTS);

      console.log("RAW BACKEND DATA:", data);

      // ✅ FIXED SAFE HANDLING
      const raw = Array.isArray(data)
        ? data
        : data?.products
        ? data.products
        : [];

      const formatted = raw.map((p) => ({
        _id: p._id,
        name: p.name || p.title,
        price: p.price,
        image: p.image,
      }));

      setProducts(formatted);
    } catch (err) {
      console.error(err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const exists = cart.find((i) => i._id === product._id);

    if (exists) exists.quantity += 1;
    else cart.push({ ...product, quantity: 1 });

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Added to cart");
  };

  if (loading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">

      {products.length > 0 ? (
        products.map((item) => (
          <div key={item._id} className="border p-3 rounded">

            <img
              src={item.image}
              className="h-32 w-full object-cover"
              alt={item.name}
            />

            <h3>{item.name}</h3>
            <p>${item.price}</p>

            <button
              onClick={() => addToCart(item)}
              className="bg-blue-600 text-white px-3 py-1 mt-2"
            >
              Add to Cart
            </button>

          </div>
        ))
      ) : (
        <p className="col-span-4 text-center text-gray-500">
          No products found (check backend DB)
        </p>
      )}

    </div>
  );
}