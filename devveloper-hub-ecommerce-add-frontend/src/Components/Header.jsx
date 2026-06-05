import {
  FaShoppingBag,
  FaUser,
  FaEnvelope,
  FaBox,
  FaShoppingCart,
  FaSearch,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/login");
  };

  const handleOrdersClick = () => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/orders");
    } else {
      navigate("/login");
    }
  };

  const handleMessagesClick = () => {
    navigate("/products"); // 👈 NEW ROUTE
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  return (
    <div className="border-b bg-white">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-3 px-4 gap-4">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <FaShoppingBag className="text-blue-600 text-2xl" />
          <h1 className="text-2xl font-bold text-blue-600">
            Brand
          </h1>
        </div>

        {/* Search */}
        <div className="flex w-full md:w-1/2 border-2 border-blue-600 rounded overflow-hidden">
          <input
            type="text"
            placeholder="Search products..."
            className="flex-1 px-4 py-2 outline-none"
          />

          <select className="border-l px-3 outline-none">
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Fashion</option>
            <option>Groceries</option>
          </select>

          <button className="bg-blue-600 text-white px-4 flex items-center gap-2">
            <FaSearch />
            Search
          </button>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-6 text-gray-500">

          <button
            onClick={handleProfileClick}
            className="flex flex-col items-center hover:text-blue-600"
          >
            <FaUser className="text-lg" />
            <span className="text-xs">Profile</span>
          </button>

          {/* 💬 Messages → Products Section */}
          <button
            onClick={handleMessagesClick}
            className="flex flex-col items-center hover:text-blue-600"
          >
            <FaEnvelope className="text-lg" />
            <span className="text-xs">Messages</span>
          </button>

          {/* 📦 Orders */}
          <button
            onClick={handleOrdersClick}
            className="flex flex-col items-center hover:text-blue-600"
          >
            <FaBox className="text-lg" />
            <span className="text-xs">Orders</span>
          </button>

          <button
            onClick={handleCartClick}
            className="flex flex-col items-center hover:text-blue-600"
          >
            <FaShoppingCart className="text-lg" />
            <span className="text-xs">Cart</span>
          </button>

        </div>
      </div>
    </div>
  );
}

export default Header;