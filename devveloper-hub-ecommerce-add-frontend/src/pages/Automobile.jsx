import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaStar, FaRegStar, FaHeart, FaCheckCircle, FaTh, FaBars } from "react-icons/fa";
import { apiCall, API_ENDPOINTS } from "../api/config";

const categories = ["Mobile accessory", "Electronics", "Smartphones", "Modern tech"];
const brands = ["Samsung", "Apple", "Huawei", "Pocco", "Lenovo"];
const features = ["Metallic", "Plastic cover", "8GB Ram", "Super power", "Large Memory"];
const conditions = ["Any", "Refurbished", "Brand new", "Old items"];
const ratings = [5, 4, 3, 2, 1];

export default function Automobile() {
  const navigate = useNavigate();

  // State for products
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState("Any");
  const [selectedRating, setSelectedRating] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortBy, setSortBy] = useState("Featured");
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  // Wishlist state
  const [wishlist, setWishlist] = useState([]);

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
    loadWishlist();
  }, []);

  // Apply filters whenever filter state changes
  useEffect(() => {
    applyFilters();
  }, [products, selectedBrands, selectedFeatures, selectedCondition, selectedRating, priceRange, sortBy, verifiedOnly]);

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
        price: parseFloat(product.price) || 998.0,
        oldPrice: parseFloat(product.originalPrice) || parseFloat(product.price) * 1.13 || 1128.0,
        rating: product.rating || 4,
        reviews: product.reviews || 154,
        image: product.image || product.img || "./placeholder.png",
        brand: product.brand || "Generic",
        features: product.features || [],
        condition: product.condition || "Brand new",
        verified: product.verified !== false,
        description: product.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        freeShipping: product.freeShipping !== false,
      }));

      setProducts(transformedProducts);
      setFilteredProducts(transformedProducts);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError("Failed to load products. Please try again.");
      // Fallback data
      setProducts([
        {
          id: 1,
          title: "Canon Camera EOS 2000, Black 10x zoom",
          price: 998.0,
          oldPrice: 1128.0,
          rating: 4,
          reviews: 154,
          image: "./31.png",
          brand: "Canon",
          features: ["10x zoom", "Professional"],
          condition: "Brand new",
          verified: true,
          description: "Professional camera with 10x zoom capability",
          freeShipping: true,
        },
        {
          id: 2,
          title: "GoPro HERO 6 4K Action Camera - Black",
          price: 998.0,
          oldPrice: 1128.0,
          rating: 4,
          reviews: 154,
          image: "./3.png",
          brand: "GoPro",
          features: ["4K", "Waterproof"],
          condition: "Brand new",
          verified: true,
          description: "High quality action camera with 4K recording",
          freeShipping: true,
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

    // Condition filter
    if (selectedCondition !== "Any") {
      filtered = filtered.filter((p) => p.condition === selectedCondition);
    }

    // Rating filter
    if (selectedRating > 0) {
      filtered = filtered.filter((p) => p.rating >= selectedRating);
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
    } else if (sortBy === "Most Reviewed") {
      filtered.sort((a, b) => b.reviews - a.reviews);
    }

    setFilteredProducts(filtered);
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

  // Handle wishlist toggle
  const handleWishlistToggle = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
    // Save to localStorage
    const updatedWishlist = wishlist.includes(productId)
      ? wishlist.filter((id) => id !== productId)
      : [...wishlist, productId];
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  // Load wishlist from localStorage
  const loadWishlist = () => {
    const saved = localStorage.getItem("wishlist");
    if (saved) {
      setWishlist(JSON.parse(saved));
    }
  };

  // Handle view details
  const handleViewDetails = (productId) => {
    navigate(`/hot-product/${productId}`);
  };

  // Handle clear all filters
  const handleClearFilters = () => {
    setSelectedBrands([]);
    setSelectedFeatures([]);
    setSelectedCondition("Any");
    setSelectedRating(0);
    setPriceRange([0, 5000]);
    setSortBy("Featured");
    setVerifiedOnly(false);
  };

  // Get active filter count
  const activeFilterCount = selectedBrands.length + selectedFeatures.length + (selectedCondition !== "Any" ? 1 : 0) + (selectedRating > 0 ? 1 : 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ===== Top Navbar ===== */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          {/* Left: Number + Category */}
          <div className="flex flex-col sm:flex-row gap-2 text-gray-500 text-sm">
            <span>{filteredProducts.length.toLocaleString()} items</span>
            <span className="font-medium">Mobile, Accessories</span>
          </div>

          {/* Right: Icons + Verified / Featured */}
          <div className="flex items-center gap-2 mt-2 sm:mt-0 flex-wrap">
            <button className="p-2 border rounded hover:bg-gray-100">
              <FaTh />
            </button>

            {/* List view link */}
            <Link to="/shirt">
              <button className="p-2 border rounded hover:bg-gray-100">
                <FaBars />
              </button>
            </Link>

            <select
              value={verifiedOnly ? "Verified only" : "All"}
              onChange={(e) => setVerifiedOnly(e.target.value === "Verified only")}
              className="border rounded px-2 py-1 text-sm"
            >
              <option value="All">All</option>
              <option value="Verified only">Verified only</option>
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
              <option>Most Reviewed</option>
            </select>
          </div>
        </div>

        {/* ===== Categories Links ===== */}
        <div className="max-w-7xl mx-auto px-4 py-2 flex gap-4 overflow-x-auto text-sm text-gray-700 border-t">
          {categories.map((c, i) => (
            <Link
              key={i}
              to="/shirt"
              className="block py-1 px-2 hover:text-blue-600 cursor-pointer whitespace-nowrap"
            >
              {c}
            </Link>
          ))}
        </div>
      </div>

      {/* ===== Main Content ===== */}
      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* ===== Sidebar Filters ===== */}
        <aside className="hidden lg:block space-y-6 text-sm text-gray-700">
          {/* Category */}
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Category</h4>
            <ul className="space-y-1">
              {categories.map((c, i) => (
                <li key={i} className="cursor-pointer hover:text-blue-600">
                  {c}
                </li>
              ))}
              <li className="text-blue-600 cursor-pointer font-medium">See all</li>
            </ul>
          </div>

          {/* Brands */}
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Brands</h4>
            <div className="space-y-2">
              {brands.map((b, i) => (
                <label key={i} className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(b)}
                    onChange={() => handleBrandToggle(b)}
                  />
                  {b}
                </label>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Features</h4>
            <div className="space-y-2">
              {features.map((f, i) => (
                <label key={i} className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
                  <input
                    type="checkbox"
                    checked={selectedFeatures.includes(f)}
                    onChange={() => handleFeatureToggle(f)}
                  />
                  {f}
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Price range</h4>
            <div className="flex gap-2 items-center mb-2">
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Math.min(+e.target.value, priceRange[1]), priceRange[1]])}
                className="w-1/2 border rounded px-2 py-1 text-xs"
              />
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Math.max(+e.target.value, priceRange[0])])}
                className="w-1/2 border rounded px-2 py-1 text-xs"
              />
            </div>
            <input
              type="range"
              min="0"
              max="5000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
              className="w-full mt-2"
            />
            <p className="text-xs text-gray-600 mt-2">
              ${priceRange[0]} - ${priceRange[1]}
            </p>
            <button className="mt-2 w-full bg-blue-600 text-white py-1 rounded text-sm hover:bg-blue-700">
              Apply
            </button>
          </div>

          {/* Condition */}
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Condition</h4>
            <div className="space-y-2">
              {conditions.map((c, i) => (
                <label key={i} className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
                  <input
                    type="radio"
                    name="condition"
                    checked={selectedCondition === c}
                    onChange={() => setSelectedCondition(c)}
                  />
                  {c}
                </label>
              ))}
            </div>
          </div>

          {/* Ratings */}
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Ratings</h4>
            <div className="space-y-2">
              {ratings.map((r, i) => (
                <label key={i} className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
                  <input
                    type="radio"
                    name="rating"
                    checked={selectedRating === r}
                    onChange={() => setSelectedRating(r)}
                  />
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, j) => (j < r ? <FaStar key={j} /> : <FaRegStar key={j} />))}
                  </div>
                  <span className="text-xs">& up</span>
                </label>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          {activeFilterCount > 0 && (
            <button
              onClick={handleClearFilters}
              className="w-full bg-gray-300 text-gray-800 py-2 rounded font-medium hover:bg-gray-400"
            >
              Clear All Filters
            </button>
          )}
        </aside>

        {/* ===== Product Listing ===== */}
        <main className="lg:col-span-3 space-y-4">
          {/* Error Message */}
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="text-center py-8">
              <p className="text-gray-500">Loading products...</p>
            </div>
          )}

          {/* No Products Found */}
          {!loading && filteredProducts.length === 0 && (
            <div className="text-center py-8 bg-white rounded-lg">
              <p className="text-gray-500">No products found. Try adjusting your filters.</p>
            </div>
          )}

          {/* Products List */}
          {!loading &&
            filteredProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white border rounded-lg p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center hover:shadow-md transition-shadow"
              >
                {/* Product Image */}
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-28 h-28 object-contain rounded"
                  onError={(e) => (e.target.src = "./placeholder.png")}
                />

                {/* Product Info */}
                <div className="flex-1">
                  <h3 className="font-semibold text-sm sm:text-base line-clamp-2">{p.title}</h3>

                  {/* Rating & Reviews */}
                  <div className="flex items-center gap-2 mt-1 text-sm">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (i < p.rating ? <FaStar key={i} /> : <FaRegStar key={i} />))}
                    </div>
                    <span className="text-gray-500">{p.reviews} orders</span>
                    {p.freeShipping && (
                      <span className="text-green-600 flex items-center gap-1">
                        <FaCheckCircle /> Free Shipping
                      </span>
                    )}
                  </div>

                  {/* Price */}
                  <div className="mt-2">
                    <span className="text-lg font-semibold text-black">${p.price.toFixed(2)}</span>
                    {p.oldPrice && (
                      <span className="ml-2 line-through text-gray-400">${p.oldPrice.toFixed(2)}</span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">{p.description}</p>

                  {/* View Details Button */}
                  <button
                    onClick={() => handleViewDetails(p.id)}
                    className="text-blue-600 text-sm mt-2 hover:underline font-medium"
                  >
                    View details
                  </button>
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={() => handleWishlistToggle(p.id)}
                  className="border p-2 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <FaHeart
                    className={wishlist.includes(p.id) ? "text-red-600" : "text-gray-300"}
                  />
                </button>
              </div>
            ))}
        </main>
      </div>
    </div>
  );
}
