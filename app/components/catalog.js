"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import Card from "./ui/card";

export default function Catalog() {
  const [listings, setListings] = useState([]);
  const [activeCondition, setActiveCondition] = useState("new");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

  useEffect(() => {
    // Fetch data from backend
    const fetchData = async () => {
      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
        const response = await fetch(`${baseUrl}/listings`);
        const data = await response.json();
        setListings(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Filter listings berdasarkan condition
  const filteredListings = listings.filter(
    (listing) => listing.condition.toLowerCase() === activeCondition.toLowerCase()
  );

  // Hitung total halaman
  const totalPages = Math.ceil(filteredListings.length / itemsPerPage);

  // Dapatkan data untuk halaman saat ini
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedListings = filteredListings.slice(startIndex, endIndex);

  return (
    <div className="max-w-6xl mx-auto px-6">
      <h1 className="text-4xl font-bold text-center my-6">CHOOSE YOUR STUFF</h1>

      {/* Tombol Filter Condition */}
      <div className="flex justify-center gap-4 mb-6">
        {["new", "Used", "Refurbished"].map((condition) => (
          <button
            key={condition}
            onClick={() => {
              setActiveCondition(condition);
              setCurrentPage(1); // Reset halaman ke awal saat filter berubah
            }}
            className={clsx(
              "px-4 py-2 rounded-full border transition-all",
              activeCondition === condition
                ? "bg-green-100 text-green-700 border-green-700"
                : "border-gray-300 text-gray-700 hover:bg-gray-200"
            )}
          >
            {condition.charAt(0).toUpperCase() + condition.slice(1)}
          </button>
        ))}
      </div>

      {/* Menampilkan Kartu Produk */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedListings.map((listing) => (
          <Card
            key={listing.id}
            id={listing.id}
            productName={listing.title}
            condition={listing.condition}
            description={listing.description}
            price={`$${listing.price}`}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2 border rounded">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
