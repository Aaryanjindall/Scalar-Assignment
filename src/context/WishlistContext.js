"use client";
import { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const res = await fetch('/api/wishlist');
      const data = await res.json();
      if (!data.error) setWishlistItems(data);
    } catch (e) {
      console.error(e);
    }
  };

  const addToWishlist = async (product) => {
    const existing = wishlistItems.find(item => item.id === product.id);
    if (existing) return;
    
    setWishlistItems(prev => [...prev, product]);
    try {
      await fetch('/api/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id })
      });
    } catch (e) {
      console.error(e);
    }
  };

  const removeFromWishlist = async (id) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
    try {
      await fetch(`/api/wishlist?productId=${id}`, { method: 'DELETE' });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
