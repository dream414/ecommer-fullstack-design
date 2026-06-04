// Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";



export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Page content */}
      <main className="flex-1">
        <Outlet />  {/* Page-specific content */}
      </main>

      {/* Footer */}
<Footer/>
    </div>
  );
}
