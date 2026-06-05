import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FaBars,
  FaChevronDown,
  FaGlobe,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { apiCall, API_ENDPOINTS } from "../api/config";

const HotProduct = () => {
  const { productId } = useParams();
  
  // State for main product
  const [product, setProduct] = useState({
    title: "Mens Long Sleeve T-shirt Cotton Base Layer Slim Muscle",
    rating: "⭐⭐⭐⭐☆",
    score: "9.3",
    reviews: "32 reviews",
    sold: "154 sold",
    inStock: true,
    prices: [
      { label: "Retail price", value: "$98.00" },
      { label: "Wholesale", value: "$90.00" },
      { label: "Discount", value: "$78.00" },
    ],
    details: [
      { label: "Price", value: "Negotiable" },
      { label: "Type", value: "Classic shoes" },
      { label: "Material", value: "Plastic material" },
      { label: "Design", value: "Modern nice" },
      { label: "Customization", value: "Customized logo & design" },
      { label: "Protection", value: "Refund Policy" },
      { label: "Warranty", value: "2 years full warranty" },
    ],
  });

  // State for images
  const [mainImage, setMainImage] = useState("/m1.png");
  const [thumbnails, setThumbnails] = useState(["/m2.png", "/m3.png", "/m4.png", "/m5.png", "/m6.png"]);
  const [selectedThumbnail, setSelectedThumbnail] = useState(0);

  // State for product specs
  const [productSpecs, setProductSpecs] = useState([
    { name: "Model", value: "#8786867" },
    { name: "Style", value: "Classic style" },
    { name: "Certificate", value: "ISO-898921212" },
    { name: "Size", value: "34mm * 450mm * 19mm" },
    { name: "Memory", value: "36GB RAM" },
  ]);

  // State for related/dip boxes
  const [dipBoxes, setDipBoxes] = useState([
    { img: "/Group 558.png", text: "Men Blazers Seat Elegants Formal", price: "$7.00 - $20.00" },
    { img: "/d2.png", text: "Men Shirts Sleavee Polo Contrast", price: "$15.00 - $35.00" },
    { img: "/d5.png", text: "Apple Watch Series Space Gray", price: "$25.00 - $50.00" },
    { img: "/image 25.png", text: "Basketball Crew Socks Long Staff", price: "$40.00 - $70.00" },
    { img: "/s5.png", text: "New Summer Men's Castrol T-Shirt", price: "$55.00 - $99.50" },
  ]);

  // State for related products
  const [relatedProducts, setRelatedProducts] = useState([
    { name: "Xiaomi Original Wallet", price: "$62.00 - $40.00", img: "/image 24.png" },
    { name: "Xiaomi Redmi 8 Original", price: "$32.00 - $40.00", img: "/a1.png" },
    { name: "Samsung Galaxy Case", price: "$18.00 - $25.00", img: "/c3.png" },
    { name: "Wireless Earbuds", price: "$45.00 - $60.00", img: "/s6.png" },
    { name: "Smart Watch Series 6", price: "$75.00 - $95.00", img: "/c4.png" },
    { name: "Mobile Power Bank", price: "$28.00 - $35.00", img: "/h7.png" },
  ]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isSaved, setIsSaved] = useState(false);

  // Fetch product details on mount
  useEffect(() => {
    fetchProductDetails();
    fetchRelatedProducts();
  }, [productId]);

  // Fetch single product details
  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get first product or specific product by ID
      const endpoint = productId 
        ? API_ENDPOINTS.GET_PRODUCT_BY_ID.replace(":id", productId)
        : `${API_ENDPOINTS.GET_PRODUCTS}?limit=1`;

      const data = await apiCall(endpoint);
      const productData = Array.isArray(data) ? data[0] : data;

      // Transform backend data
      setProduct({
        title: productData.title || "Product Title",
        rating: productData.rating || "⭐⭐⭐⭐☆",
        score: productData.score || "9.3",
        reviews: `${productData.reviews || 32} reviews`,
        sold: `${productData.sold || 154} sold`,
        inStock: productData.inStock !== false,
        prices: [
          { label: "Retail price", value: `$${productData.price || 98}.00` },
          { label: "Wholesale", value: `$${productData.wholesalePrice || 90}.00` },
          { label: "Discount", value: `$${productData.discountPrice || 78}.00` },
        ],
        details: [
          { label: "Price", value: productData.priceType || "Negotiable" },
          { label: "Type", value: productData.type || "Classic shoes" },
          { label: "Material", value: productData.material || "Plastic material" },
          { label: "Design", value: productData.design || "Modern nice" },
          { label: "Customization", value: productData.customization || "Customized logo & design" },
          { label: "Protection", value: productData.protection || "Refund Policy" },
          { label: "Warranty", value: productData.warranty || "2 years full warranty" },
        ],
        description: productData.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        supplierId: productData.supplierId,
        supplierName: productData.supplierName || "Gangs Trading LLC",
      });

      // Set images
      if (productData.images && productData.images.length > 0) {
        setMainImage(productData.images[0]);
        setThumbnails(productData.images.slice(0, 5));
      }

      // Set specs
      if (productData.specs && productData.specs.length > 0) {
        setProductSpecs(productData.specs);
      }
    } catch (err) {
      console.error("Failed to fetch product details:", err);
      setError("Failed to load product details. Showing default data.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch related products
  const fetchRelatedProducts = async () => {
    try {
      const data = await apiCall(API_ENDPOINTS.GET_PRODUCTS);
      
      // Transform backend data
      const related = data.slice(0, 6).map((item) => ({
        id: item._id || item.id,
        name: item.title || item.name,
        price: `$${item.price || 0} - $${(item.price * 1.2).toFixed(2) || 0}`,
        img: item.image || item.img || "/placeholder.png",
      }));

      setRelatedProducts(related);

      // Fetch related dip boxes (similar products)
      const dipData = data.slice(6, 11).map((item) => ({
        img: item.image || item.img,
        text: item.title,
        price: `$${item.price || 0} - $${(item.price * 1.3).toFixed(2) || 0}`,
      }));

      if (dipData.length > 0) {
        setDipBoxes(dipData);
      }
    } catch (err) {
      console.error("Failed to fetch related products:", err);
      // Keep default related products
    }
  };

  // Handle thumbnail click
  const handleThumbnailClick = (index) => {
    setSelectedThumbnail(index);
    setMainImage(thumbnails[index]);
  };

  // Handle add to cart
  const handleAddToCart = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("Please login first");
        return;
      }

      await apiCall(API_ENDPOINTS.CREATE_ORDER, "POST", {
        userId,
        productId: productId || "defaultId",
        quantity,
      });

      alert("Product added to cart!");
    } catch (err) {
      console.error("Failed to add to cart:", err);
      alert("Failed to add to cart");
    }
  };

  // Handle save for later
  const handleSaveForLater = () => {
    setIsSaved(!isSaved);
    // Can also make API call to save product
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading product...</p>
      </div>
    );
  }

  return (
    <>
      {/* ===== TOP NAV BAR ===== */}
      <div className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
          {/* LEFT */}
          <div className="flex items-center gap-4 text-sm">
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

      {/* ===== PAGE CONTENT ===== */}
      <div className="bg-gray-50 py-8">
        {/* Error Message */}
        {error && (
          <div className="max-w-7xl mx-auto px-4 mb-4">
            <div className="bg-yellow-100 text-yellow-700 p-3 rounded">
              {error}
            </div>
          </div>
        )}

        {/* MAIN GRID */}
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT IMAGES */}
          <div className="bg-white border rounded-lg p-6">
            <img 
              src={mainImage} 
              alt="Product" 
              className="w-full rounded-md" 
              onError={(e) => e.target.src = "/placeholder.png"}
            />
            <div className="flex gap-2 mt-4 flex-wrap">
              {thumbnails.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Thumbnail ${i}`}
                  className={`w-14 h-16 border rounded-md object-cover cursor-pointer transition-all ${
                    selectedThumbnail === i ? "border-blue-500 border-2" : "hover:border-blue-500"
                  }`}
                  onClick={() => handleThumbnailClick(i)}
                  onError={(e) => e.target.src = "/placeholder.png"}
                />
              ))}
            </div>
          </div>

          {/* CENTER INFO */}
          <div className="bg-white border rounded-lg p-6">
            {product.inStock && (
              <p className="text-green-600 font-medium mb-2">✔ In stock</p>
            )}

            <h1 className="text-xl font-semibold mb-3">{product.title}</h1>

            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 mb-5">
              <span>{product.rating}</span>
              <span>{product.score}</span>
              <span>• {product.reviews}</span>
              <span>• {product.sold}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              {product.prices.map((p, i) => (
                <div key={i} className="bg-orange-100 text-center p-3 rounded-md">
                  <p className="text-xs text-gray-500">{p.label}</p>
                  <p className="font-bold text-orange-600">{p.value}</p>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-sm text-gray-500 mb-6">
              {product.details.map((d, i) => (
                <p key={i}>
                  <strong>{d.label}:</strong> {d.value}
                </p>
              ))}
            </div>

            {/* Quantity Selector */}
            <div className="mb-4">
              <label className="text-sm font-medium">Quantity:</label>
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="border px-3 py-1 rounded hover:bg-gray-100"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="border px-3 py-1 rounded w-16 text-center"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="border px-3 py-1 rounded hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 mb-2"
            >
              Add to Cart
            </button>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="bg-white border rounded-lg p-6 h-fit lg:sticky lg:top-24">
            <p className="font-semibold mb-1">Supplier</p>
            <p className="text-sm text-gray-500 mb-4">{product.supplierName}</p>

            <Link
              to="/shut"
              className="block bg-blue-600 text-white text-center py-2 rounded-md mb-2 hover:bg-blue-700"
            >
              Send inquiry
            </Link>

            <button className="w-full border border-blue-600 text-blue-600 py-2 rounded-md hover:bg-blue-50">
              Seller's profile
            </button>

            <button
              onClick={handleSaveForLater}
              className={`w-full mt-3 text-2xl py-2 rounded-md transition-colors ${
                isSaved ? "text-red-600 bg-red-50" : "text-blue-600 hover:bg-gray-50"
              }`}
            >
              {isSaved ? "♥ Saved" : "♡ Save for later"}
            </button>
          </div>
        </div>

        {/* DESCRIPTION + TABLE + DIP */}
        <div className="max-w-7xl mx-auto px-4 mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white border rounded-lg p-6">
            <p className="text-gray-600 mb-5">
              {product.description}
            </p>

            <table className="w-full border text-sm">
              <tbody>
                {productSpecs.map((spec, i) => (
                  <tr key={i} className="border-b">
                    <td className="border-r p-2 bg-gray-100 font-medium">{spec.name}</td>
                    <td className="p-2">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-5">✅ Some great features name here.</p>
            <p>✅ Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
            <p>✅ Duis aute inure dolor in reprehenderit.</p>
            <p>✅ Some great features name here.</p>
          </div>

          {/* Related/Dip Boxes */}
          <div className="bg-white border rounded-lg p-6 space-y-3">
            <h3 className="font-semibold mb-4">Similar Products</h3>
            {dipBoxes.map((box, i) => (
              <div key={i} className="flex items-center gap-3 p-2 border rounded-lg hover:shadow-md transition-shadow">
                <img 
                  src={box.img} 
                  alt={box.text}
                  className="w-12 h-12 object-cover rounded" 
                  onError={(e) => e.target.src = "/placeholder.png"}
                />
                <div>
                  <p className="text-sm font-medium">{box.text}</p>
                  <p className="text-xs text-gray-500">{box.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        <div className="max-w-7xl mx-auto px-4 mt-10 bg-white rounded-lg">
          <h2 className="text-lg font-semibold text-center py-5">
            Related products
          </h2>

          <div className="flex gap-4 overflow-x-auto justify-center items-center pb-4 px-4">
            {relatedProducts.map((p, i) => (
              <div 
                key={p.id || i} 
                className="min-w-[160px] border rounded-lg p-4 text-center hover:shadow-lg transition-shadow cursor-pointer"
              >
                <img 
                  src={p.img} 
                  alt={p.name}
                  className="mx-auto w-28 h-28 object-cover mb-2 rounded" 
                  onError={(e) => e.target.src = "/placeholder.png"}
                />
                <p className="text-sm font-medium">{p.name}</p>
                <p className="text-xs text-gray-500">{p.price}</p>
              </div>
            ))}
          </div>

          {/* BANNER */}
          <div className="mt-10 bg-blue-600 rounded-lg p-6 flex flex-col md:flex-row justify-between items-center text-white mx-4 mb-4">
            <div>
              <h3 className="text-lg font-semibold">
                Super discount on more than 100 USD
              </h3>
              <p className="text-sm">
                Have you ever finally just write dummy info
              </p>
            </div>
            <button className="bg-orange-400 text-white px-6 py-2 rounded mt-4 md:mt-0 hover:bg-orange-500">
              Shop now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HotProduct;
