import React, { useState } from 'react';
import {
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Ruler,
  ChevronDown,
  ShoppingBag,
  Heart,
  Check,
  Flame,
  Layers,
  Wind
} from 'lucide-react';
import { Product, ProductColor } from '../types';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { ProductCard } from './ProductCard';

interface ProductDetailProps {
  product: Product;
  onSelectProduct: (productId: string) => void;
  onOpenSizeGuide: () => void;
  onBackToShop: () => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  onSelectProduct,
  onOpenSizeGuide,
  onBackToShop
}) => {
  const { addToCart, isInWishlist, toggleWishlist } = useCart();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState<string | null>('specs');
  const [addedSuccess, setAddedSuccess] = useState(false);

  const isWishlisted = isInWishlist(product.id);

  const handleAdd = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  // Related products from same category or activity
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.activity === product.activity)
  ).slice(0, 3);

  return (
    <div className="bg-[#0B0B0E] py-8 sm:py-12 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-wider mb-8">
          <button onClick={onBackToShop} className="hover:text-white transition-colors cursor-pointer">
            Catalog
          </button>
          <span aria-hidden="true">/</span>
          <span className="text-zinc-400">{product.category}</span>
          <span aria-hidden="true">/</span>
          <span className="text-[#CCFF00] font-semibold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* 2-Column Split: Sticky Gallery Left + Contiguous Purchase Module Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Multi-Image Gallery */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4 sticky top-24">
            
            {/* Thumbnails list */}
            {product.images.length > 1 && (
              <div className="flex sm:flex-col gap-3 shrink-0 overflow-x-auto sm:overflow-y-auto max-h-[560px]">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-20 sm:w-20 sm:h-24 rounded-lg overflow-hidden border transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-[#CCFF00] ring-1 ring-[#CCFF00]'
                        : 'border-white/10 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Main Stage Image */}
            <div className="relative flex-1 aspect-[4/5] rounded-xl overflow-hidden bg-[#141418] border border-white/10 shadow-2xl">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.badge && (
                  <span className="font-mono text-xs font-bold tracking-wider uppercase px-2.5 py-1 rounded bg-black/85 backdrop-blur-md text-[#CCFF00] border border-white/15">
                    {product.badge}
                  </span>
                )}
                {product.isNewArrival && (
                  <span className="font-mono text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-white/90 text-black">
                    SERIES 09 DROP
                  </span>
                )}
              </div>

              {/* Fullscreen indicator */}
              <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded text-[11px] font-mono text-zinc-300 border border-white/10">
                HIGH RESOLUTION STUDIO VIEW
              </div>
            </div>

          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Header info */}
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-zinc-400 mb-2">
                <span>{product.category} DIVISION</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#CCFF00]">{product.activity} SERIES</span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl font-black text-white uppercase tracking-tight leading-tight">
                {product.name}
              </h1>

              {/* Rating & Review metric */}
              <div className="flex items-center gap-3 mt-2.5">
                <div className="flex items-center gap-1 text-[#CCFF00]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-[#CCFF00] text-[#CCFF00]'
                          : 'fill-transparent text-zinc-600'
                      }`}
                    />
                  ))}
                  <span className="font-mono font-bold text-sm text-white ml-1 tabular-nums">
                    {product.rating.toFixed(1)}
                  </span>
                </div>
                <span className="text-zinc-500">·</span>
                <span className="text-xs text-zinc-400 underline cursor-pointer hover:text-white">
                  {product.reviewCount} Verified Athlete Reviews
                </span>
              </div>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 mt-4">
                <span className="font-mono text-3xl font-extrabold text-white tabular-nums">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="font-mono text-lg text-zinc-500 line-through tabular-nums">
                    ${product.originalPrice}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="text-xs font-mono font-bold text-[#CCFF00] uppercase">
                    Save ${product.originalPrice - product.price} (Launch Pricing)
                  </span>
                )}
              </div>

              {/* Free shipping eligibility pill/notice */}
              <div className="mt-3 flex items-center gap-2 text-xs text-zinc-300 bg-[#16161D] border border-white/10 px-3.5 py-2 rounded-lg">
                <Truck className="w-4 h-4 text-[#CCFF00] shrink-0" />
                <span>
                  {product.price >= 75
                    ? 'Eligible for Free Worldwide Express Dispatch'
                    : `Add $${75 - product.price} more to unlock Free Worldwide Express`}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-zinc-300 leading-relaxed">
              {product.description}
            </p>

            {/* Key Features Bullet points */}
            <div className="space-y-1.5 pt-2">
              {product.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                  <Check className="w-3.5 h-3.5 text-[#CCFF00] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Color Swatch Selection */}
            <div className="pt-4 border-t border-white/10 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-400 uppercase tracking-wider">
                  Color Shade: <strong className="text-white">{selectedColor.name}</strong>
                </span>
              </div>
              <div className="flex items-center gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c)}
                    className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center cursor-pointer ${
                      selectedColor.name === c.name
                        ? 'border-[#CCFF00] scale-110 shadow-[0_0_12px_rgba(204,255,0,0.3)]'
                        : 'border-white/20 hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  >
                    {selectedColor.name === c.name && (
                      <Check className={`w-3.5 h-3.5 ${c.hex === '#FFFFFF' ? 'text-black' : 'text-white'}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector Grid with Size Guide */}
            <div className="pt-4 border-t border-white/10 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-400 uppercase tracking-wider">
                  Selected Size: <strong className="text-white">{selectedSize}</strong>
                </span>
                <button
                  onClick={onOpenSizeGuide}
                  className="flex items-center gap-1 text-[#CCFF00] hover:underline cursor-pointer"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size Guide & Fit Matrix</span>
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`py-3 text-xs font-mono font-bold rounded-lg border transition-all cursor-pointer ${
                      selectedSize === sz
                        ? 'bg-[#CCFF00] border-[#CCFF00] text-black shadow-md'
                        : 'bg-[#14141A] border-white/10 text-white hover:border-white/30'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Stepper & Buy Action Buttons */}
            <div className="pt-4 border-t border-white/10 space-y-4">
              <div className="flex items-center gap-4">
                {/* Quantity */}
                <div className="flex items-center bg-[#14141A] border border-white/15 rounded-lg px-2 py-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-9 text-zinc-300 hover:text-white flex items-center justify-center font-mono text-base cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-mono font-bold text-white text-sm tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-9 text-zinc-300 hover:text-white flex items-center justify-center font-mono text-base cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Dominant Primary Add to Bag CTA */}
                <button
                  onClick={handleAdd}
                  className="flex-1 bg-[#CCFF00] hover:bg-[#b8e600] text-black font-extrabold text-sm uppercase tracking-wider py-3.5 px-6 rounded-lg flex items-center justify-center gap-2.5 transition-all shadow-[0_0_20px_rgba(204,255,0,0.25)] hover:shadow-[0_0_30px_rgba(204,255,0,0.4)] cursor-pointer transform active:scale-98"
                >
                  <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
                  <span>
                    {addedSuccess ? 'Added to Bag ✓' : `Add to Bag · $${product.price * quantity}`}
                  </span>
                </button>

                {/* Wishlist button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  title={isWishlisted ? 'Saved to Wishlist' : 'Save to Wishlist'}
                  className={`p-3.5 rounded-lg border transition-colors cursor-pointer ${
                    isWishlisted
                      ? 'border-red-500/50 bg-red-500/10 text-red-400'
                      : 'border-white/15 bg-[#14141A] text-zinc-300 hover:text-white hover:border-white/30'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                </button>
              </div>

              {/* Trust Indicators Strip */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-mono text-zinc-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#CCFF00]" />
                  <span>30-Day On-Track Trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-[#CCFF00]" />
                  <span>Free Hassle-Free Returns</span>
                </div>
              </div>
            </div>

            {/* Technical Accordion Details */}
            <div className="pt-4 border-t border-white/10 divide-y divide-white/10 text-xs">
              
              {/* Technical Specifications */}
              <div className="py-3">
                <button
                  onClick={() => toggleAccordion('specs')}
                  className="w-full flex items-center justify-between text-left font-mono font-bold uppercase tracking-wider text-white py-1 cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#CCFF00]" />
                    <span>Technical Fabric Specifications</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      activeAccordion === 'specs' ? 'rotate-180 text-[#CCFF00]' : 'text-zinc-500'
                    }`}
                  />
                </button>

                {activeAccordion === 'specs' && (
                  <div className="mt-3 pl-6 space-y-2 text-zinc-300">
                    <div className="flex justify-between border-b border-white/5 pb-1">
                      <span className="text-zinc-400">Composite:</span>
                      <span className="font-semibold">{product.fabricSpecs.composition}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-1">
                      <span className="text-zinc-400">Fabric Weight:</span>
                      <span className="font-semibold">{product.fabricSpecs.weight}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-1">
                      <span className="text-zinc-400">Compression Rating:</span>
                      <span className="font-semibold text-[#CCFF00]">{product.fabricSpecs.compression}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-1">
                      <span className="text-zinc-400">Thermal Band:</span>
                      <span className="font-semibold">{product.fabricSpecs.thermalRating}</span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span className="text-zinc-400">Garment Care:</span>
                      <span className="font-semibold">{product.fabricSpecs.care}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Fit & Ergonomics */}
              <div className="py-3">
                <button
                  onClick={() => toggleAccordion('fit')}
                  className="w-full flex items-center justify-between text-left font-mono font-bold uppercase tracking-wider text-white py-1 cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Wind className="w-4 h-4 text-[#CCFF00]" />
                    <span>Athlete Fit & Aerodynamics</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      activeAccordion === 'fit' ? 'rotate-180 text-[#CCFF00]' : 'text-zinc-500'
                    }`}
                  />
                </button>

                {activeAccordion === 'fit' && (
                  <div className="mt-3 pl-6 text-zinc-300 space-y-2">
                    <p>
                      Precision kinetic cut calibrated for athletic frames. If you are between sizes and desire maximal graduated compression, size down. For regular training comfort, take your standard size.
                    </p>
                    <p className="text-[#CCFF00] font-mono text-[11px]">
                      Model is 6'1" (185cm), 185 lbs (84kg) wearing size L.
                    </p>
                  </div>
                )}
              </div>

              {/* Shipping & Returns */}
              <div className="py-3">
                <button
                  onClick={() => toggleAccordion('shipping')}
                  className="w-full flex items-center justify-between text-left font-mono font-bold uppercase tracking-wider text-white py-1 cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#CCFF00]" />
                    <span>Worldwide Express & 30-Day Guarantee</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      activeAccordion === 'shipping' ? 'rotate-180 text-[#CCFF00]' : 'text-zinc-500'
                    }`}
                  />
                </button>

                {activeAccordion === 'shipping' && (
                  <div className="mt-3 pl-6 text-zinc-300 space-y-2">
                    <p>
                      Orders dispatched within 24 hours from our regional fulfilment centers. Express tracked delivery takes 2-4 business days.
                    </p>
                    <p>
                      Free returns and size exchanges within 30 days of delivery. Pre-printed prepaid shipping labels included with every order.
                    </p>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>

        {/* Related Gear Suggestions */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-white/10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="text-xs font-mono font-bold text-[#CCFF00] uppercase tracking-wider">
                  COMPLETE THE ARSENAL
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">
                  RECOMMENDED COMPANIONS
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onSelectProduct={onSelectProduct}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
