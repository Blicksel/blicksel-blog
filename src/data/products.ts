import { Product, Category } from '../types/Product';

export const categories: Category[] = [
  { id: 'all', name: 'All Products', icon: 'Grid3X3' },
  { id: 'electronics', name: 'Electronics', icon: 'Smartphone' },
  { id: 'home', name: 'Home & Kitchen', icon: 'Home' },
  { id: 'fitness', name: 'Fitness', icon: 'Dumbbell' },
  { id: 'books', name: 'Books', icon: 'Book' },
  { id: 'fashion', name: 'Fashion', icon: 'Shirt' },
];

export const products: Product[] = [
  {
    id: '1',
    title: 'YOUR PRODUCT TITLE HERE',
    price: 29.99,
    originalPrice: 39.99,
    image: 'YOUR_IMAGE_URL_HERE',
    rating: 4.5,
    reviewCount: 1234,
    category: 'electronics',
    description: 'Your product description here...',
    features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'],
    affiliateUrl: 'https://amzn.to/YOUR_AFFILIATE_LINK',
    badge: 'Best Seller'
  },
  // Add more products following the same structure
  {
    id: '2', 
    title: 'ANOTHER PRODUCT TITLE',
    price: 49.99,
    image: 'ANOTHER_IMAGE_URL',
    rating: 4.7,
    reviewCount: 2567,
    category: 'home',
    description: 'Another product description...',
    features: ['Feature A', 'Feature B', 'Feature C'],
    affiliateUrl: 'https://amzn.to/ANOTHER_AFFILIATE_LINK'
  }
];