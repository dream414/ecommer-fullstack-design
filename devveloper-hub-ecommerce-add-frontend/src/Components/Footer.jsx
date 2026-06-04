import {
  FaShoppingBag,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaApple,
  FaGooglePlay,
  FaChevronUp
} from "react-icons/fa";

export default function Footer() {
  return (
    <div className="bg-gray-100">
      {/* Newsletter */}
      <div className="text-center py-10 px-4">
        <h2 className="text-lg font-semibold">
          Subscribe on our newsletter
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Get daily news on upcoming offers from many suppliers all over the world
        </p>

        <div className="mt-4 flex flex-col sm:flex-row justify-center items-center gap-2">
          <input
            type="email"
            placeholder="Email"
            className="w-full sm:w-72 px-4 py-2 border rounded-md outline-none"
          />
          <button className="bg-blue-600 text-white px-5 py-2 rounded-md">
            Subscribe
          </button>
        </div>
      </div>

      {/* Footer Links */}
      <div className="bg-white py-10 px-6">
        <div className="container mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 md:col-span-1">
          <div className="flex">  <FaShoppingBag className="text-blue-600 text-2xl" />
          <h3 className="font-semibold text-blue-600 mb-2"> Brand</h3></div>  
            <p className="text-sm text-gray-500 mb-3">
              Best information about the company goes here but now lorem ipsum is
            </p>

            <div className="flex gap-3 text-gray-400">
              <FaFacebookF />
              <FaTwitter />
              <FaLinkedinIn />
              <FaInstagram />
              <FaYoutube />
            </div>
          </div>

          {/* About */}
          <div>
            <h4 className="font-medium mb-2">About</h4>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>About Us</li>
              <li>Find store</li>
              <li>Categories</li>
              <li>Blogs</li>
            </ul>
          </div>

          {/* Partnership */}
          <div>
            <h4 className="font-medium mb-2">Partnership</h4>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>About Us</li>
              <li>Find store</li>
              <li>Categories</li>
              <li>Blogs</li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="font-medium mb-2">Information</h4>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>Help Center</li>
              <li>Money Refund</li>
              <li>Shipping</li>
              <li>Contact us</li>
            </ul>
          </div>

          {/* For users */}
          <div>
            <h4 className="font-medium mb-2">For users</h4>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>Login</li>
              <li>Register</li>
              <li>Settings</li>
              <li>My Orders</li>
            </ul>
          </div>

          {/* Get app */}
          <div>
            <h4 className="font-medium mb-2">Get app</h4>
            <div className="flex flex-col gap-2">
              <button className="flex items-center gap-2 bg-black text-white px-3 py-2 rounded text-sm">
                <FaApple /> App Store
              </button>
              <button className="flex items-center gap-2 bg-black text-white px-3 py-2 rounded text-sm">
                <FaGooglePlay /> Google Play
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-gray-100 py-4 px-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
        <p>© 2023 Ecommerce.</p>
        <div className="flex items-center gap-2">
          <span>🇺🇸</span>
          <img src="https://flagcdn.com/w20/us.png"/>
          <span>English
          </span>
           <FaChevronUp className="text-gray-600 text-sm" />
        </div>
      </div>
    </div>
  );
}
