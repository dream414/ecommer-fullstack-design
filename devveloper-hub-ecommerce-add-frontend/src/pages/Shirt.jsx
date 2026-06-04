import React from "react";
import {
  FaBars,
  FaChevronDown,
  FaTh,
  FaGlobe,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Shirt() {
  const openEJSPage = () => {
    window.location.href = "http://localhost:3000/product";
  };

  // 🔹 DIFFERENT PRODUCT IMAGES
  const productImages = [
    "./c8.png",
    "./4.png",
    "./3.png",
    "./a2.png",
    "./a3.png",
    "./4.png",
    "./33.png",
    "./a1.png",
    "./c8.png",
  ];

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

        {/* ===== SIDEBAR ===== */}
        <aside className="space-y-6">
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold mb-3">Category</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Mobile accessory</li>
              <li>Electronics</li>
              <li>Smartphones</li>
              <li className="text-blue-600 font-medium">Smart tech</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold mb-3">Brands</h3>
            <div className="space-y-2 text-sm">
              <label className="flex gap-2"><input type="checkbox" /> Samsung</label>
              <label className="flex gap-2"><input type="checkbox" /> Apple</label>
              <label className="flex gap-2"><input type="checkbox" /> Huawei</label>
              <label className="flex gap-2"><input type="checkbox" /> Xiaomi</label>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold mb-3">Features</h3>
            <div className="space-y-2 text-sm">
              <label className="flex gap-2"><input type="checkbox" /> Metallic</label>
              <label className="flex gap-2"><input type="checkbox" /> Plastic cover</label>
              <label className="flex gap-2"><input type="checkbox" /> 8GB RAM</label>
              <label className="flex gap-2"><input type="checkbox" /> Super power</label>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold mb-3">Price range</h3>
            <input type="range" className="w-full" />
            <p className="text-sm text-gray-600 mt-2">$0 - $1000</p>
          </div>
        </aside>

        {/* ===== PRODUCTS ===== */}
        <section className="lg:col-span-3 space-y-4">

          {/* FILTER TAGS */}
          <div className="bg-white p-3 rounded-lg flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 border rounded-full text-sm">Samsung ✕</span>
            <span className="px-3 py-1 border rounded-full text-sm">Apple ✕</span>
            <span className="px-3 py-1 border rounded-full text-sm">Metallic ✕</span>
            <button className="ml-auto text-sm text-blue-600">
              Clear all filter
            </button>
          </div>

          {/* SORT BAR */}
          <div className="bg-white p-3 rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-sm text-gray-600">
              121,911 items in <span className="font-semibold">Mobile accessory</span>
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <button className="p-2 border rounded"><FaTh /></button>
              <button className="p-2 border rounded"><FaBars /></button>

              <select className="border rounded px-2 py-1 text-sm">
                <option>Verified only</option>
                <option>All</option>
              </select>

              <select className="border rounded px-2 py-1 text-sm">
                <option>Featured</option>
                <option>Newest</option>
              </select>
            </div>
          </div>

          {/* PRODUCTS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productImages.map((img, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border p-4 hover:shadow-lg transition"
              >
                <img
                  src={img}
                  alt="product"
                  className="rounded-lg mb-4 w-full h-auto object-cover"
                />

                <h4 className="text-sm font-semibold mb-1">
                  GoPro HERO Action Camera
                </h4>

                <div className="text-xs text-yellow-500 mb-2">
                  ★★★★☆ <span className="text-gray-500">(75)</span>
                </div>

                <div className="flex gap-2 items-center mb-3">
                  <span className="font-bold text-lg">$99.50</span>
                  <span className="line-through text-sm text-gray-400">$120.00</span>
                </div>

                <button
                  onClick={openEJSPage}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  View Product
                </button>
              </div>
            ))}
          </div>

          {/* PAGINATION */}
          <div className="flex justify-center gap-2 mt-6">
            <button className="px-3 py-1 border rounded">1</button>
            <button className="px-3 py-1 border rounded">2</button>
            <button className="px-3 py-1 border rounded">3</button>
          </div>

        </section>
      </div>
    </div>
  );
}
