"use client";
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';

export default function ProductCard({ product }) {
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();
  
  const isWishlisted = wishlistItems?.some(item => item.id === product.id);

  const toggleWishlist = (e) => {
    e.preventDefault();
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const calculateDiscount = (price, discountedPrice) => {
    if (!discountedPrice || discountedPrice >= price) return 0;
    return Math.round(((price - discountedPrice) / price) * 100);
  };

  const discountPercent = calculateDiscount(product.price, product.discounted_price);

  return (
    <Link href={`/product/${product.id}`} className="group block bg-white p-4 hover:shadow-lg transition-shadow relative border border-gray-100 md:border-transparent md:hover:border-gray-200">
      <button 
        onClick={toggleWishlist} 
        className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-white shadow-sm border border-gray-100"
      >
        <Heart 
          size={18} 
          className={isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400 group-hover:text-gray-500"} 
        />
      </button>

      <div className="h-[200px] flex items-center justify-center mb-4">
        <img 
          src={product.image_url} 
          alt={product.name} 
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="text-center md:text-left">
        <h3 className="text-[14px] font-medium text-gray-800 line-clamp-1 group-hover:text-fk-blue transition-colors">
          {product.name}
        </h3>
        
        <div className="mt-1 flex items-center justify-center md:justify-start gap-2">
          <span className="flex items-center bg-green-600 text-white rounded-[3px] px-1.5 py-[1px] text-[12px] font-bold">
            4.4
            <svg className="w-3 h-3 ml-0.5" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.5 11.25L3.375 13.5L4.5 8.625L0.75 5.25L5.625 4.875L7.5 0.375L9.375 4.875L14.25 5.25L10.5 8.625L11.625 13.5L7.5 11.25Z" fill="currentColor"/>
            </svg>
          </span>
          <span className="text-[12px] text-gray-500 font-medium">(21,432)</span>
          <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" className="h-[18px] ml-2" alt="f-assured" />
        </div>

        <div className="mt-2 flex items-baseline justify-center md:justify-start gap-2">
          <span className="text-[16px] font-medium text-gray-900">
            ₹{Number(product.discounted_price || product.price).toLocaleString('en-IN')}
          </span>
          {discountPercent > 0 && (
            <>
              <span className="text-[14px] text-gray-500 line-through">
                ₹{Number(product.price).toLocaleString('en-IN')}
              </span>
              <span className="text-[13px] text-green-600 font-bold tracking-tight">
                {discountPercent}% off
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
