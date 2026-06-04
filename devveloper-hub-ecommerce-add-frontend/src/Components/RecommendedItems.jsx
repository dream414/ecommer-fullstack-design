import React from "react";

const items = [
  {
    id: 1,
    title: "$10.30",
    desc1: "T-shirt with multiple",
    desc2: "colors for men",
    img: "./s1.png",
  },
  {
    id: 2,
    title: "S10.30",
    desc1: "Jeans shorts for men",
    desc2: "blue color",
    img: "./s2.png",
  },
  {
    id: 3,
    title: "$12.50",
    desc1: "Brown winter coat",
    desc2: "medium size",
    img: "./ss.png",
  },
  {
    id: 4,
    title: "$34.00",
    desc1: "Jeans bag for travel ",
    desc2: "for men",
    img: "./s4.png",
  },
  {
    id: 5,
    title: "$99.00",
    desc1: "Leather wallet",
    desc2: "",
    img: "./s5.png",
  },
  {
    id: 6,
    title: "$9.99",
    desc1: "Canon camera",
    desc2: "black, 100x zoom",
    img: "./s6.png",
  },
  {
    id: 7,
    title: "$8.99",
    desc1: "Headset for gaming",
    desc2: "with mic",
    img: "./s7.png",
  },
  {
    id: 8,
    title: "$10.30",
    desc1: "Smart watch",
    desc2: "silver color modern",
    img: "./s5.png",
  },
  {
    id: 9,
    title: "$10.30",
    desc1: "Blue wallet for men",
    desc2: "leather matarfial",
    img: "./s9.png",
  },
  {
    id: 10,
    title: "$80.95",
    desc1: "Jeans bag for travel ",
    desc2: "for men",
    img: "./s10.png",
  },
];

export default function RecommendedItems() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">
        Recommended Items
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg p-4 hover:shadow-md transition"
          >
            {/* Image center */}
            <div className="flex justify-center mb-3">
              <img
                src={item.img}
                alt={item.title}
                className="w-28 h-28 object-cover"
              />
            </div>

            {/* Text left */}
            <div className="text-left">
              <h3 className="font-semibold text-lg mb-1">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm font-bold">
                {item.desc1}
              </p>
              <p className="text-gray-500 text-sm font-bold">
                {item.desc2}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
