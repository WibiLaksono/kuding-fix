"use client";

import { useState, useEffect, useMemo } from "react";
import Card from "./ui/card"; // Gunakan komponen Card yang sesuai

export default function ProductList({ searchQuery, selectedConditions, priceRange, sortOption }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9; // Jumlah produk per halaman

  useEffect(() => {
    async function fetchProducts() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
        const url = `${baseUrl}/listing${searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : ""}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        console.log("Fetched Listings:", data);
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [searchQuery]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const finalPrice = product.price - (product.price * (product.discount || 0)) / 100;
      const productCondition = product.condition || ""; // Pastikan field 'condition' ada
      const inCondition =
        selectedConditions.length === 0 || selectedConditions.includes(productCondition);
      const inPriceRange =
        finalPrice >= priceRange[0] && (priceRange[1] === "" || finalPrice <= priceRange[1]);
      return inCondition && inPriceRange;
    });
  }, [products, selectedConditions, priceRange]);

  const sortedProducts = useMemo(() => {
    let sorted = [...filteredProducts];
    switch (sortOption) {
      case "Price: Low to High":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "Price: High to Low":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "Review Count":
        sorted.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case "Popularity":
        sorted.sort((a, b) => b.popularity - a.popularity);
        break;
      case "Average Rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "Newness":
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "Product Name":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "Random Products":
        sorted.sort(() => Math.random() - 0.5);
        break;
      default:
        break;
    }
    return sorted;
  }, [filteredProducts, sortOption]);

  // Hitung indeks awal & akhir untuk pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const paginatedListings = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Fungsi untuk mengubah halaman
  const nextPage = () => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  const prevPage = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6">
      {/* Grid untuk daftar produk */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {paginatedListings.map((listing) => (
          <Card
            key={listing.id}
            id={listing.id}
            productName={listing.title}
            condition={listing.condition}
            description={listing.description}
            address={listing.User?.address || "Address not available"}
            price={`$${listing.price}`}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 space-x-4">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black font-semibold rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-lg font-semibold">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black font-semibold rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
