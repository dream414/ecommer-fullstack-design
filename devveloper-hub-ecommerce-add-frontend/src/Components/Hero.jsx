import { Link } from "react-router-dom";

export default function Hero() {
  const cats = [
    "Automobiles",
    "Clothes and wear",
    "Home interiors",
    "Computer and tech",
    "Sports and outdoor",
    "Animal and pets",
    "Machine tools",
    "More category",
  ];

  return (
    <div className="container mx-auto mt-6 px-3">
      <div className="grid grid-cols-12 gap-2 items-stretch">

        {/* ===== Column 1 : Sidebar ===== */}
        <div className="col-span-12 md:col-span-2 bg-white shadow p-4 rounded">
          {cats.map((c, i) =>
            i === 0 ? (
              <Link
                key={i}
                to="/automobiles"
                className="block py-2 text-sm hover:text-blue-600 cursor-pointer border-b"
              >
                {c}
              </Link>
            ) : (
              <p
                key={i}
                className="py-2 text-sm hover:text-blue-600 cursor-pointer border-b last:border-b-0"
              >
                {c}
              </p>
            )
          )}
        </div>

        {/* ===== Column 2 : Hero Banner ===== */}
        <div
          className="col-span-12 md:col-span-7 rounded flex items-center justify-center
                     bg-cover bg-center bg-no-repeat h-full min-h-[240px] md:min-h-full"
          style={{ backgroundImage: "url('/banner.png')" }}
        >
          {/* Optional Banner Content */}
        </div>

        {/* ===== Column 3 : Right Boxes ===== */}
        <div className="col-span-12 md:col-span-3 grid grid-cols-1 gap-4">

          {/* First Box */}
          <div className="bg-blue-100 rounded shadow p-4 flex flex-col justify-between">
            <div className="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5.121 17.804A13.937 13.937 0 0112 15c2.21 0 4.304.534 6.121 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>

              <div>
                <p className="font-semibold text-sm">Hi, User</p>
                <p className="text-xs text-gray-600">Let’s get started</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs md:text-sm">
                Join now
              </button>
              <button className="border border-blue-600 text-blue-600 px-3 py-1 rounded text-xs md:text-sm">
                Log in
              </button>
            </div>
          </div>

          {/* Second Box */}
          <div className="bg-orange-500 rounded shadow p-4 text-white">
            <p className="font-semibold text-sm md:text-base">
              Get US $10 off with a new supplier
            </p>
          </div>

          {/* Third Box */}
          <div className="bg-teal-500 rounded shadow p-4 text-white">
            <p className="font-semibold text-sm md:text-base">
              Send quotes with supplier preference
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
