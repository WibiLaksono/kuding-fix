"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import Card from "../../components/ui/card";

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
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (!params?.id) return;
    
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/listing/${params.id}`);
        const data = await res.json();
        if (res.status === 404) {
          setProduct(null);
          return;
        }
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    
    fetchProduct();
  }, [params?.id]);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/listing");
        const data = await res.json();
        setRelatedProducts(data.slice(0, 4));
      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    };
    fetchRelatedProducts();
  }, []);

  if (!product) {
    return <div className="text-center py-10">Loading product data...</div>;
  }

  const handleBuyNow = () => {
    router.push(
      `/checkout?productId=${product.id}&name=${encodeURIComponent(product.title)}&price=${encodeURIComponent(product.price)}&imageUrl=${encodeURIComponent(product.imageUrl)}`
    );
  };

  return (
    <div className="bg-gray-100 py-10">
      <div className="container mx-auto px-4 bg-white p-6 shadow-md rounded-md">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="md:w-1/3 flex flex-col items-center">
            <Image
              src={product.imageUrl || getRandomImageUrl()}
              alt={product.title}
              width={250}
              height={250}
              className="rounded-md object-cover"
            />
          </div>

          <div className="md:w-2/3">
            <h1 className="text-3xl font-bold text-black">{product.title}</h1>
            <p className="text-gray-600 mt-2">Condition: {product.condition}</p>
            <p className="text-red-500 text-2xl font-bold mt-3">{product.price}</p>
            <p className="mt-4 text-gray-700">{product.description}</p>
            
            <Button
              className="bg-green-600 text-white px-6 py-3 rounded-md mt-6 w-full"
              onClick={handleBuyNow}
            >
              Buy Now - {product.price}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-10">
        <h2 className="text-2xl font-semibold text-black">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
          {relatedProducts.map((item) => (
            <Card
              key={item.id}
              id={item.id}
              productName={item.title}
              condition={item.condition}
              description={item.description}
              price={item.price}
              imageUrl={item.imageUrl || getRandomImageUrl()}
            />
          ))}
        </div>
      </div>
    </div>
  );
}