import React, { useState, useMemo } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryFilter from './components/CategoryFilter';
import ProductGrid from './components/ProductGrid';
import ProductModal from './components/ProductModal';
import BlogCard from './components/BlogCard';
import BlogPost from './components/BlogPost';
import SEOHead from './components/SEOHead';
import Footer from './components/Footer';
import { products, categories } from './data/products';
import { Product } from './types/Product';
import { useContent } from './hooks/useContent';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  date: string;
  image: string;
}

// Sample blog posts - in production, these would come from your CMS
const sampleBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Welcome to Our Affiliate Blog',
    excerpt: 'Discover amazing products and deals through our carefully curated affiliate recommendations.',
    content: `# Welcome to Our Affiliate Blog!

We're excited to share our carefully curated selection of products and deals with you. Our team researches and tests products to bring you honest reviews and the best affiliate deals available.

## What You'll Find Here

- **Product Reviews**: In-depth analysis of the latest products
- **Deal Alerts**: Exclusive discounts and limited-time offers  
- **Buying Guides**: Expert advice to help you make informed decisions
- **Category Spotlights**: Featured products in electronics, home, fitness, and more

## Our Promise

We only recommend products we believe in. As Amazon Associates, we earn from qualifying purchases, but this never influences our honest opinions and recommendations.

Stay tuned for regular updates and amazing deals!`,
    tags: ['welcome', 'affiliate', 'deals'],
    date: '2025-01-27T10:00:00.000Z',
    image: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { content: homepageContent } = useContent('pages/homepage');

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') {
      return products;
    }
    return products.filter(product => product.category === selectedCategory);
  }, [selectedCategory]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleBlogClick = (post: BlogPost) => {
    setSelectedBlogPost(post);
    setCurrentPage('blog-post');
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'blog':
        return (
          <main className="container mx-auto px-4 py-8">
            <SEOHead 
              title="Blog - Product Reviews & Deals"
              description="Read our latest product reviews, deal alerts, and buying guides to make informed purchasing decisions."
            />
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Blog</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Stay updated with the latest product reviews, deals, and buying guides
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sampleBlogPosts.map((post) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  onClick={() => handleBlogClick(post)}
                />
              ))}
            </div>
          </main>
        );

      case 'blog-post':
        return selectedBlogPost ? (
          <main className="container mx-auto px-4 py-8">
            <SEOHead 
              title={selectedBlogPost.title}
              description={selectedBlogPost.excerpt}
              image={selectedBlogPost.image}
              type="article"
              publishedTime={selectedBlogPost.date}
              keywords={selectedBlogPost.tags}
            />
            <BlogPost
              post={selectedBlogPost}
              onBack={() => setCurrentPage('blog')}
            />
          </main>
        ) : null;

      case 'about':
        return (
          <main className="container mx-auto px-4 py-8">
            <SEOHead 
              title="About Us - Your Trusted Product Recommendation Source"
              description="Learn about our mission to provide honest product reviews and the best affiliate deals from Amazon."
            />
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <img
                  src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="About Us"
                  className="w-full h-64 md:h-96 object-cover rounded-lg mb-8"
                />
                <h1 className="text-4xl font-bold text-gray-900 mb-6">About Our Store</h1>
              </div>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-gray-600 mb-8">
                  We are passionate about helping you find the best products at the best prices. Our team carefully researches and curates products from Amazon to bring you honest reviews and exclusive deals.
                </p>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
                <p className="text-gray-700 mb-6">
                  To provide transparent, honest product recommendations that help you make informed purchasing decisions while saving money.
                </p>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Trust Us?</h2>
                <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                  <li><strong>Honest Reviews</strong>: We test products ourselves when possible</li>
                  <li><strong>No Bias</strong>: Our recommendations are based on quality, not commission rates</li>
                  <li><strong>Transparency</strong>: We clearly disclose our affiliate relationships</li>
                  <li><strong>Customer First</strong>: Your satisfaction is our top priority</li>
                </ul>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
                <p className="text-gray-700">
                  Have questions about a product or need personalized recommendations? We'd love to help!
                </p>
              </div>
            </div>
          </main>
        );

      default: // home
        return (
          <>
            <SEOHead 
              title={homepageContent?.seoTitle}
              description={homepageContent?.seoDescription}
            />
            <Hero onGetStarted={() => {
              const productsSection = document.getElementById('products');
              productsSection?.scrollIntoView({ behavior: 'smooth' });
            }} />
            
            <main className="container mx-auto px-4 py-8" id="products">
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
              
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedCategory === 'all' ? 'All Products' : 
                   categories.find(c => c.id === selectedCategory)?.name || 'Products'}
                </h2>
                <p className="text-gray-600">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
                </p>
              </div>
              
              <ProductGrid
                products={filteredProducts}
                onProductClick={handleProductClick}
              />
            </main>
          </>
        );
    }
  };

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-gray-50">
        <Header 
          products={products}
          blogPosts={sampleBlogPosts}
          onProductClick={handleProductClick}
          onBlogClick={handleBlogClick}
          onNavigate={setCurrentPage}
          currentPage={currentPage}
        />
        
        {renderCurrentPage()}

        <ProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={handleModalClose}
        />
        
        <Footer />
        
        {/* Netlify Identity Widget */}
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
      </div>
    </HelmetProvider>
  );
}

export default App;
