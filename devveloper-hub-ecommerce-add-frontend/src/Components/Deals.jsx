import React, { useState, useEffect } from "react";
import { apiCall, API_ENDPOINTS } from "../api/config";

export default function DealsMixed() {
  const [deals, setDeals] = useState([
    // Default/hardcoded data (fallback if API fails)
    { id: 1, name: "Smartwatches", img: "/a1.png", discount: "-25%" },
    { id: 2, name: "Laptops", img: "/a2.png", discount: "-15%" },
    { id: 3, name: "GoPro Cameras", img: "/a3.png", discount: "-40%" },
    { id: 4, name: "Headphones", img: "/a4.png", discount: "-25%" },
    { id: 5, name: "Canon Cameras", img: "/a5.png", discount: "-25%" },
  ]);

  const [countdown, setCountdown] = useState({
    days: 4,
    hours: 13,
    minutes: 34,
    seconds: 56,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch deals from backend
  useEffect(() => {
    fetchDeals();
  }, []);

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        } else {
          // Reset countdown when it reaches 0
          days = 4;
          hours = 13;
          minutes = 34;
          seconds = 56;
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const fetchDeals = async () => {
    try {
      setLoading(true);
      setError(null);

      // Try to fetch deals from backend
      // Assuming backend has /api/deals endpoint
      const data = await apiCall("/deals");

      // Transform backend data to match component format
      const formattedDeals = data.map((deal) => ({
        id: deal._id || deal.id,
        name: deal.title || deal.name,
        img: deal.image || deal.img,
        discount: deal.discount || "-0%",
        description: deal.description,
      }));

      // Take only first 5 deals
      setDeals(formattedDeals.slice(0, 5));
    } catch (err) {
      console.error("Failed to fetch deals:", err);
      setError("Failed to load deals. Showing default deals.");
      // Keep default deals if API fails
    } finally {
      setLoading(false);
    }
  };

  // Format countdown numbers with leading zero
  const formatNumber = (num) => String(num).padStart(2, "0");

  return (
    <div className="bg-white shadow rounded p-4">
      {/* Error message */}
      {error && (
        <div className="bg-yellow-100 text-yellow-700 p-3 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      {/* Main container: responsive grid */}
      <div className="grid grid-cols-12 gap-2">
        {/* ===== Left Column: Deals + Countdown ===== */}
        <div className="col-span-12 sm:col-span-4 lg:col-span-3 border border-gray-300 text-center rounded p-3 flex flex-col gap-2">
          <h3 className="font-bold text-lg">Deals and Offers</h3>
          <p className="text-sm text-gray-600">Hot Deals</p>

          {/* Countdown */}
          <div className="grid grid-cols-4 gap-1 mt-2">
            {/* Days */}
            <div className="bg-gray-500 rounded flex flex-col items-center py-2 border border-gray-300">
              <p className="font-bold text-white rounded-full px-2">
                {formatNumber(countdown.days)}
              </p>
              <span className="text-xs text-gray-100">Days</span>
            </div>

            {/* Hours */}
            <div className="bg-gray-500 rounded flex flex-col items-center py-2 border border-gray-300">
              <p className="font-bold text-white rounded-full px-2">
                {formatNumber(countdown.hours)}
              </p>
              <span className="text-xs text-gray-100">Hours</span>
            </div>

            {/* Minutes */}
            <div className="bg-gray-500 rounded flex flex-col items-center py-2 border border-gray-300">
              <p className="font-bold text-white rounded-full px-2">
                {formatNumber(countdown.minutes)}
              </p>
              <span className="text-xs text-gray-100">Minutes</span>
            </div>

            {/* Seconds */}
            <div className="bg-gray-500 rounded flex flex-col items-center py-2 border border-gray-300">
              <p className="font-bold text-white rounded-full px-2">
                {formatNumber(countdown.seconds)}
              </p>
              <span className="text-xs text-gray-100">Seconds</span>
            </div>
          </div>
        </div>

        {/* ===== Right Column: Product Boxes ===== */}
        <div className="col-span-12 sm:col-span-8 lg:col-span-9 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {deals.map((deal, index) => (
            <div
              key={deal.id || index}
              className={`border border-gray-300 flex flex-col items-center p-2 hover:shadow-md transition-shadow ${
                index === deals.length - 1 ? "col-span-2 sm:col-span-1 flex justify-center lg:justify-start" : ""
              }`}
            >
              <img
                src={deal.img}
                alt={deal.name}
                className="w-20 h-20 object-contain mb-2 rounded"
                onError={(e) => {
                  e.target.src = "/placeholder.png"; // Fallback image
                }}
              />
              <p className="text-sm font-bold text-center">{deal.name}</p>
              <span className="text-red-500 bg-red-100 rounded-full px-2 py-1 text-xs mt-1">
                {deal.discount}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="text-center py-4">
          <p className="text-gray-500 text-sm">Loading deals...</p>
        </div>
      )}
    </div>
  );
}
