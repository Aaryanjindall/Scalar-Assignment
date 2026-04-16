"use client";
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import ProductCard from '@/components/ProductCard';

export default function Wishlist() {
  const { wishlistItems } = useWishlist();
  const { user, isLoaded } = useAuth();

  return (
    <div className="max-w-[1200px] mx-auto mt-4 px-2">
      <div className="bg-white shadow-sm font-medium text-[16px] px-6 py-4 mb-4 border-b">
        My Wishlist ({wishlistItems.length})
      </div>

      {(!isLoaded) ? (
        <div className="bg-white p-8 text-center min-h-[500px] flex items-center justify-center">Loading...</div>
      ) : !user ? (
        <div className="bg-white p-8 text-center min-h-[500px] flex flex-col items-center justify-center">
          <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/mywishlist-empty_39f7a5.png" className="w-56 mb-6" alt="Empty Wishlist"/>
          <h2 className="text-[18px] font-medium mb-2">Login to View Wishlist</h2>
          <p className="text-gray-500 mb-6 text-[14px]">You must be logged in to manage your saved items.</p>
        </div>
      ) : wishlistItems.length === 0 ? (
        <div className="bg-white p-8 text-center min-h-[500px] flex flex-col items-center justify-center">
          <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/mywishlist-empty_39f7a5.png" className="w-56 mb-6" alt="Empty Wishlist"/>
          <h2 className="text-[18px] font-medium mb-2">Empty Wishlist</h2>
          <p className="text-gray-500 mb-6 text-[14px]">You have no items in your wishlist. Start adding!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-1 bg-gray-50">
          {wishlistItems.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
