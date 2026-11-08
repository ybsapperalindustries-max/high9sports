import React, { useState, useMemo } from 'react';
import { Filter, X, SlidersHorizontal, Search, RotateCcw } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { Product, CategoryType, ActivityType } from '../types';

interface ProductListingProps {
  initialCategory?: CategoryType;
  onSelectProduct: (productId: string) => void;
  onQuickView: (product: Product) => void;
}

export const ProductListing: React.FC<ProductListingProps> = ({
  initialCategory = 'all',
  onSelectProduct,
  onQuickView
}) => {
  const [category, setCategory] = useState<CategoryType>(initialCategory);
  const [activity, setActivity] = useState<ActivityType>('all');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(180);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Available filter values extracted dynamically
  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const availableColors = [
    { name: 'Obsidian', hex: '#18181B' },
    { name: 'Volt', hex: '#CCFF00' },
    { name: 'Cyan', hex: '#00E5FF' },
    { name: 'Slate', hex: '#52525B' },
    { name: 'White', hex: '#FFFFFF' }
  ];

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (colorName: string) => {
    setSelectedColors((prev) =>
      prev.includes(colorName) ? prev.filter((c) => c !== colorName) : [...prev, colorName]
    );
  };

  const resetFilters = () => {
    setCategory('all');
    setActivity('all');
    setSelectedSizes([]);
    setSelectedColors([]);
    setMaxPrice(180);
    setSearchQuery('');
    setSortBy('featured');
  };

  const activeFilterCount =
    (category !== 'all' ? 1 : 0) +
    (activity !== 'all' ? 1 : 0) +
    selectedSizes.length +
    selectedColors.length +
    (maxPrice < 180 ? 1 : 0) +
    (searchQuery ? 1 : 0);

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Category filter
      if (category !== 'all' && p.category !== category) return false;
      // Activity filter
      if (activity !== 'all' && p.activity !== activity) return false;
      // Size filter
      if (
        selectedSizes.length > 0 &&
        !selectedSizes.some((s) => p.sizes.includes(s))
      ) {
        return false;
      }
      // Color filter
      if (
        selectedColors.length > 0 &&
        !p.colors.some((c) =>
          selectedColors.some((sc) => c.name.toLowerCase().includes(sc.toLowerCase()))
        )
      ) {
        return false;
      }
      // Price filter
      if (p.price > maxPrice) return false;
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesDesc = p.description.toLowerCase().includes(query);
        const matchesCategory = p.category.toLowerCase().includes(query);
        const matchesFeatures = p.features.some((f) => f.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesCategory && !matchesFeatures) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [category, activity, selectedSizes, selectedColors, maxPrice, searchQuery, sortBy]);

  return (
    <div className="bg-[#0B0B0E] min-h-screen py-8 sm:py-12 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2">
            <span>HIGH9 CATALOG</span>
            <span aria-hidden="true">/</span>
            <span className="text-[#CCFF00]">
              {category === 'all'
                ? 'ALL ACTIVEWEAR & GEAR'
                : category === 'men'
                ? "MEN'S DIVISION"
                : category === 'women'
                ? "WOMEN'S DIVISION"
                : 'PERFORMANCE ACCESSORIES'}
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
                {category === 'all' ? 'FULL PERFORMANCE ARSENAL' : `${category} COLLECTION`}
              </h1>
              <p className="text-sm text-zinc-400 mt-1 max-w-xl">
                Advanced kinetic garments calibrated for maximum power transfer, thermo-regulation, and zero distraction.
              </p>
            </div>

            {/* Quick Search bar */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search series or fabric..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#14141A] border border-white/10 rounded-lg pl-9 pr-8 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#CCFF00] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Top Control Bar: Active filters, Category tabs, Sort & Mobile Filter Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-white/10 mb-8 bg-[#0F0F14]/50">
          
          {/* Department Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full">
            {(['all', 'men', 'women', 'accessories'] as CategoryType[]).map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                  category === c
                    ? 'bg-[#CCFF00] text-black shadow-sm'
                    : 'bg-[#18181F] text-zinc-300 hover:text-white border border-white/5'
                }`}
              >
                {c === 'all' ? 'All Gear' : c === 'accessories' ? 'Gear & Tech' : `${c}'s`}
              </button>
            ))}
          </div>

          {/* Right Controls: Filter Drawer Toggle (Mobile) + Sort Selector */}
          <div className="flex items-center gap-3 ml-auto">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 bg-[#18181F] border border-white/15 px-3 py-1.5 rounded-lg text-xs font-semibold text-white uppercase tracking-wider"
            >
              <Filter className="w-3.5 h-3.5 text-[#CCFF00]" />
              <span>Filters ({activeFilterCount})</span>
            </button>

            <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
              <span className="hidden sm:inline">SORT:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort products by"
                className="bg-[#14141A] border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#CCFF00] cursor-pointer uppercase"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Layout Grid: Sidebar Filters (Desktop) + Product Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 bg-[#121217] rounded-xl border border-white/10 p-6 space-y-6 sticky top-24">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white">
                <SlidersHorizontal className="w-4 h-4 text-[#CCFF00]" />
                <span>Refine Gear</span>
              </div>
              {activeFilterCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-1 text-[11px] font-mono text-zinc-400 hover:text-[#CCFF00] transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset ({activeFilterCount})</span>
                </button>
              )}
            </div>

            {/* Activity Type Filter */}
            <div className="space-y-3">
              <label className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
                Intended Discipline
              </label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'all', label: 'All Disciplines' },
                  { id: 'training', label: 'Gym / Lift' },
                  { id: 'running', label: 'Road Running' },
                  { id: 'track', label: 'Track & Sprint' },
                  { id: 'recovery', label: 'Warmup & Recovery' }
                ].map((act) => (
                  <button
                    key={act.id}
                    onClick={() => setActivity(act.id as ActivityType)}
                    className={`text-[11px] px-2.5 py-1 rounded border font-medium transition-colors cursor-pointer ${
                      activity === act.id
                        ? 'bg-white/10 border-[#CCFF00] text-[#CCFF00]'
                        : 'border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
                    }`}
                  >
                    {act.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Filter Grid */}
            <div className="space-y-3 pt-3 border-t border-white/10">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
                  Apparel Size
                </label>
                {selectedSizes.length > 0 && (
                  <button
                    onClick={() => setSelectedSizes([])}
                    className="text-[10px] text-zinc-500 hover:text-white"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {availableSizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => toggleSize(sz)}
                    className={`py-1.5 text-xs font-mono font-bold rounded border transition-colors cursor-pointer ${
                      selectedSizes.includes(sz)
                        ? 'bg-[#CCFF00] border-[#CCFF00] text-black'
                        : 'bg-[#18181F] border-white/10 text-zinc-300 hover:border-white/30'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Swatch Filter */}
            <div className="space-y-3 pt-3 border-t border-white/10">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
                  Color Shade
                </label>
                {selectedColors.length > 0 && (
                  <button
                    onClick={() => setSelectedColors([])}
                    className="text-[10px] text-zinc-500 hover:text-white"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {availableColors.map((color) => {
                  const isSelected = selectedColors.includes(color.name);
                  return (
                    <button
                      key={color.name}
                      onClick={() => toggleColor(color.name)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#CCFF00] bg-white/10 text-white'
                          : 'border-white/10 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full border border-white/30"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Range Slider */}
            <div className="space-y-3 pt-3 border-t border-white/10">
              <div className="flex items-center justify-between text-xs">
                <label className="font-mono font-bold text-zinc-400 uppercase tracking-wider">
                  Max Price
                </label>
                <span className="font-mono font-bold text-[#CCFF00] tabular-nums">
                  ${maxPrice}
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="180"
                step="5"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#CCFF00] bg-zinc-700 h-1.5 rounded cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                <span>$20</span>
                <span>$180</span>
              </div>
            </div>

          </aside>

          {/* Product Cards Multi-Column Grid */}
          <main className="lg:col-span-3">
            
            {/* Results Status Header */}
            <div className="flex items-center justify-between mb-6 text-xs text-zinc-400 font-mono">
              <div>
                SHOWING <strong className="text-white font-bold">{filteredProducts.length}</strong> ACTIVE STYLES
                {searchQuery && (
                  <span> FOR <span className="text-[#CCFF00]">"{searchQuery}"</span></span>
                )}
              </div>

              {activeFilterCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-[#CCFF00] hover:underline"
                >
                  Clear all active filters
                </button>
              )}
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelectProduct={onSelectProduct}
                    onQuickView={onQuickView}
                  />
                ))}
              </div>
            ) : (
              /* Zero Results Empty State */
              <div className="p-12 text-center rounded-xl bg-[#121217] border border-white/10 my-8">
                <SlidersHorizontal className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
                <h3 className="font-display text-2xl font-bold text-white uppercase">
                  No Gear Matches Current Filters
                </h3>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto mt-2">
                  Try clearing size or color filters, or broaden your maximum price threshold to see available inventory.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-6 px-5 py-2.5 rounded-lg bg-[#CCFF00] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#b8e600] transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            )}

          </main>

        </div>

      </div>

      {/* Mobile Filters Slide-in Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#121217] h-full p-6 overflow-y-auto space-y-6 border-l border-white/10">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="font-display text-xl font-bold text-white uppercase">
                Filter Gear ({activeFilterCount})
              </div>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="text-zinc-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sizes */}
            <div className="space-y-2">
              <div className="text-xs font-mono font-bold text-zinc-400 uppercase">Size</div>
              <div className="grid grid-cols-3 gap-2">
                {availableSizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => toggleSize(sz)}
                    className={`py-2 text-xs font-mono font-bold rounded border ${
                      selectedSizes.includes(sz)
                        ? 'bg-[#CCFF00] border-[#CCFF00] text-black'
                        : 'bg-[#18181F] border-white/10 text-white'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono text-zinc-400">
                <span>MAX PRICE</span>
                <span className="text-[#CCFF00] font-bold">${maxPrice}</span>
              </div>
              <input
                type="range"
                min="20"
                max="180"
                step="5"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#CCFF00]"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-6 border-t border-white/10 flex gap-3">
              <button
                onClick={resetFilters}
                className="flex-1 py-3 text-xs font-bold uppercase rounded-lg border border-white/20 text-zinc-300 hover:text-white"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-3 text-xs font-bold uppercase rounded-lg bg-[#CCFF00] text-black hover:bg-[#b8e600]"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
