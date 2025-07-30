import React, { useState } from 'react';
import { Search, Menu, X, ShoppingBag, BookOpen } from 'lucide-react';
import SearchResults from './SearchResults';
import { useSearch } from '../hooks/useSearch';
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

interface HeaderProps {
  products: Product[];
  blogPosts?: BlogPost[];
  onProductClick: (product: Product) => void;
  onBlogClick?: (post: BlogPost) => void;
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Header: React.FC<HeaderProps> = ({ 
  products, 
  blogPosts = [], 
  onProductClick, 
  onBlogClick = () => {}, 
  onNavigate,
  currentPage 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const { query, setQuery, results, isSearching } = useSearch(products, blogPosts);

  const handleSearchChange = (value: string) => {
    setQuery(value);
    setShowSearchResults(value.trim().length > 0);
  };

  const handleSearchResultClick = () => {
    setShowSearchResults(false);
    setQuery('');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <ShoppingBag className="h-8 w-8 text-orange-500" />
            <h1 className="text-2xl font-bold text-gray-900">
              YOUR<span className="text-orange-500">Store</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => onNavigate('home')}
              className={`transition-colors ${currentPage === 'home' ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'}`}
            >
              Home
            </button>
            <button 
              onClick={() => onNavigate('blog')}
              className={`flex items-center space-x-1 transition-colors ${currentPage === 'blog' ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'}`}
            >
              <BookOpen className="h-4 w-4" />
              <span>Blog</span>
            </button>
            <button 
              onClick={() => onNavigate('about')}
              className={`transition-colors ${currentPage === 'about' ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'}`}
            >
              About
            </button>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8 relative">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                value={query}
                onChange={(e) => handleSearchChange(e.target.value)}
                onFocus={() => query.trim() && setShowSearchResults(true)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              
              {showSearchResults && (
                <SearchResults
                  results={results}
                  query={query}
                  isSearching={isSearching}
                  onProductClick={(product) => {
                    handleSearchResultClick();
                    onProductClick(product);
                  }}
                  onBlogClick={(post) => {
                    handleSearchResultClick();
                    onBlogClick(post);
                  }}
                />
              )}
            </div>
            
            {/* Overlay to close search results */}
            {showSearchResults && (
              <div 
                className="fixed inset-0 z-40"
                onClick={() => setShowSearchResults(false)}
              />
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="mb-4 relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={query}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                
                {showSearchResults && (
                  <SearchResults
                    results={results}
                    query={query}
                    isSearching={isSearching}
                    onProductClick={(product) => {
                      handleSearchResultClick();
                      onProductClick(product);
                      setIsMenuOpen(false);
                    }}
                    onBlogClick={(post) => {
                      handleSearchResultClick();
                      onBlogClick(post);
                      setIsMenuOpen(false);
                    }}
                  />
                )}
              </div>
            </div>
            <nav className="flex flex-col space-y-2">
              <button 
                onClick={() => { onNavigate('home'); setIsMenuOpen(false); }}
                className={`text-left transition-colors ${currentPage === 'home' ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'}`}
              >
                Home
              </button>
              <button 
                onClick={() => { onNavigate('blog'); setIsMenuOpen(false); }}
                className={`text-left flex items-center space-x-1 transition-colors ${currentPage === 'blog' ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'}`}
              >
                <BookOpen className="h-4 w-4" />
                <span>Blog</span>
              </button>
              <button 
                onClick={() => { onNavigate('about'); setIsMenuOpen(false); }}
                className={`text-left transition-colors ${currentPage === 'about' ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'}`}
              >
                About
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;