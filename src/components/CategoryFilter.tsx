import React from 'react';
import * as LucideIcons from 'lucide-react';
import { Category } from '../types/Product';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => {
          const IconComponent = LucideIcons[category.icon as keyof typeof LucideIcons] as React.ComponentType<any>;
          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`flex flex-col items-center p-4 rounded-lg transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-orange-500 text-white shadow-lg transform scale-105'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-orange-500'
              }`}
            >
              <IconComponent className="h-6 w-6 mb-2" />
              <span className="text-sm font-medium text-center">{category.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;