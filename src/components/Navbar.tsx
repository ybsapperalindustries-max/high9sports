import React, { useState } from 'react';
import { ShoppingBag, Search, Heart, Menu, X, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CategoryType } from '../types';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string, categoryFilter?: CategoryType) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onNavigate, onOpenSearch }) => {
  const { totalItems, openCart, wishlist } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: string, category?: CategoryType) => {
    onNavigate(tab, category);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#0B0B0E]/90 backdrop-blur-md border-b border-white/10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark (Single text element wordmark, no tags) */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-1 text-left whitespace-nowrap shrink-0 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CCFF00]"
          >
            <span className="font-display text-2xl sm:text-3xl font-extrabold tracking-wider text-white uppercase group-hover:text-zinc-200 transition-colors">
              HIGH<span className="text-[#CCFF00]">9</span>SPORTS
            </span>
          </button>

          {/* Zone 2: 4-5 single-line navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide uppercase text-zinc-300">
            <button
              onClick={() => handleNavClick('home')}
              className={`hover:text-[#CCFF00] transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 relative ${
                currentTab === 'home' ? 'text-white' : 'text-zinc-400'
              }`}
            >
              Home
              {currentTab === 'home' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#CCFF00]" />
              )}
            </button>
            <button
              onClick={() => handleNavClick('shop', 'all')}
              className={`hover:text-[#CCFF00] transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 relative ${
                currentTab === 'shop' ? 'text-white' : 'text-zinc-400'
              }`}
            >
              Shop All
              {currentTab === 'shop' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#CCFF00]" />
              )}
            </button>
            <button
              onClick={() => handleNavClick('shop', 'men')}
              className="hover:text-[#CCFF00] transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 text-zinc-400"
            >
              Men
            </button>
            <button
              onClick={() => handleNavClick('shop', 'women')}
              className="hover:text-[#CCFF00] transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 text-zinc-400"
            >
              Women
            </button>
            <button
              onClick={() => handleNavClick('shop', 'accessories')}
              className="hover:text-[#CCFF00] transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 text-zinc-400"
            >
              Gear & Tech
            </button>
            <button
              onClick={() => handleNavClick('technology')}
              className={`hover:text-[#CCFF00] transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 relative ${
                currentTab === 'technology' ? 'text-white' : 'text-zinc-400'
              }`}
            >
              Apex Labs
            </button>
          </nav>

          {/* Zone 3: 1 Primary action cluster */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              aria-label="Search catalog"
              className="p-2 text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist count button (if any) */}
            <button
              onClick={() => handleNavClick('shop', 'all')}
              aria-label="View saved items"
              className="hidden sm:flex relative p-2 text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
              title="Saved items"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#CCFF00]" />
              )}
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={openCart}
              aria-label="View shopping bag"
              className="flex items-center gap-2.5 bg-[#18181D] hover:bg-[#222228] text-white px-3.5 py-2 rounded-lg border border-white/10 hover:border-[#CCFF00]/40 transition-all cursor-pointer group"
            >
              <ShoppingBag className="w-4 h-4 text-[#CCFF00] group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold tracking-wider uppercase font-mono tabular-nums">
                Bag ({totalItems})
              </span>
            </button>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              className="md:hidden p-2 text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-18 z-40 bg-[#0F0F13] border-b border-white/10 px-6 py-6 shadow-2xl transition-all">
          <div className="flex flex-col gap-4 text-base font-semibold tracking-wider uppercase">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left py-2 border-b border-white/5 text-white hover:text-[#CCFF00]"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('shop', 'all')}
              className="text-left py-2 border-b border-white/5 text-zinc-300 hover:text-[#CCFF00]"
            >
              Shop All Catalog
            </button>
            <button
              onClick={() => handleNavClick('shop', 'men')}
              className="text-left py-2 border-b border-white/5 text-zinc-300 hover:text-[#CCFF00]"
            >
              Men's Activewear
            </button>
            <button
              onClick={() => handleNavClick('shop', 'women')}
              className="text-left py-2 border-b border-white/5 text-zinc-300 hover:text-[#CCFF00]"
            >
              Women's Activewear
            </button>
            <button
              onClick={() => handleNavClick('shop', 'accessories')}
              className="text-left py-2 border-b border-white/5 text-zinc-300 hover:text-[#CCFF00]"
            >
              Accessories & Gear
            </button>
            <button
              onClick={() => handleNavClick('technology')}
              className="text-left py-2 text-[#CCFF00]"
            >
              Apex Labs Fabric Tech
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#CCFF00]" />
              30-Day Performance Guarantee
            </span>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openCart();
              }}
              className="text-[#CCFF00] font-bold underline"
            >
              Open Bag ({totalItems})
            </button>
          </div>
        </div>
      )}
    </>
  );
};
