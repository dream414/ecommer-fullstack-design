import React, { useState, useEffect } from "react";
import { apiCall, API_ENDPOINTS } from "../api/config";

export default function HomeOutdoorComponent() {
  const [products, setProducts] = useState([
    // Default/hardcoded data (fallback if API fails)
    { name: "Soft Chairs", desc: "USD 19", img: "h1.png" },
    { name: "Sofa and Chair", desc: "USD 19", img: "h2.png" },
    { name: "Kitchen and Dishes", desc: "USD 19", img: "h3.png" },
    { name: "Smart watches", desc: "USD 19", img: "h4.png" },
    { name: "Kitchen Mixture", desc: "USD 100", img: "h5.png" },
    { name: "Blenders", desc: "USD 39", img: "h6.png" },
    { name: "Home appliance", desc: "USD 19", img: "h7.png" },
    { name: "Coffee maker", desc: "USD 10", img: "h8.png" },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch products from backend
      const data = await apiCall(API_ENDPOINTS.GET_PRODUCTS);
      
      // Transform backend data to match component format
      const formattedProducts = data.map((product) => ({
        name: product.title || product.name,
        desc: `USD ${product.price}` || "USD 0",
        img: product.image || product.img || "placeholder.png",
        id: product._id || product.id,
      }));

      // Take only first 8 products for display
      setProducts(formattedProducts.slice(0, 8));
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError("Failed to load products. Showing default products.");
      // Keep default products if API fails
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full px-4 md:px-8 py-8">
      {/* Loading state */}
      {loading && (
        <div className="text-center py-8">
          <p className="text-gray-500">Loading products...</p>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="bg-yellow-100 text-yellow-700 p-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-5 items-stretch">
        {/* Left Banner */}
        <div
          className="lg:col-span-2 w-full rounded-xl bg-cover bg-center min-h-[340px] md:min-h-full"
          style={{ backgroundImage: "url('/home.png')" }}
        />

        {/* Products Grid */}
        <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {products.map((item, index) => (
            <div
              key={item.id || index}
              className="bg-white p-3 shadow-sm rounded-lg flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              {/* TEXT — full wrap allowed */}
              <div className="space-y-1">
                <h3 className="font-semibold text-sm leading-snug break-words">
                  {item.name}
                </h3>

                <p className="text-gray-400 text-xs">from</p>

                <p className="text-gray-600 text-sm font-medium break-words">
                  {item.desc}
                </p>
              </div>

              {/* IMAGE */}
              <div className="mt-3 flex justify-end">
                <img
                  src={item.img}
                  alt={item.name}
                  className="
                    w-14 h-14
                    sm:w-12 sm:h-12
                    md:w-14 md:h-14
                    object-contain
                    flex-shrink-0
                  "
                  onError={(e) => {
                    e.target.src = "/placeholder.png"; // Fallback image
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
