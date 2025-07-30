import React from 'react';
import { Calendar, Clock, Tag, ArrowLeft } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  date: string;
  image: string;
}

interface BlogPostProps {
  post: BlogPost;
  onBack: () => void;
}

const BlogPost: React.FC<BlogPostProps> = ({ post, onBack }) => {
  const readingTime = Math.ceil(post.content.split(' ').length / 200);

  return (
    <article className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center text-orange-500 hover:text-orange-600 transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Blog
      </button>
      
      <header className="mb-8">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-64 md:h-96 object-cover rounded-lg mb-6"
        />
        
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{new Date(post.date).toLocaleDateString()}</span>
          <Clock className="h-4 w-4 ml-4 mr-1" />
          <span>{readingTime} min read</span>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {post.title}
        </h1>
        
        <p className="text-xl text-gray-600 mb-6">
          {post.excerpt}
        </p>
        
        {post.tags.length > 0 && (
          <div className="flex items-center flex-wrap gap-2">
            <Tag className="h-4 w-4 text-gray-400" />
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>
      
      <div className="prose prose-lg max-w-none">
        {post.content.split('\n').map((paragraph, index) => (
          <p key={index} className="mb-4 text-gray-700 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
      
      <footer className="mt-12 pt-8 border-t border-gray-200">
        <div className="bg-orange-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Disclosure
          </h3>
          <p className="text-gray-600">
            As an Amazon Associate, we earn from qualifying purchases. This helps support our content creation at no extra cost to you.
          </p>
        </div>
      </footer>
    </article>
  );
};

export default BlogPost;