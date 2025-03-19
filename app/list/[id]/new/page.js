import ProductList from "../../../components/ProductList"; // Sesuaikan path-nya

export default function NewItemPage() {
  return (
    <div className="p-6">
      <h1 className="text-5xl font-extrabold text-center my-8 text-black drop-shadow-lg">
        🛍️ New Items 🛍️
      </h1>
      <ProductList />
    </div>
  );
}
