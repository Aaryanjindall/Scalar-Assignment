"use client";
import React from 'react';
import Link from 'next/link';

const categories = [
  { name: 'For You', icon: 'https://rukminim2.flixcart.com/flap/128/128/image/29327f40e9c4d26b.png' },
  { name: 'Fashion', icon: 'https://rukminim2.flixcart.com/flap/128/128/image/c12afc017e6f24cb.png' },
  { name: 'Mobiles', icon: 'https://rukminim2.flixcart.com/flap/128/128/image/22fddf3c7da4c4f4.png' },
  { name: 'Beauty', icon: 'https://rukminim2.flixcart.com/flap/128/128/image/dff3f7adcf3a90c6.png' },
  { name: 'Electronics', icon: 'https://rukminim2.flixcart.com/flap/128/128/image/69c6589653afdb9a.png' },
  { name: 'Home', icon: 'https://rukminim2.flixcart.com/flap/128/128/image/ab7e2b022a4587dd.jpg' },
  { name: 'Appliances', icon: 'https://rukminim2.flixcart.com/flap/128/128/image/0ff199d1bd27eb98.png' },
  { name: 'Toys', icon: 'https://rukminim2.flixcart.com/flap/128/128/image/dff3f7adcf3a90c6.png' },
  { name: 'Furniture', icon: 'https://rukminim2.flixcart.com/flap/128/128/image/ab7e2b022a4587dd.jpg' },
];

export default function CategoriesBar() {
  return (
    <div className="w-full bg-white px-4 md:px-0 shadow-sm border-b border-gray-100 hidden md:block">
      <div className="max-w-[1248px] mx-auto flex items-center justify-between py-3 overflow-x-auto no-scrollbar gap-6">
        {categories.map((cat, idx) => (
          <Link key={cat.name} href={cat.name === 'For You' ? '/' : `/?category=${cat.name}`} className="flex flex-col items-center justify-center min-w-[70px] group cursor-pointer">
            <img src={cat.icon} alt={cat.name} className="w-[64px] h-[64px] object-contain transition-transform group-hover:scale-105" />
            <span className={`text-[14px] font-medium mt-2 whitespace-nowrap ${idx === 0 ? 'text-fk-blue border-b-2 border-fk-blue pb-1' : 'text-[#212121] group-hover:text-fk-blue'}`}>
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
