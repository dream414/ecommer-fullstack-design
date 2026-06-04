export default function Shut() {
  // Cart product images
  const cartImages = [
    "blue.png",
    "s5.png",
    "h2.png",
  ];

  // Saved items images
  const savedImages = [
    "a5.png",
    "mobile.png",
    "a1.png",
    "a2.png",
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow p-6">
        

        {/* Heading */}
        <h2 className="text-xl font-semibold mb-6">My cart (3)</h2>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* LEFT SIDE – CART ITEMS */}
          <div className="lg:col-span-2 space-y-4">

            {cartImages.map((img, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row gap-4 border rounded-lg p-4 items-center"
              >
                {/* PRODUCT IMAGE */}
                <img
                  src={img}
                  alt="Product"
                  className="w-24 h-24 object-cover rounded"
                />

                {/* DETAILS */}
                <div className="flex-1">
                  <h3 className="font-medium">
                    T-shirts with multiple colors, for men and lady
                  </h3>
                  <p className="text-sm text-gray-500">
                    Size: medium, Color: blue, Material: Cotton
                  </p>
                  <p className="text-sm text-gray-500">
                    Seller: Artel Market
                  </p>

                  <div className="flex gap-4 mt-2 text-sm">
                    <button className="text-red-500">Remove</button>
                    <button className="text-blue-500">Save for later</button>
                  </div>
                </div>

                {/* PRICE */}
                <div className="text-right">
                  <p className="font-semibold">
                    {index === 2 ? "$170.50" : "$78.99"}
                  </p>
                  <select className="border rounded px-2 py-1 mt-2">
                    <option>Qty: {index === 0 ? 2 : index === 1 ? 1 : 1}</option>
                  </select>
                </div>
              </div>
            ))}

            {/* Buttons */}
            <div className="flex justify-between mt-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded">
                <a href="/">

                ← Back to shop
                </a>
              </button>
              <button className="text-blue-600">Remove all</button>
            </div>
          </div>

          {/* RIGHT SIDE – SUMMARY */}
          <div className="border rounded-lg p-4 space-y-4 h-fit">

            <div className="flex gap-2">
              <input
                placeholder="Add coupon"
                className="border rounded px-3 py-2 flex-1"
              />
              <button className="bg-blue-600 text-white px-4 rounded">
                Apply
              </button>
            </div>

            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>$1403.97</span>
              </div>
              <div className="flex justify-between text-red-500">
                <span>Discount:</span>
                <span>- $60.00</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Tax:</span>
                <span>+ $14.00</span>
              </div>

              <hr />

              <div className="flex justify-between font-semibold text-base">
                <span>Total:</span>
                <span>$1357.97</span>
              </div>
            </div>

            <button className="w-full bg-green-600 text-white py-2 rounded text-lg">
              Checkout
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 text-center text-sm text-gray-600 mt-10">
          <div>🔒 Secure payment</div>
          <div>💬 Customer support</div>
          <div>🚚 Free delivery</div>
        </div>

        {/* SAVED FOR LATER */}
        <div className="mt-12">
          <h3 className="font-semibold mb-4">Saved for later</h3>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {savedImages.map((img, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 text-center"
              >
                <img
                  src={img}
                  alt="Saved Product"
                  className="h-28 w-full object-contain rounded mb-3"
                />
                <p className="font-medium">$99.50</p>
                <p className="text-sm text-gray-500">
                  GoPro HERO6 4K Action Camera - Black
                </p>
                <button className="text-blue-600 text-sm mt-2">
                  🛒 Move to cart
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* BANNER */}
        <div className="mt-10 bg-blue-600 rounded-lg p-6 flex flex-col md:flex-row justify-between items-center text-white">
          <div>
            <h3 className="text-lg font-semibold">
              Super discount on more than 100 USD
            </h3>
            <p className="text-sm">
              Have you ever finally just write dummy info
            </p>
          </div>
          <button className="bg-orange-400 text-white px-6 py-2 rounded mt-4 md:mt-0">
            Shop now
          </button>
        </div>

      </div>
    </div>
  );
}
