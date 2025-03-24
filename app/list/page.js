"use client";
import { useState, useEffect } from "react";
import ProductList from "../components/ProductList";
import { useSearchParams } from "next/navigation";

export default function CatalogPage() {
  const [priceRange, setPriceRange] = useState([0, ""]);
  const [selectedSort, setSelectedSort] = useState("Default");
  const [selectedConditions, setSelectedConditions] = useState(new Set());
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false); // Untuk toggle filter di mobile
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

  const condition = ["New", "Used", "Refurbished"];
  const sortOptions = [
    "Default",
    "Price: Low to High",
    "Price: High to Low",
    "Review Count",
    "Popularity",
    "Average Rating",
    "Newness",
    "Product Name",
    "Random Products",
  ];

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };
    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  const handleConditionToggle = (condition) => {
    const newSelection = new Set(selectedConditions);
    newSelection.has(condition) ? newSelection.delete(condition) : newSelection.add(condition);
    setSelectedConditions(newSelection);
  };

  return (
    <div className="p-6">
      <h1 className="text-5xl font-extrabold text-center my-8 text-black drop-shadow-lg">
        🛍️ New Items 🛍️
      </h1>

      {/* Mobile Filter (Dropdown) */}
      {isMobile && (
        <div className="mb-4">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg"
          >
            {showDropdown ? "Hide Filters" : "Show Filters"}
          </button>
          {showDropdown && (
            <div className="mt-4 bg-white shadow-md p-4 rounded-lg">
              <FilterSection
                selectedConditions={selectedConditions}
                handleConditionToggle={handleConditionToggle}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                selectedSort={selectedSort}
                setSelectedSort={setSelectedSort}
              />
            </div>
          )}
        </div>
      )}

      {/* Tablet Filter (Row) */}
      {isTablet && (
        <div className="flex flex-wrap gap-4 mb-4 p-4 bg-gray-100 rounded-lg">
          <FilterSection
            selectedConditions={selectedConditions}
            handleConditionToggle={handleConditionToggle}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedSort={selectedSort}
            setSelectedSort={setSelectedSort}
          />
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Desktop Filter (Sidebar) */}
        {!isMobile && !isTablet && (
          <div className="w-64 space-y-8">
            <FilterSection
              selectedConditions={selectedConditions}
              handleConditionToggle={handleConditionToggle}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedSort={selectedSort}
              setSelectedSort={setSelectedSort}
            />
          </div>
        )}

        {/* Product List */}
        <div className="flex-1">
          <ProductList
            searchQuery={searchQuery}
            selectedConditions={Array.from(selectedConditions)}
            priceRange={priceRange}
            sortOption={selectedSort}
          />
        </div>
      </div>
    </div>
  );
}

// Komponen FilterSection untuk menghindari duplikasi kode
function FilterSection({ selectedConditions, handleConditionToggle, priceRange, setPriceRange, selectedSort, setSelectedSort }) {
  const condition = ["New", "Used", "Refurbished"];
  const sortOptions = [
    "Default",
    "Price: Low to High",
    "Price: High to Low",
    "Product Name",
    "Random Products",
  ];

  return (
    <>
      {/* Product Condition */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-2">PRODUCT CONDITION</h2>
        {condition.map((cond) => (
          <div
            key={cond}
            className="flex justify-between items-center cursor-pointer hover:bg-gray-100 p-2 rounded"
            onClick={() => handleConditionToggle(cond)}
          >
            <span className={selectedConditions.has(cond) ? "font-semibold text-blue-600" : ""}>
              {cond}
            </span>
          </div>
        ))}
      </div>

      {/* Price Filter */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-2">FILTER BY PRICE</h2>
        <div className="flex gap-2">
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
            className="w-1/2 p-2 border rounded"
            placeholder="Min"
          />
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], e.target.value])}
            className="w-1/2 p-2 border rounded"
            placeholder="Max"
          />
        </div>
      </div>

      {/* Sorting */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-2">ORDER BY</h2>
        {sortOptions.map((option) => (
          <div
            key={option}
            className={`p-2 cursor-pointer rounded ${
              selectedSort === option ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
            }`}
            onClick={() => setSelectedSort(option)}
          >
            {option}
          </div>
        ))}
      </div>
    </>
  );
}
