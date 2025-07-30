import React from 'react';
import { X, Star, ExternalLink, Check } from 'lucide-react';
import { Product } from '../types/Product';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  if (!isOpen || !product) return null;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b flex items-center justify-between p-4">
          <h2 className="text-xl font-semibold text-gray-900">Product Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full rounded-lg"
                />
                {product.badge && (
                  <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded text-sm font-medium">
                    {product.badge}
                  </span>
                )}
                {discount > 0 && (
                  <span className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded text-sm font-medium">
                    -{discount}%
                  </span>
                )}
              </div>
            </div>
            
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">{product.title}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {renderStars(product.rating)}
                </div>
                <span className="ml-3 text-gray-600">
                  {product.rating} out of 5 ({product.reviewCount.toLocaleString()} reviews)
                </span>
              </div>
              
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                )}
                {discount > 0 && (
                  <span className="text-green-600 font-medium">Save {discount}%</span>
                )}
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <button
                onClick={() => window.open(product.affiliateUrl, '_blank')}
                className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2 text-lg font-medium"
              >
                <span>Buy Now on Amazon</span>
                <ExternalLink className="h-5 w-5" />
              </button>
              
              <p className="text-sm text-gray-500 mt-3 text-center">
                * As an Amazon Associate, we earn from qualifying purchases
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;