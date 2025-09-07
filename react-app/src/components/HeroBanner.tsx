import React, { useState, useEffect } from 'react';
import { ChevronRight, Star, Truck, Shield, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const heroSlides = [
    {
      id: 1,
      title: "Premium Quality Nuts",
      subtitle: "Fresh from the finest orchards",
      description: "Discover our handpicked selection of premium nuts, delivered fresh to your doorstep",
      image: "/src/assets/nuts.jpg",
      cta: "Shop Nuts",
      highlight: "Free Delivery Above ₹2500"
    },
    {
      id: 2,
      title: "Superfood Seeds",
      subtitle: "Power-packed nutrition",
      description: "Boost your health with our organic chia, quinoa, and sunflower seeds",
      image: "/src/assets/seeds.jpg",
      cta: "Explore Seeds",
      highlight: "Organic & Fresh"
    },
    {
      id: 3,
      title: "Artisan Chocolates",
      subtitle: "Handcrafted perfection",
      description: "Indulge in our premium dark chocolate collection and artisan truffles",
      image: "/src/assets/chocolates.jpg",
      cta: "Taste Luxury",
      highlight: "Made with Love"
    }
  ];

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentSlideData = heroSlides[currentSlide];

  return (
    <div className="relative h-[70vh] md:h-[80vh] overflow-hidden bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
          style={{
            backgroundImage: `url(${currentSlideData.image})`,
            transform: `scale(${isVideoLoaded ? 1.05 : 1})`
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 animate-fade-in">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-white text-sm font-medium">Premium Quality</span>
            </div>

            {/* Main Content */}
            <div className="space-y-6 animate-slide-up">
              <div>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                  {currentSlideData.title}
                </h1>
                <p className="text-xl md:text-2xl text-orange-200 mb-2 font-medium">
                  {currentSlideData.subtitle}
                </p>
                <p className="text-lg text-white/90 max-w-lg leading-relaxed">
                  {currentSlideData.description}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => scrollToSection(currentSlideData.cta.toLowerCase().replace(' ', '-'))}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
                >
                  {currentSlideData.cta}
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => scrollToSection('nuts')}
                  className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-full backdrop-blur-sm transition-all duration-300"
                >
                  View All Products
                </Button>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center space-x-2 text-white/90">
                  <Truck className="w-5 h-5 text-orange-400" />
                  <span className="text-sm font-medium">Free Delivery</span>
                </div>
                <div className="flex items-center space-x-2 text-white/90">
                  <Shield className="w-5 h-5 text-orange-400" />
                  <span className="text-sm font-medium">Quality Guaranteed</span>
                </div>
                <div className="flex items-center space-x-2 text-white/90">
                  <Award className="w-5 h-5 text-orange-400" />
                  <span className="text-sm font-medium">Premium Selection</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-orange-500 scale-125'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-20 hidden lg:block animate-float">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
          <div className="text-white text-center">
            <div className="text-2xl font-bold">₹2500+</div>
            <div className="text-sm opacity-90">Free Delivery</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-20 right-20 hidden lg:block animate-float-delayed">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
          <div className="text-white text-center">
            <div className="text-2xl font-bold">4.9★</div>
            <div className="text-sm opacity-90">Customer Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
