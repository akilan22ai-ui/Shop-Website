// Product data and categories
const products = {
    nutCategories: [
        {
            name: 'Cashews',
            description: 'Premium quality cashews in various grades',
            image: 'src/assets/cashew-w180.jpg',
            varietyCount: 4,
            varieties: [
                {
                    name: 'Cashew W180',
                    description: 'Premium grade W180 cashews - largest and finest quality',
                    basePrice: 550,
                    image: 'src/assets/cashew-w180.jpg',
                    isWeightBased: true,
                    weights: [
                        { value: '250g', multiplier: 1 },
                        { value: '500g', multiplier: 1.9 },
                        { value: '1kg', multiplier: 3.6 }
                    ]
                },
                {
                    name: 'Cashew W240',
                    description: 'High-grade W240 cashews - large and premium quality',
                    basePrice: 500,
                    image: 'src/assets/cashew-w240.jpg',
                    isWeightBased: true,
                    weights: [
                        { value: '250g', multiplier: 1 },
                        { value: '500g', multiplier: 1.9 },
                        { value: '1kg', multiplier: 3.6 }
                    ]
                },
                {
                    name: 'Cashew W320',
                    description: 'Standard grade W320 cashews - medium size and great value',
                    basePrice: 450,
                    image: 'src/assets/cashew-w320.jpg',
                    isWeightBased: true,
                    weights: [
                        { value: '250g', multiplier: 1 },
                        { value: '500g', multiplier: 1.9 },
                        { value: '1kg', multiplier: 3.6 }
                    ]
                },
                {
                    name: 'Cashew Splits',
                    description: 'Split cashews - perfect for cooking and baking',
                    basePrice: 400,
                    image: 'src/assets/cashew-splits.jpg',
                    isWeightBased: true,
                    weights: [
                        { value: '250g', multiplier: 1 },
                        { value: '500g', multiplier: 1.9 },
                        { value: '1kg', multiplier: 3.6 }
                    ]
                }
            ]
        },
        {
            name: 'Almonds',
            description: 'Premium quality almonds from California and India',
            image: 'src/assets/almond-california.jpg',
            varietyCount: 2,
            varieties: [
                {
                    name: 'California Almonds',
                    description: 'Premium California almonds - sweet and crunchy',
                    basePrice: 400,
                    image: 'src/assets/almond-california.jpg',
                    isWeightBased: true,
                    weights: [
                        { value: '250g', multiplier: 1 },
                        { value: '500g', multiplier: 1.9 },
                        { value: '1kg', multiplier: 3.6 }
                    ]
                },
                {
                    name: 'Mamra Almonds',
                    description: 'Premium Indian Mamra almonds - rich and flavorful',
                    basePrice: 600,
                    image: 'src/assets/almond-mamra.jpg',
                    isWeightBased: true,
                    weights: [
                        { value: '250g', multiplier: 1 },
                        { value: '500g', multiplier: 1.9 },
                        { value: '1kg', multiplier: 3.6 }
                    ]
                }
            ]
        },
        {
            name: 'Walnuts',
            description: 'Premium quality walnuts in various forms',
            image: 'src/assets/walnut-halves.jpg',
            varietyCount: 2,
            varieties: [
                {
                    name: 'Walnut Halves',
                    description: 'Premium walnut halves - perfect presentation',
                    basePrice: 450,
                    image: 'src/assets/walnut-halves.jpg',
                    isWeightBased: true,
                    weights: [
                        { value: '250g', multiplier: 1 },
                        { value: '500g', multiplier: 1.9 },
                        { value: '1kg', multiplier: 3.6 }
                    ]
                },
                {
                    name: 'Walnut Quarters',
                    description: 'Walnut quarters - ideal for baking and cooking',
                    basePrice: 400,
                    image: 'src/assets/walnut-quarters.jpg',
                    isWeightBased: true,
                    weights: [
                        { value: '250g', multiplier: 1 },
                        { value: '500g', multiplier: 1.9 },
                        { value: '1kg', multiplier: 3.6 }
                    ]
                }
            ]
        }
    ],
    simpleProducts: [
        {
            name: 'Seeds Mix',
            description: 'Healthy mix of pumpkin, sunflower, and flax seeds',
            basePrice: 300,
            image: 'src/assets/seeds.jpg',
            isWeightBased: true,
            weights: [
                { value: '250g', multiplier: 1 },
                { value: '500g', multiplier: 1.9 },
                { value: '1kg', multiplier: 3.6 }
            ]
        },
        {
            name: 'Dry Fruits Mix',
            description: 'Premium mix of raisins, cranberries, and apricots',
            basePrice: 350,
            image: 'src/assets/dry-fruits.jpg',
            isWeightBased: true,
            weights: [
                { value: '250g', multiplier: 1 },
                { value: '500g', multiplier: 1.9 },
                { value: '1kg', multiplier: 3.6 }
            ]
        },
        {
            name: 'Chocolate Collection',
            description: 'Assorted premium chocolates',
            basePrice: 450,
            image: 'src/assets/chocolates.jpg',
            isWeightBased: false
        }
    ]
};

export default products;