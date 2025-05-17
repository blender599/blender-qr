import React from 'react';
import '../App.css';

interface RestaurantNavProps {
  selectedRestaurant: string;
  onSelectRestaurant: (restaurant: string) => void;
  restaurantNames: string[];
}

export function RestaurantNav({ selectedRestaurant, onSelectRestaurant, restaurantNames }: RestaurantNavProps) {
  return (
    <div className="nav">
      <div className="nav-content">
        {restaurantNames.map((restaurant) => (
          <button
            key={restaurant}
            onClick={() => onSelectRestaurant(restaurant)}
            className={`nav-item ${selectedRestaurant === restaurant ? 'active' : ''}`}
          >
            {restaurant}
          </button>
        ))}
      </div>
    </div>
  );
}