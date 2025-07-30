import React from 'react';
import { ShoppingBag, Star, Zap } from 'lucide-react';
import { useContent } from '../hooks/useContent';

interface HeroProps {
  onGetStarted?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  const { content } = useContent('pages/homepage');

  return (
    <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white bg-opacity-20 p-4 rounded-full">
              <ShoppingBag className="h-12 w-12" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {content?.heroTitle || 'Find Amazing Products'}
            <span className="block text-yellow-300">{content?.heroSubtitle || 'At Great Prices'}</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            {content?.heroDescription || 'Discover handpicked products from Amazon with exclusive deals and honest reviews. Shop with confidence and save money on quality items.'}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-8">
            <div className="flex items-center justify-center space-x-3">
              <Star className="h-8 w-8 text-yellow-300" />
              <span className="text-lg font-medium">Top Rated Products</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Zap className="h-8 w-8 text-yellow-300" />
              <span className="text-lg font-medium">Lightning Fast Delivery</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <ShoppingBag className="h-8 w-8 text-yellow-300" />
              <span className="text-lg font-medium">Secure Shopping</span>
            </div>
          </div>
          
          <button 
            onClick={onGetStarted}
            className="bg-white text-orange-500 px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition-colors transform hover:scale-105 shadow-lg"
          >
            {content?.heroButtonText || 'Start Shopping Now'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;