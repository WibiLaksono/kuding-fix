"use client";

import ProductCard from "./ProductCard"; // Sesuaikan path-nya

export default function ProductList() {
  // Data dummy untuk 9 produk
  const products = [
    {
      id: "1",
      title: "Vintage Leather Jacket",
      price: 120,
      imageUrl: "/jaket.jpg",
      condition: "Used",
      location: "Jakarta",
      rating: 4.5,
      discount: 20,
      isFeatured: true,
    },
    {
      id: "2",
      title: "Smartphone X",
      price: 300,
      imageUrl: "/phone.jpg",
      condition: "New",
      location: "Bandung",
      rating: 4.8,
      discount: 10,
      isFeatured: false,
    },
    {
      id: "3",
      title: "Running Shoes",
      price: 80,
      imageUrl: "/shoes.jpg",
      condition: "New",
      location: "Surabaya",
      rating: 4.2,
      discount: 15,
      isFeatured: true,
    },
    {
      id: "4",
      title: "Designer Watch",
      price: 250,
      imageUrl: "/watch.jpg",
      condition: "Refurbished",
      location: "Yogyakarta",
      rating: 4.7,
      discount: 5,
      isFeatured: false,
    },
    {
      id: "5",
      title: "Laptop Pro",
      price: 1000,
      imageUrl: "/laptop.jpg",
      condition: "Used",
      location: "Medan",
      rating: 4.6,
      discount: 25,
      isFeatured: true,
    },
    {
      id: "6",
      title: "Wireless Headphones",
      price: 150,
      imageUrl: "/headphones.jpg",
      condition: "New",
      location: "Semarang",
      rating: 4.4,
      discount: 0,
      isFeatured: false,
    },
    {
      id: "7",
      title: "Camera DSLR",
      price: 500,
      imageUrl: "/camera.jpg",
      condition: "Used",
      location: "Makassar",
      rating: 4.3,
      discount: 30,
      isFeatured: true,
    },
    {
      id: "8",
      title: "Gaming Console",
      price: 400,
      imageUrl: "/console.jpg",
      condition: "Refurbished",
      location: "Palembang",
      rating: 4.9,
      discount: 10,
      isFeatured: false,
    },
    {
      id: "9",
      title: "Bluetooth Speaker",
      price: 70,
      imageUrl: "/speaker.jpg",
      condition: "New",
      location: "Denpasar",
      rating: 4.1,
      discount: 5,
      isFeatured: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 p-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}