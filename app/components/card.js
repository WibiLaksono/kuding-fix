"use client";

import Link from "next/link";

export default function Card({
  productId = "1", // Pass productId as a prop
  category = "FLOWER",
  imageUrl = "https://via.placeholder.com/200?text=Product",
  isOutOfStock = false,
  productName = "2 Oz Deal Watermelon Zkittles + Purple Gushers",
  rating = 4.5,
  reviewCount = 135,
  strainType = "Sativa 100%",
  oldPrice = "$100.00",
  newPrice = "$80.00",
  unit = "/ gram",
}) {
  // Prevent Add to Cart from navigating
  const handleAddToCartClick = (e) => {
    e.stopPropagation();
    // Your add-to-cart logic
    console.log("Add to Cart clicked for product:", productId);
  };

  return (
    <Link href={`/product/${productId}`}>
      <div className="relative w-64 bg-white rounded-lg shadow-md p-4 flex flex-col items-center cursor-pointer">
        {/* Category Label */}
        <div className="absolute top-2 left-2 bg-yellow-400 text-white px-2 py-1 rounded text-xs font-bold">
          {category}
        </div>

        {/* Out of Stock Label */}
        {isOutOfStock && (
          <div className="absolute top-16 bg-gray-200 text-gray-700 text-sm px-2 py-1 rounded">
            Out of Stock
          </div>
        )}

        {/* Product Image */}
        <img
          src={imageUrl}
          alt="Product"
          className="h-36 w-auto object-cover mt-4"
        />

        {/* Product Name */}
        <h2 className="mt-4 text-center font-bold text-lg text-gray-800">
          {productName}
        </h2>

        {/* Rating and Review Count */}
        <div className="flex items-center justify-center gap-1 mt-2">
          <span className="text-yellow-400 text-sm">★★★★☆</span>
          <span className="text-sm text-gray-600 ml-2">({reviewCount})</span>
        </div>

        {/* Strain Type */}
        <div className="text-sm text-gray-500 mt-1">{strainType}</div>

        {/* Pricing */}
        <div className="mt-3 flex items-center justify-center gap-2">
          <span className="text-red-500 line-through text-sm">{oldPrice}</span>
          <span className="text-green-600 text-xl font-bold">{newPrice}</span>
          <span className="text-gray-500 text-sm">{unit}</span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCartClick}
          disabled={isOutOfStock}
          className={`mt-4 px-4 py-2 rounded text-white font-semibold transition-colors ${
            isOutOfStock
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {isOutOfStock ? "Unavailable" : "Add to Cart"}
        </button>
      </div>
    </Link>
  );
}
