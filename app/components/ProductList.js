// "use client";

// import { useMemo } from "react";
// import ProductCard from "./ProductCard"; // Sesuaikan path-nya

// export default function ProductList({ selectedCategories, priceRange, sortOption }) {
//   // Data dummy untuk 9 produk
//   const products = [
//     {
//       id: "1",
//       title: "Vintage Leather Jacket",
//       price: 120,
//       imageUrl: "/jaket.jpg",
//       condition: "Used",
//       location: "Jakarta",
//       rating: 4.5,
//       discount: 20,
//       isFeatured: true,
//       category: "Clothing",
//       reviewCount: 10,
//       popularity: 100,
//       createdAt: "2023-10-01",
//     },
//     {
//       id: "2",
//       title: "Smartphone X",
//       price: 300,
//       imageUrl: "/phone.jpg",
//       condition: "New",
//       location: "Bandung",
//       rating: 4.8,
//       discount: 10,
//       isFeatured: false,
//       category: "Electronics",
//       reviewCount: 15,
//       popularity: 150,
//       createdAt: "2023-09-15",
//     },
//     {
//       id: "3",
//       title: "Running Shoes",
//       price: 80,
//       imageUrl: "/shoes.jpg",
//       condition: "New",
//       location: "Surabaya",
//       rating: 4.2,
//       discount: 15,
//       isFeatured: true,
//       category: "Accessories",
//       reviewCount: 8,
//       popularity: 80,
//       createdAt: "2023-10-05",
//     },
//     {
//       id: "4",
//       title: "Designer Watch",
//       price: 250,
//       imageUrl: "/watch.jpg",
//       condition: "Refurbished",
//       location: "Yogyakarta",
//       rating: 4.7,
//       discount: 5,
//       isFeatured: false,
//       category: "Accessories",
//       reviewCount: 12,
//       popularity: 120,
//       createdAt: "2023-09-20",
//     },
//     {
//       id: "5",
//       title: "Laptop Pro",
//       price: 1000,
//       imageUrl: "/laptop.jpg",
//       condition: "Used",
//       location: "Medan",
//       rating: 4.6,
//       discount: 25,
//       isFeatured: true,
//       category: "Electronics",
//       reviewCount: 20,
//       popularity: 200,
//       createdAt: "2023-08-25",
//     },
//     {
//       id: "6",
//       title: "Wireless Headphones",
//       price: 150,
//       imageUrl: "/headphones.jpg",
//       condition: "New",
//       location: "Semarang",
//       rating: 4.4,
//       discount: 0,
//       isFeatured: false,
//       category: "Electronics",
//       reviewCount: 18,
//       popularity: 180,
//       createdAt: "2023-09-30",
//     },
//     {
//       id: "7",
//       title: "Camera DSLR",
//       price: 500,
//       imageUrl: "/camera.jpg",
//       condition: "Used",
//       location: "Makassar",
//       rating: 4.3,
//       discount: 30,
//       isFeatured: true,
//       category: "Electronics",
//       reviewCount: 14,
//       popularity: 140,
//       createdAt: "2023-09-10",
//     },
//     {
//       id: "8",
//       title: "Gaming Console",
//       price: 400,
//       imageUrl: "/console.jpg",
//       condition: "Refurbished",
//       location: "Palembang",
//       rating: 4.9,
//       discount: 10,
//       isFeatured: false,
//       category: "Electronics",
//       reviewCount: 22,
//       popularity: 220,
//       createdAt: "2023-08-15",
//     },
//     {
//       id: "9",
//       title: "Bluetooth Speaker",
//       price: 70,
//       imageUrl: "/speaker.jpg",
//       condition: "New",
//       location: "Denpasar",
//       rating: 4.1,
//       discount: 5,
//       isFeatured: false,
//       category: "Accessories",
//       reviewCount: 7,
//       popularity: 70,
//       createdAt: "2023-10-10",
//     },
//   ];

//   // Filter produk berdasarkan kategori dan harga final (setelah diskon)
//   const filteredProducts = useMemo(() => {
//     return products.filter((product) => {
//       const finalPrice = product.price - (product.price * product.discount) / 100;
//       const inCategory =
//         selectedCategories.length === 0 ||
//         selectedCategories.includes(product.category);
//       const inPriceRange = finalPrice >= priceRange[0] && finalPrice <= priceRange[1];
//       return inCategory && inPriceRange;
//     });
//   }, [products, selectedCategories, priceRange]);

//   // Sorting produk sesuai opsi
//   const sortedProducts = useMemo(() => {
//     let sorted = [];
//     switch (sortOption) {
//       case "Price: Low to High":
//         sorted = [...filteredProducts].sort((a, b) => {
//           const finalA = a.price - (a.price * a.discount) / 100;
//           const finalB = b.price - (b.price * b.discount) / 100;
//           return finalA - finalB;
//         });
//         break;
//       case "Price: High to Low":
//         sorted = [...filteredProducts].sort((a, b) => {
//           const finalA = a.price - (a.price * a.discount) / 100;
//           const finalB = b.price - (b.price * b.discount) / 100;
//           return finalB - finalA;
//         });
//         break;
//       case "Review Count":
//         // Filter produk yang memiliki review, lalu sorting berdasarkan rating dari tertinggi ke terendah
//         sorted = filteredProducts
//           .filter(product => product.reviewCount > 0)
//           .sort((a, b) => b.rating - a.rating);
//         break;
//       case "Popularity":
//         sorted = [...filteredProducts].sort((a, b) => b.popularity - a.popularity);
//         break;
//       case "Average Rating":
//         sorted = [...filteredProducts].sort((a, b) => b.rating - a.rating);
//         break;
//       case "Newness":
//         sorted = [...filteredProducts].sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//         );
//         break;
//       case "Product Name":
//         sorted = [...filteredProducts].sort((a, b) =>
//           a.title.localeCompare(b.title)
//         );
//         break;
//       case "Random Products":
//         sorted = [...filteredProducts].sort(() => Math.random() - 0.5);
//         break;
//       default:
//         sorted = filteredProducts;
//     }
//     return sorted;
//   }, [filteredProducts, sortOption]);

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 p-6">
//       {sortedProducts.map((product) => (
//         <ProductCard key={product.id} product={product} />
//       ))}
//     </div>
//   );
// }

"use client";

import { useMemo } from "react";
import ProductCard from "./ui/ProductCard"; // Sesuaikan path-nya

export default function ProductList({ selectedCategories, priceRange, sortOption }) {
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
      category: "Clothing",
      reviewCount: 10,
      popularity: 100,
      createdAt: "2023-10-01",
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
      category: "Electronics",
      reviewCount: 15,
      popularity: 150,
      createdAt: "2023-09-15",
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
      category: "Accessories",
      reviewCount: 8,
      popularity: 80,
      createdAt: "2023-10-05",
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
      category: "Accessories",
      reviewCount: 12,
      popularity: 120,
      createdAt: "2023-09-20",
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
      category: "Electronics",
      reviewCount: 20,
      popularity: 200,
      createdAt: "2023-08-25",
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
      category: "Electronics",
      reviewCount: 18,
      popularity: 180,
      createdAt: "2023-09-30",
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
      category: "Electronics",
      reviewCount: 14,
      popularity: 140,
      createdAt: "2023-09-10",
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
      category: "Electronics",
      reviewCount: 22,
      popularity: 220,
      createdAt: "2023-08-15",
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
      category: "Accessories",
      reviewCount: 7,
      popularity: 70,
      createdAt: "2023-10-10",
    },
  ];

  // Filter produk berdasarkan kategori dan harga final (setelah diskon)
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Hitung harga final setelah diskon
      const finalPrice = product.price - (product.price * product.discount) / 100;
      // Normalisasi kategori produk dan selectedCategories agar perbandingan tidak terpengaruh oleh kapitalisasi
      const productCategory = product.category.toLowerCase();
      const normalizedSelectedCategories = selectedCategories.map(cat => cat.toLowerCase());
      const inCategory =
        normalizedSelectedCategories.length === 0 ||
        normalizedSelectedCategories.includes(productCategory);
      const inPriceRange = finalPrice >= priceRange[0] && finalPrice <= priceRange[1];
      return inCategory && inPriceRange;
    });
  }, [products, selectedCategories, priceRange]);

  // Sorting produk sesuai opsi yang dipilih
  const sortedProducts = useMemo(() => {
    let sorted = [];
    switch (sortOption) {
      case "Price: Low to High":
        sorted = [...filteredProducts].sort((a, b) => {
          const finalA = a.price - (a.price * a.discount) / 100;
          const finalB = b.price - (b.price * b.discount) / 100;
          return finalA - finalB;
        });
        break;
      case "Price: High to Low":
        sorted = [...filteredProducts].sort((a, b) => {
          const finalA = a.price - (a.price * a.discount) / 100;
          const finalB = b.price - (b.price * b.discount) / 100;
          return finalB - finalA;
        });
        break;
      case "Review Count":
        // Filter produk yang memiliki review, lalu sorting berdasarkan rating dari tertinggi ke terendah
        sorted = filteredProducts
          .filter(product => product.reviewCount > 0)
          .sort((a, b) => b.rating - a.rating);
        break;
      case "Popularity":
        sorted = [...filteredProducts].sort((a, b) => b.popularity - a.popularity);
        break;
      case "Average Rating":
        sorted = [...filteredProducts].sort((a, b) => b.rating - a.rating);
        break;
      case "Newness":
        sorted = [...filteredProducts].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
      case "Product Name":
        sorted = [...filteredProducts].sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        break;
      case "Random Products":
        sorted = [...filteredProducts].sort(() => Math.random() - 0.5);
        break;
      default:
        sorted = filteredProducts;
    }
    return sorted;
  }, [filteredProducts, sortOption]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 p-6">
      {sortedProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
