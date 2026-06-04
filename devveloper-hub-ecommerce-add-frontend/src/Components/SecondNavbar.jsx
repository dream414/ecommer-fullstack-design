import { useState } from "react";
import { FaBars, FaChevronDown, FaGlobe, FaMapMarkerAlt } from "react-icons/fa";

export default function SecondNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto flex flex-wrap items-center justify-between py-2 px-4 md:px-0 text-center gap-2 md:gap-0">

        {/* Left side - Categories */}
        <div className="flex items-center gap-2 md:gap-6">
          <div className="flex items-center gap-1 cursor-pointer">
            <FaBars />
            <span>All category</span>
          </div>
          <span className="hidden md:inline">Hot offers</span>
          <span className="hidden md:inline">Gift boxes</span>
          <span className="hidden md:inline">Projects</span>
          <div className="hidden md:flex items-center gap-1 cursor-pointer">
            <span>Help</span>
            <FaChevronDown className="text-xs" />
          </div>
        </div>

        {/* Right side - English / Ship to */}
        <div className="flex items-center gap-2 md:gap-6">
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

        {/* Mobile toggle for extra categories */}
        <button
          className="md:hidden w-full mt-2 flex items-center justify-center gap-2 px-2 py-1 border rounded"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span>Menu</span>
          <FaBars />
        </button>

        {/* Mobile hidden menu */}
        {menuOpen && (
          <div className="flex flex-col gap-2 mt-2 w-full justify-center md:hidden text-center">
            <span>Hot offers</span>
            <span>Gift boxes</span>
            <span>Projects</span>
            <div className="flex items-center gap-1 justify-center">
              <span>Help</span>
              <FaChevronDown className="text-xs" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
