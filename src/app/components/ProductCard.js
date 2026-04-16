"use client";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/product/${product.id}`)}
      className="bg-white p-4 hover:shadow-lg cursor-pointer"
    >
      <img
        src={product.image}
        className="w-full h-40 object-contain"
      />

      <h3 className="text-sm mt-2">{product.name}</h3>

      <p className="text-green-600 font-bold">₹{product.price}</p>
    </div>
  );
}