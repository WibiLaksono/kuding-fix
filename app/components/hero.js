"use client"

export default function Hero() {
    return (
        <div 
            className="relative w-full h-screen bg-cover bg-center" 
            style={{ 
                backgroundImage: "url('https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?auto=format&fit=crop&w=1600&q=80')"
            }}
        >
            {/* Shadow Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-start justify-center px-20 h-full text-white max-w-[50rem]">
                {/* Title */}
                <p className="text-yellow-400 uppercase tracking-wide text-sm font-semibold">Best Seller</p>
                <h1 className="text-5xl font-bold leading-tight mt-2">
                    Ayo beli dan jual barangmu!
                </h1>
                <p className="text-lg mt-3 font-light">Vitamins & Supplements</p>

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
    )
}
