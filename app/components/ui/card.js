"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Card(props) {
  const { id, productName, imageUrl, condition, description, price } = props;
  const router = useRouter(); // Gunakan useRouter untuk navigasi

  const handleBuyNow = (event) => {
    event.stopPropagation(); // Mencegah event bubbling agar tidak trigger link luar
    router.push(
      `/checkout?productId=${id}&name=${encodeURIComponent(productName)}&price=${encodeURIComponent(price)}&imageUrl=${encodeURIComponent(imageUrl)}`
    );
  };

  return (
    <div
      onClick={() => router.push(`/product/${id}`)} // Klik di mana saja akan menuju halaman produk
      className="relative w-64 bg-white rounded-lg shadow-md p-4 cursor-pointer transition-transform transform hover:scale-105"
    >
      <img
        src={imageUrl}
        alt={productName}
        className="h-36 w-full object-cover rounded-t-lg"
      />

      <h2 className="mt-1 text-center font-semibold text-lg text-gray-800">
        {productName || "Unknown Product"}
      </h2>

      <p className="text-gray-400 text-xs mt-2">{description}</p>

      <div
        className={`text-xs font-semibold px-2 py-1 rounded-full w-fit mx-auto mt-2 ${
          condition === "New" ? "bg-blue-100 text-blue-600" : "bg-green-100 text-green-600"
        }`}
      >
        {condition}
      </div>

      <div className="mt-3 flex items-center justify-center gap-2">
        <span className="text-red-500 text-lg font-bold">{price}</span>
      </div>

      {/* Buy Now Button */}
      <button
        onClick={handleBuyNow}
        className="mt-4 w-full py-2 rounded text-white font-semibold transition-all bg-blue-500 hover:bg-blue-600"
      >
        Buy Now - {price}
      </button>
    </div>
  );
}
