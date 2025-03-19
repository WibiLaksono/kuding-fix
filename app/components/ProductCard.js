"use client";

import { useRouter } from "next/navigation";

export default function ProductCard({ product = {} }) {
  const router = useRouter();

  // Destructure props dengan default value
  const {
    id = "",
    title = "Unknown Product",
    price = 0,
    imageUrl = "./phone.jpg",
    condition = "New",
    location = "Unknown Location",
    rating = 0,
    discount = 0,
    isFeatured = false,
  } = product;

  const handleClick = () => {
    router.push(`/product/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="relative w-72 bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-all"
    >
      {/* Badge Featured */}
      {isFeatured && (
        <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
          Featured
        </div>
      )}

      {/* Gambar Produk */}
      <div className="h-48 w-full relative">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
        
        {/* Badge Diskon */}
        {discount > 0 && (
          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-md text-sm">
            {discount}% OFF
          </div>
        )}
      </div>

      {/* Body Card */}
      <div className="p-4">
        {/* Title dan Rating */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
            {title}
          </h3>
          <div className="flex items-center gap-1">
            <span className="text-yellow-400">★</span>
            <span className="text-sm text-gray-600">{rating || 'New'}</span>
          </div>
        </div>

        {/* Harga */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl font-bold text-red-600">
            ${price - (price * discount)/100}
          </span>
          {discount > 0 && (
            <span className="text-gray-400 line-through text-sm">
              ${price}
            </span>
          )}
        </div>

        {/* Lokasi dan Kondisi */}
        <div className="flex justify-between items-center text-sm">
          <span className="flex items-center gap-1">
            📍{location}
          </span>
          <span className={`px-2 py-1 rounded-full ${
            condition === "New" 
              ? "bg-blue-100 text-blue-600" 
              : "bg-gray-100 text-gray-600"
          }`}>
            {condition}
          </span>
        </div>

        {/* Tombol Aksi */}
        <div className="mt-4 flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/checkout?productId=${id}`);
            }}
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Buy Now
          </button>
          <button
            className="p-2 border rounded-lg hover:bg-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            ❤️
          </button>
        </div>
      </div>
    </div>
  );
}