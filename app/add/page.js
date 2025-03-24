"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    condition: "New",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");
    
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"}/listing`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        router.push("/list");
      } else {
        const errorData = await response.json();
        alert(`Gagal menambahkan produk: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan saat menambahkan produk");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Tambah Produk Baru</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
        <div>
          <label className="block mb-2 font-medium">Nama Produk</label>
          <input
            type="text"
            required
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>
        
        <div>
          <label className="block mb-2 font-medium">Deskripsi</label>
          <textarea
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 h-32"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
        </div>
        
        <div>
          <label className="block mb-2 font-medium">Harga ($)</label>
          <input
            type="number"
            required
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          />
        </div>
        
        <div>
          <label className="block mb-2 font-medium">Kondisi</label>
          <select
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            value={formData.condition}
            onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
            required
          >
            <option value="New">Baru</option>
            <option value="Used">Bekas</option>
            <option value="Refurbished">Rekondisi</option>
          </select>
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? "Memproses..." : "Tambahkan Produk"}
        </button>
      </form>
    </div>
  );
}