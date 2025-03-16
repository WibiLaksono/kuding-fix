"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
// 1) Import the Card component
import Card from "../../components/card";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  // For preview purposes, we hardcode test data here.
  useEffect(() => {
    // Comment out the fetch code for now and set a sample product.
    setProduct({
      name: "Sample Product",
      imageUrl: "https://via.placeholder.com/400",
      description: "This is a sample product description for preview.",
      price: "49.99",
      reviewCount: 150,
    });
  }, [id]);

  if (!product) {
    return (
      <div className="bg-gray-100 min-h-screen text-black">
        <div className="container mx-auto px-4 py-10">
          <p>Loading product data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen text-black">

      {/* Main Product Section */}
      <div className="container mx-auto px-4 py-8 pt-36">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column: Product Image */}
          <div className="md:w-1/2 flex flex-col items-center">
            <img
              src={product.imageUrl || "https://via.placeholder.com/400"}
              alt={product.name}
              className="w-full max-w-md rounded-md object-cover"
            />
          </div>

          {/* Right Column: Product Details */}
          <div className="md:w-1/2">
            {/* Product Name */}
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

            {/* Example rating (static stars + review count) */}
            <div className="flex items-center mb-2">
              <span className="text-yellow-400 mr-2">★★★★☆</span>
              <span className="text-sm text-gray-600">
                ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <p className="text-xl text-green-600 font-semibold mb-4">
              ${product.price}
            </p>

            {/* Description */}
            <p className="mb-4 text-gray-700">{product.description}</p>

            {/* Quantity Selector (simple example) */}
            <div className="mb-4 flex items-center gap-4">
              <label className="text-sm text-gray-600">Quantity</label>
              <input
                type="number"
                min="1"
                defaultValue="1"
                className="border w-16 text-center"
              />
            </div>

            {/* Add to Cart Button */}
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Add to Cart
            </button>
          </div>
        </div>

        {/* Featured Products Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 2) Use <Card> for each featured product */}
            <Card
              productId="2"
              category="FLOWER"
              imageUrl="https://via.placeholder.com/150?text=Featured+1"
              productName="Featured Product 1"
              rating={4.5}
              reviewCount={100}
              strainType="Sativa"
              oldPrice="$80.00"
              newPrice="$60.00"
              unit="/gram"
            />
            <Card
              productId="3"
              category="FLOWER"
              imageUrl="https://via.placeholder.com/150?text=Featured+2"
              productName="Featured Product 2"
              rating={4.0}
              reviewCount={50}
              strainType="Indica"
              oldPrice="$100.00"
              newPrice="$75.00"
              unit="/gram"
            />
            <Card
              productId="4"
              category="FLOWER"
              imageUrl="https://via.placeholder.com/150?text=Featured+3"
              productName="Featured Product 3"
              rating={3.5}
              reviewCount={20}
              strainType="Hybrid"
              oldPrice="$60.00"
              newPrice="$45.00"
              unit="/gram"
            />
            <Card
              productId="5"
              category="FLOWER"
              imageUrl="https://via.placeholder.com/150?text=Featured+4"
              productName="Featured Product 4"
              rating={4.8}
              reviewCount={200}
              strainType="Sativa"
              oldPrice="$120.00"
              newPrice="$90.00"
              unit="/gram"
            />
          </div>
        </div>
      </div>

      {/* 20% Off Banner */}
      <div className="bg-gray-200 py-6 mt-10">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl font-bold mb-2">UNLOCK 20% OFF YOUR FIRST ORDER</h3>
          <p>Subscribe to our newsletter to get your discount code</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700">
            Sign Up
          </button>
        </div>
      </div>

    </div>
  );
}
