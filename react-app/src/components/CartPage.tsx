import React, { useState } from 'react';
import { ArrowLeft, ShoppingBag, Minus, Plus, X } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import RecommendationsSection from './RecommendationsSection';

interface CartPageProps {
  onBack: () => void;
}

interface OrderFormData {
  name: string;
  mobile: string;
  address: string;
}

const CartPage = ({ onBack }: CartPageProps) => {
  const { items, updateQuantity, removeItem, getSubtotal, getShippingCharge, getFinalTotal, isFreeDelivery, clearCart } = useCart();
  const { toast } = useToast();
  
  // Debug logging
  console.log('CartPage - items:', items);
  console.log('CartPage - items.length:', items.length);
  const [orderForm, setOrderForm] = useState<OrderFormData>({
    name: '',
    mobile: '',
    address: ''
  });

  // Check if all required fields are filled
  const isFormValid = orderForm.name.trim() !== '' && 
                     orderForm.mobile.trim() !== '' && 
                     orderForm.address.trim() !== '';

  const handleContinueOrder = () => {
    if (!isFormValid) {
      toast({
        title: "Please complete all required fields",
        description: "Name, phone number, and address are required to continue.",
        variant: "destructive"
      });
      return;
    }

    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add some items to your cart first.",
        variant: "destructive"
      });
      return;
    }

    // Create WhatsApp message
    const orderDetails = items.map(item => 
      `• ${item.name} (${item.weight}) - Qty: ${item.quantity} - ₹${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');

    const whatsappMessage = `🛒 *NEW ORDER - Palmyra Delights Shop*\n\n📋 *Order Details:*\n${orderDetails}\n\n💰 *Subtotal: ₹${getSubtotal().toFixed(2)}*\n🚚 *Shipping: ₹${getShippingCharge().toFixed(2)}*\n💳 *Total Amount: ₹${getFinalTotal().toFixed(2)}*\n\n👤 *Customer Information:*\n• Name: ${orderForm.name}\n• Mobile: ${orderForm.mobile}\n• Address: ${orderForm.address}\n\n📅 Order Date: ${new Date().toLocaleDateString('en-IN')}\n⏰ Order Time: ${new Date().toLocaleTimeString('en-IN')}`;

    // Your WhatsApp number
    const whatsappNumber = "916379073923"; // Your WhatsApp number with country code
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
    window.open(whatsappUrl, '_blank');
    
    // Clear cart and reset form
    clearCart();
    setOrderForm({ name: '', mobile: '', address: '' });
    
    toast({
      title: "Order sent successfully! 📱",
      description: "Your order has been sent to WhatsApp. We'll contact you shortly to confirm delivery details.",
    });

    // Navigate back to home
    onBack();
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-background border-b border-border p-4">
          <div className="flex items-center space-x-3">
            <Button
              onClick={onBack}
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
            <h1 className="text-xl font-bold flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5" />
              <span>Your Cart</span>
            </h1>
          </div>
        </div>

        {/* Empty Cart */}
        <div className="flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Add some delicious items to get started!</p>
            <Button onClick={onBack} className="bg-primary hover:bg-primary/90">
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background border-b border-border p-4 sticky top-0 z-10">
        <div className="flex items-center space-x-3">
          <Button
            onClick={onBack}
            variant="outline"
            size="sm"
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Button>
          <h1 className="text-xl font-bold flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5" />
            <span>Your Cart ({items.length})</span>
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 pb-24">
        {/* Product Details Section */}
        <div className="bg-white rounded-lg shadow-sm border border-border p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.weight}</p>
                  <p className="text-primary font-semibold">
                    ₹{item.price.toFixed(2)} each
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full bg-white hover:bg-gray-100 transition-colors flex items-center justify-center border border-gray-300"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-medium min-w-[2rem] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full bg-white hover:bg-gray-100 transition-colors flex items-center justify-center border border-gray-300"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-lg">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 text-sm flex items-center space-x-1"
                    >
                      <X className="w-3 h-3" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Total */}
          <div className="border-t border-gray-200 pt-4 mt-4 space-y-2">
            <div className="flex justify-between items-center">
              <span>Subtotal:</span>
              <span>₹{getSubtotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Shipping:</span>
              <span>{getShippingCharge() === 0 ? 'FREE' : `₹${getShippingCharge().toFixed(2)}`}</span>
            </div>
            {isFreeDelivery() && (
              <div className="text-green-600 text-sm font-medium text-center py-2 bg-green-50 rounded-lg">
                🎉 Free Delivery on orders above ₹2500!
              </div>
            )}
            <div className="flex justify-between items-center text-xl font-bold border-t border-gray-200 pt-2">
              <span>Total Amount:</span>
              <span className="text-primary">₹{getFinalTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Customer Information Section */}
        <div className="bg-white rounded-lg shadow-sm border border-border p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Delivery Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={orderForm.name}
                onChange={(e) => setOrderForm({ ...orderForm, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                value={orderForm.mobile}
                onChange={(e) => setOrderForm({ ...orderForm, mobile: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Enter your phone number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Complete Address *
              </label>
              <textarea
                value={orderForm.address}
                onChange={(e) => setOrderForm({ ...orderForm, address: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Enter your complete delivery address"
              />
            </div>
          </div>
        </div>

        {/* Recommendations Section */}
        {/* <RecommendationsSection /> */}
      </div>

      {/* Fixed Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border p-4 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between space-x-4">
          <Button
            onClick={onBack}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Button>
          
          <Button
            onClick={handleContinueOrder}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-8"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Continue Order</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

