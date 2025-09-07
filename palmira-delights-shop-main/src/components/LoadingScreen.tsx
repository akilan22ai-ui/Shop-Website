import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);

  const brandName = "PALMYRA";
  const letters = brandName.split('');

  useEffect(() => {
    // Animate letters one by one with staggered timing
    const letterInterval = setInterval(() => {
      setCurrentLetterIndex((prev) => {
        if (prev < letters.length - 1) {
          return prev + 1;
        } else {
          clearInterval(letterInterval);
          // Show subtitle after all letters are revealed
          setTimeout(() => {
            setShowSubtitle(true);
          }, 300);
          // Hold for 1.5 seconds after all letters are shown
          setTimeout(() => {
            setIsComplete(true);
          }, 1500);
          return prev;
        }
      });
    }, 250); // 250ms delay between each letter for smoother effect

    return () => clearInterval(letterInterval);
  }, [letters.length]);

  useEffect(() => {
    if (isComplete) {
      // Start exit animation after 1.5 second hold
      setTimeout(() => {
        setIsExiting(true);
        // Complete loading after exit animation
        setTimeout(() => {
          onComplete();
        }, 1000); // Exit animation duration
      }, 1500);
    }
  }, [isComplete, onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-white transition-all duration-800 ease-in-out ${
        isExiting ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}
      style={{
        background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 100%)'
      }}
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-red-50 to-transparent opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-red-50 to-transparent opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Brand name container */}
      <div className="relative z-10">
        <div className="flex items-center justify-center space-x-1 sm:space-x-2">
          {letters.map((letter, index) => (
            <div
              key={index}
              className={`text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black transition-all duration-500 ease-out relative overflow-hidden ${
                index <= currentLetterIndex
                  ? 'opacity-100 transform translate-y-0 scale-100'
                  : 'opacity-0 transform translate-y-8 scale-75'
              }`}
              style={{
                color: '#FF0000',
                textShadow: '0 4px 8px rgba(255, 0, 0, 0.3), 0 8px 16px rgba(255, 0, 0, 0.2)',
                animationDelay: `${index * 100}ms`,
                animation: index <= currentLetterIndex 
                  ? 'letterReveal 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards'
                  : 'none'
              }}
            >
              <span className="relative z-10">{letter}</span>
              {index <= currentLetterIndex && (
                <div 
                  className="absolute inset-0 shimmer-effect"
                  style={{
                    animationDelay: `${index * 100 + 400}ms`
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Subtitle that appears after brand name */}
        {showSubtitle && (
          <div 
            className="text-center mt-6 animate-fadeInUp"
            style={{
              animation: 'fadeInUp 0.8s ease-out forwards',
              opacity: 0
            }}
          >
            <p className="text-lg sm:text-xl text-gray-600 font-medium tracking-wider">
              DELIGHTS
            </p>
            <div className="w-16 h-1 bg-red-500 mx-auto mt-2 rounded-full animate-pulse"></div>
          </div>
        )}

        {/* Loading dots */}
        {!isComplete && (
          <div className="flex justify-center mt-8 space-x-2">
            {[0, 1, 2].map((dot) => (
              <div
                key={dot}
                className="w-2 h-2 bg-red-500 rounded-full animate-bounce"
                style={{
                  animationDelay: `${dot * 0.2}s`,
                  animationDuration: '1s'
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes letterReveal {
          0% {
            opacity: 0;
            transform: translateY(40px) scale(0.6) rotateX(90deg) rotateY(15deg);
            filter: blur(4px);
          }
          30% {
            transform: translateY(-15px) scale(1.15) rotateX(0deg) rotateY(0deg);
            filter: blur(0px);
          }
          60% {
            transform: translateY(5px) scale(0.95) rotateX(0deg) rotateY(0deg);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1) rotateX(0deg) rotateY(0deg);
            filter: blur(0px);
          }
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.9);
            filter: blur(2px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0px);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .shimmer-effect {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
