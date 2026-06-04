import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaStar, FaRegStar, FaHeart, FaCheckCircle, FaTh, FaBars } from "react-icons/fa";

const categories = ["Mobile accessory", "Electronics", "Smartphones", "Modern tech"];
const brands = ["Samsung", "Apple", "Huawei", "Pocco", "Lenovo"];
const features = ["Metallic", "Plastic cover", "8GB Ram", "Super power", "Large Memory"];
const conditions = ["Any", "Refurbished", "Brand new", "Old items"];
const ratings = [5, 4, 3, 2, 1];

const products = [
  { id: 1, title: "Canon Camera EOS 2000, Black 10x zoom", price: "$998.00", oldPrice: "$1128.00", rating: 4, reviews: 154, img: "./31.png" },
  { id: 2, title: "GoPro HERO 6 4K Action Camera - Black", price: "$998.00", rating: 4, reviews: 154, img: "./3.png" },
  { id: 3, title: "GoPro HERO 6 4K Action Camera - Black", price: "$998.00", rating: 4, reviews: 154, img: "./2.png" },
  { id: 4, title: "GoPro HERO 6 4K Action Camera - Black", price: "$998.00", rating: 4, reviews: 154, img: "./33.png" },
  { id: 5, title: "GoPro HERO 6 4K Action Camera - Black", price: "$998.00", rating: 4, reviews: 154, img: "./a1.png" },
   { id:6 , title: "GoPro HERO 6 4K Action Camera - Black", price: "$998.00", rating: 4, reviews: 154, img: "./c3.png" },
];

export default function Automobile() {
  const [priceRange, setPriceRange] = useState([0, 1000]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ===== Top Navbar ===== */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          {/* Left: Number + Category */}
          <div className="flex flex-col sm:flex-row gap-2 text-gray-500 text-sm">
            <span>12,911 items</span>
            <span className="font-medium">Mobile, Accessories</span>
          </div>

          {/* Right: Icons + Verified / Featured */}
          <div className="flex items-center gap-2 mt-2 sm:mt-0">
            <button className="p-2 border rounded"> <FaTh /> </button>

            {/* Three-lines icon linking to shirt.jsx */}
            <Link to="/shirt">
              <button className="p-2 border rounded"><FaBars /></button>
            </Link>

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

        {/* ===== Categories Links ===== */}
        <div className="max-w-7xl mx-auto px-4 py-2 flex gap-4 overflow-x-auto text-sm text-gray-700">
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
          <div>
            <h4 className="font-semibold mb-2">Category</h4>
            <ul className="space-y-1">
              {categories.map((c, i) => <li key={i} className="cursor-pointer hover:text-blue-600">{c}</li>)}
              <li className="text-blue-600 cursor-pointer">See all</li>
            </ul>
          </div>

          {/* Brands */}
          <div>
            <h4 className="font-semibold mb-2">Brands</h4>
            {brands.map((b, i) => (
              <label key={i} className="flex items-center gap-2">
                <input type="checkbox" /> {b}
              </label>
            ))}
          </div>

          {/* Features */}
          <div>
            <h4 className="font-semibold mb-2">Features</h4>
            {features.map((f, i) => (
              <label key={i} className="flex items-center gap-2">
                <input type="checkbox" /> {f}
              </label>
            ))}
          </div>

          {/* Price Range */}
          <div>
            <h4 className="font-semibold mb-2">Price range</h4>
            <div className="flex gap-2 items-center">
              <input type="number" value={priceRange[0]} onChange={e => setPriceRange([+e.target.value, priceRange[1]])} className="w-1/2 border rounded px-2 py-1" />
              <input type="number" value={priceRange[1]} onChange={e => setPriceRange([priceRange[0], +e.target.value])} className="w-1/2 border rounded px-2 py-1" />
            </div>
            <input type="range" min="0" max="1000" value={priceRange[0]} onChange={e => setPriceRange([+e.target.value, priceRange[1]])} className="w-full mt-2" />
            <button className="mt-2 w-full bg-blue-600 text-white py-1 rounded text-sm">Apply</button>
          </div>

          {/* Condition */}
          <div>
            <h4 className="font-semibold mb-2">Condition</h4>
            {conditions.map((c, i) => (
              <label key={i} className="flex items-center gap-2">
                <input type="radio" name="condition" /> {c}
              </label>
            ))}
          </div>

          {/* Ratings */}
          <div>
            <h4 className="font-semibold mb-2">Ratings</h4>
            {ratings.map((r, i) => (
              <div key={i} className="flex items-center gap-1 text-yellow-400">
                {[...Array(5)].map((_, j) => j < r ? <FaStar key={j} /> : <FaRegStar key={j} />)}
              </div>
            ))}
          </div>
        </aside>

        {/* ===== Product Listing ===== */}
        <main className="lg:col-span-3 space-y-4">
          {products.map((p) => (
            <div key={p.id} className="bg-white border rounded-lg p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <img src={p.img} alt={p.title} className="w-28 h-28 object-contain" />
              <div className="flex-1">
                <h3 className="font-semibold text-sm sm:text-base">{p.title}</h3>
                <div className="flex items-center gap-2 mt-1 text-sm">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => i < p.rating ? <FaStar key={i} /> : <FaRegStar key={i} />)}
                  </div>
                  <span className="text-gray-500">{p.reviews} orders</span>
                  <span className="text-green-600 flex items-center gap-1"><FaCheckCircle /> Free Shipping</span>
                </div>
                <div className="mt-2">
                  <span className="text-lg font-semibold text-black">{p.price}</span>
                  {p.oldPrice && <span className="ml-2 line-through text-gray-400">{p.oldPrice}</span>}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <button className="text-blue-600 text-sm mt-2">View details</button>
              </div>
              <button className="border p-2 rounded-md">
                <FaHeart className="text-blue-600" />
              </button>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}
