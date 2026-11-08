import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, ProductColor } from '../types';

interface PromoState {
  code: string;
  discountPercent: number;
}

interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product, size: string, color: ProductColor, quantity?: number) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  promo: PromoState | null;
  applyPromo: (code: string) => { success: boolean; message: string };
  removePromo: () => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  subtotal: number;
  discountAmount: number;
  shipping: number;
  tax: number;
  total: number;
  totalItems: number;
  freeShippingThreshold: number;
  freeShippingRemaining: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 75;
const FLAT_SHIPPING_FEE = 12;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('high9_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('high9_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promo, setPromo] = useState<PromoState | null>(() => {
    try {
      const saved = localStorage.getItem('high9_promo');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('high9_cart', JSON.stringify(cart));
    } catch {
      // storage quota or private mode fallback
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('high9_wishlist', JSON.stringify(wishlist));
    } catch {
      // storage fallback
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      if (promo) {
        localStorage.setItem('high9_promo', JSON.stringify(promo));
      } else {
        localStorage.removeItem('high9_promo');
      }
    } catch {
      // storage fallback
    }
  }, [promo]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (product: Product, size: string, color: ProductColor, quantity = 1) => {
    const itemId = `${product.id}-${size}-${color.name}`.toLowerCase().replace(/\s+/g, '-');
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === itemId);
      if (existing) {
        return prevCart.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prevCart,
        {
          id: itemId,
          productId: product.id,
          name: product.name,
          price: product.price,
          size,
          color,
          image: product.images[0],
          quantity
        }
      ];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyPromo = (rawCode: string) => {
    const code = rawCode.trim().toUpperCase();
    if (code === 'HIGH9VIP') {
      const promoData = { code: 'HIGH9VIP', discountPercent: 15 };
      setPromo(promoData);
      return { success: true, message: 'VIP code applied: 15% discount activated!' };
    }
    if (code === 'FREESHIP') {
      const promoData = { code: 'FREESHIP', discountPercent: 5 };
      setPromo(promoData);
      return { success: true, message: 'Free Shipping perk applied with extra 5% off!' };
    }
    return { success: false, message: 'Invalid promo code. Try "HIGH9VIP"' };
  };

  const removePromo = () => {
    setPromo(null);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = promo ? Math.round(subtotal * (promo.discountPercent / 100)) : 0;
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD || promo?.code === 'FREESHIP';
  const shipping = subtotal === 0 ? 0 : isFreeShipping ? 0 : FLAT_SHIPPING_FEE;
  const tax = subtotal > 0 ? Math.round((subtotal - discountAmount) * 0.08) : 0;
  const total = Math.max(0, subtotal - discountAmount + shipping + tax);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const freeShippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        openCart,
        closeCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        promo,
        applyPromo,
        removePromo,
        wishlist,
        toggleWishlist,
        isInWishlist,
        subtotal,
        discountAmount,
        shipping,
        tax,
        total,
        totalItems,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        freeShippingRemaining
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
