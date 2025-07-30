import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  keywords?: string[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "YourStore - Amazon Affiliate Store",
  description = "Find the best Amazon products at great prices. Discover electronics, home goods, fitness equipment, books, and fashion with exclusive deals.",
  image = "/images/og-image.jpg",
  url = window.location.href,
  type = "website",
  keywords = [],
  author = "YourStore Team",
  publishedTime,
  modifiedTime
}) => {
  const fullTitle = title.includes('YourStore') ? title : `${title} | YourStore`;
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      <meta name="author" content={author} />
      <link rel="canonical" href={url} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="YourStore" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Article specific meta tags */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && (
        <meta property="article:author" content={author} />
      )}
      
      {/* Structured Data for Products */}
      {type === 'product' && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": title,
            "description": description,
            "image": image,
            "url": url
          })}
        </script>
      )}
      
      {/* Structured Data for Articles */}
      {type === 'article' && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": title,
            "description": description,
            "image": image,
            "url": url,
            "datePublished": publishedTime,
            "dateModified": modifiedTime || publishedTime,
            "author": {
              "@type": "Person",
              "name": author
            }
          })}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;