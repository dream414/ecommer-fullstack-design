import { Routes, Route } from "react-router-dom";

import Layout from "./Components/Layout";

// Pages
import Home from "./pages/Home";
import Shirt from "./pages/Shirt";
import Automobile from "./pages/Automobile";
import HotProduct from "./pages/HotProduct";
import Shut from "./pages/shut";

import Cart from "./pages/Cart";
import Order from "./pages/Order";

// Auth
import Login from "./pages/Login";
import Register from "./pages/Register";

// New Pages
import HomeDoor from "./pages/HomeDoor";
import Products from "./pages/ProductsSection.jsx";

function App() {
  return (
    <Routes>

      {/* Layout routes (Header + Footer) */}
      <Route element={<Layout />}>
        
        <Route path="/" element={<Home />} />

        {/* Categories */}
        <Route path="/shirt" element={<Shirt />} />
        <Route path="/automobiles" element={<Automobile />} />
        <Route path="/hot-product" element={<HotProduct />} />
        <Route path="/shut" element={<Shut />} />

        {/* NEW Pages */}
        <Route path="/home-door" element={<HomeDoor />} />
        <Route path="/products" element={<Products />} />

        {/* Cart & Orders (IMPORTANT FIX HERE) */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Order />} />   {/* ✅ FIXED */}

      </Route>

      {/* Auth (no layout) */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

    </Routes>
  );
}

export default App;