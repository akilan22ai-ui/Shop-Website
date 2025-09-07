import React, { useState } from 'react';
import { Plus, Heart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useLike } from '@/contexts/LikeContext';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/data/products';

interface RecommendationCardProps {
  product: Product;
  reason: string;
}

const RecommendationCard = ({ product, reason }: RecommendationCardProps) => {
  const [selectedWeight, setSelectedWeight] = useState(
    product.weights ? product.weights[0] : { value: '1 piece', multiplier: 1 }
  );
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { toggleLike, isLiked } = useLike();
  const { toast } = useToast();

  const currentPrice = product.basePrice * selectedWeight.multiplier;
  const totalPrice = currentPrice * quantity;

  const handleAddToCart = () => {
    addItem({
      name: product.name,
      price: currentPrice,
      quantity,
      weight: selectedWeight.value,
      image: product.image
    });

    toast({
      title: "Added to cart",
      description: `${quantity} × ${product.name} (${selectedWeight.value})`,
    });

    // Reset form
    setQuantity(1);
  };

  const handleLike = () => {
    toggleLike(product.name);
    toast({
      title: isLiked(product.name) ? "Removed from favorites" : "Added to favorites",
      description: isLiked(product.name) ? `${product.name} removed from your favorites` : `${product.name} added to your favorites`,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-border p-4 hover:shadow-md transition-shadow">
      <div className="flex space-x-3">
        {/* Product Image */}
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
          />
          {/* Like Button */}
          <button
            onClick={handleLike}
            className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
          >
            <Heart 
              className={`w-3 h-3 transition-colors duration-200 ${
                isLiked(product.name) ? 'text-red-500 fill-current' : 'text-gray-400'
              }`} 
            />
          </button>
        </div>
        
        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm text-gray-900 truncate">{product.name}</h3>
          <p className="text-xs text-gray-600 mb-2 line-clamp-2">{product.description}</p>
          <p className="text-xs text-blue-600 mb-2">{reason}</p>
          
          {/* Weight Selector - Only for weight-based products */}
          {product.isWeightBased && product.weights && (
            <select
              value={selectedWeight.value}
              onChange={(e) => {
                const weight = product.weights!.find(w => w.value === e.target.value)!;
                setSelectedWeight(weight);
              }}
              className="w-full text-xs border border-gray-300 rounded px-2 py-1 mb-2"
            >
              {product.weights.map((weight) => (
                <option key={weight.value} value={weight.value}>
                  {weight.value}
                </option>
              ))}
            </select>
          )}

          {/* Price and Add Button */}
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-primary">
              ₹{totalPrice.toFixed(2)}
              {quantity > 1 && (
                <span className="text-xs text-gray-500 ml-1">
                  (₹{currentPrice.toFixed(2)} each)
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center text-xs"
                >
                  -
                </button>
                <span className="text-xs font-medium min-w-[1.5rem] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center text-xs"
                >
                  +
                </button>
              </div>
              
              <button
                onClick={handleAddToCart}
                className="bg-primary hover:bg-primary/90 text-white px-3 py-1 rounded text-xs flex items-center space-x-1 transition-colors"
              >
                <Plus className="w-3 h-3" />
                <span>Add</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;
