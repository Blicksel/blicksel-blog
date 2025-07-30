import { useState, useEffect } from 'react';

interface ContentData {
  [key: string]: any;
}

export const useContent = (contentPath: string) => {
  const [content, setContent] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        // In a real implementation, this would fetch from your CMS or markdown files
        // For now, we'll use default content
        const defaultContent = await getDefaultContent(contentPath);
        setContent(defaultContent);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load content');
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [contentPath]);

  return { content, loading, error };
};

const getDefaultContent = async (path: string): Promise<ContentData> => {
  // Default content based on path
  const contentMap: { [key: string]: ContentData } = {
    'pages/homepage': {
      heroTitle: "Find Amazing Products",
      heroSubtitle: "At Great Prices",
      heroDescription: "Discover handpicked products from Amazon with exclusive deals and honest reviews. Shop with confidence and save money on quality items.",
      heroButtonText: "Start Shopping Now",
      featuredTitle: "Featured Products",
      featuredDescription: "Check out our top-rated products with the best deals",
      seoTitle: "Your Store Name - Amazon Affiliate Store",
      seoDescription: "Find the best Amazon products at great prices. Discover electronics, home goods, fitness equipment, books, and fashion with exclusive deals."
    },
    'settings/general': {
      siteTitle: "YourStore - Amazon Affiliate Store",
      siteDescription: "Find the best Amazon products at great prices. Discover electronics, home goods, fitness equipment, books, and fashion with exclusive deals.",
      contactEmail: "support@yourstore.com",
      contactPhone: "1-800-123-4567",
      address: "123 Business St, City, State 12345",
      amazonAssociateId: "your-associate-id"
    }
  };

  return contentMap[path] || {};
};