"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";

const imageUrls = [
  "/camera.jpg",
  "/console.jpg",
  "/headphones.jpg",
  "/jacket.jpg",
  "/jack.jpg",
  "/laptop.jpg",
  "/phone.jpg",
  "/shoes.jpg",
  "/speaker.jpg",
  "/watch.jpg"
];

function getRandomImageUrl() {
  const randomIndex = Math.floor(Math.random() * imageUrls.length);
  return imageUrls[randomIndex];
}

export default function ProductDetailPage() {
  const { id } = useParams();
  console.log("Product ID from URL:", id);
  const router = useRouter();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    console.log("Fetching product with ID:", id);
    if (!id) return;
  
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/listing/${id}`);
        console.log("Fetch Response Status:", res.status);
        const data = await res.json();
        if (res.status === 404) {
          console.error("Product not found for ID:", id);
          setProduct(null);
          return;
        }
        if (res.status !== 200) {
          console.error("Unexpected error:", res.status);
          return;
        }
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);
  

  if (!product) {
    return <div className="text-center py-10">Loading product data...</div>;
  }

  const handleBuyNow = () => {
    router.push(
      `/checkout?productId=${product.id}&name=${encodeURIComponent(
        product.title
      )}&price=${encodeURIComponent(
        product.price
      )}&imageUrl=${encodeURIComponent(product.imageUrl)}`
    );
  };

  return (
    <div className="bg-gray-100 container mx-auto px-4 py-20 flex flex-col md:flex-row gap-8">
      <div className="md:w-1/2 flex flex-col items-center text-black">
        <Image
          src={getRandomImageUrl()}
          alt={product.title}
          width={400}
          height={400}
          className="rounded-md"
        />
      </div>
      <div className="md:w-1/2 text-black">
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <div className="mt-2 bg-gray-100 p-4 rounded-md">
          <p className="font-semibold">Condition:</p>
          <p>{product.condition}</p>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-green-600 text-2xl font-bold">
            {product.price}
          </span>
        </div>
        <Button
          className="bg-blue-600 text-white px-6 py-3 rounded-md mt-4"
          onClick={handleBuyNow}
        >
          Buy Now - {product.price}
        </Button>
      </div>
    </div>
  );
}