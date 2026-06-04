export default function DealsMixed() {
  return (
    <div className="bg-white shadow rounded p-4">

      {/* Main container: responsive grid */}
      <div className="grid grid-cols-12 gap-2">

        {/* ===== Left Column: Deals + Countdown ===== */}
        <div className="col-span-12 sm:col-span-4 lg:col-span-3 border border-gray-300 text-center rounded p-3 flex flex-col gap-2">
          <h3 className="font-bold text-lg ">Deals and Offers</h3>
          <p className="text-sm text-gray-600">Hygiene Equipment</p>

          {/* Countdown */}
          <div className="grid grid-cols-4 gap-1 mt-2">
            <div className="bg-gray-500 rounded flex flex-col items-center py-2 border border-gray-300">
              <p className="font-bold text-white rounded-full px-2">04</p>
              <span className="text-xs  text-gray-100">Days</span>
            </div>
            <div className="bg-gray-500 rounded flex flex-col items-center py-2 border border-gray-300">
              <p className="font-bold text-white rounded-full px-2">13</p>
              <span className="text-xs text-gray-100">Hours</span>
            </div>
            <div className="bg-gray-500 rounded flex flex-col items-center py-2 border border-gray-300">
              <p className="font-bold text-white rounded-full px-2">34</p>
              <span className="text-xs text-gray-100 ">Minutes</span>
            </div>
            <div className="bg-gray-500 rounded flex flex-col items-center py-2 border border-gray-300">
              <p className="font-bold text-white rounded-full px-2">56</p>
              <span className="text-xs text-gray-100">Seconds</span>
            </div>
          </div>
        </div>

        {/* ===== Right Column: Product Boxes ===== */}
        <div className="col-span-12 sm:col-span-8 lg:col-span-9 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">

          {/* Box 1: Smartwatch */}
          <div className="border border-gray-300 flex flex-col items-center p-2">
            <img
              src="/a1.png"
              alt="Smartwatch"
              className="w-20 h-auto object-cover mb-2 rounded"
            />
            <p className="text-sm font-bold">Smartwatches</p>
            <span className="text-red-500 bg-red-100 rounded-full px-2 py-1 text-xs mt-1">-25%</span>
          </div>

          {/* Box 2: Laptop */}
          <div className="border border-gray-300 flex flex-col items-center p-2">
            <img
              src="/a2.png"
              alt="Laptop"
              className="w-20 h-auto object-cover mb-2 rounded"
            />
            <p className="text-sm font-bold">Laptops</p>
            <span className="text-red-500 bg-red-100 rounded-full px-2 py-1 text-xs mt-1">-15%</span>
          </div>

          {/* Box 3: GoPro Camera */}
          <div className="border border-gray-300 flex flex-col items-center p-2">
            <img
              src="/a3.png"
              alt="GoPro Camera"
              className="w-20 h-20 object-contain mb-2 rounded"
            />
            <p className="text-sm font-bold">GoPro Cameras</p>
            <span className="text-red-500 bg-red-100 rounded-full px-2 py-1 text-xs mt-1">-40%</span>
          </div>

          {/* Box 4: Microphone */}
          <div className="border border-gray-300 flex flex-col items-center p-2">
            <img
              src="/a4.png"
              alt="Microphone"
              className="w-20 h-auto object-cover mb-2 rounded"
            />
            <p className="text-sm font-bold">Headphones</p>
            <span className="text-red-500 bg-red-100 rounded-full px-2 py-1 text-xs mt-1">-25%</span>
          </div>

          {/* Box 5: Phone / Canon Camera - Centered on small screens */}
          <div className="col-span-2 sm:col-span-1 flex justify-center lg:justify-start">
            <div className="border border-gray-300 flex flex-col items-center p-2">
              <img
                src="/a5.png"
                alt="Phone / Canon Camera"
                className="w-35 h-20 object-contain mb-2 rounded"
              />
              <p className="text-sm font-bold">Canon Cameras</p>
              <span className="text-red-500 bg-red-100 rounded-full px-2 py-1 text-xs mt-1">-25%</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
