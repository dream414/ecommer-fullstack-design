import {
  FaShoppingBag,
  FaUser,
  FaEnvelope,
  FaBox,
  FaShoppingCart,
  FaSearch,
} from "react-icons/fa";

export default function Header() {
  return (
    <div className="border-b">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-3 px-4 md:px-0 gap-3 md:gap-0">

        {/* Brand */}
        <div className="flex items-center gap-2">
          <FaShoppingBag className="text-blue-600 text-2xl" />
          <h1 className="text-2xl font-bold text-blue-600">Brand</h1>
        </div>

        {/* Search Bar (Blue Outline) */}
        <div className="flex w-full md:w-1/2 border-2 border-blue-600 rounded overflow-hidden">
          <input
            className="flex-1 px-4 py-2 text-sm outline-none"
            placeholder="Search"
          />
          <select className="border-l-2 border-blue-600 px-3 text-sm text-gray-600 outline-none">
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Fashion</option>
            <option>Groceries</option>
          </select>
          <button className="px-4 bg-blue-600 text-white flex items-center gap-1 text-sm">
            <FaSearch />
            Search
          </button>
        </div>

        {/* Right Icons */}
        <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6 text-gray-400 text-xs text-center">
          <div className="flex flex-col items-center">
            <FaUser className="text-lg" />
            <span>Profile</span>
          </div>

          <div className="flex flex-col items-center">
            <FaEnvelope className="text-lg" />
            <span>Messages</span>
          </div>

          <div className="flex flex-col items-center">
            <FaBox className="text-lg" />
            <span>Orders</span>
          </div>

          <div className="flex flex-col items-center">
            <FaShoppingCart className="text-lg" />
            <span>Cart</span>
          </div>
        </div>

      </div>
    </div>
  );
}
