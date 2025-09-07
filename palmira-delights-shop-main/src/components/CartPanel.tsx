import React from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import RecommendationsSection from './RecommendationsSection';

interface CartPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onShowCartPage: () => void;
}

const CartPanel = ({ isOpen, onClose, onShowCartPage }: CartPanelProps) => {
  const { items, updateQuantity, removeItem, getSubtotal, getShippingCharge, getFinalTotal, isFreeDelivery } = useCart();
  const { toast } = useToast();

  const handleCheckout = () => {
    // Navigate to cart page
    onShowCartPage();
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-sm sm:max-w-md bg-background shadow-xl mobile-safe-area">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 md:p-6 border-b border-border">
            <h2 className="text-lg md:text-xl font-bold flex items-center space-x-2">
              <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" />
              <span>Your Cart</span>
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-secondary rounded-full transition-colors touch-target"
            >
              <X className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="text-center text-muted-foreground py-12">
                <ShoppingBag className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="bg-secondary/50 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.weight}</p>
                        <p className="text-primary font-medium">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-full bg-background hover:bg-border transition-colors flex items-center justify-center"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-medium min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-full bg-background hover:bg-border transition-colors flex items-center justify-center"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-destructive hover:text-destructive/80 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recommendations Section */}
          {/* <div className="p-6 border-t border-border">
            <RecommendationsSection />
          </div> */}

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-border p-6 space-y-3">
              <div className="space-y-1 text-sm">
                <div className="flex justify-between items-center">
                  <span>Subtotal:</span>
                  <span>₹{getSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Shipping:</span>
                  <span>{getShippingCharge() === 0 ? 'FREE' : `₹${getShippingCharge().toFixed(2)}`}</span>
                </div>
                {isFreeDelivery() && (
                  <div className="text-green-600 text-xs font-medium text-center py-1 bg-green-50 rounded">
                    🎉 Free Delivery!
                  </div>
                )}
              </div>
              <div className="flex justify-between items-center text-lg font-bold border-t border-border pt-2">
                <span>Total:</span>
                <span className="text-primary">₹{getFinalTotal().toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="btn-elegant w-full"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPanel;