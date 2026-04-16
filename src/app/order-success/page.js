'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '../components/Navbar';

function SuccessContent() {
  const params = useSearchParams();
  const orderId = params.get("orderId");

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="flex flex-col items-center justify-center h-[80vh]">
        <h1 className="text-2xl font-bold text-green-600">
          Order Placed Successfully 🎉
        </h1>

        <p className="mt-2">Order ID: {orderId}</p>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}