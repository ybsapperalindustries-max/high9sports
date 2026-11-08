import React, { useState } from 'react';
import { X, Star, ShoppingBag, ArrowRight } from 'lucide-react';
import { Product, ProductColor } from '../types';
import { useCart } from '../context/CartContext';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onFullDetails: (productId: string) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onFullDetails
}) => {
  if (!product) return null;

  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product, selectedSize, selectedColor, 1);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-[#0F0F14] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-[4/5] sm:aspect-auto h-full bg-[#16161D]">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {product.badge && (
              <span className="absolute top-3 left-3 font-mono text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-black/80 text-[#CCFF00] border border-white/15">
                {product.badge}
              </span>
            )}
          </div>

          {/* Details */}
          <div className="p-6 flex flex-col justify-between space-y-4">
            <div>
              <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                {product.category} · {product.activity}
              </div>

              <h3 className="font-display text-2xl font-black text-white uppercase mt-1 leading-tight">
                {product.name}
              </h3>

              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center text-[#CCFF00]">
                  <Star className="w-3.5 h-3.5 fill-[#CCFF00]" />
                  <span className="font-mono text-xs font-bold text-white ml-1 tabular-nums">
                    {product.rating.toFixed(1)}
                  </span>
                </div>
                <span className="text-zinc-500">·</span>
                <span className="text-xs text-zinc-400">{product.reviewCount} Reviews</span>
              </div>

              <div className="font-mono text-2xl font-bold text-white mt-3 tabular-nums">
                ${product.price}
              </div>

              <p className="text-xs text-zinc-300 mt-2 line-clamp-3 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Color Swatches */}
            <div className="space-y-1.5">
              <div className="text-xs font-mono text-zinc-400">
                Color: <strong className="text-white">{selectedColor.name}</strong>
              </div>
              <div className="flex gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c)}
                    className={`w-6 h-6 rounded-full border transition-all ${
                      selectedColor.name === c.name
                        ? 'border-[#CCFF00] scale-110 ring-2 ring-[#CCFF00]/40'
                        : 'border-white/20'
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-1.5">
              <div className="text-xs font-mono text-zinc-400">
                Size: <strong className="text-white">{selectedSize}</strong>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`py-1.5 text-xs font-mono font-bold rounded border ${
                      selectedSize === sz
                        ? 'bg-[#CCFF00] border-[#CCFF00] text-black'
                        : 'bg-[#18181F] border-white/10 text-white hover:border-white/20'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleAdd}
                className="w-full bg-[#CCFF00] hover:bg-[#b8e600] text-black font-extrabold text-xs uppercase tracking-wider py-3 rounded-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{added ? 'Added to Bag ✓' : 'Add to Bag'}</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onFullDetails(product.id);
                }}
                className="w-full text-center text-xs font-mono text-zinc-400 hover:text-white flex items-center justify-center gap-1 py-1"
              >
                <span>View Full Product Specs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
