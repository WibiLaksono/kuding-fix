"use client";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const isLoggedIn = false; // or true, depending on your logic
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 w-full h-20 sm:h-32 bg-white shadow-lg z-50">
      {/* Promo Bar */}
      <div className="w-full h-[20%] bg-blue-600 flex justify-center">
        <p className="text-white font-light text-xs sm:text-lg">
          LIMITED OFFER: 30% OFF. Use RABBIT30 at Checkout.
        </p>
      </div>

      {/* Mobile Mode */}
      <div className="flex justify-center w-full h-[80%] bg-white sm:hidden">
        <div className="flex flex-row justify-between items-center px-5 w-full h-full">
          {/* Logo */}
          <a href="#" className="text-red-600 text-xl font-bold font-sans">
            Kuding
          </a>

          {/* Search Bar */}
          <div className="flex flex-row justify-center items-center gap-2 w-[50%]">
            <input
              placeholder="ketikkan sesuatu"
              className="bg-white border border-gray-400 px-5 w-full h-10 rounded-2xl"
            />
            <button
              type="button"
              name="search"
              id="search"
              className="flex items-center justify-center bg-blue-300 w-16 h-8 sm:w-10 sm:h-10 rounded-full cursor-pointer"
            >
              Cari
            </button>
          </div>

          {/* Hamburger Menu */}
          <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-20 left-0 w-full bg-white shadow-md py-3 flex flex-col items-center gap-3 ">
            {navMenus.map((_, index) => (
              <a key={index} href="#" className="text-gray-800 text-sm ">
                Menu List {index + 1}
              </a>
            ))}
            <a href="#" className="text-gray-800 text-sm">
              Range Harga v
            </a>
            <a href="#" className="text-gray-800 text-sm">
              Lokasi v
            </a>
          </div>
        )}
      </div>

      {/* Desktop Mode */}
      <div className="sm:flex flex-col w-full h-[85%] bg-white hidden">
        <div className="flex flex-row justify-center gap-16 px-10 w-full h-20 shadow-md">
          {/* Logo */}
          <div className="flex justify-start items-center px-2 w-[30%] h-full">
            <a href="#" className="text-red-600 text-xl md:text-2xl font-bold font-sans">
              Kuding
            </a>
          </div>

          {/* Search Bar */}
          <div className="flex flex-row justify-center items-center gap-2 w-[40%] h-full ">
            <input
              placeholder="ketikkan sesuatu"
              className="bg-white border border-gray-400 px-5 w-[80%] h-[60%] rounded-2xl"
            />
            <button
              type="button"
              name="search"
              id="search"
              className="flex items-center justify-center bg-blue-300 w-[20%] h-[60%] rounded-full text-md cursor-pointer"
            >
              Cari
            </button>
          </div>

          {/* Profil dan Notifikasi */}
          <div className="flex flex-row justify-end items-center px-2 gap-2 w-[30%] h-full">
            <div className="w-[80%] h-[60%] border-r flex items-center justify-end px-5">
              {isLoggedIn ? (
                "Kosmas Rio Legowo"
              ) : (
                <div className="flex flex-row gap-5">
                  <button className="text-blue-500 text-sm md:text-md cursor-pointer">
                    Login
                  </button>
                  <button className="text-blue-500 text-sm md:text-md cursor-pointer">
                    Sign Up
                  </button>
                </div>
              )}
            </div>
            <div className="w-[20%] h-[60%] bg-amber-200 text-sm flex items-center justify-center rounded-full cursor-pointer">
              Notif
            </div>
          </div>
        </div>

        {/* Menu Navigasi */}
        <div className="flex flex-row justify-center px-10 w-full h-10">
            <div className="w-[10rem] h-full flex items-center justify-center cursor-pointer">
              Home
            </div>
            <div className="w-[10rem] h-full flex items-center justify-center cursor-pointer">
              Harga v
            </div>
            <div className="w-[10rem] h-full flex items-center justify-center cursor-pointer">
              Tipe v
            </div>
            <div className="w-[10rem] h-full flex items-center justify-center cursor-pointer">
              Status v
            </div>
            <div className="w-[10rem] h-full flex items-center justify-center cursor-pointer">
              Lokasi v
            </div>
        </div>
      </div>
    </div>
  );
}
