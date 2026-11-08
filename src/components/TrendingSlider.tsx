import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Flame } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { PRODUCTS } from '../data/products';
import { Product, CategoryType } from '../types';

interface TrendingSliderProps {
  onSelectProduct: (productId: string) => void;
  onQuickView: (product: Product) => void;
  onViewAllShop: () => void;
}

export const TrendingSlider: React.FC<TrendingSliderProps> = ({
  onSelectProduct,
  onQuickView,
  onViewAllShop
}) => {
  const [filterCategory, setFilterCategory] = useState<CategoryType>('all');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredProducts = PRODUCTS.filter((p) => {
    if (!p.isTrending) return false;
    if (filterCategory === 'all') return true;
    return p.category === filterCategory;
  });

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-[#0F0F14] border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Functional Segmented Filter Control */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#CCFF00] uppercase mb-1">
              <Flame className="w-4 h-4" />
              <span>APEX ATHLETE PICKS</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
              TRENDING GEAR
            </h2>
          </div>

          {/* Interactive Filter Control (Buttons/Segmented controls permitted by Section 1.A) */}
          <div className="flex items-center gap-1.5 p-1 bg-[#18181F] rounded-lg border border-white/10 self-start md:self-auto overflow-x-auto max-w-full">
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                filterCategory === 'all'
                  ? 'bg-[#CCFF00] text-black shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              All Drops
            </button>
            <button
              onClick={() => setFilterCategory('men')}
              className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                filterCategory === 'men'
                  ? 'bg-[#CCFF00] text-black shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Men's
            </button>
            <button
              onClick={() => setFilterCategory('women')}
              className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                filterCategory === 'women'
                  ? 'bg-[#CCFF00] text-black shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Women's
            </button>
            <button
              onClick={() => setFilterCategory('accessories')}
              className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                filterCategory === 'accessories'
                  ? 'bg-[#CCFF00] text-black shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Gear
            </button>
          </div>
        </div>

        {/* Scroll Controls Bar */}
        <div className="flex items-center justify-between pb-4">
          <span className="text-xs text-zinc-400 font-mono">
            SHOWING {filteredProducts.length} HIGH-OUTPUT DESIGNS
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll products left"
              className="w-9 h-9 rounded-lg bg-[#18181F] hover:bg-[#23232C] border border-white/10 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll products right"
              className="w-9 h-9 rounded-lg bg-[#18181F] hover:bg-[#23232C] border border-white/10 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-none scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="w-[280px] sm:w-[320px] md:w-[340px] shrink-0 snap-start"
            >
              <ProductCard
                product={product}
                onSelectProduct={onSelectProduct}
                onQuickView={onQuickView}
              />
            </div>
          ))}
        </div>

        {/* View All Shop CTA */}
        <div className="mt-10 text-center">
          <button
            onClick={onViewAllShop}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/15 hover:border-[#CCFF00] bg-transparent hover:bg-white/5 text-white hover:text-[#CCFF00] font-bold text-xs uppercase tracking-widest transition-colors cursor-pointer"
          >
            <span>Explore Complete {filteredProducts.length > 0 ? 'Catalog' : 'Collection'}</span>
          </button>
        </div>

      </div>
    </section>
  );
};
