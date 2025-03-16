"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Button } from "../../components/ui/button";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!id) return;

    const rawCatalog = localStorage.getItem("catalog");
    console.log("Raw catalog from localStorage:", rawCatalog);

    const catalog = JSON.parse(rawCatalog) || [];
    const selectedProduct = catalog.find((p) => p.id === parseInt(id)); // Ganti productId -> id

    if (selectedProduct) {
      setProduct(selectedProduct);
    } else {
      console.error("Product not found for ID:", id);
    }
  }, [id]);

  if (!product) {
    return <div className="text-center py-10">Loading product data...</div>;
  }

  // Handle Buy Now
  const handleBuyNow = () => {
    router.push(
      `/checkout?productId=${product.id}&name=${encodeURIComponent(
        product.productName
      )}&price=${encodeURIComponent(
        product.price
      )}&imageUrl=${encodeURIComponent(product.imageUrl)}&quantity=${quantity}`
    );
  };

  return (
    <div className="bg-gray-100 container mx-auto px-4 py-20 flex flex-col md:flex-row gap-8">
      <div className="md:w-1/2 flex flex-col items-center text-black">
        <Image
          src={product.imageUrl}
          alt={product.productName}
          width={400}
          height={400}
          className="rounded-md"
        />
      </div>
      <div className="md:w-1/2 text-black">
        <h1 className="text-3xl font-bold">{product.productName}</h1>
        <div className="mt-2 bg-gray-100 p-4 rounded-md">
          <p className="font-semibold">Condition:</p>
          <p>{product.condition}</p>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-green-600 text-2xl font-bold">
            {product.price}
          </span>
        </div>
        <div className="mt-6 flex items-center gap-4">
          <Button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
            <FaMinus />
          </Button>
          <span className="text-xl">{quantity}</span>
          <Button onClick={() => setQuantity((q) => q + 1)}>
            <FaPlus />
          </Button>
        </div>
        <Button
          className="bg-blue-600 text-white px-6 py-3 rounded-md mt-4"
          onClick={handleBuyNow}
        >
          Buy Now - {product.price * quantity}
        </Button>
      </div>
    </div>
  );
}
