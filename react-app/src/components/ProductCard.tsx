import React, { useState } from 'react';
import { Plus, Eye, ZoomIn, Star, Heart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useLike } from '@/contexts/LikeContext';
import { useToast } from '@/hooks/use-toast';
import QuickViewModal from './QuickViewModal';

interface Product {
  name: string;
  description: string;
  basePrice: number;
  image: string;
  weights?: { value: string; multiplier: number }[];
  isWeightBased?: boolean;
  rating?: number;
  reviews?: number;
  badge?: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [selectedWeight, setSelectedWeight] = useState(
    product.weights ? product.weights[0] : { value: '1 piece', multiplier: 1 }
  );
  const [quantity, setQuantity] = useState(1);
  const [showQuickView, setShowQuickView] = useState(false);
  const [imageZoomed, setImageZoomed] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addItem } = useCart();
  const { toggleLike, isLiked } = useLike();
  const { toast } = useToast();

  // Generate random rating if not provided
  const rating = product.rating || (4.0 + Math.random() * 1.0);
  const reviews = product.reviews || Math.floor(Math.random() * 200) + 10;

  const currentPrice = product.basePrice * selectedWeight.multiplier;
  const totalPrice = currentPrice * quantity;

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    
    // Add animation delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
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
    setIsAddingToCart(false);
  };

  const handleLike = () => {
    toggleLike(product.name);
    toast({
      title: isLiked(product.name) ? "Removed from favorites" : "Added to favorites",
      description: isLiked(product.name) ? `${product.name} removed from your favorites` : `${product.name} added to your favorites`,
    });
  };

  return (
    <>
      <div className="card-premium animate-premium-fade flex flex-col h-full group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
        {/* Image Container with Quick View */}
        <div className="image-premium aspect-square mb-4 relative group overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
            onClick={() => setImageZoomed(true)}
          />
          
          {/* Badge */}
          {product.badge && (
            <div className="absolute top-3 left-3 z-10">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                {product.badge}
              </div>
            </div>
          )}
          
          {/* Like Button */}
          <button
            onClick={handleLike}
            className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200"
          >
            <Heart 
              className={`w-4 h-4 transition-colors duration-200 ${
                isLiked(product.name) ? 'text-red-500 fill-current' : 'text-gray-600'
              }`} 
            />
          </button>
          
          {/* Quick View Button */}
          <button
            onClick={() => setShowQuickView(true)}
            className="absolute bottom-3 right-3 z-10 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200 opacity-0 group-hover:opacity-100"
          >
            <Eye className="w-4 h-4 text-gray-600" />
          </button>

          {/* Zoom Indicator */}
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ZoomIn className="w-3 h-3 text-gray-600" />
          </div>
        </div>

      <div className="flex flex-col flex-1 space-y-3 sm:space-y-4 p-6">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
          
          {/* Rating */}
          <div className="flex items-center space-x-2 mb-3">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {rating.toFixed(1)} ({reviews} reviews)
            </span>
          </div>
        </div>

        <div className="mb-3">
          <div className="text-2xl font-bold text-orange-600">
            ₹{totalPrice.toFixed(2)}
          </div>
          {quantity > 1 && (
            <div className="text-sm text-gray-500">
              ₹{currentPrice.toFixed(2)} {product.isWeightBased ? 'per ' + selectedWeight.value : 'each'}
            </div>
          )}
        </div>

        <div className="space-y-3">
          {/* Weight Selector - Only for weight-based products */}
          {product.isWeightBased && product.weights && (
            <div>
              <label className="block text-xs sm:text-sm font-medium text-foreground mb-1 sm:mb-2">
                Weight
              </label>
              <select
                value={selectedWeight.value}
                onChange={(e) => {
                  const weight = product.weights!.find(w => w.value === e.target.value)!;
                  setSelectedWeight(weight);
                }}
                className="quantity-selector w-full"
              >
                {product.weights.map((weight) => (
                  <option key={weight.value} value={weight.value}>
                    {weight.value}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Quantity Selector */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-foreground mb-1 sm:mb-2">
              Quantity
            </label>
            <div className="flex items-center justify-center space-x-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-secondary hover:bg-border transition-colors flex items-center justify-center touch-target"
              >
                -
              </button>
              <span className="font-medium min-w-[2rem] text-center text-sm sm:text-base">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-secondary hover:bg-border transition-colors flex items-center justify-center touch-target"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Add to Cart Button - Always visible at bottom */}
        <div className="mt-auto pt-3">
          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-semibold text-white transition-all duration-300 transform ${
              isAddingToCart
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 hover:scale-105 hover:shadow-lg'
            }`}
          >
            {isAddingToCart ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Adding...</span>
              </>
            ) : (
              <>
                <Plus className="w-5 h-5" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        isOpen={showQuickView}
        onClose={() => setShowQuickView(false)}
        product={product}
      />

      {/* Image Zoom Modal */}
      {imageZoomed && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setImageZoomed(false)}>
          <div className="max-w-4xl max-h-[90vh] animate-premium-fade">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;