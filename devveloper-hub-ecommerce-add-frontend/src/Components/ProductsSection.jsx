import React from "react";

const rightBoxes = [
  { name: "Soft Chairs", desc: "USD 19", img: "h1.png" },
  { name: "Sofa and Chair", desc: "USD 19", img: "h2.png" },
  { name: "Kitchen and Dishes", desc: "USD 19", img: "h3.png" },
  { name: "Smart watches", desc: "USD 19", img: "h4.png" },
  { name: "Kitchen Mixture", desc: "USD 100", img: "h5.png" },
  { name: "Blenders", desc: "USD 39", img: "h6.png" },
  { name: "Home appliance", desc: "USD 19", img: "h7.png" },
  { name: "Coffee maker", desc: "USD 10", img: "h8.png" },
];

export default function HomeOutdoorComponent() {
  return (
    <div className="w-full px-4 md:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-5 items-stretch">

        {/* Left Banner */}
        <div
          className="lg:col-span-2 w-full rounded-xl bg-cover bg-centerh-full min-h-[340px] md:min-h-full
         "
          style={{ backgroundImage: "url('/home.png')" }}
        />

        {/* Products */}
        <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 ">
          {rightBoxes.map((item, index) => (
            <div
              key={index}
              className="bg-white p-3 shadow-sm rounded-lg
                         flex flex-col justify-between"
            >

              {/* TEXT — full wrap allowed */}
              <div className="space-y-1">
                <h3 className="font-semibold text-sm leading-snug break-words">
                  {item.name}
                </h3>

                <p className="text-gray-400 text-xs">from</p>

                <p className="text-gray-600 text-sm font-medium break-words">
                  {item.desc}
                </p>
              </div>

              {/* IMAGE */}
              <div className="mt-3 flex justify-end">
                <img
                  src={item.img}
                  alt={item.name}
                  className="
                    w-14 h-14
                    sm:w-12 sm:h-12
                    md:w-14 md:h-14
                    object-contain
                    flex-shrink-0
                  "
                />
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
