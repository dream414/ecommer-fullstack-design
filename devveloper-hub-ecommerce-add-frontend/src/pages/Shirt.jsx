import React, { useState, useEffect } from "react";
import {
  FaBars,
  FaChevronDown,
  FaTh,
  FaGlobe,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { apiCall, API_ENDPOINTS } from "../api/config";

export default function Shirt() {
  const navigate = useNavigate();

  // State for products
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState("Featured");
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Filter options
  const categories = ["Mobile accessory", "Electronics", "Smartphones", "Smart tech"];
  const brands = ["Samsung", "Apple", "Huawei", "Xiaomi"];
  const features = ["Metallic", "Plastic cover", "8GB RAM", "Super power"];

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Apply filters whenever filter state changes
  useEffect(() => {
    applyFilters();
  }, [products, selectedBrands, selectedFeatures, priceRange, sortBy, verifiedOnly, currentPage]);

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await apiCall(API_ENDPOINTS.GET_PRODUCTS);

      // Transform backend data
      const transformedProducts = data.map((product) => ({
        id: product._id || product.id,
        title: product.title || "Product Title",
        price: product.price || 99.50,
        originalPrice: product.originalPrice || product.price * 1.2 || 120,
        rating: product.rating || 4,
        reviews: product.reviews || 75,
        image: product.image || product.img || "./placeholder.png",
        brand: product.brand || "Generic",
        features: product.features || [],
        verified: product.verified !== false,
        sold: product.sold || 154,
      }));

      setProducts(transformedProducts);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError("Failed to load products. Please try again.");
      // Fallback data
      setProducts([
        {
          id: 1,
          title: "GoPro HERO Action Camera",
          price: 99.5,
          originalPrice: 120,
          rating: 4,
          reviews: 75,
          image: "./c8.png",
          brand: "GoPro",
          features: ["4K", "Waterproof"],
          verified: true,
          sold: 154,
        },
        {
          id: 2,
          title: "Canon Camera EOS 2000",
          price: 98,
          originalPrice: 128,
          rating: 4,
          reviews: 154,
          image: "./4.png",
          brand: "Canon",
          features: ["Professional", "10x zoom"],
          verified: true,
          sold: 200,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Apply all filters
  const applyFilters = () => {
    let filtered = [...products];

    // Brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((p) =>
        selectedBrands.some((brand) => p.brand?.toLowerCase().includes(brand.toLowerCase()))
      );
    }

    // Features filter
    if (selectedFeatures.length > 0) {
      filtered = filtered.filter((p) =>
        selectedFeatures.some((feature) =>
          p.features?.some((f) => f.toLowerCase().includes(feature.toLowerCase()))
        )
      );
    }

    // Price range filter
    filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Verified only filter
    if (verifiedOnly) {
      filtered = filtered.filter((p) => p.verified);
    }

    // Sorting
    if (sortBy === "Newest") {
      filtered.sort((a, b) => b.id - a.id);
    } else if (sortBy === "Price: Low to High") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "Price: High to Low") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "Most Popular") {
      filtered.sort((a, b) => b.sold - a.sold);
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Handle brand toggle
  const handleBrandToggle = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  // Handle feature toggle
  const handleFeatureToggle = (feature) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]
    );
  };

  // Handle view product
  const handleViewProduct = (productId) => {
    navigate(`/hot-product/${productId}`);
  };

  // Handle clear all filters
  const handleClearFilters = () => {
    setSelectedBrands([]);
    setSelectedFeatures([]);
    setPriceRange([0, 1000]);
    setSortBy("Featured");
    setVerifiedOnly(false);
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  // Get active filter tags
  const activeFilters = [
    ...selectedBrands.map((b) => ({ type: "brand", value: b })),
    ...selectedFeatures.map((f) => ({ type: "feature", value: f })),
  ];

  const handleRemoveFilter = (type, value) => {
    if (type === "brand") {
      setSelectedBrands((prev) => prev.filter((b) => b !== value));
    } else if (type === "feature") {
      setSelectedFeatures((prev) => prev.filter((f) => f !== value));
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* ===== TOP NAV BAR ===== */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
          {/* LEFT */}
          <div className="flex items-center gap-3 md:gap-6 text-sm">
            <div className="flex items-center gap-1 cursor-pointer font-medium">
              <FaBars />
              <span>All category</span>
            </div>

            <Link
              to="/hot-product"
              className="hidden md:inline text-blue-600 font-medium hover:underline"
            >
              Hot offers
            </Link>

            <span className="hidden md:inline">Gift boxes</span>
            <span className="hidden md:inline">Projects</span>

            <div className="hidden md:flex items-center gap-1 cursor-pointer">
              <span>Help</span>
              <FaChevronDown className="text-xs" />
            </div>
          </div>

          {/* RIGHT */}
          <div className="hidden md:flex items-center gap-6 text-sm">
            <div className="flex items-center gap-1 cursor-pointer">
              <FaGlobe />
              <span>English</span>
              <FaChevronDown className="text-xs" />
            </div>

            <div className="flex items-center gap-1 cursor-pointer">
              <FaMapMarkerAlt />
              <span>Ship to</span>
              <FaChevronDown className="text-xs" />
            </div>
          </div>
        </div>
      </div>

      {/* ===== MAIN LAYOUT ===== */}
      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* ===== SIDEBAR FILTERS ===== */}
        <aside className="space-y-6">
          {/* Categories */}
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold mb-3">Category</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              {categories.map((cat, i) => (
                <li key={i} className="cursor-pointer hover:text-blue-600">
                  {cat}
                </li>
              ))}
            </ul>
          </div>

          {/* Brands */}
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold mb-3">Brands</h3>
            <div className="space-y-2 text-sm">
              {brands.map((brand) => (
                <label key={brand} className="flex gap-2 cursor-pointer hover:text-blue-600">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandToggle(brand)}
                  />
                  {brand}
                </label>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold mb-3">Features</h3>
            <div className="space-y-2 text-sm">
              {features.map((feature) => (
                <label key={feature} className="flex gap-2 cursor-pointer hover:text-blue-600">
                  <input
                    type="checkbox"
                    checked={selectedFeatures.includes(feature)}
                    onChange={() => handleFeatureToggle(feature)}
                  />
                  {feature}
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold mb-3">Price range</h3>
            <div className="flex gap-2 mb-3">
              <input
                type="number"
                min="0"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Math.min(+e.target.value, priceRange[1]), priceRange[1]])}
                className="w-1/2 border rounded px-2 py-1 text-sm"
              />
              <input
                type="number"
                max="5000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Math.max(+e.target.value, priceRange[0])])}
                className="w-1/2 border rounded px-2 py-1 text-sm"
              />
            </div>
            <input
              type="range"
              min="0"
              max="5000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
              className="w-full"
            />
            <p className="text-sm text-gray-600 mt-2">
              ${priceRange[0]} - ${priceRange[1]}
            </p>
          </div>
        </aside>

        {/* ===== PRODUCTS ===== */}
        <section className="lg:col-span-3 space-y-4">
          {/* Error Message */}
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg">
              {error}
            </div>
          )}

          {/* FILTER TAGS */}
          <div className="bg-white p-3 rounded-lg flex flex-wrap items-center gap-2">
            {activeFilters.length > 0 ? (
              <>
                {activeFilters.map((filter, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 border rounded-full text-sm flex items-center gap-1 hover:bg-gray-100"
                  >
                    {filter.value}
                    <button
                      onClick={() => handleRemoveFilter(filter.type, filter.value)}
                      className="font-bold cursor-pointer"
                    >
                      ✕
                    </button>
                  </span>
                ))}
                <button
                  onClick={handleClearFilters}
                  className="ml-auto text-sm text-blue-600 hover:underline"
                >
                  Clear all filter
                </button>
              </>
            ) : (
              <p className="text-sm text-gray-500">No filters applied</p>
            )}
          </div>

          {/* SORT BAR */}
          <div className="bg-white p-3 rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-sm text-gray-600">
              {filteredProducts.length} items found in{" "}
              <span className="font-semibold">Mobile accessories</span>
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <button className="p-2 border rounded hover:bg-gray-100">
                <FaTh />
              </button>
              <button className="p-2 border rounded hover:bg-gray-100">
                <FaBars />
              </button>

              <select
                value={verifiedOnly ? "Verified only" : "All"}
                onChange={(e) => setVerifiedOnly(e.target.value === "Verified only")}
                className="border rounded px-2 py-1 text-sm"
              >
                <option>All</option>
                <option>Verified only</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border rounded px-2 py-1 text-sm"
              >
                <option>Featured</option>
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Most Popular</option>
              </select>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-8">
              <p className="text-gray-500">Loading products...</p>
            </div>
          )}

          {/* PRODUCTS GRID */}
          {!loading && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl border p-4 hover:shadow-lg transition cursor-pointer"
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="rounded-lg mb-4 w-full h-40 object-cover"
                      onError={(e) => (e.target.src = "./placeholder.png")}
                    />

                    <h4 className="text-sm font-semibold mb-1 line-clamp-2">
                      {product.title}
                    </h4>

                    <div className="text-xs text-yellow-500 mb-2">
                      {"★".repeat(product.rating)}
                      {"☆".repeat(5 - product.rating)}{" "}
                      <span className="text-gray-500">({product.reviews})</span>
                    </div>

                    <div className="flex gap-2 items-center mb-3">
                      <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                      <span className="line-through text-sm text-gray-400">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    </div>

                    <button
                      onClick={() => handleViewProduct(product.id)}
                      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      View Product
                    </button>
                  </div>
                ))}
              </div>

              {/* No Products Found */}
              {filteredProducts.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No products found. Try adjusting your filters.</p>
                </div>
              )}

              {/* PAGINATION */}
              {filteredProducts.length > 0 && (
                <div className="flex justify-center gap-2 mt-6">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
                  >
                    Previous
                  </button>

                  {Array.from({ length: Math.min(3, totalPages) }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-1 border rounded ${
                        currentPage === i + 1 ? "bg-blue-600 text-white border-blue-600" : "hover:bg-gray-100"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
}
