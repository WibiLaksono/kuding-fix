"use client";

import Link from "next/link";
import { useState } from "react";

export default function Card(props) {
  const {
    productId,
    productName,
    category,
    imageUrl,
    isOutOfStock,
    rating,
    reviewCount,
    condition,
    oldPrice,
    newPrice,
    unit,
    isPromo,
    promoLabel,
  } = props;

  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = (event) => {
    event.preventDefault(); // Mencegah navigasi

    console.log("Product Clicked:", props); // Debugging

    if (!productId || !productName || !newPrice) {
      console.error("Product data is missing:", { productId, productName, newPrice });
      alert("Error: Product data is incomplete.");
      return;
    }

    const cartItem = {
      id: productId,
      name: productName,
      imageUrl,
      price: newPrice,
      quantity,
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItemIndex = cart.findIndex((item) => item.id === productId);

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += quantity;
    } else {
      cart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${productName} added to cart!`);
  };

  return (
    <Link href={`/product/${productId}`} passHref>
      <div className="relative w-64 bg-white rounded-lg shadow-md p-4 cursor-pointer transition-transform transform hover:scale-105">
        
        {isPromo && (
          <div className="absolute top-2 right-2 bg-yellow-400 text-white px-2 py-1 rounded text-xs font-bold">
            {promoLabel}
          </div>
        )}

        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
            <span className="text-white font-semibold text-sm px-3 py-1 bg-gray-700 rounded-full">
              Out Of Stock
            </span>
          </div>
        )}

        <img
          src={imageUrl}
          alt={productName}
          className="h-36 w-full object-cover rounded-t-lg"
        />

        <p className="text-gray-400 text-xs mt-2">{category}</p>

        <h2 className="mt-1 text-center font-semibold text-lg text-gray-800">
          {productName || "Unknown Product"}
        </h2>

        <div className="flex items-center justify-center gap-1 mt-2 text-sm">
          <span className="text-yellow-400">⭐ {rating}</span>
          <span className="text-gray-600">| {reviewCount} Reviews</span>
        </div>

        <div
          className={`text-xs font-semibold px-2 py-1 rounded-full w-fit mx-auto mt-2 ${
            condition === "New" ? "bg-blue-100 text-blue-600" : "bg-green-100 text-green-600"
          }`}
        >
          {condition}
        </div>

        <div className="mt-3 flex items-center justify-center gap-2">
          {oldPrice && <span className="text-gray-400 line-through text-sm">${oldPrice}</span>}
          <span className="text-red-500 text-lg font-bold">${newPrice}</span>
          {unit && <span className="text-gray-500 text-sm">{unit}</span>}
        </div>

        <button
          disabled={isOutOfStock}
          onClick={handleAddToCart}
          className={`mt-4 w-full py-2 rounded text-white font-semibold transition-all ${
            isOutOfStock
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {isOutOfStock ? "Out of Stock" : `Add to Cart - ${newPrice}`}
        </button>
      </div>
    </Link>
  );
}
