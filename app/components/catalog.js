"use client";

import { useEffect, useState } from "react";
import Card from "./ui/card";
import clsx from "clsx";

// Dummy data produk
const products = [
    {
      id: 1,
      name: "Mix And Match Shatter/Budder 28g (4 X 7G)",
      category: "car",
      imageUrl: "https://via.placeholder.com/150",
      isOutOfStock: true,
      rating: 4.6,
      reviewCount: 135,
      condition: "New",
      oldPrice: "$200.00",
      newPrice: "$102.00",
      unit: "",
      isPromo: false,
      promoLabel: "",
    },
    {
      id: 2,
      name: "2 Oz Deal Watermelon Zkittles + Purple Gushers",
      category: "car",
      imageUrl: "https://via.placeholder.com/150",
      isOutOfStock: false,
      rating: 4.6,
      reviewCount: 135,
      condition: "Secondhand",
      oldPrice: "",
      newPrice: "$80.00",
      unit: "/ gram",
      isPromo: false,
      promoLabel: "",
    },
    {
      id: 3,
      name: "2 Oz Deal Watermelon Zkittles + Purple Gushers",
      category: "motorcycle",
      imageUrl: "https://via.placeholder.com/150",
      isOutOfStock: false,
      rating: 4.6,
      reviewCount: 135,
      condition: "Secondhand",
      oldPrice: "",
      newPrice: "$80.00",
      unit: "/ gram",
      isPromo: false,
      promoLabel: "",
    },
    {
      id: 4,
      name: "2 Oz Deal Ahi Tuna + Master Tuna",
      category: "motorcycle",
      imageUrl: "https://via.placeholder.com/150",
      isOutOfStock: false,
      rating: 4.6,
      reviewCount: 135,
      condition: "New",
      oldPrice: "$200.00",
      newPrice: "$120.00",
      unit: "",
      isPromo: true,
      promoLabel: "$60 ounce",
    },
  ];
  
  const categories = ["bicycle", "motorcycle", "car", "laptop", "handphone"];
  
  export default function Catalog() {
    const [activeCategory, setActiveCategory] = useState("bicycle");

    useEffect(() => {
        localStorage.setItem("catalog", JSON.stringify(products));
      }, []);
      
  
    return (
      <div className="max-w-6xl mx-auto px-6">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center my-6">CHOOSE YOUR STUFF</h1>
  
        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={clsx(
                "px-4 py-2 rounded-full border transition-all",
                activeCategory === cat
                  ? "bg-green-100 text-green-700 border-green-700"
                  : "border-gray-300 text-gray-700 hover:bg-gray-200"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
  
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products
            .filter((product) => product.category.toLowerCase() === activeCategory.toLowerCase())
            .map((product) => (
              <Card
                key={product.id}
                productName={product.name}
                productId={product.id}
                category={product.category}
                imageUrl={product.imageUrl}
                isOutOfStock={product.isOutOfStock}
                rating={product.rating}
                reviewCount={product.reviewCount}
                condition={product.condition}
                oldPrice={product.oldPrice}
                newPrice={product.newPrice}
                unit={product.unit}
                isPromo={product.isPromo}
                promoLabel={product.promoLabel}
              />
            ))}
        </div>
      </div>
    );
  }
  