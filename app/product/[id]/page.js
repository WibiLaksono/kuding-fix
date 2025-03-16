"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { FaStar, FaPlus, FaMinus } from "react-icons/fa";
import { Button } from "../../components/ui/button";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!id) return;

    const catalog = JSON.parse(localStorage.getItem("catalog")) || [];
    const selectedProduct = catalog.find((p) => p.id === parseInt(id));

    if (selectedProduct) {
      setProduct(selectedProduct);
    } else {
      console.error("Product not found for ID:", id);
    }
  }, [id]);

  if (!product) {
    return <div className="text-center py-10">Loading product data...</div>;
  }

  return (
    <div className="bg-gray-100 container mx-auto px-4 py-20 flex flex-col md:flex-row gap-8">
      <div className="md:w-1/2 flex flex-col items-center text-black">
        <Image src={product.imageUrl} alt={product.name} width={400} height={400} className="rounded-md" />
      </div>
      <div className="md:w-1/2 text-black">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <div className="flex items-center gap-2 mt-2 text-yellow-500">
          <FaStar /> <span>{product.rating} / 5</span>
          <span className="text-gray-500">({product.reviewCount} Reviews)</span>
        </div>
        <div className="mt-2">
          {product.oldPrice && <span className="line-through text-gray-500">{product.oldPrice}</span>}
          <span className="text-green-600 text-2xl font-bold ml-2">{product.newPrice}</span>
        </div>
        <div className="mt-4 bg-gray-100 p-4 rounded-md">
          <p className="font-semibold">Category:</p>
          <p>{product.category}</p>
        </div>
        <div className="mt-2 bg-gray-100 p-4 rounded-md">
          <p className="font-semibold">Condition:</p>
          <p>{product.condition}</p>
        </div>
        {product.isPromo && (
          <div className="mt-2 bg-yellow-100 p-4 rounded-md">
            <p className="font-semibold">Promo:</p>
            <p>{product.promoLabel}</p>
          </div>
        )}
        <div className="mt-6 flex items-center gap-4">
          <Button onClick={() => setQuantity((q) => Math.max(1, q - 1))}><FaMinus /></Button>
          <span className="text-xl">{quantity}</span>
          <Button onClick={() => setQuantity((q) => q + 1)}><FaPlus /></Button>
        </div>
        <Button
          className="bg-green-600 text-white px-6 py-3 rounded-md mt-4"
          onClick={() => {
            const cart = JSON.parse(localStorage.getItem("cart")) || [];
            const existingIndex = cart.findIndex((item) => item.id === product.id);
            if (existingIndex !== -1) {
              cart[existingIndex].quantity += quantity;
            } else {
              cart.push({ id: product.id, name: product.name, imageUrl: product.imageUrl, price: product.newPrice, quantity });
            }
            localStorage.setItem("cart", JSON.stringify(cart));
            alert(`${product.name} added to cart!`);
          }}
        >
          Add to Cart - {product.newPrice * quantity}
        </Button>
      </div>
    </div>
  );
}
