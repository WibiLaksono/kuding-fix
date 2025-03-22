"use client";

import Link from "next/link";
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

export default function Card(props) {
  const { id, productName, condition, description, price } = props;
  const router = useRouter();

  // Set gambar secara acak setiap kali card dirender
  const imageUrl = getRandomImageUrl();

  const handleBuyNow = (event) => {
    event.stopPropagation();
    router.push(
      `/checkout?productId=${id}&name=${encodeURIComponent(productName)}&price=${encodeURIComponent(price)}&imageUrl=${encodeURIComponent(imageUrl)}`
    );
  };

  return (
    <div
      onClick={() => router.push(`/product/${id}`)}
      className="relative w-64 bg-white rounded-lg shadow-md p-4 cursor-pointer transition-transform transform hover:scale-105"
    >
      {/* Gambar Produk */}
      <img
        src={imageUrl} // Selalu menggunakan gambar acak
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

      {/* Tombol Buy Now */}
      <button
        onClick={handleBuyNow}
        className="mt-4 w-full py-2 rounded text-white font-semibold transition-all bg-blue-500 hover:bg-blue-600"
      >
        Buy Now - {price}
      </button>
    </div>
  );
}
