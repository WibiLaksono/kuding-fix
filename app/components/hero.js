"use client";

export default function Hero() {
  return (
    <>
      {/* Hero Section */}
      <div className="relative w-full h-[90vh] flex items-center justify-start bg-cover bg-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?auto=format&fit=crop&w=1600&q=80')",
          }}
        ></div>

        {/* Shadow Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950 to-transparent"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-start justify-center px-20 h-full text-white max-w-[50rem]">
          {/* Title */}
          <p className="text-yellow-400 uppercase tracking-wide text-sm font-semibold">
            Best Online Shopping
          </p>
          <h1 className="text-5xl font-bold leading-tight mt-2">
            BEST SECONDHAND TO BUY!
          </h1>
          <p className="text-lg mt-3 font-light">Reliable & Trusted</p>

          {/* Promo Info */}
          <p className="mt-4 text-lg">
            <span className="font-bold">Get 25% off</span> | Free Shipping
          </p>

          {/* Button */}
          <button className="mt-6 bg-yellow-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-yellow-600 transition-all">
            Shop All
          </button>
        </div>
      </div>

      {/* Feature Section */}
      <div className="w-full bg-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Feature 1 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 flex items-center justify-center bg-white rounded-full shadow-lg">
                <img src="/icons/shipping.svg" alt="Shipping" className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-semibold mt-4">Reliable Shipping</h3>
              <p className="text-gray-600 text-sm mt-2">
                Kuding wants to make sure the item you buy has the quality you want by checking it directly with the buyer.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 flex items-center justify-center bg-white rounded-full shadow-lg">
                <img src="/icons/payment.svg" alt="Payment" className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-semibold mt-4">You’re Safe With Us</h3>
              <p className="text-gray-600 text-sm mt-2">
                Our secure payment system accepts the most common forms of payments making the checkout process quicker!
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 flex items-center justify-center bg-white rounded-full shadow-lg">
                <img src="/icons/quality.svg" alt="Quality" className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-semibold mt-4">Best Quality & Pricing</h3>
              <p className="text-gray-600 text-sm mt-2">
                Here at Kuding, we take pride in the quality of our products and service. Our prices are set to ensure you get the best.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
