import React, { useState } from 'react';
import { Search, ShoppingCart, User, Menu, Bell, Mail } from 'lucide-react';
import { CartItem } from '../types';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onOpenCart, onSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      {/* Top Bar (Small) */}
      <div className="bg-gray-100 text-xs py-1 px-4 hidden md:flex justify-between text-gray-500">
        <div className="flex space-x-4">
          <span>Download Tokopalalu App</span>
          <span>Tentang Tokopalalu</span>
          <span>Mitra Tokopalalu</span>
          <span>Mulai Berjualan</span>
        </div>
        <div className="flex space-x-4">
          <span>Tokopalalu Care</span>
          <span>Syarat & Ketentuan</span>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4 md:gap-8">
        
        {/* Logo */}
        <div className="flex items-center cursor-pointer" onClick={() => window.location.reload()}>
           <h1 className="text-2xl font-bold text-tokoblue-600 tracking-tight">tokopalalu</h1>
        </div>

        {/* Category Menu (Desktop) */}
        <div className="hidden md:flex items-center text-gray-500 text-sm font-semibold cursor-pointer hover:text-tokoblue-600 transition">
          <span className="mr-1">Kategori</span>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex-1 relative group">
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden group-focus-within:border-tokoblue-600 group-focus-within:ring-1 group-focus-within:ring-tokoblue-600 transition-all duration-200">
            <div className="pl-3 text-gray-400">
              <Search size={18} />
            </div>
            <input 
              type="text" 
              placeholder="Cari di Tokopalalu" 
              className="w-full py-2 px-3 text-sm outline-none text-gray-700"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          {/* Quick suggestions could go here */}
        </form>

        {/* Actions */}
        <div className="flex items-center gap-4 md:gap-6">
            {/* Cart */}
            <button 
              onClick={onOpenCart}
              className="relative text-gray-500 hover:text-tokoblue-600 transition p-1"
            >
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Desktop Only Actions */}
            <div className="hidden md:flex items-center gap-4 border-l border-gray-300 pl-4">
               <button className="flex items-center gap-2 px-3 py-1.5 border border-tokoblue-600 text-tokoblue-600 rounded-lg font-bold text-sm hover:bg-tokoblue-50 transition">
                 Masuk
               </button>
               <button className="flex items-center gap-2 px-3 py-1.5 bg-tokoblue-600 text-white rounded-lg font-bold text-sm hover:bg-tokoblue-700 transition shadow-sm">
                 Daftar
               </button>
            </div>
            
             {/* Mobile Menu Icon */}
             <div className="md:hidden text-gray-500">
                <Menu size={24}/>
             </div>
        </div>
      </div>
    </header>
  );
};

export default Header;