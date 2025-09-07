import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

interface HeaderProps {
  onCartClick: () => void;
}

const Header = ({ onCartClick }: HeaderProps) => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50 mobile-safe-area">
      <div className="mobile-container">
        {/* Brand Header */}
        <div className="text-center py-4 sm:py-6 md:py-8">
          <h1 className="brand-header animate-fade-in">Palmyra</h1>
          <p className="text-muted-foreground mt-1 sm:mt-2 text-responsive-sm animate-fade-in px-2 sm:px-4">
            Premium Nuts, Seeds & Gourmet Treats
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex items-center justify-between py-2 sm:py-3 md:py-4">
          {/* Mobile Navigation - Horizontal Scroll */}
          <div className="mobile-nav">
            <button
              onClick={() => scrollToSection('home')}
              className="mobile-nav-item"
            >
              <span className="hidden sm:inline">🏠</span>
              <span className="sm:ml-1">Home</span>
            </button>
            <button
              onClick={() => scrollToSection('nuts')}
              className="mobile-nav-item"
            >
              <span className="hidden sm:inline">🥜</span>
              <span className="sm:ml-1">Nuts</span>
            </button>
            <button
              onClick={() => scrollToSection('seeds')}
              className="mobile-nav-item"
            >
              <span className="hidden sm:inline">🌱</span>
              <span className="sm:ml-1">Seeds</span>
            </button>
            <button
              onClick={() => scrollToSection('dry-fruits')}
              className="mobile-nav-item"
            >
              <span className="hidden sm:inline">🍇</span>
              <span className="sm:ml-1">Dry Fruits</span>
            </button>
            <button
              onClick={() => scrollToSection('chocolates')}
              className="mobile-nav-item"
            >
              <span className="hidden sm:inline">🍫</span>
              <span className="sm:ml-1">Chocolates</span>
            </button>
          </div>

          {/* Cart Icon */}
          <button
            onClick={onCartClick}
            className="relative p-2 hover:bg-secondary rounded-full transition-colors duration-200 touch-target ml-2"
          >
            <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                {totalItems}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;