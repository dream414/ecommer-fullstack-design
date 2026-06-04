export default function SendQuoteSection() {
  return (
    <div
      className="w-full bg-cover bg-center py-16 px-4"
      style={{
        backgroundImage:
          "url('./g.png')",
      }}
    >
      <div className="max-w-6xl mx-auto rounded-xl p-6 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

          {/* LEFT TEXT */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Get Best Quotes From Suppliers
            </h1>
            <p className="text-gray-600 font-bold">
             An easy way to send requests for all suppliers.
            </p>
          </div>

          {/* RIGHT FORM */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className=" text-lg mb-4 font-bold">
              Send quote to supplier
            </h3>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="What item you need"
                className="w-full border px-3 py-2 rounded"
              />

              <textarea
                placeholder="Type more details"
                rows="3"
                className="w-full border px-3 py-2 rounded"
              />

              <div className="flex gap-3">
                <input
                  type="number"
                  placeholder="Quantity"
                  className="w-1/2 border px-3 py-2 rounded"
                />

                <select className="w-1/2 border px-3 py-2 rounded">
                  <option>PCS</option>
                </select>
              </div>

              <button className="w-full bg-blue-600 text-white py-2 rounded">
                Send Inquiry
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
