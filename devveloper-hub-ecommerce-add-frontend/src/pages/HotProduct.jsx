import { Link } from "react-router-dom";
import {
  FaBars,
  FaChevronDown,
  FaGlobe,
  FaMapMarkerAlt,
} from "react-icons/fa";

const HotProduct = () => {
  // 🔹 MAIN PRODUCT
  const product = {
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
  };

  // 🔹 IMAGES
  const mainImage = "/m1.png";
  const thumbnails = ["/m2.png", "/m3.png", "/m4.png", "/m5.png", "/m6.png"];

  // 🔹 TABLE DATA
  const productSpecs = [
    { name: "Model", value: "#8786867" },
    { name: "Style", value: "Classic style" },
    { name: "Certificate", value: "ISO-898921212" },
    { name: "Size", value: "34mm * 450mm * 19mm" },
    { name: "Memory", value: "36GB RAM" },
  ];

  // 🔹 DIP BOXES
  const dipBoxes = [
    { img: "/Group 558.png", text: "Men Blazers Seat Elegants Formal", price: "$7.00 - $20.00" },
    { img: "/d2.png", text: "Men Shirts Sleavee Polo Contrast", price: "$15.00 - $35.00" },
    { img: "/d5.png", text: "Apple Watch Series Space Gray", price: "$25.00 - $50.00" },
    { img: "/image 25.png", text: "Basketball Crew Socks Long Staff", price: "$40.00 - $70.00" },
    { img: "/s5.png", text: "New Summer Men's Castrol T-Shirt", price: "$55.00 - $99.50" },
  ];

  // 🔹 RELATED PRODUCTS
  const relatedProducts = [
    { name: "Xiaomi Original Wallet", price: "$62.00 - $40.00", img: "/image 24.png" },
    { name: "Xiaomi Redmi 8 Original", price: "$32.00 - $40.00", img: "/a1.png" },
    { name: "Samsung Galaxy Case", price: "$18.00 - $25.00", img: "/c3.png" },
    { name: "Wireless Earbuds", price: "$45.00 - $60.00", img: "/s6.png" },
    { name: "Smart Watch Series 6", price: "$75.00 - $95.00", img: "/c4.png" },
    { name: "Mobile Power Bank", price: "$28.00 - $35.00", img: "/h7.png" },
  ];

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
        {/* MAIN GRID */}
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT IMAGES */}
          <div className="bg-white border rounded-lg p-6">
            <img src={mainImage} className="w-full rounded-md" />
            <div className="flex gap-2 mt-4 flex-wrap">
              {thumbnails.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className="w-14 h-16 border rounded-md object-cover cursor-pointer hover:border-blue-500"
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
              {product.rating}
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

            <div className="space-y-2 text-sm text-gray-500">
              {product.details.map((d, i) => (
                <p key={i}>
                  <strong>{d.label}:</strong> {d.value}
                </p>
              ))}
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="bg-white border rounded-lg p-6 h-fit lg:sticky lg:top-24">
            <p className="font-semibold mb-1">Supplier</p>
            <p className="text-sm text-gray-500 mb-4">Gangs Trading LLC</p>

            <Link
              to="/shut"
              className="block bg-blue-600 text-white text-center py-2 rounded-md mb-2"
            >
              Send inquiry
            </Link>

            <button className="w-full border border-blue-600 text-blue-600 py-2 rounded-md">
              Seller’s profile
            </button>

            <button className="w-full mt-3 text-2xl text-blue-600">
              ♡ Save for later
            </button>
          </div>
        </div>

        {/* DESCRIPTION + TABLE + DIP */}
        <div className="max-w-7xl mx-auto px-4 mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white border rounded-lg p-6">
            <p className="text-gray-600 mb-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit   Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem veniam minus fuga facere saepe dolorem nam tempore soluta laborum aliquam quisquam et voluptatibus ut suscipit ea sint aperiam repellat, error amet blanditiis expedita, qui perferendis recusandae? Esse dicta doloremque ut.
            </p>

            <table className="w-full border text-sm">
              <tbody>
                {productSpecs.map((spec, i) => (
                  <tr key={i} className="border-b">
                    <td className="border-r p-2 bg-gray-100">{spec.name}</td>
                    <td className="p-2">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className=" mt-5">✅ Some great features name here.</p>
            <p>✅ Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
            <p>✅ Duis aute inure dolor in reprehenderit.</p>
            <p>✅ Some great features name here.</p>
            
          </div>

          <div className="bg-white border rounded-lg p-6 space-y-3">
            {dipBoxes.map((box, i) => (
              <div key={i} className="flex items-center gap-3 p-2 border rounded-lg">
                <img src={box.img} className="w-12 h-12 object-cover rounded" />
                <div>
                  <p className="text-sm">{box.text}</p>
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

          <div className="flex gap-4 overflow-x-auto justify-center items-center pb-4">
            {relatedProducts.map((p, i) => (
              <div key={i} className="min-w-[160px] border rounded-lg p-4 text-center">
                <img src={p.img} className="mx-auto w-28 h-28 object-cover mb-2" />
                <p className="text-sm font-medium">{p.name}</p>
                <p className="text-xs text-gray-500">{p.price}</p>
              </div>
            ))}
          </div>
           {/* BANNER */}
        <div className="mt-10 bg-blue-600 rounded-lg p-6 flex flex-col md:flex-row justify-between items-center text-white">
          <div>
            <h3 className="text-lg font-semibold">
              Super discount on more than 100 USD
            </h3>
            <p className="text-sm">
              Have you ever finally just write dummy info
            </p>
          </div>
          <button className="bg-orange-400 text-white px-6 py-2 rounded mt-4 md:mt-0">
            Shop now
          </button>
        </div>
        </div>
      </div>
    </>
  );
};

export default HotProduct;
