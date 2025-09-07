// Import all asset images
import nutsImage from '@/assets/nuts.jpg';
import seedsImage from '@/assets/seeds.jpg';
import dryFruitsImage from '@/assets/dry-fruits.jpg';
import chocolatesImage from '@/assets/chocolates.jpg';

// Cashew variety images
import cashewW180 from '@/assets/cashew-w180.jpg';
import cashewW240 from '@/assets/cashew-w240.jpg';
import cashewW320 from '@/assets/cashew-w320.jpg';
import cashewSplits from '@/assets/cashew-splits.jpg';

// Almond variety images
import almondCalifornia from '@/assets/almond-california.jpg';
import almondMamra from '@/assets/almond-mamra.jpg';

// Walnut variety images
import walnutHalves from '@/assets/walnut-halves.jpg';
import walnutQuarters from '@/assets/walnut-quarters.jpg';

export interface Product {
  name: string;
  description: string;
  basePrice: number;
  image: string;
  weights?: { value: string; multiplier: number }[];
  isWeightBased?: boolean; // true for nuts, seeds, dry fruits; false for chocolates
}

export interface NutCategory {
  name: string;
  description: string;
  image: string;
  varietyCount: number;
  varieties: Product[];
}

export const nutCategories: NutCategory[] = [
  {
    name: 'Cashews',
    description: 'Premium quality cashews in various grades',
    image: cashewW180,
    varietyCount: 4,
    varieties: [
      {
        name: 'Cashew W180',
        description: 'Premium grade W180 cashews - largest and finest quality',
        basePrice: 550,
        image: cashewW180,
        isWeightBased: true,
        weights: [
          { value: '250g', multiplier: 1 },
          { value: '500g', multiplier: 1.8 },
          { value: '1kg', multiplier: 3.2 },
          { value: '2kg', multiplier: 6.0 },
          { value: '3kg', multiplier: 8.5 },
          { value: '4kg', multiplier: 11.0 },
          { value: '5kg', multiplier: 13.5 }
        ]
      },
      {
        name: 'Cashew W240',
        description: 'High quality W240 grade cashews - excellent for snacking',
        basePrice: 480,
        image: cashewW240,
        isWeightBased: true,
        weights: [
          { value: '250g', multiplier: 1 },
          { value: '500g', multiplier: 1.8 },
          { value: '1kg', multiplier: 3.2 },
          { value: '2kg', multiplier: 6.0 },
          { value: '3kg', multiplier: 8.5 },
          { value: '4kg', multiplier: 11.0 },
          { value: '5kg', multiplier: 13.5 }
        ]
      },
      {
        name: 'Cashew W320',
        description: 'Standard grade W320 cashews - great value for money',
        basePrice: 420,
        image: cashewW320,
        isWeightBased: true,
        weights: [
          { value: '250g', multiplier: 1 },
          { value: '500g', multiplier: 1.8 },
          { value: '1kg', multiplier: 3.2 },
          { value: '2kg', multiplier: 6.0 },
          { value: '3kg', multiplier: 8.5 },
          { value: '4kg', multiplier: 11.0 },
          { value: '5kg', multiplier: 13.5 }
        ]
      },
      {
        name: 'Cashew Splits',
        description: 'Broken cashew pieces - perfect for cooking and baking',
        basePrice: 350,
        image: cashewSplits,
        isWeightBased: true,
        weights: [
          { value: '250g', multiplier: 1 },
          { value: '500g', multiplier: 1.8 },
          { value: '1kg', multiplier: 3.2 },
          { value: '2kg', multiplier: 6.0 },
          { value: '3kg', multiplier: 8.5 },
          { value: '4kg', multiplier: 11.0 },
          { value: '5kg', multiplier: 13.5 }
        ]
      }
    ]
  },
  {
    name: 'Almonds',
    description: 'Fresh almonds sourced from the best regions',
    image: almondCalifornia,
    varietyCount: 2,
    varieties: [
      {
        name: 'California Almonds',
        description: 'Premium California almonds - sweet and crunchy',
        basePrice: 450,
        image: almondCalifornia,
        isWeightBased: true,
        weights: [
          { value: '250g', multiplier: 1 },
          { value: '500g', multiplier: 1.8 },
          { value: '1kg', multiplier: 3.2 },
          { value: '2kg', multiplier: 6.0 },
          { value: '3kg', multiplier: 8.5 },
          { value: '4kg', multiplier: 11.0 },
          { value: '5kg', multiplier: 13.5 }
        ]
      },
      {
        name: 'Mamra Almonds',
        description: 'Organic Mamra almonds - rich in nutrients and flavor',
        basePrice: 650,
        image: almondMamra,
        isWeightBased: true,
        weights: [
          { value: '250g', multiplier: 1 },
          { value: '500g', multiplier: 1.8 },
          { value: '1kg', multiplier: 3.2 },
          { value: '2kg', multiplier: 6.0 },
          { value: '3kg', multiplier: 8.5 },
          { value: '4kg', multiplier: 11.0 },
          { value: '5kg', multiplier: 13.5 }
        ]
      }
    ]
  },
  {
    name: 'Walnuts',
    description: 'Fresh walnuts in different cuts and grades',
    image: walnutHalves,
    varietyCount: 2,
    varieties: [
      {
        name: 'Walnut Halves',
        description: 'Perfect walnut halves - ideal for baking and snacking',
        basePrice: 520,
        image: walnutHalves,
        isWeightBased: true,
        weights: [
          { value: '250g', multiplier: 1 },
          { value: '500g', multiplier: 1.8 },
          { value: '1kg', multiplier: 3.2 },
          { value: '2kg', multiplier: 6.0 },
          { value: '3kg', multiplier: 8.5 },
          { value: '4kg', multiplier: 11.0 },
          { value: '5kg', multiplier: 13.5 }
        ]
      },
      {
        name: 'Walnut Quarters',
        description: 'Broken walnut pieces - perfect for cooking and garnishing',
        basePrice: 480,
        image: walnutQuarters,
        isWeightBased: true,
        weights: [
          { value: '250g', multiplier: 1 },
          { value: '500g', multiplier: 1.8 },
          { value: '1kg', multiplier: 3.2 },
          { value: '2kg', multiplier: 6.0 },
          { value: '3kg', multiplier: 8.5 },
          { value: '4kg', multiplier: 11.0 },
          { value: '5kg', multiplier: 13.5 }
        ]
      }
    ]
  }
];

export const simpleProducts = {
  seeds: [
    {
      name: 'Chia Seeds',
      description: 'Organic chia seeds packed with omega-3 and fiber',
      basePrice: 280,
      image: seedsImage,
      isWeightBased: true,
      weights: [
        { value: '250g', multiplier: 1 },
        { value: '500g', multiplier: 1.8 },
        { value: '1kg', multiplier: 3.2 },
        { value: '2kg', multiplier: 6.0 },
        { value: '3kg', multiplier: 8.5 },
        { value: '4kg', multiplier: 11.0 },
        { value: '5kg', multiplier: 13.5 }
      ]
    },
    {
      name: 'Quinoa Seeds',
      description: 'High-protein superfood quinoa seeds',
      basePrice: 320,
      image: seedsImage,
      isWeightBased: true,
      weights: [
        { value: '250g', multiplier: 1 },
        { value: '500g', multiplier: 1.8 },
        { value: '1kg', multiplier: 3.2 },
        { value: '2kg', multiplier: 6.0 },
        { value: '3kg', multiplier: 8.5 },
        { value: '4kg', multiplier: 11.0 },
        { value: '5kg', multiplier: 13.5 }
      ]
    },
    {
      name: 'Sunflower Seeds',
      description: 'Roasted sunflower seeds - perfect healthy snack',
      basePrice: 220,
      image: seedsImage,
      isWeightBased: true,
      weights: [
        { value: '250g', multiplier: 1 },
        { value: '500g', multiplier: 1.8 },
        { value: '1kg', multiplier: 3.2 },
        { value: '2kg', multiplier: 6.0 },
        { value: '3kg', multiplier: 8.5 },
        { value: '4kg', multiplier: 11.0 },
        { value: '5kg', multiplier: 13.5 }
      ]
    }
  ],
  'dry-fruits': [
    {
      name: 'Premium Dates',
      description: 'Sweet and nutritious Medjool dates',
      basePrice: 350,
      image: dryFruitsImage,
      isWeightBased: true,
      weights: [
        { value: '250g', multiplier: 1 },
        { value: '500g', multiplier: 1.8 },
        { value: '1kg', multiplier: 3.2 },
        { value: '2kg', multiplier: 6.0 },
        { value: '3kg', multiplier: 8.5 },
        { value: '4kg', multiplier: 11.0 },
        { value: '5kg', multiplier: 13.5 }
      ]
    },
    {
      name: 'Mixed Dry Fruits',
      description: 'A delicious mix of raisins, apricots, and figs',
      basePrice: 420,
      image: dryFruitsImage,
      isWeightBased: true,
      weights: [
        { value: '250g', multiplier: 1 },
        { value: '500g', multiplier: 1.8 },
        { value: '1kg', multiplier: 3.2 },
        { value: '2kg', multiplier: 6.0 },
        { value: '3kg', multiplier: 8.5 },
        { value: '4kg', multiplier: 11.0 },
        { value: '5kg', multiplier: 13.5 }
      ]
    },
    {
      name: 'Turkish Apricots',
      description: 'Premium dried Turkish apricots - naturally sweet',
      basePrice: 380,
      image: dryFruitsImage,
      isWeightBased: true,
      weights: [
        { value: '250g', multiplier: 1 },
        { value: '500g', multiplier: 1.8 },
        { value: '1kg', multiplier: 3.2 },
        { value: '2kg', multiplier: 6.0 },
        { value: '3kg', multiplier: 8.5 },
        { value: '4kg', multiplier: 11.0 },
        { value: '5kg', multiplier: 13.5 }
      ]
    }
  ],
  chocolates: [
    {
      name: 'Dark Chocolate Collection',
      description: 'Premium dark chocolate bars with 70% cocoa',
      basePrice: 480,
      image: chocolatesImage,
      isWeightBased: false
    },
    {
      name: 'Artisan Truffles',
      description: 'Handcrafted chocolate truffles with exotic flavors',
      basePrice: 650,
      image: chocolatesImage,
      isWeightBased: false
    },
    {
      name: 'Milk Chocolate Assortment',
      description: 'Creamy milk chocolate collection with nuts and caramel',
      basePrice: 420,
      image: chocolatesImage,
      isWeightBased: false
    }
  ]
};