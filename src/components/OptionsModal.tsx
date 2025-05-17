import React, { useState } from 'react';
import '../App.css';

interface Option {
  name: string;
  priceAdjustment: number;
}

interface OptionCategory {
  id: string;
  name: string;
  options: Option[];
  choice_type: 'single' | 'multi';
  is_mandatory: boolean;
}

interface Allergen {
  id: string;
  name: string;
  symbol_url: string;
}

interface OptionModalProps {
  item: string;
  price: number;
  option_categories: OptionCategory[];
  allergens: Allergen[];
  onSelect: (options: { name: string; priceAdjustment: number }[], note: string) => void;
  onClose: () => void;
}

export default function OptionsModal({ item, price, option_categories, allergens, onSelect, onClose }: OptionModalProps) {
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string[] }>(
    (option_categories || []).reduce((acc, category) => ({
      ...acc,
      [category.name]: category.choice_type === 'multi' ? [] : ['none'],
    }), {})
  );
  const [note, setNote] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleOptionChange = (categoryName: string, optionName: string, isChecked?: boolean) => {
    setError(null);
    setSelectedOptions((prev) => {
      const category = (option_categories || []).find((c) => c.name === categoryName);
      if (!category) return prev;

      if (category.choice_type === 'multi') {
        const currentOptions = prev[categoryName] || [];
        if (isChecked) {
          return { ...prev, [categoryName]: [...currentOptions, optionName] };
        } else {
          return { ...prev, [categoryName]: currentOptions.filter((opt) => opt !== optionName) };
        }
      } else {
        return { ...prev, [categoryName]: [optionName] };
      }
    });
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
  };

  const handleSubmit = () => {
    const missingMandatory = (option_categories || [])
      .filter((category) => category.is_mandatory)
      .some((category) => {
        const categoryOptions = selectedOptions[category.name] || [];
        return categoryOptions.length === 0 || (category.choice_type === 'single' && categoryOptions[0] === 'none');
      });

    if (missingMandatory) {
      setError('Lütfen zorunlu seçenekleri seçin.');
      return;
    }

    const allOptions: { name: string; priceAdjustment: number }[] = [];
    (option_categories || []).forEach((category) => {
      const categoryOptions = selectedOptions[category.name] || [];
      if (category.choice_type === 'multi') {
        categoryOptions.forEach(optName => {
          const opt = category.options.find(o => o.name === optName);
          if (opt) allOptions.push({ name: opt.name, priceAdjustment: opt.priceAdjustment });
        });
      } else {
        const optName = categoryOptions[0] || '';
        if (optName && optName !== 'none') {
          const opt = category.options.find(o => o.name === optName);
          if (opt) allOptions.push({ name: opt.name, priceAdjustment: opt.priceAdjustment });
        }
      }
    });

    console.log('Options to send:', allOptions, 'Note:', note);

    if (allOptions.length === 0 || allOptions.every(opt => opt.name === '' || opt.name === 'none')) {
      onSelect([], note);
    } else {
      onSelect(allOptions.filter(opt => opt.name !== 'none' && opt.name !== ''), note);
    }
    onClose();
  };

  if (!option_categories || option_categories.length === 0) {
    return (
      <div className="modal-overlay">
        <div className="modal">
          <div className="modal-content">
            <h2 className="modal-header">{item}</h2>
            <p className="modal-text">Fiyat: {price.toFixed(2)}₺</p>
            <p className="modal-text">Seçenek yok.</p>
            <textarea
              value={note}
              onChange={handleNoteChange}
              placeholder="Not ekle (ör. 'Az tuzlu olsun ya da Domates İstemiyorum')"
              className="modal-textarea"
              rows={2}
            />
            {allergens.length > 0 && (
              <div className="modal-allergens">
                <p className="modal-label">Alerjenler:</p>
                <div className="flex flex-wrap gap-2">
                  {allergens.map(allergen => (
                    <div key={allergen.id} className="flex items-center gap-1">
                      <img
                        src={allergen.symbol_url}
                        alt={allergen.name}
                        className="modal-allergen-icon"
                        onError={(e) => {
                          console.error(`Failed to load allergen image: ${allergen.symbol_url}`);
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <span className="modal-allergen-text">{allergen.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="modal-buttons">
            <button onClick={onClose} className="modal-button secondary">
              İptal
            </button>
            <button
              onClick={() => { onSelect([], note); onClose(); }}
              className="modal-button primary"
            >
              Ekle
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          <h2 className="modal-header">
            {option_categories.map((category) => category.name).join(' & ') || 'Seçenekler'} - {item}
          </h2>
          <p className="modal-text">Fiyat: {price.toFixed(2)}₺</p>
          {option_categories.map((category) => (
            <div key={category.id} className="mb-4">
              <label className={`modal-label ${category.is_mandatory ? 'mandatory' : ''}`}>
                {category.name} {category.is_mandatory && '*'}
              </label>
              {category.choice_type === 'multi' ? (
                <div className="space-y-2">
                  {category.options.map((opt) => (
                    <div key={opt.name} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`${category.id}-${opt.name}`}
                        checked={(selectedOptions[category.name] || []).includes(opt.name)}
                        onChange={(e) => handleOptionChange(category.name, opt.name, e.target.checked)}
                        className="modal-checkbox"
                      />
                      <label htmlFor={`${category.id}-${opt.name}`} className="text-sm text-gray-700">
                        {opt.name} (+₺{opt.priceAdjustment.toFixed(2)})
                      </label>
                    </div>
                  ))}
                </div>
              ) : (
                <select
                  value={selectedOptions[category.name]?.[0] || 'none'}
                  onChange={(e) => handleOptionChange(category.name, e.target.value)}
                  className="modal-select"
                >
                  <option value="none">Seçiminiz</option>
                  {category.options.map((opt) => (
                    <option key={opt.name} value={opt.name}>
                      {opt.name} (+₺{opt.priceAdjustment.toFixed(2)})
                    </option>
                  ))}
                </select>
              )}
            </div>
          ))}
          <textarea
            value={note}
            onChange={handleNoteChange}
            placeholder="Not ekle (ör. 'Az tuzlu olsun ya da Domates İstemiyorum')"
            className="modal-textarea"
            rows={2}
          />
          {error && <p className="modal-error">{error}</p>}
          {allergens.length > 0 && (
            <div className="modal-allergens">
              <p className="modal-label">Alerjenler:</p>
              <div className="flex flex-wrap gap-2">
                {allergens.map(allergen => (
                  <div key={allergen.id} className="flex items-center gap-1">
                    <img
                      src={allergen.symbol_url}
                      alt={allergen.name}
                      className="modal-allergen-icon"
                      onError={(e) => {
                        console.error(`Failed to load allergen image: ${allergen.symbol_url}`);
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <span className="modal-allergen-text">{allergen.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="modal-buttons">
          <button onClick={onClose} className="modal-button secondary">
            İptal
          </button>
          <button onClick={handleSubmit} className="modal-button primary">
            Ekle
          </button>
        </div>
      </div>
    </div>
  );
}