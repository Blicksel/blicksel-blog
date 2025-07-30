import React from 'react';
import { Calendar, Clock, Tag } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  date: string;
  image: string;
}

interface BlogCardProps {
  post: BlogPost;
  onClick: () => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, onClick }) => {
  const readingTime = Math.ceil(post.content.split(' ').length / 200);

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-48 object-cover cursor-pointer"
          onClick={onClick}
        />
        <div className="absolute top-4 left-4">
          <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Blog
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{new Date(post.date).toLocaleDateString()}</span>
          <Clock className="h-4 w-4 ml-4 mr-1" />
          <span>{readingTime} min read</span>
        </div>
        
        <h3 
          className="text-xl font-bold text-gray-900 mb-3 cursor-pointer hover:text-orange-500 transition-colors line-clamp-2"
          onClick={onClick}
        >
          {post.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        {post.tags.length > 0 && (
          <div className="flex items-center flex-wrap gap-2 mb-4">
            <Tag className="h-4 w-4 text-gray-400" />
            {post.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        <button
          onClick={onClick}
          className="text-orange-500 font-medium hover:text-orange-600 transition-colors"
        >
          Read More →
        </button>
      </div>
    </article>
  );
};

export default BlogCard;