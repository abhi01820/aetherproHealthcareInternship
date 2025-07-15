'use client';

import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const AppHeader = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const menuOptions = [
    { id: 1, name: 'Home', path: '/dashboard' },
    { id: 2, name: 'History', path: '/history' },
    { id: 3, name: 'Pricing', path: '/pricing' },
    { id: 4, name: 'Profile', path: '/profile' },
  ];

  return (
    <div className="relative">
      <div className="flex items-center justify-between shadow-xl m-4 border-2 border-gray-300 rounded-xl px-6 py-3 bg-white">
        <div className="flex items-center gap-4">
          <Image src="/logo.svg" alt="logo" width={300} height={150} />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          {menuOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => router.push(option.path)}
              className="text-gray-700 font-semibold hover:text-blue-600 hover:scale-105 transition duration-200 cursor-pointer px-2 py-1 rounded-lg"
            >
              {option.name}
            </button>
          ))}
        </div>

        {/* Mobile Toggle Button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <div className="hidden md:block">
          <UserButton />
        </div>
      </div>

      {/* Mobile Menu with animation */}
      <div
        className={`md:hidden absolute top-[100px] left-4 right-4 z-50 bg-white/90 border border-gray-200 shadow-lg rounded-xl px-6 py-4 backdrop-blur transition-all duration-300 ease-in-out transform ${
          menuOpen
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'
        }`}
      >
        {menuOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => {
              setMenuOpen(false);
              router.push(option.path);
            }}
            className="w-full text-left text-gray-700 font-medium py-2 hover:text-blue-600 transition"
          >
            {option.name}
          </button>
        ))}
        <div className="mt-4">
          <UserButton />
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
