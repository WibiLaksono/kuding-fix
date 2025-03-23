"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import Card from "./ui/card";

export default function Catalog() {
  const [listings, setListings] = useState([]);
  const [activeCondition, setActiveCondition] = useState("new");
  const [currentPage, setCurrentPage] = useState(1);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    // Fetch data from backend
    const fetchData = async () => {
      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
        const response = await fetch(`${baseUrl}/listing`);
        const data = await response.json();

        console.log("Fetched Listings:", data);
        setListings(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    // Update screen size state
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const itemsPerPage = isSmallScreen ? 8 : 16;

  // Filter listings based on condition
  const filteredListings = listings.filter(
    (listing) =>
      listing.condition.toLowerCase() === activeCondition.toLowerCase()
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredListings.length / itemsPerPage);

  // Get data for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedListings = filteredListings.slice(startIndex, endIndex);

  return (
    <div className="mx-auto px-6">
      <h1 className="text-4xl font-bold text-center my-6">RECOMMENDATION STUFF FOR YOU 💖</h1>
      {/* Filter Condition Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        {["new", "Used", "Refurbished"].map((condition) => (
          <button
            key={condition}
            onClick={() => {
              setActiveCondition(condition);
              setCurrentPage(1); // Reset page to the beginning when filter changes
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

          {/* Display Product Cards */}
          <div className="flex flex-wrap justify-center gap-6">
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
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
