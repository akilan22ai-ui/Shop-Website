import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LikeContextType {
  likedProducts: string[];
  toggleLike: (productName: string) => void;
  isLiked: (productName: string) => boolean;
  getLikedCount: () => number;
}

const LikeContext = createContext<LikeContextType | undefined>(undefined);

export const useLike = () => {
  const context = useContext(LikeContext);
  if (!context) {
    throw new Error('useLike must be used within a LikeProvider');
  }
  return context;
};

export const LikeProvider = ({ children }: { children: ReactNode }) => {
  const [likedProducts, setLikedProducts] = useState<string[]>(() => {
    // Load liked products from localStorage on initialization
    if (typeof window !== 'undefined') {
      const savedLikes = localStorage.getItem('palmyra-liked-products');
      return savedLikes ? JSON.parse(savedLikes) : [];
    }
    return [];
  });

  // Save liked products to localStorage whenever the list changes
  const saveLikesToStorage = (likes: string[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('palmyra-liked-products', JSON.stringify(likes));
    }
  };

  const toggleLike = (productName: string) => {
    setLikedProducts(prev => {
      const newLikes = prev.includes(productName)
        ? prev.filter(name => name !== productName)
        : [...prev, productName];
      
      saveLikesToStorage(newLikes);
      return newLikes;
    });
  };

  const isLiked = (productName: string) => {
    return likedProducts.includes(productName);
  };

  const getLikedCount = () => {
    return likedProducts.length;
  };

  return (
    <LikeContext.Provider value={{
      likedProducts,
      toggleLike,
      isLiked,
      getLikedCount
    }}>
      {children}
    </LikeContext.Provider>
  );
};
