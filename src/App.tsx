import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { PRODUCTS } from './data/products';
import { Product, CategoryType } from './types';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryGrid } from './components/CategoryGrid';
import { TrendingSlider } from './components/TrendingSlider';
import { BrandValueProps } from './components/BrandValueProps';
import { ProductListing } from './components/ProductListing';
import { ProductDetail } from './components/ProductDetail';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { QuickViewModal } from './components/QuickViewModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { TechnologyModal } from './components/TechnologyModal';
import { SearchModal } from './components/SearchModal';
import { Footer } from './components/Footer';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'home' | 'shop' | 'product' | 'technology'>('home');
  const [shopCategoryFilter, setShopCategoryFilter] = useState<CategoryType>('all');
  const [selectedProductId, setSelectedProductId] = useState<string>('h9-top-01');
  
  // Modals
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isTechModalOpen, setIsTechModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Scroll to top when changing tabs
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab, selectedProductId]);

  const handleNavigate = (tab: string, category?: CategoryType) => {
    if (tab === 'technology') {
      setIsTechModalOpen(true);
      return;
    }
    if (category) {
      setShopCategoryFilter(category);
    }
    setCurrentTab(tab as any);
  };

  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentTab('product');
  };

  const selectedProduct =
    PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];

  return (
    <CartProvider>
      <div className="min-h-screen bg-[#0B0B0E] text-[#EDEDED] font-body flex flex-col selection:bg-[#CCFF00] selection:text-black">
        
        {/* Top Announcement Bar */}
        <AnnouncementBar
          onShopClick={() => handleNavigate('shop', 'all')}
        />

        {/* Sticky Top Bar Contract Navigation */}
        <Navbar
          currentTab={currentTab}
          onNavigate={handleNavigate}
          onOpenSearch={() => setIsSearchOpen(true)}
        />

        {/* Multi-Page Views */}
        <main className="flex-1">
          {currentTab === 'home' && (
            <>
              {/* Hero Section */}
              <Hero
                onShopNewArrivals={() => handleNavigate('shop', 'all')}
                onExploreMen={() => handleNavigate('shop', 'men')}
              />

              {/* Category Grid Section */}
              <CategoryGrid
                onSelectCategory={(category) => handleNavigate('shop', category)}
              />

              {/* Trending Products Slider */}
              <TrendingSlider
                onSelectProduct={handleSelectProduct}
                onQuickView={(prod) => setQuickViewProduct(prod)}
                onViewAllShop={() => handleNavigate('shop', 'all')}
              />

              {/* Brand Value Props & Materials Architecture */}
              <BrandValueProps />
            </>
          )}

          {currentTab === 'shop' && (
            <ProductListing
              initialCategory={shopCategoryFilter}
              onSelectProduct={handleSelectProduct}
              onQuickView={(prod) => setQuickViewProduct(prod)}
            />
          )}

          {currentTab === 'product' && (
            <ProductDetail
              product={selectedProduct}
              onSelectProduct={handleSelectProduct}
              onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
              onBackToShop={() => handleNavigate('shop', 'all')}
            />
          )}
        </main>

        {/* Global Footer */}
        <Footer
          onNavigate={handleNavigate}
          onOpenTech={() => setIsTechModalOpen(true)}
        />

        {/* Interactive Modals & Slide-out Drawers */}
        <CartDrawer
          onProceedToCheckout={() => setIsCheckoutOpen(true)}
          onExploreProducts={() => handleNavigate('shop', 'all')}
        />

        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          onOrderSuccess={(orderId) => {
            console.log(`Order processed successfully: ${orderId}`);
          }}
        />

        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onFullDetails={handleSelectProduct}
        />

        <SizeGuideModal
          isOpen={isSizeGuideOpen}
          onClose={() => setIsSizeGuideOpen(false)}
        />

        <TechnologyModal
          isOpen={isTechModalOpen}
          onClose={() => setIsTechModalOpen(false)}
          onShopTech={() => {
            setIsTechModalOpen(false);
            handleNavigate('shop', 'all');
          }}
        />

        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onSelectProduct={handleSelectProduct}
        />

      </div>
    </CartProvider>
  );
}
