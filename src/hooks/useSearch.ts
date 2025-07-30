import { useState, useEffect, useMemo } from 'react';
import Fuse from 'fuse.js';
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

export const useSearch = (products: Product[], blogPosts: BlogPost[] = []) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const productFuse = useMemo(() => {
    return new Fuse(products, {
      keys: [
        { name: 'title', weight: 0.4 },
        { name: 'description', weight: 0.3 },
        { name: 'category', weight: 0.2 },
        { name: 'features', weight: 0.1 }
      ],
      threshold: 0.4,
      includeScore: true,
      minMatchCharLength: 2
    });
  }, [products]);

  const blogFuse = useMemo(() => {
    return new Fuse(blogPosts, {
      keys: [
        { name: 'title', weight: 0.4 },
        { name: 'excerpt', weight: 0.3 },
        { name: 'content', weight: 0.2 },
        { name: 'tags', weight: 0.1 }
      ],
      threshold: 0.4,
      includeScore: true,
      minMatchCharLength: 2
    });
  }, [blogPosts]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    const searchProducts = productFuse.search(query).map(result => ({
      type: 'product' as const,
      item: result.item,
      score: result.score
    }));

    const searchBlogs = blogFuse.search(query).map(result => ({
      type: 'blog' as const,
      item: result.item,
      score: result.score
    }));

    const combinedResults = [...searchProducts, ...searchBlogs]
      .sort((a, b) => (a.score || 0) - (b.score || 0))
      .slice(0, 10);

    setResults(combinedResults);
    setIsSearching(false);
  }, [query, productFuse, blogFuse]);

  return {
    query,
    setQuery,
    results,
    isSearching,
    hasResults: results.length > 0
  };
};