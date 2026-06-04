import React from "react";

const rightBoxes = [
  { name: "Smart watches", desc: "USD 19", img: "a1.png" },
  { name: "Cameras", desc: "USD 89", img: "a3.png" },
  { name: "Headphones", desc: "USD 10", img: "c3.png" },
  { name: "Smart watches", desc: "USD 90", img: "c4.png" },
  { name: "Gaming set", desc: "USD 35", img: "a4.png" },
  { name: "Laptop & PC", desc: "USD 340", img: "a2.png" },
  { name: "Smartphones", desc: "USD 19", img: "a5.png" },
  { name: "Electric kettle", desc: "USD 240", img: "c8.png" },
];

export default function Customers() {
  return (
    <div className="w-full px-4 md:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-5 items-stretch">

        {/* ===== Left Banner ===== */}
        <div
          className="lg:col-span-2 w-full rounded-xl
                     bg-cover bg-center bg-no-repeat
                min-h-[500px] md:min-h-350vh"
          style={{ backgroundImage: "url('/Consumer.png')" }}
        >
          {/* Optional overlay content */}
        </div>

        {/* ===== Right Products Grid ===== */}
        <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 ">
          {rightBoxes.map((item, index) => (
            <div
              key={index}
              className="bg-white  shadow-sm p-3
                         flex flex-col justify-between
                         hover:shadow-md transition"
            >
              <div>
                <h3 className="font-semibold text-sm md:text-base">
                  {item.name}
                </h3>
                <p className="text-gray-400 text-xs mt-1">from</p>
                <p className="text-gray-600 text-sm font-medium">
                  {item.desc}
                </p>
              </div>

              <img
                src={item.img}
                alt={item.name}
                className="w-14 h-14 md:w-16 md:h-16
                           object-cover self-end mt-3"
              />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
