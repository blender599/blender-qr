import React, { useState } from 'react';
   import { MenuItem } from './MenuItem';
   import { ArrowUpDown } from 'lucide-react';
   import '../App.css';

   interface Allergen {
     id: string;
     name: string;
     symbol_url: string;
   }

   interface RestaurantSectionProps {
     restaurant: {
       id: string;
       name: string;
       logoUrl: string;
       categories: {
         name: string;
         items: {
           customId: string;
           name: string;
           description: string;
           price: number;
           image_url: string;
           category: string;
           restaurant_id: string;
           option_categories: string[];
           available: boolean;
           allergens?: string[];
         }[];
       }[];
     };
     selectedCategory: string;
     addToCart: (itemName: string, price: number) => void;
     allergens: Allergen[];
   }

   export function RestaurantSection({ restaurant, selectedCategory, addToCart, allergens }: RestaurantSectionProps) {
     const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
     const category = restaurant.categories.find(cat => cat.name === selectedCategory);

     if (!category) return null;

     const sortedItems = [...category.items].sort((a, b) => {
       return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
     });

     const toggleSort = () => {
       setSortOrder(current => (current === 'asc' ? 'desc' : 'asc'));
     };

     return (
       <section className="restaurant-section" id={`${restaurant.name.toLowerCase().replace(/\s+/g, '-')}-${selectedCategory.toLowerCase()}`}>
         <div className="restaurant-section-header">
           <div className="flex justify-between items-center mb-6">
             <h3 className="category-title">{category.name}</h3>
             <button onClick={toggleSort} className="sort-button">
               <ArrowUpDown className="sort-icon" size={16} />
               Fiyata Göre Sırala ({sortOrder === 'desc' ? 'Ucuzdan Pahalıya' : 'Pahalıdan Ucuza'})
             </button>
           </div>
           <div className="menu-grid">
             {sortedItems.length > 0 ? (
               sortedItems.map(item => (
                 <MenuItem
                   key={item.customId}
                   item={item}
                   addToCart={addToCart}
                   allergens={allergens.filter(a => item.allergens?.includes(a.id))}
                 />
               ))
             ) : (
               <p className="no-items">No items available in this category.</p>
             )}
           </div>
         </div>
       </section>
     );
   }