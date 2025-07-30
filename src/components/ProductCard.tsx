import React from 'react';
import { Star, ExternalLink } from 'lucide-react';
import { Product } from '../types/Product';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : i < rating
            ? 'text-yellow-400 fill-current opacity-50'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover cursor-pointer"
          onClick={onClick}
        />
        {product.badge && (
          <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
            {product.badge}
          </span>
        )}
        {discount > 0 && (
          <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
            -{discount}%
          </span>
        )}
      </div>
      
      <div className="p-4">
        <h3 
          className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 cursor-pointer hover:text-orange-500 transition-colors"
          onClick={onClick}
        >
          {product.title}
        </h3>
        
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {renderStars(product.rating)}
          </div>
          <span className="ml-2 text-sm text-gray-600">
            {product.rating} ({product.reviewCount.toLocaleString()})
          </span>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
            )}
          </div>
        </div>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            window.open(product.affiliateUrl, '_blank');
          }}
          className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2"
        >
          <span>Buy on Amazon</span>
          <ExternalLink className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;