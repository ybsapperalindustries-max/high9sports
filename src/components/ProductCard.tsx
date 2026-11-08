import React, { useState } from 'react';
import { ShoppingBag, Heart, Eye, Star } from 'lucide-react';
import { Product, ProductColor } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (productId: string) => void;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onQuickView
}) => {
  const { addToCart, isInWishlist, toggleWishlist } = useCart();
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [imgIndex, setImgIndex] = useState(0);
  const isWishlisted = isInWishlist(product.id);
  const [addedNotice, setAddedNotice] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Default to medium size or first available size
    const defaultSize = product.sizes.includes('M') ? 'M' : product.sizes[0];
    addToCart(product, defaultSize, selectedColor, 1);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 1500);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleColorClick = (e: React.MouseEvent, color: ProductColor) => {
    e.stopPropagation();
    setSelectedColor(color);
  };

  return (
    <div
      onClick={() => onSelectProduct(product.id)}
      className="group relative flex flex-col rounded-xl overflow-hidden bg-[#121217] border border-white/10 hover:border-zinc-500/50 transition-all duration-300 cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-1"
    >
      {/* Image Container (65-75% height) */}
      <div
        className="relative aspect-[4/5] w-full overflow-hidden bg-[#17171D]"
        onMouseEnter={() => {
          if (product.images.length > 1) setImgIndex(1);
        }}
        onMouseLeave={() => setImgIndex(0)}
      >
        <img
          src={product.images[imgIndex] || product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // zero broken image fallback
            const target = e.currentTarget;
            target.src = product.images[0];
          }}
        />

        {/* Subtle Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />

        {/* Top Badges & Wishlist */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          {product.badge ? (
            <span className="font-mono text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[#CCFF00] border border-white/15">
              {product.badge}
            </span>
          ) : (
            <span />
          )}

          <div className="flex items-center gap-1.5">
            {onQuickView && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onQuickView(product);
                }}
                title="Quick View"
                className="w-8 h-8 rounded-full bg-black/70 backdrop-blur-md text-white hover:text-[#CCFF00] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
              >
                <Eye className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={handleWishlist}
              title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
              className="w-8 h-8 rounded-full bg-black/70 backdrop-blur-md text-white hover:text-red-400 flex items-center justify-center transition-colors"
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  isWishlisted ? 'fill-red-500 text-red-500' : 'text-white'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Quick Add Overlay on Hover */}
        <div className="absolute inset-x-3 bottom-3 z-10 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200">
          <button
            onClick={handleQuickAdd}
            className="w-full bg-[#CCFF00] hover:bg-[#b5e600] text-black font-bold text-xs uppercase tracking-wider py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{addedNotice ? 'Added to Bag ✓' : 'Quick Add · Default Size'}</span>
          </button>
        </div>
      </div>

      {/* Card Content & Metadata (Zero-Pill Discipline) */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Unboxed Category & Activity */}
          <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-zinc-400">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span>{product.activity}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 text-zinc-300">
              <Star className="w-3 h-3 text-[#CCFF00] fill-[#CCFF00]" />
              <span className="tabular-nums font-bold">{product.rating.toFixed(1)}</span>
            </span>
          </div>

          {/* Product Name */}
          <h3 className="font-semibold text-white text-base mt-1 line-clamp-1 group-hover:text-[#CCFF00] transition-colors">
            {product.name}
          </h3>

          <p className="text-xs text-zinc-400 mt-1 line-clamp-1">
            {product.tagline}
          </p>
        </div>

        {/* Footer: Color Swatches & Price */}
        <div className="pt-2 border-t border-white/5 flex items-center justify-between">
          {/* Color Swatches */}
          <div className="flex items-center gap-1.5" title="Available Colors">
            {product.colors.map((c) => (
              <button
                key={c.name}
                onClick={(e) => handleColorClick(e, c)}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  selectedColor.name === c.name
                    ? 'ring-2 ring-[#CCFF00] ring-offset-1 ring-offset-[#121217] scale-110 border-white'
                    : 'border-white/20 hover:scale-105'
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
            <span className="text-[10px] text-zinc-400 font-mono ml-1">
              {product.colors.length}c
            </span>
          </div>

          {/* Tabular Price */}
          <div className="text-right">
            {product.originalPrice && (
              <span className="text-xs text-zinc-500 line-through mr-1.5 tabular-nums">
                ${product.originalPrice}
              </span>
            )}
            <span className="font-mono text-base font-bold text-white tabular-nums">
              ${product.price}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
