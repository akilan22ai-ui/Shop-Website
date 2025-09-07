import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import NutCategoryCard from '@/components/NutCategoryCard';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import CartPanel from '@/components/CartPanel';
import CartPage from '@/components/CartPage';
import HeroBanner from '@/components/HeroBanner';
import PopularItemsSection from '@/components/PopularItemsSection';
import { CartProvider } from '@/contexts/CartContext';
import { nutCategories, simpleProducts, NutCategory } from '@/data/products';
import { Button } from '@/components/ui/button';

const IndexContent = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showCartPage, setShowCartPage] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'nuts' | 'nut-category'>('home');
  const [selectedNutCategory, setSelectedNutCategory] = useState<NutCategory | null>(null);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNutCategoryClick = (category: NutCategory) => {
    setSelectedNutCategory(category);
    setCurrentView('nut-category');
  };

  const handleBackToNuts = () => {
    setCurrentView('nuts');
    setSelectedNutCategory(null);
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedNutCategory(null);
  };

  const handleShowCartPage = () => {
    setShowCartPage(true);
    setIsCartOpen(false);
  };

  const handleBackFromCart = () => {
    setShowCartPage(false);
  };

  // Render cart page
  if (showCartPage) {
    return <CartPage onBack={handleBackFromCart} />;
  }

  // Render nut category varieties page
  if (currentView === 'nut-category' && selectedNutCategory) {
    return (
      <div className="min-h-screen bg-background">
        <Header onCartClick={() => setIsCartOpen(true)} />
        
        <div className="mobile-container py-6 md:py-8">
          <BreadcrumbNav 
            items={[
              { label: 'Nuts', onClick: handleBackToNuts },
              { label: selectedNutCategory.name }
            ]}
          />
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 md:mb-8 gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">{selectedNutCategory.name}</h1>
              <p className="text-muted-foreground mt-2 text-sm md:text-base">{selectedNutCategory.description}</p>
            </div>
            <Button 
              onClick={handleBackToNuts}
              variant="outline"
              className="flex items-center space-x-2 touch-target"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Nuts</span>
            </Button>
          </div>

          <div className="mobile-grid">
            {selectedNutCategory.varieties.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>

        <CartPanel isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} onShowCartPage={handleShowCartPage} />
      </div>
    );
  }

  // Render nuts categories page
  if (currentView === 'nuts') {
    return (
      <div className="min-h-screen bg-background">
        <Header onCartClick={() => setIsCartOpen(true)} />
        
        <div className="mobile-container py-6 md:py-8">
          <BreadcrumbNav 
            items={[
              { label: 'Nuts' }
            ]}
          />
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 md:mb-8 gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Premium Nuts</h1>
              <p className="text-muted-foreground mt-2 text-sm md:text-base">Choose from our selection of premium nut varieties</p>
            </div>
            <Button 
              onClick={handleBackToHome}
              variant="outline"
              className="flex items-center space-x-2 touch-target"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Button>
          </div>

          <div className="mobile-grid-nut-categories">
            {nutCategories.map((category, index) => (
              <NutCategoryCard 
                key={index} 
                category={category} 
                onClick={() => handleNutCategoryClick(category)}
              />
            ))}
          </div>
        </div>

        <CartPanel isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} onShowCartPage={handleShowCartPage} />
      </div>
    );
  }

  // Render home page
  return (
    <div className="min-h-screen bg-background pb-20">
      <Header onCartClick={() => setIsCartOpen(true)} />
      
      {/* Hero Banner */}
      <HeroBanner />
      
      {/* Popular Items Section */}
      <PopularItemsSection />

      {/* Nuts Section */}
      <section id="nuts" className="py-8 sm:py-12 md:py-16 px-3 sm:px-4 bg-secondary/30">
        <div className="mobile-container">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 md:mb-8 gap-3 sm:gap-4">
            <h2 className="section-title">Premium Nuts</h2>
            <Button 
              onClick={() => setCurrentView('nuts')}
              variant="outline"
              className="text-primary hover:bg-primary hover:text-primary-foreground btn-mobile-sm w-full sm:w-auto"
            >
              View All Varieties
            </Button>
          </div>
          <div className="mobile-grid-nut-categories">
            {nutCategories.map((category, index) => (
              <NutCategoryCard 
                key={index} 
                category={category} 
                onClick={() => handleNutCategoryClick(category)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Seeds Section */}
      <section id="seeds" className="py-8 sm:py-12 md:py-16 px-3 sm:px-4">
        <div className="mobile-container">
          <h2 className="section-title">Superfood Seeds</h2>
          <div className="mobile-grid">
            {simpleProducts.seeds.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Dry Fruits Section */}
      <section id="dry-fruits" className="py-8 sm:py-12 md:py-16 px-3 sm:px-4 bg-secondary/30">
        <div className="mobile-container">
          <h2 className="section-title">Premium Dry Fruits</h2>
          <div className="mobile-grid">
            {simpleProducts['dry-fruits'].map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Chocolates Section */}
      <section id="chocolates" className="py-8 sm:py-12 md:py-16 px-3 sm:px-4">
        <div className="mobile-container">
          <h2 className="section-title">Artisan Chocolates</h2>
          <div className="mobile-grid">
            {simpleProducts.chocolates.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12 px-4">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">Palmyra</h3>
          <p className="text-background/80 mb-6">
            Premium quality nuts, seeds, dry fruits, and chocolates delivered fresh.
          </p>
          <div className="text-background/60 text-sm">
            © 2024 Palmyra. All rights reserved.
          </div>
        </div>
      </footer>

      <CartPanel isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} onShowCartPage={handleShowCartPage} />
    </div>
  );
};

const Index = () => {
  return (
    <CartProvider>
      <IndexContent />
    </CartProvider>
  );
};

export default Index;
