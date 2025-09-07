import React from 'react';
import { ChevronRight } from 'lucide-react';

interface NutCategory {
  name: string;
  description: string;
  image: string;
  varietyCount: number;
}

interface NutCategoryCardProps {
  category: NutCategory;
  onClick: () => void;
}

const NutCategoryCard = ({ category, onClick }: NutCategoryCardProps) => {
  return (
    <div 
      className="nut-category-card group"
      onClick={onClick}
    >
      <div className="aspect-square rounded-lg overflow-hidden mb-3 sm:mb-4 bg-gradient-to-br from-secondary to-muted">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      <div className="mobile-text-container">
        <div className="flex-1">
          <h3 className="mobile-title">{category.name}</h3>
          <p className="mobile-description">{category.description}</p>
        </div>

        <div className="flex items-center justify-between mb-2 mt-2">
          <span className="text-xs sm:text-sm text-muted-foreground">
            {category.varietyCount} varieties available
          </span>
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-primary group-hover:translate-x-1 transition-transform flex-shrink-0" />
        </div>

        <div className="flex items-center justify-center w-full py-2 sm:py-3 px-3 sm:px-4 bg-secondary rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-colors btn-mobile-sm mt-auto">
          <span className="font-medium text-responsive-xs">View Varieties</span>
        </div>
      </div>
    </div>
  );
};

export default NutCategoryCard;