"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

// Component yang menggunakan useSearchParams
function CheckoutContent() {
    const searchParams = useSearchParams();
    const productName = searchParams.get("name");
    const price = searchParams.get("price");
    const imageUrl = searchParams.get("imageUrl");
    const quantity = searchParams.get("quantity") || 1;

    return (
        <div className="bg-gray-100 container mx-auto px-4 py-20">
            <h1 className="text-3xl font-bold text-center">Checkout</h1>

            <div className="flex flex-col md:flex-row items-center gap-6 mt-10">
                <Image 
                    src={imageUrl || '/placeholder.jpg'} 
                    alt={productName || 'Product'} 
                    width={200} 
                    height={200} 
                    className="rounded-md" 
                />
                <div>
                    <h2 className="text-2xl font-bold">{productName}</h2>
                    <p className="text-lg">Price: <span className="text-green-600">{price}</span></p>
                    <p className="text-lg">Quantity: {quantity}</p>
                    <p className="text-lg font-semibold mt-2">
                        Total: <span className="text-red-500">{price * quantity}</span>
                    </p>
                    <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-md">
                        Proceed to Payment
                    </button>
                </div>
            </div>
        </div>
    );
}

// Loading component untuk Suspense fallback
function CheckoutLoading() {
    return (
        <div className="bg-gray-100 container mx-auto px-4 py-20">
            <div className="animate-pulse">
                <div className="h-8 bg-gray-300 rounded w-1/3 mx-auto mb-10"></div>
                
                <div className="flex flex-col md:flex-row items-center gap-6 mt-10">
                    <div className="w-[200px] h-[200px] bg-gray-300 rounded-md"></div>
                    <div className="space-y-4">
                        <div className="h-8 bg-gray-300 rounded w-48"></div>
                        <div className="h-6 bg-gray-300 rounded w-32"></div>
                        <div className="h-6 bg-gray-300 rounded w-24"></div>
                        <div className="h-6 bg-gray-300 rounded w-36"></div>
                        <div className="h-12 bg-gray-300 rounded w-40 mt-4"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Main page component dengan Suspense boundary
export default function CheckoutPage() {
    return (
        <Suspense fallback={<CheckoutLoading />}>
            <CheckoutContent />
        </Suspense>
    );
}