"use client";
import { useRouter } from "next/navigation";
export default function Navbar() {
    const router = useRouter();
  return (
    <div className="bg-blue-600 text-white flex items-center px-6 py-2">
      <div className="text-xl font-bold">Flipkart</div>

      <div className="flex-1 mx-6">
        <input
          className="w-full px-3 py-2 text-black rounded"
          placeholder="Search for products"
        />
      </div>

      <div className="flex gap-6">
        <button className="bg-white text-blue-600 px-4 py-1 rounded">
          Login
        </button>
        <div onClick={() => router.push("/cart")} className="cursor-pointer">
  Cart
</div>
      </div>
    </div>
  );
}