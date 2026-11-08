import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, Tag, ShoppingBag, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartDrawerProps {
  onProceedToCheckout: () => void;
  onExploreProducts: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  onProceedToCheckout,
  onExploreProducts
}) => {
  const {
    cart,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    subtotal,
    discountAmount,
    shipping,
    tax,
    total,
    promo,
    applyPromo,
    removePromo,
    freeShippingThreshold,
    freeShippingRemaining
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; error?: boolean } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromo(promoInput);
    setPromoMessage({ text: res.message, error: !res.success });
    if (res.success) setPromoInput('');
  };

  const freeShippingProgress = Math.min(
    100,
    Math.round(((freeShippingThreshold - freeShippingRemaining) / freeShippingThreshold) * 100)
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0F0F13] border-l border-white/10 flex flex-col shadow-2xl">
          
          {/* Drawer Header */}
          <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#CCFF00]" />
              <h2 className="font-display text-xl font-bold text-white uppercase tracking-wider">
                YOUR PERFORMANCE BAG
              </h2>
              <span className="font-mono text-xs text-zinc-400">
                ({cart.reduce((s, i) => s + i.quantity, 0)})
              </span>
            </div>

            <button
              onClick={closeCart}
              aria-label="Close cart drawer"
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="px-6 py-3.5 bg-[#14141A] border-b border-white/10">
            <div className="flex items-center justify-between text-xs font-mono mb-2">
              <div className="flex items-center gap-1.5 text-zinc-300">
                <Truck className="w-4 h-4 text-[#CCFF00]" />
                {freeShippingRemaining === 0 ? (
                  <span className="font-bold text-[#CCFF00]">
                    UNLOCKED: FREE WORLDWIDE EXPRESS!
                  </span>
                ) : (
                  <span>
                    Add <strong className="text-white font-bold tabular-nums">${freeShippingRemaining}</strong> for Free Express
                  </span>
                )}
              </div>
              <span className="text-zinc-500">{freeShippingProgress}%</span>
            </div>

            {/* Visual Bar */}
            <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#CCFF00] to-[#00E5FF] transition-all duration-300 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-white/5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <ShoppingBag className="w-12 h-12 text-zinc-600 mb-3" />
                <h3 className="font-display text-xl font-bold text-white uppercase">
                  YOUR BAG IS EMPTY
                </h3>
                <p className="text-xs text-zinc-400 mt-1 max-w-xs">
                  Equip yourself with the latest series compression tops, shorts, or modular gear.
                </p>
                <button
                  onClick={() => {
                    closeCart();
                    onExploreProducts();
                  }}
                  className="mt-6 px-6 py-3 rounded-lg bg-[#CCFF00] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#b8e600] transition-colors cursor-pointer"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="pt-4 first:pt-0 flex gap-4 items-center">
                  {/* Thumbnail */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-18 h-22 object-cover rounded-lg bg-[#18181F] border border-white/10 shrink-0"
                    referrerPolicy="no-referrer"
                  />

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-white truncate">
                      {item.name}
                    </h4>
                    
                    <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400 mt-1">
                      <span>Size: <strong className="text-white">{item.size}</strong></span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-white/30"
                          style={{ backgroundColor: item.color.hex }}
                        />
                        <span>{item.color.name}</span>
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Stepper */}
                      <div className="flex items-center bg-[#18181F] border border-white/15 rounded px-1.5 py-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-6 h-6 text-zinc-400 hover:text-white flex items-center justify-center text-xs font-mono cursor-pointer"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-xs font-mono font-bold text-white tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-6 h-6 text-zinc-400 hover:text-white flex items-center justify-center text-xs font-mono cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      {/* Price & Delete */}
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-white tabular-nums">
                          ${item.price * item.quantity}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          aria-label="Remove item from cart"
                          className="text-zinc-500 hover:text-red-400 p-1 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Checkout Controls */}
          {cart.length > 0 && (
            <div className="p-6 bg-[#121217] border-t border-white/10 space-y-4">
              
              {/* Promo Code Form */}
              <div>
                {promo ? (
                  <div className="flex items-center justify-between bg-[#CCFF00]/10 border border-[#CCFF00]/30 rounded-lg px-3 py-2 text-xs">
                    <div className="flex items-center gap-2 text-[#CCFF00]">
                      <Tag className="w-3.5 h-3.5" />
                      <span className="font-mono font-bold">
                        {promo.code} ({promo.discountPercent}% OFF)
                      </span>
                    </div>
                    <button
                      onClick={removePromo}
                      className="text-xs text-zinc-400 hover:text-white underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code (e.g. HIGH9VIP)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 bg-[#18181F] border border-white/15 rounded-lg px-3 py-2 text-xs text-white uppercase placeholder-zinc-500 focus:outline-none focus:border-[#CCFF00]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {promoMessage && (
                  <div
                    className={`text-[11px] font-mono mt-1 ${
                      promoMessage.error ? 'text-red-400' : 'text-[#CCFF00]'
                    }`}
                  >
                    {promoMessage.text}
                  </div>
                )}
              </div>

              {/* Subtotals & Taxes with Tabular Numerals */}
              <div className="space-y-1.5 text-xs text-zinc-400 font-mono">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white tabular-nums">${subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#CCFF00]">
                    <span>VIP Discount</span>
                    <span className="tabular-nums">-${discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Worldwide Shipping</span>
                  <span className="text-white tabular-nums">
                    {shipping === 0 ? 'FREE' : `$${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax (8%)</span>
                  <span className="text-white tabular-nums">${tax}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-white/10 text-sm font-bold text-white">
                  <span>Total Investment</span>
                  <span className="text-base text-[#CCFF00] tabular-nums font-mono">
                    ${total}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => {
                  closeCart();
                  onProceedToCheckout();
                }}
                className="w-full bg-[#CCFF00] hover:bg-[#b8e600] text-black font-extrabold text-xs uppercase tracking-widest py-3.5 px-4 rounded-lg flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(204,255,0,0.25)] transition-all cursor-pointer active:scale-98"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono text-zinc-400">
                <ShieldCheck className="w-3.5 h-3.5 text-[#CCFF00]" />
                <span>Encrypted 256-Bit SSL · 30-Day Guarantee</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
