export interface Option {
  name: string;         // e.g., "White Bread", "Spicy Sauce"
  priceAdjustment: number; // e.g., 1 for +₺1, 10 for +₺10
}

export interface OptionCategory {
  name: string;         // e.g., "Ekmek Seçimi", "Sos Seçimi", "Ekstra Malzeme Seçimi"
  options: Option[];    // Array of options within this category
  choiceType: 'multi' | 'single'; // Indicates if multiple or single choice is allowed
  isMandatory: boolean; // Flag to indicate if a selection is required
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  optionCategories?: OptionCategory[]; // Optional array of option categories for each item
}

export interface Category {
  name: string;
  items: MenuItem[];
}

export interface Restaurant {
  id: string;
  name: string;
  logoUrl: string;
  categories: Category[];
}

// Existing props interfaces remain unchanged for now
export interface RestaurantSectionProps {
  restaurant: Restaurant;
  selectedCategory: string;
  addToCart: (itemName: string, price: number) => void;
}