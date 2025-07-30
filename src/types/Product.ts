export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  category: string;
  description: string;
  features: string[];
  affiliateUrl: string;
  badge?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}