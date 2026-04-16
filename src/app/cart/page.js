"use client";
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, subtotal, totalOriginalPrice, discount } = useCart();
  const { user, isLoaded } = useAuth();

  if (cartItems.length === 0) {
    return (
      <div className="bg-white m-2 md:m-4 p-8 min-h-[500px] flex flex-col items-center justify-center shadow-sm">
        <img 
          src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" 
          alt="Empty Cart" 
          className="w-48 mb-6"
        />
        <h2 className="text-[18px] font-medium mb-2">Your cart is empty!</h2>
        <p className="text-[12px] text-gray-500 mb-6">Add items to it now.</p>
        <Link href="/" className="bg-fk-blue text-white px-16 py-2.5 rounded-sm shadow-sm font-medium">
          Shop now
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 mt-4 px-2">
      {/* Left: Cart Items */}
      <div className="flex-1 bg-white shadow-sm">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h1 className="text-[18px] font-medium">Flipkart ({cartItems.length})</h1>
        </div>

        {cartItems.map(item => (
          <div key={item.id} className="flex flex-col sm:flex-row gap-6 p-6 border-b">
            <div className="w-[110px] flex flex-col items-center gap-4">
              <img src={item.image_url} alt={item.name} className="h-[100px] object-contain" />
              <div className="flex items-center border rounded-sm overflow-hidden h-7 w-[90px]">
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="flex-1 bg-gray-50 font-bold text-lg leading-none disabled:opacity-50"
                  disabled={item.quantity <= 1}
                >-</button>
                <input 
                  type="text" 
                  value={item.quantity} 
                  readOnly 
                  className="w-10 text-center border-x text-sm h-full font-medium pointer-events-none" 
                />
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="flex-1 bg-gray-50 font-bold text-lg leading-none"
                >+</button>
              </div>
            </div>

            <div className="flex-1">
              <Link href={`/product/${item.id}`} className="text-[16px] hover:text-fk-blue line-clamp-1 mb-1">
                {item.name}
              </Link>
              <div className="text-[14px] text-gray-500 mb-4">{item.category}</div>
              
              <div className="flex items-end gap-2 mb-6">
                {item.price !== item.discounted_price && (
                  <span className="text-[14px] text-gray-500 line-through">
                    ₹{Number(item.price).toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-[18px] font-medium text-[#212121]">
                  ₹{Number(item.discounted_price || item.price).toLocaleString('en-IN')}
                </span>
                {item.price !== item.discounted_price && (
                  <span className="text-[14px] text-green-600 font-medium">
                    {Math.round(((item.price - item.discounted_price) / item.price) * 100)}% Off
                  </span>
                )}
              </div>

              <div className="flex items-center gap-6">
                <button className="font-medium hover:text-fk-blue uppercase text-[16px]">Save for later</button>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="font-medium hover:text-fk-blue uppercase text-[16px]"
                >Remove</button>
              </div>
            </div>
          </div>
        ))}
        
        <div className="px-6 py-4 flex justify-end bg-white shadow-[0_-2px_10px_0_rgba(0,0,0,.1)] sticky bottom-0 z-10 hidden md:flex">
          {(!isLoaded) ? null : user ? (
            <Link href="/checkout" className="bg-[#fb641b] text-white px-14 py-4 rounded-sm font-medium text-[16px] uppercase shadow-md">
              Place Order
            </Link>
          ) : (
            <button onClick={() => alert('Please login using the top navigation bar to checkout')} className="bg-[#fb641b] text-white px-14 py-4 rounded-sm font-medium text-[16px] uppercase shadow-md">
              Login to Checkout
            </button>
          )}
        </div>
      </div>

      {/* Right: Price Details */}
      <div className="w-full md:w-[350px]">
        <div className="bg-white shadow-sm sticky top-[72px]">
          <div className="px-6 py-3 border-b text-gray-500 uppercase font-medium text-[15px]">
            Price Details
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
              <span>Delivery Charges</span>
              <span className="text-green-600">Free</span>
            </div>
            
            <div className="flex justify-between border-y py-4 my-2 text-[18px] font-medium">
              <span>Total Amount</span>
              <span>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            
            <div className="text-[16px] text-green-600 font-medium pt-2">
              You will save ₹{discount.toLocaleString('en-IN')} on this order
            </div>
          </div>
        </div>
        
        {/* Mobile Place order button */}
        <div className="px-4 py-4 mt-4 bg-white shadow-sm block md:hidden">
          {(!isLoaded) ? null : user ? (
            <Link href="/checkout" className="bg-[#fb641b] text-white w-full py-4 rounded-sm font-medium text-[16px] uppercase shadow-md block text-center">
              Place Order
            </Link>
          ) : (
             <button onClick={() => alert('Please login using the top navigation bar to checkout')} className="bg-[#fb641b] text-white w-full py-4 rounded-sm font-medium text-[16px] uppercase shadow-md block text-center">
              Login to Checkout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}