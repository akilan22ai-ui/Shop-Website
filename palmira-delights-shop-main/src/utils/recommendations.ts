import { Product, nutCategories, simpleProducts } from '@/data/products';

// Recommendation mapping based on product types
const recommendationMap: Record<string, string[]> = {
  // Cashews
  'Cashew W180': ['Cashew W240', 'Cashew W320', 'Almond California', 'Walnut Halves'],
  'Cashew W240': ['Cashew W180', 'Cashew W320', 'Almond California', 'Walnut Halves'],
  'Cashew W320': ['Cashew W180', 'Cashew W240', 'Almond California', 'Walnut Halves'],
  'Cashew Splits': ['Cashew W180', 'Cashew W240', 'Almond California', 'Walnut Quarters'],
  
  // Almonds
  'California Almonds': ['Mamra Almonds', 'Cashew W180', 'Cashew W240', 'Walnut Halves'],
  'Mamra Almonds': ['California Almonds', 'Cashew W180', 'Cashew W240', 'Walnut Halves'],
  
  // Walnuts
  'Walnut Halves': ['Walnut Quarters', 'California Almonds', 'Cashew W180', 'Cashew W240'],
  'Walnut Quarters': ['Walnut Halves', 'California Almonds', 'Cashew W180', 'Cashew W240'],
  
  // Seeds
  'Chia Seeds': ['Quinoa Seeds', 'Sunflower Seeds', 'California Almonds', 'Cashew W180'],
  'Quinoa Seeds': ['Chia Seeds', 'Sunflower Seeds', 'California Almonds', 'Cashew W180'],
  'Sunflower Seeds': ['Chia Seeds', 'Quinoa Seeds', 'California Almonds', 'Cashew W180'],
  
  // Dry Fruits
  'Premium Dates': ['Mixed Dry Fruits', 'Turkish Apricots', 'California Almonds', 'Cashew W180'],
  'Mixed Dry Fruits': ['Premium Dates', 'Turkish Apricots', 'California Almonds', 'Cashew W180'],
  'Turkish Apricots': ['Premium Dates', 'Mixed Dry Fruits', 'California Almonds', 'Cashew W180'],
  
  // Chocolates
  'Dark Chocolate Collection': ['Artisan Truffles', 'Milk Chocolate Assortment', 'California Almonds', 'Cashew W180'],
  'Artisan Truffles': ['Dark Chocolate Collection', 'Milk Chocolate Assortment', 'California Almonds', 'Cashew W180'],
  'Milk Chocolate Assortment': ['Dark Chocolate Collection', 'Artisan Truffles', 'California Almonds', 'Cashew W180'],
};

// Get all products from the data
const getAllProducts = (): Product[] => {
  const allProducts: Product[] = [];
  
  // Add nut category products
  nutCategories.forEach((category: any) => {
    allProducts.push(...category.varieties);
  });
  
  // Add simple products
  Object.values(simpleProducts).forEach((products: any) => {
    allProducts.push(...products);
  });
  
  return allProducts;
};

export const getRecommendations = (cartItemNames: string[]): Product[] => {
  if (cartItemNames.length === 0) return [];
  
  const allProducts = getAllProducts();
  const recommendedProductNames = new Set<string>();
  
  // Get recommendations for each cart item
  cartItemNames.forEach(itemName => {
    const recommendations = recommendationMap[itemName] || [];
    recommendations.forEach(rec => recommendedProductNames.add(rec));
  });
  
  // Filter out products that are already in cart
  const filteredRecommendations = Array.from(recommendedProductNames)
    .filter(name => !cartItemNames.includes(name))
    .slice(0, 4); // Limit to 4 recommendations
  
  // Get the actual product objects
  const recommendedProducts = filteredRecommendations
    .map(name => allProducts.find(product => product.name === name))
    .filter((product): product is Product => product !== undefined);
  
  return recommendedProducts;
};

export const getRecommendationReason = (cartItemName: string, recommendedProductName: string): string => {
  const reasons: Record<string, Record<string, string>> = {
    'Cashew W180': {
      'Cashew W240': 'Try our premium W240 grade for a different texture',
      'Almond California': 'Perfect pairing with sweet California almonds',
      'Walnut Halves': 'Great combination for healthy snacking'
    },
    'California Almonds': {
      'Mamra Almonds': 'Experience the premium Mamra variety',
      'Cashew W180': 'Excellent pairing with premium cashews',
      'Walnut Halves': 'Create a perfect nut mix'
    },
    'Walnut Halves': {
      'Walnut Quarters': 'Try our broken pieces for cooking',
      'California Almonds': 'Great combination for baking',
      'Cashew W180': 'Perfect for premium nut mixes'
    }
  };
  
  return reasons[cartItemName]?.[recommendedProductName] || 'Customers also love this product';
};
