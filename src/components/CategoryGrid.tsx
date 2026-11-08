import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '../data/products';
import { CategoryType } from '../types';

interface CategoryGridProps {
  onSelectCategory: (category: CategoryType) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ onSelectCategory }) => {
  return (
    <section className="py-16 sm:py-20 bg-[#0B0B0E] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-mono font-bold tracking-widest text-[#CCFF00] uppercase mb-1">
              DISCIPLINES & DEPARTMENTS
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
              ENGINEERED BY CATEGORY
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md">
            Purpose-built garments tailored to specific kinetic movement patterns and physiological temperature demands.
          </p>
        </div>

        {/* 3-Column Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.linkCategory as CategoryType)}
              className="group relative rounded-xl overflow-hidden border border-white/10 bg-[#121217] hover:border-[#CCFF00]/60 transition-all duration-300 cursor-pointer flex flex-col justify-end aspect-[4/5] shadow-lg hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            >
              {/* Category Background Image */}
              <img
                src={cat.image}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0E] via-[#0B0B0E]/50 to-transparent group-hover:via-[#0B0B0E]/40 transition-colors" />

              {/* Content Box */}
              <div className="relative z-10 p-6 sm:p-7 flex flex-col justify-end">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                  <span>{cat.count}</span>
                  <span className="text-[#CCFF00] opacity-0 group-hover:opacity-100 transition-opacity">
                    VIEW COLLECTION
                  </span>
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-wide group-hover:text-[#CCFF00] transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-zinc-300 mt-1 line-clamp-1">
                      {cat.subtitle}
                    </p>
                  </div>

                  <div className="w-10 h-10 rounded-lg bg-white/10 group-hover:bg-[#CCFF00] text-white group-hover:text-black flex items-center justify-center shrink-0 ml-3 transition-colors duration-200">
                    <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
