import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  weight: string;
  image: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getSubtotal: () => number;
  getShippingCharge: () => number;
  getFinalTotal: () => number;
  isFreeDelivery: () => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    // Load cart from localStorage on initialization
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('palmyra-cart');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  // Save cart to localStorage whenever items change
  const saveCartToStorage = (cartItems: CartItem[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('palmyra-cart', JSON.stringify(cartItems));
    }
  };

  const addItem = (newItem: Omit<CartItem, 'id'>) => {
    const id = `${newItem.name}-${newItem.weight}-${Date.now()}`;
    const newItems = [...items, { ...newItem, id }];
    setItems(newItems);
    saveCartToStorage(newItems);
  };

  const removeItem = (id: string) => {
    const newItems = items.filter(item => item.id !== id);
    setItems(newItems);
    saveCartToStorage(newItems);
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    const newItems = items.map(item => 
      item.id === id ? { ...item, quantity } : item
    );
    setItems(newItems);
    saveCartToStorage(newItems);
  };

  const clearCart = () => {
    setItems([]);
    saveCartToStorage([]);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getSubtotal = () => {
    return getTotalPrice();
  };

  const getShippingCharge = () => {
    const subtotal = getSubtotal();
    return subtotal < 2500 ? 150 : 0;
  };

  const getFinalTotal = () => {
    return getSubtotal() + getShippingCharge();
  };

  const isFreeDelivery = () => {
    return getSubtotal() >= 2500;
  };

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      getTotalItems,
      getTotalPrice,
      getSubtotal,
      getShippingCharge,
      getFinalTotal,
      isFreeDelivery
    }}>
      {children}
    </CartContext.Provider>
  );
};