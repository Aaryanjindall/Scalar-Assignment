"use client";
import { useEffect, useState, use } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Zap, IndianRupee, Tag, ShieldCheck, MapPin, Store } from 'lucide-react';

export default function ProductDetail({ params }) {
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { user, setShowLoginModal } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        if (!data.error) setProduct(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="p-8 text-center bg-white min-h-[500px]">Loading product details...</div>;
  if (!product) return <div className="p-8 text-center bg-white min-h-[500px]">Product not found.</div>;

  const handleAction = (actionFn) => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    actionFn();
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    router.push('/cart');
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push('/checkout');
  };

  const calculateDiscount = (price, discountedPrice) => {
    if (!discountedPrice || discountedPrice >= price) return 0;
    return Math.round(((price - discountedPrice) / price) * 100);
  };

  const discountPercent = calculateDiscount(product.price, product.discounted_price);

  return (
    <div className="bg-white p-4 md:p-6 shadow-sm min-h-[600px] flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-[40%] flex flex-col items-center">
        <div className="w-full h-[350px] md:h-[450px] border border-gray-100 p-4 flex items-center justify-center">
          <img src={product.image_url} alt={product.name} className="max-w-full max-h-full object-contain" />
        </div>
        
        <div className="flex items-center gap-4 mt-6">
          <span className="text-[16px] font-medium text-gray-700">Quantity:</span>
          <div className="flex items-center border rounded-sm overflow-hidden h-[34px] w-[100px]">
            <button 
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="flex-1 bg-gray-50 font-bold text-lg leading-none disabled:opacity-50"
              disabled={quantity <= 1}
            >-</button>
            <input 
              type="text" 
              value={quantity} 
              readOnly 
              className="w-10 text-center border-x text-sm h-full font-medium pointer-events-none" 
            />
            <button 
              onClick={() => setQuantity(q => q + 1)}
              className="flex-1 bg-gray-50 font-bold text-lg leading-none"
            >+</button>
          </div>
        </div>

        <div className="flex w-full gap-2 mt-4">
          <button 
            onClick={() => handleAction(handleAddToCart)}
            className="flex-1 bg-fk-yellow text-white h-[50px] flex items-center justify-center gap-2 font-bold text-[16px] shadow-sm uppercase rounded-[2px]"
          >
            <ShoppingCart size={18} fill="currentColor" />
            Add to Cart
          </button>
          <button 
            onClick={() => handleAction(handleBuyNow)}
            className="flex-1 bg-fk-orange text-white h-[50px] flex items-center justify-center gap-2 font-bold text-[16px] shadow-sm uppercase rounded-[2px]"
          >
            <Zap size={18} fill="currentColor" />
            Buy Now
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="text-gray-500 text-[14px]">Home / {product.category} / {product.name}</div>
        
        <h1 className="text-[18px] md:text-[22px] mt-2 font-medium text-[#212121]">
          {product.name}
        </h1>
        
        <div className="mt-2 flex items-center gap-2">
          <span className="flex items-center bg-green-600 text-white rounded-[3px] px-1.5 py-[2px] text-[12px] font-bold">
            4.4
            <svg className="w-3 h-3 ml-0.5" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.5 11.25L3.375 13.5L4.5 8.625L0.75 5.25L5.625 4.875L7.5 0.375L9.375 4.875L14.25 5.25L10.5 8.625L11.625 13.5L7.5 11.25Z" fill="currentColor"/>
            </svg>
          </span>
          <span className="text-[14px] text-gray-500 font-medium">8,124 Ratings & 456 Reviews</span>
          <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" className="h-[21px] ml-2" alt="f-assured" />
        </div>

        <div className="text-[14px] text-green-600 font-medium mt-3">Extra ₹{Number(product.price - product.discounted_price).toLocaleString('en-IN')} off</div>
        
        <div className="mt-1 flex items-end gap-3">
          <span className="text-[28px] font-medium text-[#212121] flex items-center">
            <IndianRupee size={22} />
            {Number(product.discounted_price || product.price).toLocaleString('en-IN')}
          </span>
          
          {discountPercent > 0 && (
            <>
              <span className="text-[16px] text-[#878787] line-through flex items-center pb-1.5">
                ₹{Number(product.price).toLocaleString('en-IN')}
              </span>
              <span className="text-[16px] text-green-600 font-medium tracking-tight pb-1.5">
                {discountPercent}% off
              </span>
            </>
          )}
        </div>

        <div className="mt-6 flex flex-col gap-2 border-t pt-4">
          <h3 className="text-[16px] font-medium mb-1">Available offers</h3>
          <div className="flex gap-2 text-[14px] items-start">
            <Tag size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
            <div><span className="font-medium">Bank Offer:</span> 5% Cashback on Flipkart Axis Bank Card <span className="text-fk-blue cursor-pointer font-medium">T&C</span></div>
          </div>
          <div className="flex gap-2 text-[14px] items-start">
            <Tag size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
            <div><span className="font-medium">Special Price:</span> Get extra {discountPercent}% off (price inclusive of cashback/coupon) <span className="text-fk-blue cursor-pointer font-medium">T&C</span></div>
          </div>
        </div>

        <div className="mt-6 flex flex-col md:flex-row border-t pt-5 gap-6">
          <div className="flex-1 flex gap-4">
            <MapPin className="text-[#878787]" size={20} />
            <div className="text-[14px]">
              <div className="text-[#878787] font-medium mb-1">Delivery</div>
              <div className="font-medium border-b border-fk-blue text-[#212121] inline-block mb-1">Delivery in 2 Days</div>
              <div className="text-[#212121]">Free ₹40</div>
              <div className="text-gray-500 mt-2 text-[12px]">If ordered before 4:00 PM</div>
            </div>
          </div>
          
          <div className="flex-1 flex gap-4">
            <ShieldCheck className="text-[#878787]" size={20} />
            <div className="text-[14px]">
              <div className="text-[#878787] font-medium mb-1">Warranty</div>
              <div className="text-[#212121]">1 Year Manufacturer Warranty</div>
              <span className="text-fk-blue cursor-pointer font-medium text-[12px] mt-1 inline-block">Know More</span>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t pt-4">
          <div className="flex gap-4">
            <Store className="text-[#878787]" size={20} />
            <div className="text-[14px] w-full">
              <div className="text-[#878787] font-medium mb-2">Seller</div>
              <div className="flex items-center gap-2">
                <span className="text-fk-blue font-medium text-[16px]">SuperComNet</span>
                <span className="bg-fk-blue text-white rounded-full px-2 py-0.5 text-[10px] font-bold flex items-center">4.8 <svg className="w-2 h-2 ml-0.5" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 11.25L3.375 13.5L4.5 8.625L0.75 5.25L5.625 4.875L7.5 0.375L9.375 4.875L14.25 5.25L10.5 8.625L11.625 13.5L7.5 11.25Z" fill="currentColor"/></svg></span>
              </div>
              <ul className="list-disc list-inside mt-2 text-[#212121]">
                <li>7 Days Replacement Policy</li>
                <li>GST invoice available</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t pt-4">
          <h2 className="text-[16px] font-medium mb-3">Product Description</h2>
          <p className="text-[14px] text-[#212121] leading-relaxed">
            {product.description}
          </p>
        </div>

        {product.specs && (
          <div className="mt-6 border-t pt-4">
            <h2 className="text-[24px] font-medium mb-4 pb-2 border-b">Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 text-[14px]">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex border-b border-gray-100 pb-2">
                  <div className="w-[120px] text-[#878787]">{key}</div>
                  <div className="flex-1 font-medium text-[#212121]">{value}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}