"use client";
import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Checkout() {
  const { cartItems, subtotal, totalOriginalPrice, discount, clearCart } = useCart();
  const { user, isLoaded } = useAuth();
  const router = useRouter();
  
  const [address, setAddress] = useState({
    name: '',
    phone: '',
    pincode: '',
    locality: '',
    fullAddress: '',
    city: '',
    state: ''
  });
  const [loading, setLoading] = useState(false);

  if (cartItems.length === 0) {
    router.push('/cart');
    return null;
  }

  if (isLoaded && !user) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-white min-h-[500px] mt-4 max-w-[1248px] mx-auto shadow-sm">
         <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/myorders-empty_3b1b61.png" className="w-48 mb-4"/>
         <h2 className="text-xl font-medium mb-2">Please log in to checkout</h2>
         <p className="text-gray-500 mb-6">You need an active session to place an order</p>
      </div>
    );
  }

  const handleInputChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const addressStr = `${address.name}, ${address.phone}, ${address.fullAddress}, ${address.locality}, ${address.city}, ${address.state} - ${address.pincode}`;
    
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 1, // Default user
          items: cartItems.map(item => ({
            id: item.id,
            quantity: item.quantity,
            price: item.discounted_price || item.price
          })),
          totalAmount: subtotal,
          shippingAddress: addressStr
        })
      });
      
      const data = await res.json();
      if (data.success) {
        clearCart();
        router.push(`/order-success/${data.orderId}`);
      } else {
        alert('Failed to place order.');
      }
    } catch (e) {
      console.error(e);
      alert('Error placing order.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mt-4 px-2">
      {/* Left: Address Form */}
      <div className="flex-1 bg-white shadow-sm p-0 md:p-0 h-fit">
        <div className="bg-fk-blue text-white px-6 py-4 font-medium text-[16px] uppercase shadow-sm">
          Delivery Address
        </div>
        
        <form onSubmit={handlePlaceOrder} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input required type="text" name="name" placeholder="Name" className="border p-3 outline-none focus:border-fk-blue rounded-sm" onChange={handleInputChange} />
            <input required type="text" name="phone" placeholder="10-digit mobile number" className="border p-3 outline-none focus:border-fk-blue rounded-sm" onChange={handleInputChange} />
            <input required type="text" name="pincode" placeholder="Pincode" className="border p-3 outline-none focus:border-fk-blue rounded-sm" onChange={handleInputChange} />
            <input required type="text" name="locality" placeholder="Locality" className="border p-3 outline-none focus:border-fk-blue rounded-sm" onChange={handleInputChange} />
          </div>
          
          <div className="mb-4">
            <textarea required name="fullAddress" placeholder="Address (Area and Street)" className="w-full border p-3 outline-none focus:border-fk-blue rounded-sm h-24" onChange={handleInputChange}></textarea>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <input required type="text" name="city" placeholder="City/District/Town" className="border p-3 outline-none focus:border-fk-blue rounded-sm" onChange={handleInputChange} />
            <input required type="text" name="state" placeholder="State" className="border p-3 outline-none focus:border-fk-blue rounded-sm" onChange={handleInputChange} />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="bg-[#fb641b] hover:bg-[#ff5500] text-white px-10 py-3.5 rounded-sm font-medium text-[16px] uppercase shadow-md disabled:bg-gray-400"
          >
            {loading ? 'Processing...' : 'Save and Deliver Here'}
          </button>
        </form>
      </div>

      {/* Right: Order Summary */}
      <div className="w-full md:w-[350px]">
        <div className="bg-white shadow-sm sticky top-[72px]">
          <div className="px-6 py-3 border-b text-gray-500 uppercase font-medium text-[15px]">
            Order Summary
          </div>
          <div className="p-6">
            <div className="flex justify-between mb-4 text-[16px]">
              <span>Price ({cartItems.length} items)</span>
              <span>₹{totalOriginalPrice.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between mb-4 text-[16px]">
              <span>Discount</span>
              <span className="text-green-600">- ₹{discount.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between mb-4 text-[16px]">
              <span>Delivery</span>
              <span className="text-green-600">Free</span>
            </div>
            
            <div className="flex justify-between border-t border-dashed py-4 my-2 text-[18px] font-medium border-b">
              <span>Total Amount</span>
              <span>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            
            <div className="text-[16px] text-green-600 font-medium pt-2">
              You will save ₹{discount.toLocaleString('en-IN')} on this order
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}