import React, { useState } from 'react';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

interface FixedFooterProps {
  onBackClick: () => void;
  showBackButton?: boolean;
}

interface OrderFormData {
  name: string;
  mobile: string;
  address: string;
}

const FixedFooter = ({ onBackClick, showBackButton = true }: FixedFooterProps) => {
  const { items, getTotalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const [showOrderForm, setShowOrderForm] = useState(false);
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
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add some items to your cart first.",
        variant: "destructive"
      });
      return;
    }
    setShowOrderForm(true);
  };

  const handleConfirmOrder = () => {
    if (!isFormValid) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Create WhatsApp message
    const orderDetails = items.map(item => 
      `• ${item.name} (${item.weight}) - Qty: ${item.quantity} - ₹${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');

    const whatsappMessage = `🛒 *NEW ORDER - Palmyra Delights Shop*\n\n📋 *Order Details:*\n${orderDetails}\n\n💰 *Total Amount: ₹${getTotalPrice().toFixed(2)}*\n\n👤 *Customer Information:*\n• Name: ${orderForm.name}\n• Mobile: ${orderForm.mobile}\n• Address: ${orderForm.address}\n\n📅 Order Date: ${new Date().toLocaleDateString('en-IN')}\n⏰ Order Time: ${new Date().toLocaleTimeString('en-IN')}`;

    // Your WhatsApp number
    const whatsappNumber = "916379073923"; // Your WhatsApp number with country code
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
    window.open(whatsappUrl, '_blank');
    
    // Clear cart and reset form
    clearCart();
    setOrderForm({ name: '', mobile: '', address: '' });
    setShowOrderForm(false);
    
    toast({
      title: "Order sent successfully! 📱",
      description: "Your order has been sent to WhatsApp. We'll contact you shortly to confirm delivery details.",
    });
  };

  const handleBackToFooter = () => {
    setShowOrderForm(false);
  };

  if (showOrderForm) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 z-50">
        <div className="max-w-md mx-auto">
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="font-bold text-lg">Complete Your Order</h3>
              <p className="text-sm text-muted-foreground">Fill in your details to continue</p>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name *</label>
                <input
                  type="text"
                  value={orderForm.name}
                  onChange={(e) => setOrderForm({ ...orderForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Mobile Number *</label>
                <input
                  type="tel"
                  value={orderForm.mobile}
                  onChange={(e) => setOrderForm({ ...orderForm, mobile: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                  placeholder="Enter your mobile number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Complete Address *</label>
                <textarea
                  value={orderForm.address}
                  onChange={(e) => setOrderForm({ ...orderForm, address: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                  placeholder="Enter your complete delivery address"
                />
              </div>
            </div>

            <div className="flex space-x-3">
              <Button
                onClick={handleBackToFooter}
                variant="outline"
                className="flex-1"
              >
                Back
              </Button>
              <Button
                onClick={handleConfirmOrder}
                disabled={!isFormValid}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                📱 Send via WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 z-50">
      <div className="max-w-md mx-auto flex items-center justify-between space-x-4">
        {showBackButton && (
          <Button
            onClick={onBackClick}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Button>
        )}
        
        <div className="flex-1 flex items-center justify-end">
          <Button
            onClick={handleContinueOrder}
            disabled={items.length === 0}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Continue Order</span>
            {items.length > 0 && (
              <span className="bg-white text-green-600 rounded-full px-2 py-1 text-xs font-bold">
                {items.length}
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FixedFooter;


