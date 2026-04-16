"use client";
import Link from 'next/link';
import { use } from 'react';

export default function OrderSuccess({ params }) {
  const unwrappedParams = use(params);
  const orderId = unwrappedParams.id;

  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] p-4 bg-transparent mt-4">
      <div className="bg-white p-8 md:p-12 shadow-sm flex flex-col items-center justify-center max-w-2xl w-full border-t-4 border-t-green-500 rounded-sm">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        
        <h1 className="text-[24px] font-medium text-gray-800 mb-2 text-center">Order placed successfully!</h1>
        <p className="text-gray-500 mb-8 text-center text-[15px]">
          Thank you for shopping at Flipkart. Your order has been placed and is being processed.
        </p>

        <div className="bg-gray-50 border p-4 rounded-sm w-full mb-8 flex justify-between items-center px-6">
          <div className="text-gray-600">Order ID</div>
          <div className="font-bold text-[18px] text-[#212121]">OD{new Date().getTime().toString().slice(0, 4)}FLIP{orderId}</div>
        </div>

        <div className="flex gap-4">
          <Link href="/orders" className="border border-gray-300 text-[#212121] px-6 py-2.5 rounded-sm font-medium hover:bg-gray-50 transition-colors">
            View Orders
          </Link>
          <Link href="/" className="bg-[#fb641b] text-white px-8 py-2.5 rounded-sm font-medium hover:bg-[#ff5500] transition-colors shadow-sm">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
