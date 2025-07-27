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
    { id: 2, name: 'EHR-Report', path: '/EHRReport ' },
    { id: 3, name: 'Patient Info', path: '/patientInfo' },
    { id: 4, name: 'Profile', path: '/profile' },
  ];

  return (
    <div className="relative z-50"> {/* 🔥 Make header layered above */}
      <div className="fixed top-0 left-0 right-0 mx-1 backdrop-blur-md bg-white/60 shadow-5xl border border-gray-200  px-6 py-3 flex items-center justify-between transition duration-300"> {/* 🔥 Sticky & transparent */}
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

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-[100px] left-4 right-4 z-40 bg-white/90 border border-gray-200 shadow-lg rounded-xl px-6 py-4 backdrop-blur transition-all duration-300 ease-in-out transform ${
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
