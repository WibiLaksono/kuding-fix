"use client";
import { useState } from "react";
import ProductList from "../../../components/ProductList";

export default function CatalogPage() {
  // Price range: minimum default 0, maksimum default empty string
  const [priceRange, setPriceRange] = useState([0, ""]);
  const [selectedSort, setSelectedSort] = useState("Default");
  const [selectedCategories, setSelectedCategories] = useState(new Set());

  // Data kategori disesuaikan dengan data produk dummy
  const categories = [
    { name: "Clothing", count: 1 },
    { name: "Electronics", count: 5 },
    { name: "Accessories", count: 3 },
  ];

  // Opsi sorting
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

  const handleCategoryToggle = (category) => {
    const newSelection = new Set(selectedCategories);
    if (newSelection.has(category)) {
      newSelection.delete(category);
    } else {
      newSelection.add(category);
    }
    setSelectedCategories(newSelection);
  };

  return (
    <div className="p-6">
      <h1 className="text-5xl font-extrabold text-center my-8 text-black drop-shadow-lg">
        🛍️ New Items 🛍️
      </h1>

      <div className="flex flex-col sm:flex-row gap-8">
        {/* Sidebar Filter */}
        <div className="w-full sm:w-64 space-y-8">
          {/* Filter Kategori */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">PRODUCT CATEGORY</h2>
            {categories.map((category) => (
              <div
                key={category.name}
                className="flex justify-between items-center cursor-pointer hover:bg-gray-100 p-2 rounded"
                onClick={() => handleCategoryToggle(category.name)}
              >
                <span
                  className={`${
                    selectedCategories.has(category.name)
                      ? "font-semibold text-blue-600"
                      : ""
                  }`}
                >
                  {category.name}
                </span>
                <span className="text-gray-500 text-sm">
                  {category.count}
                </span>
              </div>
            ))}
          </div>

          {/* Filter Harga */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">FILTER BY PRICE</h2>
            <div className="flex gap-2">
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) =>
                  setPriceRange([Number(e.target.value), priceRange[1]])
                }
                className="w-1/2 p-2 border rounded"
                placeholder="Min"
              />
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], e.target.value])
                }
                className="w-1/2 p-2 border rounded"
                placeholder="Max"
              />
            </div>
          </div>

          {/* Filter Sorting */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">ORDER BY</h2>
            {sortOptions.map((option) => (
              <div
                key={option}
                className={`p-2 cursor-pointer rounded ${
                  selectedSort === option
                    ? "bg-blue-100 text-blue-600"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => setSelectedSort(option)}
              >
                {option}
              </div>
            ))}
          </div>
        </div>

        {/* Daftar Produk */}
        <div className="flex-1">
          <ProductList
            selectedCategories={Array.from(selectedCategories)}
            priceRange={priceRange}
            sortOption={selectedSort}
          />
        </div>
      </div>
    </div>
  );
}
