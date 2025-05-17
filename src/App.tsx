import { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import { RestaurantNav } from './components/RestaurantNav';
import { CategoryNav } from './components/CategoryNav';
import { MenuItem } from './components/MenuItem';
import OptionsModal from './components/OptionsModal';
import OrderTypeModal from './components/OrderTypeModal';
import './App.css';

// Add Google Maps types for better type safety
declare global {
  interface Window {
    google: typeof google;
    initMapCallback: () => void;
  }
}

interface CartItem {
  item: string;
  options: string | string[];
  price: number;
  id: number;
  note?: string;
}

interface Restaurant {
  restaurant_id: string;
  name: string;
  logo_url: string;
  categories: string[];
}

interface Item {
  custom_id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  restaurant_id: string;
  option_categories: string[];
  available: boolean;
  allergens?: string[];
}

interface Option {
  id: string;
  name: string;
  options: { name: string; price_adjustment: number }[];
  choice_type: 'single' | 'multi';
  is_mandatory: boolean;
}

interface TimeSlot {
  day: string;
  opening: string | null;
  closing: string | null;
}

interface Location {
  id: string;
  name: string;
  lat: number;
  lon: number;
  radius: number;
  tables: string[];
}

interface Allergen {
  id: string;
  name: string;
  symbol_url: string;
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
const Maps_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API as string;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase env vars—check VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY');
}

if (!Maps_API_KEY) {
  console.error('Missing Google Maps API key—check VITE_Maps_API');
}

console.log('App: Env vars:', { url: SUPABASE_URL, anonKey: SUPABASE_ANON_KEY, mapsKey: Maps_API_KEY ? 'Loaded' : 'Missing' });

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function App() {
  const [selectedRestaurant, setSelectedRestaurant] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [scrollThreshold] = useState(100);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<{ item: string; price: number; id: number } | null>(null);
  const [showOrderTypeModal, setShowOrderTypeModal] = useState(false);
  const [showTableNumberModal, setShowTableNumberModal] = useState(false);
  const [showTakeoutOptionModal, setShowTakeoutOptionModal] = useState(false);
  const [showDeliveryDetailsModal, setShowDeliveryDetailsModal] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState<{ orderNumber: string; message: string } | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [orderType, setOrderType] = useState<'Takeout' | 'Dine In' | null>(null);
  const [tableNumber, setTableNumber] = useState('');
  const [takeoutOption, setTakeoutOption] = useState<'Delivery' | 'Pickup' | null>(null);
  const [deliveryDetails, setDeliveryDetails] = useState({
    address: '',
    phone: '',
    name: '',
    surname: '',
    paymentMethod: 'Cash' as 'Cash' | 'Credit',
    additionalInfo: '',
  });
  const [deliveryLocation, setDeliveryLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [modalError, setModalError] = useState<string | null>(null);
  const [times, setTimes] = useState<TimeSlot[]>([]);
  const [serverTime, setServerTime] = useState<string | null>(null);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [options, setOptions] = useState<Option[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [allergens, setAllergens] = useState<Allergen[]>([]);

  const [isMapsApiLoaded, setIsMapsApiLoaded] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);

  const fetchAllDocuments = async (tableName: string): Promise<any[]> => {
    let allDocs: any[] = [];
    let start = 0;
    const pageSize = 1000;
    let hasMore = true;

    while (hasMore) {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .range(start, start + pageSize - 1);

      if (error) {
        console.error(`Supabase error fetching ${tableName}:`, error);
        throw new Error(`Failed to fetch ${tableName}: ${error.message}`);
      }

      const pageDocs = data || [];
      allDocs = [...allDocs, ...pageDocs];
      start += pageSize;
      hasMore = pageDocs.length === pageSize;
    }

    return allDocs;
  };

  const getTablesForRestaurant = (): string[] => {
    if (locations.length === 0) return [];
    return locations[0].tables || [];
  };

  useEffect(() => {
    if (!Maps_API_KEY) {
      console.error("Google Maps API key is not available. Cannot load map script.");
      setError('Harita servisi yüklenemedi (API Anahtarı Eksik).');
      return;
    }

    const scriptId = 'google-maps-script';
    const existingScript = document.getElementById(scriptId);

    window.initMapCallback = () => {
      console.log('Google Maps API callback executed. Setting isMapsApiLoaded to true.');
      setIsMapsApiLoaded(true);
    };

    if (!existingScript) {
      console.log('Google Maps script not found, creating and appending...');
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${Maps_API_KEY}&libraries=places&callback=initMapCallback&loading=async`;
      script.id = scriptId;
      script.async = true;
      script.defer = true;
      script.onerror = () => {
        console.error('Google Maps script failed to load.');
        setError('Harita servisi yüklenemedi.');
      };
      document.body.appendChild(script);
    } else {
      if (window.google && window.google.maps) {
        console.log('Google Maps script already present and API appears loaded.');
        setIsMapsApiLoaded(true);
      } else {
        console.log('Google Maps script present, waiting for callback...');
      }
    }

    return () => {
      console.log('Cleaning up Google Maps script effect.');
      delete window.initMapCallback;
    };
  }, [Maps_API_KEY]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [restaurantsDocs, itemsDocs, optionsDocs, locationsDocs, allergensDocs, timesData] = await Promise.all([
          fetchAllDocuments('restaurants'),
          fetchAllDocuments('items'),
          fetchAllDocuments('options'),
          fetchAllDocuments('locations'),
          fetchAllDocuments('allergens'),
          fetch('/.netlify/functions/get-public-times').then(res => {
            if (!res.ok) throw new Error(`Function fetch failed: ${res.statusText}`);
            return res.json();
          }),
        ]);

        const fetchedRestaurants: Restaurant[] = restaurantsDocs.map((r: any) => ({
          restaurant_id: r.restaurant_id,
          name: r.name,
          logo_url: r.logo_url || 'https://via.placeholder.com/150',
          categories: r.categories || [],
        }));
        setRestaurants(fetchedRestaurants);
        if (fetchedRestaurants.length > 0) {
          setSelectedRestaurant(fetchedRestaurants[0].name);
          if (fetchedRestaurants[0].categories.length > 0) {
            setSelectedCategory(fetchedRestaurants[0].categories[0]);
          } else {
            setSelectedCategory('');
          }
        } else {
          setSelectedRestaurant('');
          setSelectedCategory('');
        }

        setItems(itemsDocs);
        setOptions(optionsDocs);
        setLocations(locationsDocs);
        console.log('Debug: Fetched locations:', locationsDocs);
        setAllergens(allergensDocs.map((a: any) => ({
          id: a.id,
          name: a.name,
          symbol_url: a.symbol_url,
        })));
        setTimes(timesData.times || []);
        setServerTime(timesData.serverTime || null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Veriler yüklenemedi.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      if (currentScrollPos > scrollThreshold) {
        if (isHeaderVisible) {
          setIsHeaderVisible(false);
        }
      } else {
        if (!isHeaderVisible) {
          setIsHeaderVisible(true);
        }
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [scrollThreshold, isHeaderVisible]);

  useEffect(() => {
    if (!isMapsApiLoaded || !showDeliveryDetailsModal || !mapRef.current || !inputRef.current || !locations.length || mapInstance.current) {
      console.log("Map initialization criteria not met or map already exists:", { isMapsApiLoaded, showDeliveryDetailsModal, mapRefCurrent: !!mapRef.current, inputRefCurrent: !!inputRef.current, locationsLength: locations.length, mapInstanceExists: !!mapInstance.current });
      if (!showDeliveryDetailsModal) {
        setModalError(null);
      }
      return;
    }

    if (!window.google || !window.google.maps || !window.google.maps.Map || !window.google.maps.places || !window.google.maps.Geocoder) {
      console.error("Google Maps API or required libraries (Map, Places, Geocoder) not fully available despite isMapsApiLoaded being true.");
      setModalError('Harita servisleri tam olarak yüklenemedi.');
      return;
    }

    const validLocations = locations.filter(loc => Number.isFinite(loc.lat) && Number.isFinite(loc.lon) && loc.radius > 0);
    if (!validLocations.length) {
      console.warn("No valid locations with positive radius found for map initialization.");
      setModalError('Teslimat için geçerli bir konum bulunamadı.');
      return;
    } else {
      setModalError(null);
    }

    const avgLat = validLocations.reduce((sum, loc) => sum + loc.lat, 0) / validLocations.length;
    const avgLon = validLocations.reduce((sum, loc) => sum + loc.lon, 0) / validLocations.length;

    console.log("Attempting to initialize Google Map...");
    try {
      mapInstance.current = new window.google.maps.Map(mapRef.current, {
        center: { lat: avgLat, lng: avgLon },
        zoom: 10,
        disableDefaultUI: true,
        zoomControl: true,
      });
      console.log("Google Map initialized:", mapInstance.current);

      validLocations.forEach(loc => {
        new window.google.maps.Marker({
          position: { lat: loc.lat, lng: loc.lon },
          map: mapInstance.current!,
          title: loc.name,
          icon: {
            url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
          },
        });
        new window.google.maps.Circle({
          strokeColor: '#0000FF',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#0000FF',
          fillOpacity: 0.1,
          map: mapInstance.current!,
          center: { lat: loc.lat, lng: loc.lon },
          radius: loc.radius * 1000,
        });
      });

      if (window.google.maps.places) {
        console.log("Initializing Autocomplete...");
        const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current!);
        autocomplete.bindTo('bounds', mapInstance.current!);

        const userMarker = new window.google.maps.Marker({
          map: mapInstance.current!,
          draggable: true,
          icon: {
            url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
          },
        });

        const placeChangedListener = autocomplete.addListener('place_changed', () => {
          console.log("Autocomplete place_changed event fired.");
          const place = autocomplete.getPlace();

          if (!place.geometry?.location) {
            console.warn("Autocomplete returned no geometry for place.");
            setModalError('Seçilen adresin konumu bulunamadı.');
            return;
          }
          setModalError(null);

          const lat = place.geometry.location.lat();
          const lon = place.geometry.location.lng();

          setDeliveryLocation({ lat, lon });
          userMarker.setPosition({ lat, lng: lon });
          mapInstance.current?.setCenter({ lat, lng: lon });
          mapInstance.current?.setZoom(15);

          setDeliveryDetails(prev => ({ ...prev, address: place.formatted_address || prev.address }));
        });

        const dragEndListener = window.google.maps.event.addListener(userMarker, 'dragend', () => {
          console.log("User marker dragend event fired.");
          const lat = userMarker.getPosition()?.lat();
          const lon = userMarker.getPosition()?.lng();

          if (lat !== undefined && lon !== undefined && window.google.maps.Geocoder) {
            setModalError(null);

            setDeliveryLocation({ lat, lon });

            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ location: { lat, lng: lon } }, (results, status) => {
              if (status === 'OK' && results?.[0]) {
                console.log("Geocoder found address:", results[0].formatted_address);
                setDeliveryDetails(prev => ({ ...prev, address: results[0].formatted_address }));
              } else {
                console.error('Geocoder failed due to: ' + status);
                setModalError('Adres bilgisi alınamadı (Geocoder hatası).');
              }
            });
          } else {
            console.warn("Marker position undefined or Geocoder not available on dragend.");
            setModalError('Konum bilgisi alınamadı.');
          }
        });

        return () => {
          console.log("Cleaning up map and autocomplete listeners and instances.");
          window.google.maps.event.removeListener(placeChangedListener);
          window.google.maps.event.removeListener(dragEndListener);
          mapInstance.current = null;
          setModalError(null);
        };
      } else {
        console.error("Google Maps Places library not loaded.");
        setModalError('Adres arama özelliği yüklenemedi.');
      }
    } catch (e) {
      console.error("Error initializing Google Map:", e);
      setModalError('Harita yüklenirken bir hata oluştu.');
    }
  }, [isMapsApiLoaded, showDeliveryDetailsModal, locations, takeoutOption]);

  const getRestaurantId = (name: string) => restaurants.find(r => r.name === name)?.restaurant_id || '';

  const addToCart = (itemName: string, price: number) => {
    const itemDetails = items.find(item => item.name === itemName && item.restaurant_id === getRestaurantId(selectedRestaurant));

    if (itemDetails?.option_categories && itemDetails.option_categories.length > 0) {
      setSelectedItem({ item: itemName, price, id: Date.now() });
    } else {
      const itemToAdd = {
        item: itemName,
        options: '',
        price: price,
        id: Date.now(),
        note: undefined,
      };
      setCart([...cart, itemToAdd]);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2000);
    }
  };

  const handleOptionSelect = (selectedOptions: { name: string; priceAdjustment: number }[], note?: string) => {
    if (!selectedItem) {
      console.error("handleOptionSelect called without a selectedItem.");
      return;
    }

    const originalItemData = items.find(item => item.name === selectedItem.item && item.restaurant_id === getRestaurantId(selectedRestaurant));
    const basePrice = originalItemData ? originalItemData.price : selectedItem.price;

    const totalPrice = selectedOptions.reduce((total, option) => {
      const adjustment = option.priceAdjustment || 0;
      return total + adjustment;
    }, basePrice);

    const formattedOptions = selectedOptions.length > 0
      ? selectedOptions.map(opt => opt.name).join(', ')
      : '';

    setCart([...cart, { ...selectedItem, options: formattedOptions, price: totalPrice, note }]);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
    setSelectedItem(null);
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
    if (cart.length === 1) {
      setIsCartOpen(false);
    }
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      alert('Sepet boş!');
      return;
    }
    setError(null);
    setModalError(null);
    setShowOrderTypeModal(true);
  };

  const handleOrderTypeSelect = (type: 'Takeout' | 'Dine In') => {
    setOrderType(type);
    setShowOrderTypeModal(false);
    setModalError(null);

    if (type === 'Dine In') {
      setShowTableNumberModal(true);
    } else {
      setShowTakeoutOptionModal(true);
    }
  };

  const handleTableNumberSubmit = () => {
    if (!tableNumber.trim()) {
      setModalError('Lütfen bir masa numarası seçin veya girin!');
      return;
    }
    setModalError(null);
    submitOrder({ order_type: 'Dine In', table_number: tableNumber.trim() });
    setShowTableNumberModal(false);
    setTableNumber('');
  };

  const handleTakeoutOptionSelect = (option: 'Delivery') => { // Changed to only accept 'Delivery'
    setTakeoutOption(option);
    setShowTakeoutOptionModal(false);
    setModalError(null);

    if (option === 'Delivery') {
      setDeliveryDetails(prev => ({ ...prev, address: '', phone: '', paymentMethod: 'Cash', additionalInfo: '' }));
      setDeliveryLocation(null);
    }
    setShowDeliveryDetailsModal(true);
  };

  const handleDeliveryDetailsSubmit = () => {
    const { address, phone, name, surname, paymentMethod, additionalInfo } = deliveryDetails;
    setModalError(null);

    if (takeoutOption === 'Delivery') {
      if (!address.trim() || !phone.trim() || !name.trim() || !surname.trim() || !deliveryLocation) {
        setModalError('Lütfen tüm teslimat bilgilerini doldurun ve adresi haritada seçerek veya sürükleyerek onaylayın!');
        return;
      }
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(phone.trim())) {
        setModalError('Lütfen geçerli bir telefon numarası girin (örneğin: 5051234567)');
        return;
      }

      const isInDeliveryZone = locations.some(loc => {
        if (window.google.maps.geometry && deliveryLocation) {
          const center = new window.google.maps.LatLng(loc.lat, loc.lon);
          const userPos = new window.google.maps.LatLng(deliveryLocation.lat, deliveryLocation.lon);
          const distance = window.google.maps.geometry.spherical.computeDistanceBetween(userPos, center);
          return distance <= loc.radius * 1000;
        }
        return true;
      });

      if (!isInDeliveryZone) {
        setModalError('Üzgünüz, seçilen adres teslimat bölgemizin dışında!');
        return;
      }
    } else if (takeoutOption === 'Pickup') {
      if (!name.trim() || !surname.trim()) {
        setModalError('Lütfen isminizi ve soyisminizi girin!');
        return;
      }
    }

    submitOrder({
      order_type: 'Takeout',
      takeout_option: takeoutOption!,
      ...(takeoutOption === 'Delivery' ? {
        address: address.trim(),
        phone: phone.trim(),
        name: `${name.trim()} ${surname.trim()}`,
        payment_method: paymentMethod,
        delivery_lat: deliveryLocation!.lat,
        delivery_lon: deliveryLocation!.lon,
        additionalInfo: additionalInfo.trim(),
      } : {
        name: `${name.trim()} ${surname.trim()}`,
      }),
    });
    setShowDeliveryDetailsModal(false);
    setDeliveryDetails({ address: '', phone: '', name: '', surname: '', paymentMethod: 'Cash', additionalInfo: '' });
    setDeliveryLocation(null);
  };

  async function submitOrder(orderDetails: {
    order_type: 'Takeout' | 'Dine In';
    table_number?: string;
    takeout_option?: 'Delivery' | 'Pickup';
    address?: string;
    phone?: string;
    name?: string;
    payment_method?: 'Cash' | 'Credit';
    delivery_lat?: number;
    delivery_lon?: number;
    additional_info?: string;
  }) {
    try {
      setError(null);
      setModalError(null);

      const currentRestaurantId = getRestaurantId(selectedRestaurant);
      if (!currentRestaurantId) {
        console.error("Could not find restaurant ID for selected restaurant:", selectedRestaurant);
        setError("Restoran bilgisi bulunamadı, sipariş verilemedi.");
        return;
      }

      const response = await fetch('/.netlify/functions/submit-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cart,
          serverTime,
          restaurant_id: currentRestaurantId,
          ...orderDetails
        }),
      });

      const responseText = await response.text();

      if (!response.ok) {
        let errorMessage = 'Sipariş verilirken beklenmedik bir hata oluştu. Lütfen tekrar deneyin.';
        try {
          const errorData = JSON.parse(responseText);
          if (errorData.error) {
            errorMessage = errorData.error;
          }
        } catch (parseError) {
          console.error("Failed to parse error response from backend:", parseError, "Response text:", responseText);
        }
        throw new Error(errorMessage);
      }

      const data = JSON.parse(responseText);
      setOrderConfirmation({
        orderNumber: data.orderId,
        message: `${orderDetails.order_type === 'Takeout' ? 'Paket servis' : 'Barda'} siparişiniz başarıyla oluşturuldu! Sipariş numaranız:`,
      });

      setCart([]);
      setIsCartOpen(false);
      setOrderType(null);
      setTakeoutOption(null);
      setError(null);
      setModalError(null);
    } catch (err) {
      console.error("Submit order failed:", err);
      setError((err as Error).message || 'Sipariş verilirken beklenmedik bir hata oluştu.');
    }
  }

  const cartTotal = cart.reduce((total, item) => total + item.price, 0);

  // Calculate current day and display working hours
  const nowIST = serverTime ? new Date(serverTime) : new Date();
  const currentDay = nowIST.toLocaleString('tr-TR', { weekday: 'long' });
  const todayTimes = times.filter(t => {
    const dayNameFromData = t.day.split('-')[0];
    return dayNameFromData === currentDay;
  });

  // Filter out -pre entries where opening or closing is null
  const validTimes = todayTimes.filter(t => {
    const isPreSlot = t.day.endsWith('-pre');
    // For -pre slots, only include if both opening and closing are non-null
    if (isPreSlot) {
      return t.opening !== null && t.closing !== null;
    }
    // For -main slots, include regardless (assuming they should always be present)
    return true;
  });

  const displayTimes = validTimes.length > 0
    ? validTimes
        .map(t => `${t.opening!.replace('.', ':')}–${t.closing!.replace('.', ':')}`)
        .join(', ')
    : 'Saatler tanımlı değil';

  const isAnyModalOpen = showDeliveryDetailsModal || showOrderTypeModal || showTableNumberModal || showTakeoutOptionModal || orderConfirmation;

  useEffect(() => {
    if (isAnyModalOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isAnyModalOpen]);

  return (
    <div>
      <header className={`header ${isHeaderVisible ? '' : 'hidden'}`}>
        <div className="header-content">
          <h1 className="header-title"> Blender X FitKase </h1>
          <div className="header-times">
            <p>Çalışma Saatleri: {currentDay} ({displayTimes})</p>
          </div>
        </div>
        {restaurants.length > 1 && (
          <RestaurantNav
            selectedRestaurant={selectedRestaurant}
            onSelectRestaurant={(restaurant) => {
              setSelectedRestaurant(restaurant);
              setIsNavOpen(false);
              const selected = restaurants.find(r => r.name === restaurant);
              setSelectedCategory(selected?.categories[0] || '');
            }}
            restaurantNames={restaurants.map(r => r.name)}
          />
        )}
        {selectedRestaurant && (
          <img
            src={restaurants.find(r => r.name === selectedRestaurant)?.logo_url}
            alt={`${selectedRestaurant} logo`}
            className="restaurant-logo"
            onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/150')}
          />
        )}
        {!isLoading && restaurants.length > 0 && (
          <CategoryNav
            selectedCategory={selectedCategory}
            selectedRestaurant={selectedRestaurant}
            onSelectCategory={(category) => {
              setSelectedCategory(category);
              setIsNavOpen(false);
            }}
            categories={restaurants.find(r => r.name === selectedRestaurant)?.categories || []}
          />
        )}
      </header>

      <main className="main">
        {error && !isAnyModalOpen && (
          <p className="error">{error}</p>
        )}
        {isLoading ? (
          <p className="loading">Yükleniyor...</p>
        ) : (
          !error || isAnyModalOpen ? (
            restaurants.map(restaurant => {
              if (restaurant.name !== selectedRestaurant) return null;

              const filteredItems = items.filter(i =>
                i.restaurant_id === restaurant.restaurant_id &&
                i.category.toLowerCase() === selectedCategory.toLowerCase() &&
                i.available
              );

              return (
                <div key={restaurant.restaurant_id}>
                  <h2 className="category-title">{selectedCategory}</h2>
                  <div className="menu-grid">
                    {filteredItems.map(item => (
                      <MenuItem
                        key={item.custom_id}
                        item={item}
                        addToCart={addToCart}
                        allergens={allergens.filter(a => item.allergens?.includes(a.id))}
                      />
                    ))}
                    {filteredItems.length === 0 && (
                      <p className="no-items">Bu kategoride ürün bulunmamaktadır.</p>
                    )}
                  </div>
                </div>
              );
            })
          ) : null
        )}
      </main>

      {showDeliveryDetailsModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-content">
              <h2 className="modal-header">
                {takeoutOption === 'Delivery' ? 'Teslimat Bilgileri' : 'Alım Bilgileri'}
              </h2>
              {modalError && <p className="modal-error">{modalError}</p>}
              {takeoutOption === 'Delivery' && (
                <>
                  <input
                    ref={inputRef}
                    type="text"
                    value={deliveryDetails.address}
                    onChange={(e) => setDeliveryDetails({ ...deliveryDetails, address: e.target.value })}
                    placeholder="Adresinizi girin"
                    className="modal-input"
                    disabled={!isMapsApiLoaded}
                  />
                  {!isMapsApiLoaded && (
                    <div style={{ height: '256px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid #E5E5E5', borderRadius: '8px', marginBottom: '16px' }}>
                      <p>Harita yükleniyor...</p>
                    </div>
                  )}
                  {isMapsApiLoaded && (
                    <div ref={mapRef} className="map-container" style={{ width: '100%', height: '256px', marginBottom: '16px', border: '1px solid #E5E5E5', borderRadius: '8px' }} />
                  )}
                  <textarea
                    value={deliveryDetails.additionalInfo}
                    onChange={(e) => setDeliveryDetails({ ...deliveryDetails, additionalInfo: e.target.value })}
                    placeholder="Ek Adres Bilgileri (örn. Kat, Daire No)"
                    className="modal-textarea"
                    rows={2}
                  />
                  <input
                    type="tel"
                    value={deliveryDetails.phone}
                    onChange={(e) => setDeliveryDetails({ ...deliveryDetails, phone: e.target.value })}
                    placeholder="(5xx) xxx-xx-xx"
                    className="modal-input"
                    maxLength={10}
                    pattern="[0-9]{10}"
                    title="Lütfen 10 haneli telefon numaranızı girin (başına 0 veya ülke kodu olmadan)"
                  />
                  <select
                    value={deliveryDetails.paymentMethod}
                    onChange={(e) => setDeliveryDetails({ ...deliveryDetails, paymentMethod: e.target.value as 'Cash' | 'Credit' })}
                    className="modal-select"
                  >
                    <option value="Cash">Nakit</option>
                    <option value="Credit">Kredi Kartı</option>
                  </select>
                </>
              )}
              <input
                type="text"
                value={deliveryDetails.name}
                onChange={(e) => setDeliveryDetails({ ...deliveryDetails, name: e.target.value })}
                placeholder="İsim"
                className="modal-input"
              />
              <input
                type="text"
                value={deliveryDetails.surname}
                onChange={(e) => setDeliveryDetails({ ...deliveryDetails, surname: e.target.value })}
                placeholder="Soyisim"
                className="modal-input"
              />
            </div>
            <div className="modal-buttons">
              <button
                onClick={handleDeliveryDetailsSubmit}
                className="modal-button primary"
                disabled={(takeoutOption === 'Delivery' && (!isMapsApiLoaded || !deliveryLocation || !deliveryDetails.address.trim() || !deliveryDetails.phone.trim() || !deliveryDetails.name.trim() || !deliveryDetails.surname.trim())) ||
                          (takeoutOption === 'Pickup' && (!deliveryDetails.name.trim() || !deliveryDetails.surname.trim())) ||
                          !!modalError}
              >
                Onayla
              </button>
              <button
                onClick={() => {
                  setShowDeliveryDetailsModal(false);
                  setDeliveryDetails({ address: '', phone: '', name: '', surname: '', paymentMethod: 'Cash', additionalInfo: '' });
                  setDeliveryLocation(null);
                  setModalError(null);
                }}
                className="modal-button secondary"
              >
                İptal
              </button>
            </div>
          </div>
        </div>
      )}

      {showOrderTypeModal && <OrderTypeModal onSelect={handleOrderTypeSelect} onClose={() => { setShowOrderTypeModal(false); setModalError(null); }} />}

      {showTableNumberModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-content">
              <h2 className="modal-header">Masa Numarası</h2>
              {modalError && <p className="modal-error">{modalError}</p>}
              {getTablesForRestaurant().length > 0 ? (
                <select
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  className="modal-select"
                >
                  <option value="">Seçiniz</option>
                  {getTablesForRestaurant().map(table => (
                    <option key={table} value={table}>
                      Masa {table}
                    </option>
                  ))}
                </select>
              ) : (
                <p className="modal-text">Mevcut masa bulunmamaktadır.</p>
              )}
            </div>
            <div className="modal-buttons">
              <button
                onClick={handleTableNumberSubmit}
                className="modal-button primary"
                disabled={getTablesForRestaurant().length === 0 || !tableNumber || !!modalError}
              >
                Onayla
              </button>
              <button
                onClick={() => {
                  setShowTableNumberModal(false);
                  setTableNumber('');
                  setModalError(null);
                }}
                className="modal-button secondary"
              >
                İptal
              </button>
            </div>
          </div>
        </div>
      )}

      {showTakeoutOptionModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-content">
              <h2 className="modal-header">Teslimat Seçeneği</h2>
              {modalError && <p className="modal-error">{modalError}</p>}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <button
                  onClick={() => handleTakeoutOptionSelect('Delivery')}
                  className="modal-button primary"
                >
                  Teslimat
                </button>
                <button
                  onClick={() => { setShowTakeoutOptionModal(false); setTakeoutOption(null); setModalError(null); }}
                  className="modal-button secondary"
                >
                  İptal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {orderConfirmation && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-content">
              <h2 className="modal-header">Sipariş Onayı</h2>
              <p style={{ textAlign: 'center', marginBottom: '16px' }}>{orderConfirmation.message}</p>
              <p style={{ fontSize: '1.5rem', fontWeight: '700', color: '#D4A373', textAlign: 'center', marginBottom: '16px' }}>
                {orderConfirmation.orderNumber}
              </p>
            </div>
            <div className="modal-buttons">
              <button
                onClick={() => setOrderConfirmation(null)}
                className="modal-button primary"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}

      {!isAnyModalOpen && (
        <div className={`cart-toggle ${cart.length > 0 ? 'active' : ''}`}>
          <button onClick={() => setIsCartOpen(!isCartOpen)}>
            <img
              src={cart.length > 0 ? 'images/cart-green.png' : 'images/cart.png'}
              alt="Cart"
            />
          </button>
        </div>
      )}

      {isCartOpen && (
        <div className="cart-panel">
          <h2 className="cart-title">Siparişiniz</h2>
          <ul className="cart-list">
            {cart.length === 0 ? (
              <li style={{ color: '#2D2D2D', opacity: 0.7 }}>Ürün Bulunmamakta</li>
            ) : (
              cart.map((item) => (
                <li key={item.id} className="cart-item">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="cart-item-remove"
                  >
                    X
                  </button>
                  <span>
                    {item.options && item.options !== ''
                      ? `${item.item} (${item.options}) - ${item.price.toFixed(2)}₺`
                      : `${item.item} - ${item.price.toFixed(2)}₺`}
                    {item.note && <span className="cart-item-note">Not: {item.note}</span>}
                  </span>
                </li>
              ))
            )}
          </ul>
          {cart.length > 0 && (
            <p className="cart-total">Toplam: {cartTotal.toFixed(2)}₺</p>
          )}
          <button
            onClick={handlePlaceOrder}
            disabled={cart.length === 0}
            className="cart-button"
          >
            Sipariş Ver
          </button>
        </div>
      )}

      {showNotification && (
        <div className="notification">
          Ürün siparişe eklendi!
        </div>
      )}

      <footer className="footer">
        <p className="footer-text">Sporla Kalın</p>
      </footer>

      {selectedItem && (() => {
        const selectedItemData = items.find(i => i.name === selectedItem.item && i.restaurant_id === getRestaurantId(selectedRestaurant));
        const filteredOptions = selectedItemData?.option_categories?.length > 0
          ? options.filter(opt => selectedItemData.option_categories.includes(opt.id))
          : [];
        const filteredAllergens = selectedItemData?.allergens?.length > 0
          ? allergens.filter(a => selectedItemData.allergens.includes(a.id))
          : [];
        return (
          <OptionsModal
            item={selectedItem.item}
            price={selectedItem.price}
            option_categories={filteredOptions}
            allergens={filteredAllergens}
            onSelect={(options, note) => handleOptionSelect(options, note)}
            onClose={() => setSelectedItem(null)}
          />
        );
      })()}
    </div>
  );
}

export default App;