import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { getRecommendations, getRecommendationReason } from '@/utils/recommendations';
import RecommendationCard from './RecommendationCard';

const RecommendationsSection = () => {
  const { items } = useCart();
  
  // Get unique product names from cart
  const cartItemNames = [...new Set(items.map(item => item.name))];
  
  // Get recommendations based on cart items
  const recommendations = getRecommendations(cartItemNames);
  
  if (recommendations.length === 0) return null;
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-border p-6">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <span className="text-primary mr-2">💡</span>
        You might also like
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        Based on your current selection, here are some products that pair perfectly:
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendations.map((product, index) => {
          // Get a reason for this recommendation
          const cartItem = cartItemNames[0]; // Use first cart item for reason
          const reason = getRecommendationReason(cartItem, product.name);
          
          return (
            <RecommendationCard
              key={`${product.name}-${index}`}
              product={product}
              reason={reason}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RecommendationsSection;
