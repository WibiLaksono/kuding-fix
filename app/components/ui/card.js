"use client";

import { useRouter } from "next/navigation";

// Daftar gambar yang akan dipilih secara acak
const imageUrls = [
  "/camera.jpg",
  "/console.jpg",
  "/headphones.jpg",
  "/jaket.jpg",
  "/jekk.jpg",
  "/laptop.jpg",
  "/phone.jpg",
  "/shoes.jpg",
  "/speaker.jpg",
  "/watch.jpg"
];

// Fungsi untuk memilih gambar acak setiap kali Card dibuat
const getRandomImageUrl = () => {
  const randomIndex = Math.floor(Math.random() * imageUrls.length);
  return imageUrls[randomIndex];
};

// Fungsi untuk mendapatkan warna latar belakang berdasarkan kondisi
const getConditionColor = (condition) => {
  switch (condition.toLowerCase()) {
    case "new":
      return "bg-blue-500";
    case "used":
      return "bg-yellow-500";
    case "refurbished":
      return "bg-gray-500";
    default:
      return "bg-blue-500"; // Default color if condition is not recognized
  }
};

export default function Card({ id, productName, price, condition, address }) {
  const router = useRouter();
  const imageUrl = getRandomImageUrl();
  const conditionColor = getConditionColor(condition);

  const handleBuyNow = (event) => {
    event.stopPropagation();
    router.push(
      `/checkout?productId=${id}&name=${encodeURIComponent(productName)}&price=${encodeURIComponent(price)}&imageUrl=${encodeURIComponent(imageUrl)}`
    );
  };

  return (
    <div
      onClick={() => router.push(`/product/${id}`)}
      className="relative w-72 bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-all"
    >
      {/* Gambar Produk */}
      <div className="h-48 w-full relative">
        <img
          src={imageUrl}
          alt={productName}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Body Card */}
      <div className="p-4">
        {/* Nama Produk */}
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1 text-center">
          {productName || "Unknown Product"}
        </h3>

        {/* Harga */}
        <div className="flex justify-center items-center mt-2">
          <span className="text-xl font-bold text-red-600">{price}</span>
        </div>

        {/* Kondisi & Lokasi */}
        <div className="flex justify-between items-center text-sm mt-2">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${conditionColor}`}>
            {condition}
          </span>
          <span className="text-gray-600 text-xs">📍 {address || "Unknown Location"}</span>
        </div>

        {/* Tombol Aksi */}
        <div className="mt-4 flex gap-2">
          <button
            onClick={handleBuyNow}
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
