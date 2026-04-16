"use client";
import React, { useState, useEffect } from 'react';

const banners = [
  'https://placehold.co/1600x270/2874f0/ffffff.png?text=Mega+Blockbuster+Sale+-+Mobiles',
  'https://placehold.co/1600x270/fb641b/ffffff.png?text=Top+Deals+on+Electronics',
  'https://placehold.co/1600x270/047857/ffffff.png?text=Fashion+Extravaganza+Up+To+80%25+Off'
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full relative mt-2 max-w-[1248px] mx-auto px-2 md:px-0">
      <div className="overflow-hidden rounded-sm relative">
        <div 
          className="flex transition-transform duration-500 ease-in-out" 
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {banners.map((url, idx) => (
            <div key={idx} className="w-full flex-shrink-0">
              <img src={url} alt={`banner-${idx}`} className="w-full h-auto object-cover md:h-[230px]" />
            </div>
          ))}
        </div>

        {/* Carousel buttons */}
        <button 
          onClick={() => setCurrent(prev => (prev === 0 ? banners.length - 1 : prev - 1))}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 p-6 md:p-8 rounded-r-md shadow-md text-black hover:bg-white transition hidden md:block"
        >
          &lt;
        </button>
        <button 
          onClick={() => setCurrent(prev => (prev + 1) % banners.length)}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 p-6 md:p-8 rounded-l-md shadow-md text-black hover:bg-white transition hidden md:block"
        >
          &gt;
        </button>
      </div>
      
      {/* Dots */}
      <div className="flex justify-center mt-3 gap-1">
        {banners.map((_, idx) => (
          <div 
            key={idx} 
            className={`w-2 h-2 rounded-full ${current === idx ? 'bg-[#212121]' : 'bg-[#c2c2c2]'}`} 
          />
        ))}
      </div>
    </div>
  );
}
