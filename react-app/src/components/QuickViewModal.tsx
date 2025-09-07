import React from 'react';
import { X, Plus, Eye } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface Product {
  name: string;
  description: string;
  basePrice: number;
  image: string;
  weights?: { value: string; multiplier: number }[];
  isWeightBased?: boolean;
}

interface QuickViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

const QuickViewModal = ({ isOpen, onClose, product }: QuickViewModalProps) => {
  const [selectedWeight, setSelectedWeight] = React.useState(
    product?.weights ? product.weights[0] : { value: '1 piece', multiplier: 1 }
  );
  const [quantity, setQuantity] = React.useState(1);
  const { addItem } = useCart();
  const { toast } = useToast();

  React.useEffect(() => {
    if (product?.weights) {
      setSelectedWeight(product.weights[0]);
    }
    setQuantity(1);
  }, [product]);

  if (!isOpen || !product) return null;

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

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-premium-fade">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
              <Eye className="w-5 h-5 text-primary" />
              <span>Quick View</span>
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Image */}
            <div className="image-premium aspect-square">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Product Info */}
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              {/* Price */}
              <div className="price-premium text-2xl">
                ₹{totalPrice.toFixed(2)}
                {quantity > 1 && (
                  <span className="text-sm text-gray-500 ml-2">
                    (₹{currentPrice.toFixed(2)} {product.isWeightBased ? 'per ' + selectedWeight.value : 'each'})
                  </span>
                )}
              </div>

              {/* Weight Selector */}
              {product.isWeightBased && product.weights && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Weight
                  </label>
                  <select
                    value={selectedWeight.value}
                    onChange={(e) => {
                      const weight = product.weights!.find(w => w.value === e.target.value)!;
                      setSelectedWeight(weight);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center justify-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="font-medium text-lg min-w-[2rem] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="btn-premium w-full flex items-center justify-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;

