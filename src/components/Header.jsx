"use client";
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Search, ShoppingCart, Headset, DownIcon, Package, UserCircle, Store } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginModal from './LoginModal';

export default function Header() {
  const { cartItems } = useCart();
  const { user, isLoaded, logout } = useAuth();
  const [search, setSearch] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/?search=${encodeURIComponent(search.trim())}`);
    } else {
      router.push('/');
    }
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <header className="bg-white h-[68px] flex flex-col justify-center shadow-md fixed w-full top-0 z-50 px-2 md:px-0 border-b border-gray-100">
        <div className="w-full max-w-[1248px] mx-auto flex items-center justify-between gap-4 py-2 relative">
          
          {/* Logo */}
          <Link href="/" className="flex flex-col items-center flex-shrink-0 cursor-pointer ml-0 md:ml-4 mr-2 md:mr-8 min-w-[100px]">
             <img 
              src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/fkheaderlogo_exploreplus-44005d.svg" 
              alt="Flipkart" 
              className="h-[40px] md:h-[40px]"
            />
          </Link>
          
          {/* Search Box */}
          <form onSubmit={handleSearch} className="flex-1 max-w-[690px] relative hidden md:block bg-[#f0f5ff] rounded-md overflow-hidden">
            <button type="submit" className="absolute left-0 top-0 h-full px-3 text-[#717478]">
              <Search size={22} strokeWidth={2.5}/>
            </button>
            <input 
              type="text" 
              placeholder="Search for Products, Brands and More" 
              className="w-full text-black h-[42px] pl-11 pr-4 outline-none text-[16px] bg-transparent font-medium placeholder:font-normal placeholder:text-[#717478]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>

          {/* Search Mobile */}
          <div className="flex-1 md:hidden flex justify-end">
            <Search size={22} className="mr-2 text-black" />
          </div>

          {/* Dropdown Items */}
          <div className="flex items-center gap-2 md:gap-7 font-normal text-base text-[#212121] mr-0 md:mr-4 ml-auto">
            
            {/* Login / User */}
            <div className="relative group/login h-full cursor-pointer">
               {isLoaded && user ? (
                 <div className="flex items-center gap-2 hover:bg-[#2874f0] hover:text-white px-4 py-2 rounded-md transition-colors font-medium">
                   <UserCircle size={22} />
                   <span>{user.name}</span>
                 </div>
               ) : (
                 <button 
                  onClick={() => setShowLoginModal(true)}
                  className="flex items-center gap-2 hover:bg-black/5 hover:text-black px-4 py-2 rounded-md transition-colors"
                 >
                   <UserCircle size={22} />
                   <span className="font-m tracking-tight hidden md:block">Login</span>
                   <svg width="10" height="10" viewBox="0 0 10 6" className="hidden md:block transition-transform group-hover/login:-rotate-180 ml-1"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                 </button>
               )}

               {/* Dropdown content */}
               {isLoaded && user && (
                 <div className="absolute top-10 right-0 w-[240px] bg-white border border-gray-200 shadow-xl hidden group-hover/login:block z-50 text-black">
                    <ul className="flex flex-col py-2">
                       <li className="px-4 py-3 hover:bg-gray-100 flex items-center justify-between border-b border-gray-100">
                          <span className="font-medium">New Customer?</span>
                          <span className="text-fk-blue font-medium">Sign Up</span>
                       </li>
                       <Link href="/orders"><li className="px-4 py-3 hover:bg-gray-100 flex items-center gap-3"><Package size={18} className="text-fk-blue"/> My Orders</li></Link>
                       <li className="px-4 py-3 hover:bg-gray-100 flex items-center gap-3"><ShoppingCart size={18} className="text-fk-blue"/> Flipkart Plus Zone</li>
                       <li className="px-4 py-3 hover:bg-gray-100 flex items-center gap-3" onClick={logout}><UserCircle size={18} className="text-fk-blue"/> Logout</li>
                    </ul>
                 </div>
               )}
            </div>
            
            {/* Cart Item Wrapper */}
            <Link href="/cart" className="flex items-center gap-2 hover:bg-black/5 px-2 md:px-4 py-2 rounded-md transition-colors text-[16px] font-medium text-[#212121]">
              <div className="relative">
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#ff6161] text-white text-[10px] w-[18px] h-[18px] rounded-full flex items-center justify-center font-bold border border-white">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden lg:block">Cart</span>
            </Link>

            {/* Seller */}
            <div className="hidden md:flex items-center gap-2 hover:bg-black/5 px-4 py-2 rounded-md transition-colors text-[16px] cursor-pointer">
              <Store size={22} className="text-[#212121]" />
              <span>Become a Seller</span>
            </div>

          </div>
        </div>
      </header>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </>
  );
}
