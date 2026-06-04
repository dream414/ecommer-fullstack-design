import { Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import Home from "./pages/Home";
import Shirt from "./pages/Shirt";
import Automobile from "./pages/Automobile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HotProduct from "./pages/HotProduct";
import Shut from "./pages/shut";

function App() {
  return (
    <Routes>
      {/* Layout کے اندر header + footer */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shirt" element={<Shirt />} />
        <Route path="/automobiles" element={<Automobile />} />
        <Route path="/hot-product" element={<HotProduct />} />
        <Route path="/shut" element={<Shut />} /> {/* ✅ Capital */}
      </Route>

      {/* Login/Register بغیر header/footer */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
