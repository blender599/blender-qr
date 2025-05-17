import { Item } from '../App';
import '../App.css';

interface Allergen {
  id: string;
  name: string;
  symbol_url: string;
}

interface MenuItemProps {
  item: Item;
  addToCart: (itemName: string, price: number) => void;
  allergens: Allergen[];
}

export const MenuItem: React.FC<MenuItemProps> = ({ item, addToCart, allergens }) => {
  const itemAllergens = item.allergens?.map(id => allergens.find(a => a.id === id)).filter(a => a) || [];

  return (
    <div className="menu-item">
      <img
        src={item.image_url || 'https://via.placeholder.com/150'}
        alt={item.name}
        className="menu-item-image"
        onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/150')}
      />
      <div className="menu-item-content">
        <h3 className="menu-item-name">{item.name}</h3>
        <p className="menu-item-description">{item.description}</p>
        {itemAllergens.length > 0 && (
          <div className="menu-item-allergens">
            {itemAllergens.map(allergen => (
              <div key={allergen.id} className="flex items-center gap-1">
                <img
                  src={allergen.symbol_url || 'https://via.placeholder.com/24'}
                  alt={allergen.name}
                  className="menu-item-allergen-icon"
                  onError={(e) => {
                    console.warn(`Failed to load allergen image: ${allergen.symbol_url}`);
                    e.currentTarget.src = 'https://via.placeholder.com/24';
                  }}
                />
                <span className="menu-item-allergen-text">{allergen.name}</span>
              </div>
            ))}
          </div>
        )}
        <div className="menu-item-footer">
          <p className="menu-item-price">{item.price.toFixed(2)}₺</p>
          <button
            onClick={() => addToCart(item.name, item.price)}
            className="menu-item-button"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};