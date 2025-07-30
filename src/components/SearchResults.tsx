import React from 'react';
import { Search, Clock, Tag } from 'lucide-react';
import { Product } from '../types/Product';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  date: string;
  image: string;
}

interface SearchResult {
  type: 'product' | 'blog';
  item: Product | BlogPost;
  score?: number;
}

interface SearchResultsProps {
  results: SearchResult[];
  query: string;
  isSearching: boolean;
  onProductClick: (product: Product) => void;
  onBlogClick: (post: BlogPost) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  query,
  isSearching,
  onProductClick,
  onBlogClick
}) => {
  if (!query.trim()) return null;

  if (isSearching) {
    return (
      <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4">
        <div className="flex items-center justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500"></div>
          <span className="ml-2 text-gray-600">Searching...</span>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4">
        <div className="flex items-center justify-center py-4 text-gray-500">
          <Search className="h-5 w-5 mr-2" />
          <span>No results found for "{query}"</span>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
      <div className="p-2">
        <div className="text-sm text-gray-500 px-3 py-2 border-b">
          {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
        </div>
        
        {results.map((result, index) => (
          <div key={index} className="border-b border-gray-100 last:border-b-0">
            {result.type === 'product' ? (
              <ProductSearchResult
                product={result.item as Product}
                onClick={() => onProductClick(result.item as Product)}
              />
            ) : (
              <BlogSearchResult
                post={result.item as BlogPost}
                onClick={() => onBlogClick(result.item as BlogPost)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const ProductSearchResult: React.FC<{
  product: Product;
  onClick: () => void;
}> = ({ product, onClick }) => (
  <button
    onClick={onClick}
    className="w-full p-3 hover:bg-gray-50 transition-colors text-left flex items-center space-x-3"
  >
    <img
      src={product.image}
      alt={product.title}
      className="w-12 h-12 object-cover rounded"
    />
    <div className="flex-1 min-w-0">
      <div className="flex items-center space-x-2 mb-1">
        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Product</span>
        <span className="text-sm font-medium text-gray-900 truncate">{product.title}</span>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-lg font-bold text-orange-500">${product.price}</span>
        <span className="text-sm text-gray-500">★ {product.rating}</span>
      </div>
    </div>
  </button>
);

const BlogSearchResult: React.FC<{
  post: BlogPost;
  onClick: () => void;
}> = ({ post, onClick }) => (
  <button
    onClick={onClick}
    className="w-full p-3 hover:bg-gray-50 transition-colors text-left flex items-center space-x-3"
  >
    <img
      src={post.image}
      alt={post.title}
      className="w-12 h-12 object-cover rounded"
    />
    <div className="flex-1 min-w-0">
      <div className="flex items-center space-x-2 mb-1">
        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Blog</span>
        <span className="text-sm font-medium text-gray-900 truncate">{post.title}</span>
      </div>
      <div className="flex items-center space-x-2 text-xs text-gray-500">
        <Clock className="h-3 w-3" />
        <span>{new Date(post.date).toLocaleDateString()}</span>
        {post.tags.length > 0 && (
          <>
            <Tag className="h-3 w-3" />
            <span>{post.tags[0]}</span>
          </>
        )}
      </div>
    </div>
  </button>
);

export default SearchResults;