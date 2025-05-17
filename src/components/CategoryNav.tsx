import React from 'react';
import '../App.css';

interface CategoryNavProps {
  selectedCategory: string;
  selectedRestaurant: string;
  onSelectCategory: (category: string) => void;
  categories: string[];
}

export function CategoryNav({ selectedCategory, selectedRestaurant, onSelectCategory, categories }: CategoryNavProps) {
  return (
    <div className="nav">
      <div className="nav-content">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`nav-item ${selectedCategory === category ? 'active' : ''}`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}