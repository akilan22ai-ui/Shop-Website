import React from 'react';
import { Star, TrendingUp, Award } from 'lucide-react';
import ProductCard from './ProductCard';
import { nutCategories, simpleProducts } from '@/data/products';

const PopularItemsSection = () => {
  // Define popular items with ratings
  const popularItems = [
    {
      ...nutCategories[0].varieties[0], // Cashew W180
      rating: 4.9,
      reviews: 127,
      badge: 'Best Seller'
    },
    {
      ...nutCategories[1].varieties[0], // California Almonds
      rating: 4.8,
      reviews: 98,
      badge: 'Premium'
    },
    {
      ...simpleProducts.seeds[0], // Chia Seeds
      rating: 4.7,
      reviews: 156,
      badge: 'Superfood'
    },
    {
      ...simpleProducts['dry-fruits'][0], // Premium Dates
      rating: 4.9,
      reviews: 89,
      badge: 'Organic'
    }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <TrendingUp className="w-4 h-4" />
            <span>Trending Now</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Popular Items
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most loved products, handpicked by thousands of satisfied customers
          </p>
        </div>

        {/* Popular Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularItems.map((item, index) => (
            <div key={index} className="group">
              <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                {/* Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                    <Award className="w-3 h-3" />
                    <span>{item.badge}</span>
                  </div>
                </div>

                {/* Product Image */}
                <div className="aspect-square overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {item.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(item.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {item.rating} ({item.reviews} reviews)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-orange-600">
                      ₹{item.basePrice.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-500">
                      per 250g
                    </div>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            View All Popular Items
          </button>
        </div>
      </div>
    </section>
  );
};

export default PopularItemsSection;
