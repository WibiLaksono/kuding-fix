"use client";

import { FiCheckCircle, FiCreditCard, FiTruck } from "react-icons/fi";

// Komponen reusable untuk feature cards
function FeatureCard({ icon, title, text }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 flex items-center justify-center bg-white rounded-full shadow-lg">
        {icon}
      </div>
      <h3 className="text-base md:text-lg font-semibold mt-4">{title}</h3>
      <p className="text-gray-600 text-xs md:text-sm mt-2">{text}</p>
    </div>
  );
}

export default function Hero() {
  return (
    <>
      {/* Hero Section */}
      <div className="relat</div>ive w-full h-[90vh] flex items-center justify-start bg-cover bg-center">
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
        <div className="relative z-10 flex flex-col items-start justify-center px-6 md:px-20 h-full text-white max-w-[90%] md:max-w-[50rem]">
          {/* Title */}
          <p className="text-yellow-400 uppercase tracking-wide text-xs md:text-sm font-semibold">
            Best Online Shopping
          </p>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mt-2">
            BEST SECONDHAND TO BUY!
          </h1>
          <p className="text-sm md:text-lg mt-3 font-light">
            Reliable & Trusted
          </p>

          {/* Promo Info */}
          <p className="mt-4 text-sm md:text-lg">
            <span className="font-bold">Get 25% off</span> | Free Shipping
          </p>

          {/* Button */}
          <button
            onClick={() => (window.location.href = "/list")}
            className="mt-6 bg-yellow-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-full text-sm md:text-lg font-semibold hover:bg-yellow-600 transition-all"
          >
            Shop All
          </button>
        </div>
      </div>
      {/* Feature Section */}
      <div className="w-full bg-gray-100 py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Feature 1: Shipping */}
            <FeatureCard
              icon={<FiTruck className="w-10 h-10 text-blue-600" />}
              title="Reliable Shipping"
              text="LOAX wants to make sure the item you buy has the quality you want by checking it directly with the buyer."
            />

            {/* Feature 2: Payment */}
            <FeatureCard
              icon={<FiCreditCard className="w-10 h-10 text-green-600" />}
              title="You’re Safe With Us"
              text="Our secure payment system accepts the most common forms of payments making the checkout process quicker!"
            />

            {/* Feature 3: Quality */}
            <FeatureCard
              icon={<FiCheckCircle className="w-10 h-10 text-yellow-600" />}
              title="Best Quality & Pricing"
              text="Here at LOAX, we take pride in the quality of our products and service. Our prices are set to ensure you get the best."
            />
          </div>
        </div>
      </div>
    </>
  );
}
