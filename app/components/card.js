"use client";

export default function Card({
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
  return (
    <div className="relative w-64 bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
      {/* Kategori di pojok kiri atas */}
      <div className="absolute top-2 left-2 bg-yellow-400 text-white px-2 py-1 rounded text-xs font-bold">
        {category}
      </div>

      {/* Jika barang out of stock, munculkan label di atas gambar */}
      {isOutOfStock && (
        <div className="absolute top-16 bg-gray-200 text-gray-700 text-sm px-2 py-1 rounded">
          Out of Stock
        </div>
      )}

      {/* Gambar Produk */}
      <img
        src={imageUrl}
        alt="Product"
        className="h-36 w-auto object-cover mt-4"
      />

      {/* Nama Produk */}
      <h2 className="mt-4 text-center font-bold text-lg text-gray-800">
        {productName}
      </h2>

      {/* Rating dan Jumlah Review */}
      <div className="flex items-center justify-center gap-1 mt-2">
        {/* Versi teks saja (tanpa icon) */}
        <span className="text-yellow-400 text-sm">★★★★☆</span>

        <span className="text-sm text-gray-600 ml-2">({reviewCount})</span>
      </div>

      {/* Strain Type (misal: Sativa 100%, Indica 70%, dsb.) */}
      <div className="text-sm text-gray-500 mt-1">{strainType}</div>

      {/* Harga (lama, diskon, dan satuan) */}
      <div className="mt-3 flex items-center justify-center gap-2">
        <span className="text-red-500 line-through text-sm">{oldPrice}</span>
        <span className="text-green-600 text-xl font-bold">{newPrice}</span>
        <span className="text-gray-500 text-sm">{unit}</span>
      </div>

      {/* Tombol Add to Cart */}
      <button
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
  );
}
