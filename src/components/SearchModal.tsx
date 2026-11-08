import React, { useState } from 'react';
import { Search, X, ArrowRight, Star } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (productId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const results = query.trim()
    ? PRODUCTS.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.activity.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.features.some((f) => f.toLowerCase().includes(q))
        );
      })
    : PRODUCTS.slice(0, 4); // show trending/featured by default

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-start justify-center pt-20 p-4">
      <div className="relative w-full max-w-2xl bg-[#0F0F14] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Search Bar Input */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center gap-3 bg-[#14141A]">
          <Search className="w-5 h-5 text-[#CCFF00] shrink-0" />
          <input
            type="text"
            placeholder="Search activewear, gear, compression, tights..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent text-base sm:text-lg text-white placeholder-zinc-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-zinc-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-mono text-zinc-400 hover:text-white ml-2 px-2 py-1 rounded bg-white/5"
          >
            ESC
          </button>
        </div>

        {/* Quick Suggestion Tags */}
        <div className="px-5 py-3 border-b border-white/5 flex items-center gap-2 overflow-x-auto text-xs font-mono">
          <span className="text-zinc-500 shrink-0">TRENDING:</span>
          {['Compression', 'Leggings', 'Duffel', 'Sports Bra', 'Fleece', 'IAAF'].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="text-zinc-400 hover:text-[#CCFF00] whitespace-nowrap px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="p-4 max-h-[60vh] overflow-y-auto divide-y divide-white/5 space-y-2">
          <div className="text-[11px] font-mono text-zinc-500 uppercase px-2 pb-1">
            {query.trim() ? `Found ${results.length} Matches` : 'Popular Athletic Picks'}
          </div>

          {results.length > 0 ? (
            results.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onClose();
                  onSelectProduct(product.id);
                }}
                className="flex items-center gap-4 p-2.5 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group"
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-14 h-16 object-cover rounded-lg bg-[#18181F] border border-white/10 shrink-0"
                  referrerPolicy="no-referrer"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400 uppercase">
                    <span>{product.category}</span>
                    <span>·</span>
                    <span>{product.activity}</span>
                    <span>·</span>
                    <span className="flex items-center gap-0.5 text-[#CCFF00]">
                      <Star className="w-2.5 h-2.5 fill-[#CCFF00]" />
                      <span>{product.rating}</span>
                    </span>
                  </div>

                  <h4 className="text-sm font-semibold text-white group-hover:text-[#CCFF00] transition-colors truncate">
                    {product.name}
                  </h4>

                  <p className="text-xs text-zinc-400 line-clamp-1">
                    {product.tagline}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <div className="font-mono text-sm font-bold text-white tabular-nums">
                    ${product.price}
                  </div>
                  <div className="text-[11px] text-[#CCFF00] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 justify-end">
                    <span>View</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-xs text-zinc-400">
              No athletic gear found matching "{query}". Try another search term.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
