import { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import { RestaurantNav } from './components/RestaurantNav';
import { CategoryNav } from './components/CategoryNav';
import { MenuItem } from './components/MenuItem';
import OptionsModal from './components/OptionsModal';
import OrderTypeModal from './components/OrderTypeModal';
import './App.css';

// Add Google Maps types for better type safety
// This tells TypeScript about the global 'google' object structure
declare global {
  interface Window {
    google: typeof google;
    initMapCallback: () => void; // Declare the global callback function name
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
  opening: string;
  closing: string;
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
// Correctly reference your Google Maps API key environment variable
const Maps_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API as string;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase env vars—check VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY');
}

if (!Maps_API_KEY) {
   console.error('Missing Google Maps API key—check VITE_Maps_API');
   // You might want to set a state here to display a user-friendly message
   // e.g., setMapLoadError('Harita API anahtarı eksik.');
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
  const [error, setError] = useState<string | null>(null); // General error state
  const [modalError, setModalError] = useState<string | null>(null); // Modal specific error state
  const [times, setTimes] = useState<TimeSlot[]>([]);
  const [serverTime, setServerTime] = useState<string | null>(null);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [options, setOptions] = useState<Option[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [allergens, setAllergens] = useState<Allergen[]>([]);

  // State to track if Google Maps API is loaded and ready
  const [isMapsApiLoaded, setIsMapsApiLoaded] = useState(false);

  // Refs for the map container div and the address input
  const mapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // Ref to store the actual Google Maps Map instance
  const mapInstance = useRef<google.maps.Map | null>(null);


  const fetchAllDocuments = async (tableName: string): Promise<any[]> => {
    let allDocs: any[] = [];
    let start = 0;
    const pageSize = 1000; // Adjust based on your needs and Supabase limits
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
    console.log('Debug: Locations:', locations);
     // Assuming locations array has at least one element relevant to the current restaurant context.
     // If you have multiple locations/restaurants with different tables, you might need to filter `locations`
     // based on the `selectedRestaurant` or its ID.
    if (locations.length === 0) return [];
    return locations[0].tables || []; // Assuming the first location object contains the tables
  };


  // Effect to load the Google Maps script dynamically
  useEffect(() => {
    // Ensure the API key is available before attempting to load the script
    if (!Maps_API_KEY) {
       console.error("Google Maps API key is not available. Cannot load map script.");
       setError('Harita servisi yüklenemedi (API Anahtarı Eksik).'); // Set a user-friendly error
       return;
    }

    const scriptId = 'google-maps-script';
    const existingScript = document.getElementById(scriptId);

    // Define the global callback function BEFORE potentially appending the script.
    // The Google Maps API will call this function once the script has finished loading
    // and the google.maps namespace is fully available.
    window.initMapCallback = () => {
      console.log('Google Maps API callback executed. Setting isMapsApiLoaded to true.');
      setIsMapsApiLoaded(true); // Set the state to true, indicating the API is ready
    };

    if (!existingScript) {
      console.log('Google Maps script not found, creating and appending...');
      const script = document.createElement('script');
      // Use the correct environment variable and add the callback parameter
      script.src = `https://maps.googleapis.com/maps/api/js?key=${Maps_API_KEY}&libraries=places&callback=initMapCallback&loading=async`;
      script.id = scriptId; // Add an ID for easier checking
      script.async = true; // Load script asynchronously
      script.defer = true; // Defer script execution until HTML parsing is complete

      // Optional: Handle script loading errors
      script.onerror = () => {
        console.error('Google Maps script failed to load.');
        setError('Harita servisi yüklenemedi.'); // Set a user-friendly error state
      };

      document.body.appendChild(script);

    } else {
      // If the script already exists, check if the API is already available.
      // This can happen if the component re-mounts.
      if (window.google && window.google.maps) {
         console.log('Google Maps script already present and API appears loaded.');
         setIsMapsApiLoaded(true); // Ensure state is true if API is already ready
      } else {
          console.log('Google Maps script present, waiting for callback...');
          // If the script is there but not ready yet, the callback function (initMapCallback)
          // will be called by the existing script when it finishes loading.
      }
    }

    // Cleanup function for this effect.
    // This runs when the component unmounts or when the dependencies change (empty array, so only on unmount).
    return () => {
      console.log('Cleaning up Google Maps script effect.');
      // Remove the global callback function to prevent potential issues if the component mounts again.
      delete window.initMapCallback;
      // You can choose to remove the script tag from the DOM here if you want
      // to ensure a clean state on component unmount, though often it's left
      // in the DOM for the lifetime of a single-page application.
      // const scriptToRemove = document.getElementById(scriptId);
      // if (scriptToRemove && scriptToRemove.parentNode) {
      //   console.log('Removing Google Maps script from DOM.');
      //   scriptToRemove.parentNode.removeChild(scriptToRemove);
      // }
    };
  }, [Maps_API_KEY]); // Re-run if the API key changes (unlikely but good practice)


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
        // Select the first restaurant and its first category by default if data exists
        if (fetchedRestaurants.length > 0) {
             setSelectedRestaurant(fetchedRestaurants[0].name);
             if (fetchedRestaurants[0].categories.length > 0) {
                 setSelectedCategory(fetchedRestaurants[0].categories[0]);
             } else {
                 setSelectedCategory(''); // No categories for this restaurant
             }
         } else {
             setSelectedRestaurant(''); // No restaurants
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
        setError('Veriler yüklenemedi.'); // Set general error state
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount


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

    window.addEventListener('scroll', onScroll, { passive: true }); // Added { passive: true } for potential performance gain

    return () => {
        window.removeEventListener('scroll', onScroll);
    };
}, [scrollThreshold, isHeaderVisible]); // Dependencies


  // Effect to initialize and manage the Google Map instance
  useEffect(() => {
    // This effect should only run if:
    // 1. The Google Maps API is loaded (isMapsApiLoaded is true)
    // 2. The delivery details modal is open (showDeliveryDetailsModal is true)
    // 3. The map container div exists (mapRef.current is available)
    // 4. The address input exists (inputRef.current is available, needed for Autocomplete)
    // 5. Location data has been fetched (locations.length > 0)
    // 6. The map instance has not already been created in this session (mapInstance.current is null)
    if (!isMapsApiLoaded || !showDeliveryDetailsModal || !mapRef.current || !inputRef.current || !locations.length || mapInstance.current) {
      console.log("Map initialization criteria not met or map already exists:", { isMapsApiLoaded, showDeliveryDetailsModal, mapRefCurrent: !!mapRef.current, inputRefCurrent: !!inputRef.current, locationsLength: locations.length, mapInstanceExists: !!mapInstance.current });
       // If the modal is closed, clear any modal-specific errors
      if (!showDeliveryDetailsModal) {
          setModalError(null);
      }
      return;
    }

    // Double-check that the necessary Google Maps objects are available
     if (!window.google || !window.google.maps || !window.google.maps.Map || !window.google.maps.places || !window.google.maps.Geocoder) {
        console.error("Google Maps API or required libraries (Map, Places, Geocoder) not fully available despite isMapsApiLoaded being true.");
        setModalError('Harita servisleri tam olarak yüklenemedi.'); // User-friendly error
        return;
     }


    const validLocations = locations.filter(loc => Number.isFinite(loc.lat) && Number.isFinite(loc.lon) && loc.radius > 0);
    if (!validLocations.length) {
        console.warn("No valid locations with positive radius found for map initialization.");
        setModalError('Teslimat için geçerli bir konum bulunamadı.'); // Set a modal error
        return;
    } else {
        // Clear the modal error if valid locations are found when the modal opens/re-checks
        setModalError(null);
    }


    const avgLat = validLocations.reduce((sum, loc) => sum + loc.lat, 0) / validLocations.length;
    const avgLon = validLocations.reduce((sum, loc) => sum + loc.lon, 0) / validLocations.length;

    console.log("Attempting to initialize Google Map...");
    try {
        // Initialize the map instance and store it in the ref
        mapInstance.current = new window.google.maps.Map(mapRef.current, {
          center: { lat: avgLat, lng: avgLon }, // Center map around fetched locations
          zoom: 10, // Adjust zoom level as needed
          disableDefaultUI: true, // Hide default UI controls
          zoomControl: true, // Enable zoom control
        });
        console.log("Google Map initialized:", mapInstance.current);

        // Add markers for valid delivery locations
        validLocations.forEach(loc => {
            new window.google.maps.Marker({
              position: { lat: loc.lat, lng: loc.lon },
              map: mapInstance.current!, // Use the stored map instance (non-null asserted as we checked above)
              title: loc.name,
              // Using a standard Google Maps icon
              icon: {
                url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png' // Red dot for locations
              },
            });
             // Add circles for delivery radius
             new window.google.maps.Circle({
              strokeColor: '#0000FF', // Blue stroke
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#0000FF', // Blue fill
              fillOpacity: 0.1,
              map: mapInstance.current!,
              center: { lat: loc.lat, lng: loc.lon },
              radius: loc.radius * 1000, // Radius in meters (assuming loc.radius is in km)
            });
        });

        // Initialize Autocomplete for the address input
        // Check if the places library is available before using Autocomplete
        if (window.google.maps.places) {
            console.log("Initializing Autocomplete...");
            const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current!); // Use non-null asserted input ref
            autocomplete.bindTo('bounds', mapInstance.current!); // Bias search results to map bounds

            // Create a marker for the user's selected/dragged location
            const userMarker = new window.google.maps.Marker({
              map: mapInstance.current!,
              draggable: true, // Allow user to drag the marker
               // Using a different standard Google Maps icon for the user
              icon: {
                url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' // Blue dot for user location
              },
            });

            // Event listener for when a place is selected from the Autocomplete dropdown
            const placeChangedListener = autocomplete.addListener('place_changed', () => {
              console.log("Autocomplete place_changed event fired.");
              const place = autocomplete.getPlace();

              if (!place.geometry?.location) {
                console.warn("Autocomplete returned no geometry for place.");
                // Handle cases where a place is selected but has no location data
                 setModalError('Seçilen adresin konumu bulunamadı.');
                return;
              }
                setModalError(null); // Clear previous modal errors on successful place selection

              const lat = place.geometry.location.lat();
              const lon = place.geometry.location.lng();

              setDeliveryLocation({ lat, lon }); // Store the selected location coordinates
              userMarker.setPosition({ lat, lng: lon }); // Move the user marker
              mapInstance.current?.setCenter({ lat, lng: lon }); // Center the map on the selected location
              mapInstance.current?.setZoom(15); // Zoom in on the selected location (adjust zoom level as needed)

              // Update the address input value with the formatted address
              setDeliveryDetails(prev => ({ ...prev, address: place.formatted_address || prev.address }));
            });

            // Event listener for when the user marker is dragged
            const dragEndListener = window.google.maps.event.addListener(userMarker, 'dragend', () => {
              console.log("User marker dragend event fired.");
              const lat = userMarker.getPosition()?.lat();
              const lon = userMarker.getPosition()?.lng();

              // Check if lat and lon are valid numbers and Geocoder is available
              if (lat !== undefined && lon !== undefined && window.google.maps.Geocoder) {
                 setModalError(null); // Clear previous modal errors on drag

                setDeliveryLocation({ lat, lon }); // Update the stored location coordinates

                // Use Geocoder to get the address for the new position
                const geocoder = new window.google.maps.Geocoder();
                geocoder.geocode({ location: { lat, lng: lon } }, (results, status) => {
                  if (status === 'OK' && results?.[0]) {
                    console.log("Geocoder found address:", results[0].formatted_address);
                    // Update the address input value with the new address
                    setDeliveryDetails(prev => ({ ...prev, address: results[0].formatted_address }));
                  } else {
                    console.error('Geocoder failed due to: ' + status);
                     // Set a modal error if geocoding fails
                    setModalError('Adres bilgisi alınamadı (Geocoder hatası).');
                  }
                });
              } else {
                 console.warn("Marker position undefined or Geocoder not available on dragend.");
                 setModalError('Konum bilgisi alınamadı.');
              }
            });

            // Cleanup function for this effect.
            // This runs when showDeliveryDetailsModal becomes false or other dependencies change.
            return () => {
                console.log("Cleaning up map and autocomplete listeners and instances.");
                // Explicitly remove event listeners to prevent memory leaks
                window.google.maps.event.removeListener(placeChangedListener);
                window.google.maps.event.removeListener(dragEndListener);

                // Although Google Maps objects don't have a explicit 'destroy' method
                // like some libraries, nullifying the map instance reference is important.
                // React handles the cleanup of the DOM element (mapRef.current) when the modal closes,
                // which helps with map object garbage collection.
                mapInstance.current = null;

                 // Clear modal errors when the modal is closed
                 setModalError(null);
            };

        } else {
             console.error("Google Maps Places library not loaded.");
             setModalError('Adres arama özelliği yüklenemedi.'); // Set a modal error
        }

    } catch (e) {
        console.error("Error initializing Google Map:", e);
         // Set a modal error if map initialization fails
        setModalError('Harita yüklenirken bir hata oluştu.');
    }

    // Dependencies for this effect:
    // isMapsApiLoaded: Rerun when the API finishes loading.
    // showDeliveryDetailsModal: Rerun when the modal opens/closes.
    // locations: Rerun if the location data changes (e.g., fetched after component mounts).
    // takeoutOption: Rerun if the takeout option changes while the modal is open (less likely but safe).
  }, [isMapsApiLoaded, showDeliveryDetailsModal, locations, takeoutOption]);


  const getRestaurantId = (name: string) => restaurants.find(r => r.name === name)?.restaurant_id || '';

  const addToCart = (itemName: string, price: number) => {
    // Find the item details to get option_categories and allergens
    const itemDetails = items.find(item => item.name === itemName && item.restaurant_id === getRestaurantId(selectedRestaurant));

    // Check if the item has any option categories defined
    if (itemDetails?.option_categories && itemDetails.option_categories.length > 0) {
        // If item has options, show the options modal
        // Store minimal info needed to identify the item when options are selected
        setSelectedItem({ item: itemName, price, id: Date.now() });
    } else {
        // If no options, add directly to cart with no options
        const itemToAdd = {
            item: itemName,
            options: '', // No options for this item
            price: price,
            id: Date.now(),
            note: undefined, // No note initially
        };
        setCart([...cart, itemToAdd]); // Update cart state
        setShowNotification(true); // Show notification
        setTimeout(() => setShowNotification(false), 2000); // Hide notification after 2 seconds
    }
  };


  const handleOptionSelect = (selectedOptions: { name: string; priceAdjustment: number }[], note?: string) => {
    if (!selectedItem) {
        console.error("handleOptionSelect called without a selectedItem.");
        return; // Should not happen if modal logic is correct
    }

    // Find the original item data to get the base price
    const originalItemData = items.find(item => item.name === selectedItem.item && item.restaurant_id === getRestaurantId(selectedRestaurant));
    // Use the original item's price as the base, fallback to selectedItem.price if original not found (shouldn't happen)
    const basePrice = originalItemData ? originalItemData.price : selectedItem.price;

    // Calculate the total price by adding price adjustments from selected options
    const totalPrice = selectedOptions.reduce((total, option) => {
      const adjustment = option.priceAdjustment || 0; // Use 0 if priceAdjustment is null/undefined
      return total + adjustment;
    }, basePrice); // Start with the base price


    // Format the selected options into a string
    const formattedOptions = selectedOptions.length > 0
      ? selectedOptions.map(opt => opt.name).join(', ')
      : ''; // Empty string if no options were selected

    // Add the item with selected options, calculated price, and note to the cart
    setCart([...cart, { ...selectedItem, options: formattedOptions, price: totalPrice, note }]); // Update cart state immutably
    setShowNotification(true); // Show notification
    setTimeout(() => setShowNotification(false), 2000); // Hide notification
    setSelectedItem(null); // Close the options modal by clearing selectedItem
  };


  const removeFromCart = (id: number) => {
    // Filter out the item with the matching id
    setCart(cart.filter(item => item.id !== id));
     // Optionally close the cart panel if it becomes empty
     if (cart.length === 1) { // If there was only one item before removing
         setIsCartOpen(false);
     }
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      alert('Sepet boş!'); // Consider using a modal or toast notification instead of alert
      return;
    }
     // Clear any previous general or modal errors before starting the order flow
    setError(null);
    setModalError(null);
    setShowOrderTypeModal(true); // Show the order type selection modal
  };

  const handleOrderTypeSelect = (type: 'Takeout' | 'Dine In') => {
    setOrderType(type); // Set the selected order type
    setShowOrderTypeModal(false); // Close the order type modal
    setModalError(null); // Clear modal error

    if (type === 'Dine In') {
      setShowTableNumberModal(true); // Show table number modal for Dine In
    } else { // type is 'Takeout'
      setShowTakeoutOptionModal(true); // Show takeout option modal for Takeout
    }
  };

  const handleTableNumberSubmit = () => {
    // Simple validation for table number
    if (!tableNumber.trim()) {
      setModalError('Lütfen bir masa numarası seçin veya girin!'); // Set modal-specific error
      return;
    }
    setModalError(null); // Clear modal error on successful validation

    // Submit the order with Dine In details
    submitOrder({ order_type: 'Dine In', table_number: tableNumber.trim() });
    setShowTableNumberModal(false); // Close the modal
    setTableNumber(''); // Clear table number input
  };

  const handleTakeoutOptionSelect = (option: 'Delivery' | 'Pickup') => {
    setTakeoutOption(option); // Set the selected takeout option
    setShowTakeoutOptionModal(false); // Close the takeout option modal
    setModalError(null); // Clear modal error

    // Clear any delivery-specific details if switching from Delivery or starting Pickup
    if (option === 'Pickup') {
        setDeliveryDetails(prev => ({ ...prev, address: '', phone: '', paymentMethod: 'Cash', additionalInfo: '' }));
        setDeliveryLocation(null);
    }
     // Always show the delivery details modal to collect name/surname (and address/phone for Delivery)
    setShowDeliveryDetailsModal(true);
  };

  const handleDeliveryDetailsSubmit = () => {
    const { address, phone, name, surname, paymentMethod, additionalInfo } = deliveryDetails;
    setModalError(null); // Clear previous modal errors

    // Validation based on the selected takeout option
    if (takeoutOption === 'Delivery') {
      if (!address.trim() || !phone.trim() || !name.trim() || !surname.trim() || !deliveryLocation) {
        setModalError('Lütfen tüm teslimat bilgilerini doldurun ve adresi haritada seçerek veya sürükleyerek onaylayın!');
        return;
      }
      // Basic phone number format validation (adjust regex as needed for specific country formats)
      const phoneRegex = /^[0-9]{10}$/; // Assuming 10-digit phone number after country/area code
      if (!phoneRegex.test(phone.trim())) {
         setModalError('Lütfen geçerli bir telefon numarası girin (örneğin: 5051234567)'); // More specific message
         return;
      }

       // Optional: Add client-side check if the selected location is within a delivery zone.
       // This requires the Google Maps Geometry library to be loaded (add 'geometry' to libraries parameter).
       // A robust check is usually done server-side as location data might be sensitive or complex.
        const isInDeliveryZone = locations.some(loc => {
            if (window.google.maps.geometry && deliveryLocation) {
                const center = new window.google.maps.LatLng(loc.lat, loc.lon);
                const userPos = new window.google.maps.LatLng(deliveryLocation.lat, deliveryLocation.lon);
                const distance = window.google.maps.geometry.spherical.computeDistanceBetween(userPos, center);
                // console.log(`Distance to ${loc.name}: ${distance} meters. Radius: ${loc.radius * 1000} meters.`);
                return distance <= loc.radius * 1000; // Compare distance with radius in meters
            }
            return true; // If geometry library not loaded or no deliveryLocation, assume validation is server-side
        });

       if (!isInDeliveryZone) {
           setModalError('Üzgünüz, seçilen adres teslimat bölgemizin dışında!');
           return;
       }


    } else if (takeoutOption === 'Pickup') {
      // For Pickup, only name and surname are mandatory in this modal
      if (!name.trim() || !surname.trim()) {
        setModalError('Lütfen isminizi ve soyisminizi girin!');
        return;
      }
    }

    // If validation passes, submit the order
    submitOrder({
      order_type: 'Takeout',
      takeout_option: takeoutOption!, // Use non-null assertion as we've checked it's either Delivery or Pickup
      ...(takeoutOption === 'Delivery' ? {
        address: address.trim(), // Trim whitespace
        phone: phone.trim(), // Trim whitespace
        name: `${name.trim()} ${surname.trim()}`, // Combine and trim name and surname
        payment_method: paymentMethod,
        delivery_lat: deliveryLocation!.lat, // Use non-null assertion after validation
        delivery_lon: deliveryLocation!.lon, // Use non-null assertion after validation
        additional_info: additionalInfo.trim(), // Trim whitespace
      } : { // Pickup
        name: `${name.trim()} ${surname.trim()}`, // Combine and trim name and surname for pickup identification
        // Address, phone, payment method, location are not applicable/needed for pickup order details sent to backend
      }),
    });
    setShowDeliveryDetailsModal(false); // Close the modal
    // Reset delivery details and location after submission
    setDeliveryDetails({ address: '', phone: '', name: '', surname: '', paymentMethod: 'Cash', additionalInfo: '' });
    setDeliveryLocation(null);
  };


  // Function to submit the order to the backend
  async function submitOrder(orderDetails: {
    order_type: 'Takeout' | 'Dine In';
    table_number?: string;
    takeout_option?: 'Delivery' | 'Pickup';
    address?: string;
    phone?: string;
    name?: string; // Added name for both delivery and pickup
    payment_method?: 'Cash' | 'Credit';
    delivery_lat?: number;
    delivery_lon?: number;
    additional_info?: string;
  }) {
    try {
      // Clear any previous errors before submission attempt
      setError(null);
      setModalError(null);

      // Add the current restaurant_id to the order details payload
      const currentRestaurantId = getRestaurantId(selectedRestaurant);
       if (!currentRestaurantId) {
           console.error("Could not find restaurant ID for selected restaurant:", selectedRestaurant);
           setError("Restoran bilgisi bulunamadı, sipariş verilemedi."); // Set a general error
           return; // Stop the submission process
       }

      const response = await fetch('/.netlify/functions/submit-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            cart, // Include current cart items
            serverTime, // Include server time
            restaurant_id: currentRestaurantId, // Add restaurant ID to the payload
            ...orderDetails // Include other order details (type, table, delivery info etc.)
         }),
      });

      const responseText = await response.text();

      if (!response.ok) {
          // Attempt to parse the error message from the backend
          let errorMessage = 'Sipariş verilirken beklenmedik bir hata oluştu. Lütfen tekrar deneyin.';
           try {
                const errorData = JSON.parse(responseText);
                // Check for specific backend error messages
                if (errorData.error) {
                    errorMessage = errorData.error; // Use backend's specific message if available
                }
           } catch (parseError) {
               console.error("Failed to parse error response from backend:", parseError, "Response text:", responseText);
               // If parsing fails, use the default generic message
           }
          throw new Error(errorMessage); // Throw an error with the determined message
      }

      // If the response is OK
      const data = JSON.parse(responseText);
      setOrderConfirmation({
        orderNumber: data.orderId, // Assuming backend returns an orderId
        message: `${orderDetails.order_type === 'Takeout' ? 'Paket servis' : 'Restorantta'} siparişiniz başarıyla oluşturuldu! Sipariş numaranız:`, // Updated confirmation message
      });

      // Reset states after successful order
      setCart([]); // Clear the cart
      setIsCartOpen(false); // Close the cart panel
      setOrderType(null); // Reset order type
      setTakeoutOption(null); // Reset takeout option
      // Clear any lingering errors
      setError(null);
      setModalError(null);

    } catch (err) {
      console.error("Submit order failed:", err);
      // Set the general error state with the error message
      setError((err as Error).message || 'Sipariş verilirken beklenmedik bir hata oluştu.');
    }
  }


  const cartTotal = cart.reduce((total, item) => total + item.price, 0);
  // Calculate current day and display working hours
  const nowIST = serverTime ? new Date(serverTime) : new Date(); // Use server time if available
  // Use 'tr-TR' locale for Turkish day names directly
  const currentDay = nowIST.toLocaleString('tr-TR', { weekday: 'long' });
  const todayTimes = times.filter(t => {
    // Assuming t.day format is "Pazartesi-..." or just "Pazartesi"
    const dayNameFromData = t.day.split('-')[0]; // Split and take the first part
    return dayNameFromData === currentDay; // Compare with current day name
  });
  const displayTimes = todayTimes.length > 0
    ? todayTimes.map(t => `${t.opening.replace('.', ':')}–${t.closing.replace('.', ':')}`).join(', ') // Format times
    : 'Saatler tanımlı değil'; // Message if no times are defined


  // Determine if any modal is currently open to control background scrolling or other UI elements
  const isAnyModalOpen = showDeliveryDetailsModal || showOrderTypeModal || showTableNumberModal || showTakeoutOptionModal || orderConfirmation;

  // Add a class to the body to prevent scrolling when a modal is open
  useEffect(() => {
      if (isAnyModalOpen) {
          document.body.classList.add('no-scroll');
      } else {
          document.body.classList.remove('no-scroll');
      }
      // Cleanup function to remove the class when the component unmounts or modal closes
      return () => {
          document.body.classList.remove('no-scroll');
      };
  }, [isAnyModalOpen]); // Dependency on the state of modals


  return (
    <div>
      {/* Header component */}
      <header className={`header ${isHeaderVisible ? '' : 'hidden'}`}>
        <div className="header-content">
          <h1 className="header-title"> Blender X FitKase </h1>
          <div className="header-times">
            <p>Çalışma Saatleri: {currentDay} ({displayTimes})</p>
          </div>
        </div>
        {/* Restaurant Navigation */}
        {restaurants.length > 1 && (
          <RestaurantNav
            selectedRestaurant={selectedRestaurant}
            onSelectRestaurant={(restaurant) => {
              setSelectedRestaurant(restaurant);
              setIsNavOpen(false); // Close mobile nav on selection
              const selected = restaurants.find(r => r.name === restaurant);
              // Select the first category of the newly selected restaurant
              setSelectedCategory(selected?.categories[0] || '');
            }}
            restaurantNames={restaurants.map(r => r.name)}
          />
        )}
        {/* Restaurant Logo */}
        {selectedRestaurant && (
          <img
            src={restaurants.find(r => r.name === selectedRestaurant)?.logo_url}
            alt={`${selectedRestaurant} logo`}
            className="restaurant-logo"
            // Fallback image in case the logo fails to load
            onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/150')}
          />
        )}
        {/* Category Navigation */}
        {!isLoading && restaurants.length > 0 && (
          <CategoryNav
            selectedCategory={selectedCategory}
            selectedRestaurant={selectedRestaurant}
            onSelectCategory={(category) => {
              setSelectedCategory(category);
              setIsNavOpen(false); // Close mobile nav on selection
            }}
            // Get categories for the currently selected restaurant
            categories={restaurants.find(r => r.name === selectedRestaurant)?.categories || []}
          />
        )}
      </header>

      {/* Main content area */}
      <main className="main">
         {/* Display general errors (not modal-specific) */}
        {error && !isAnyModalOpen && (
           <p className="error">{error}</p>
        )}
        {/* Show loading indicator or menu items */}
        {isLoading ? (
          <p className="loading">Yükleniyor...</p>
        ) : (
           // Only render the menu if there's no general error or if a modal is open
           // (to prevent the main content from disappearing behind a modal error)
           !error || isAnyModalOpen ? (
              restaurants.map(restaurant => {
                // Only render items for the selected restaurant
                if (restaurant.name !== selectedRestaurant) return null;

                // Filter items by selected restaurant, category, and availability
                const filteredItems = items.filter(i =>
                  i.restaurant_id === restaurant.restaurant_id &&
                  i.category.toLowerCase() === selectedCategory.toLowerCase() &&
                  i.available
                );

                return (
                  <div key={restaurant.restaurant_id}>
                    {/* Category Title */}
                    <h2 className="category-title">{selectedCategory}</h2>
                    {/* Menu Item Grid */}
                    <div className="menu-grid">
                      {filteredItems.map(item => (
                        <MenuItem
                          key={item.custom_id}
                          item={item}
                          addToCart={addToCart} // Pass the add to cart handler
                          // Filter allergens relevant to this item
                          allergens={allergens.filter(a => item.allergens?.includes(a.id))}
                        />
                      ))}
                       {/* Message if no items are available in the category */}
                       {filteredItems.length === 0 && (
                           <p className="no-items">Bu kategoride ürün bulunmamaktadır.</p>
                       )}
                    </div>
                  </div>
                );
              })
           ) : null // Render nothing from main content if there's a global error and no modal is open
        )}
      </main>

      {/* Delivery Details Modal */}
      {showDeliveryDetailsModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-content">
              <h2 className="modal-header">
                {takeoutOption === 'Delivery' ? 'Teslimat Bilgileri' : 'Alım Bilgileri'}
              </h2>
              {/* Display modal-specific errors */}
              {modalError && <p className="modal-error">{modalError}</p>}

              {/* Delivery specific fields */}
              {takeoutOption === 'Delivery' && (
                <>
                  <input
                    ref={inputRef} // Ref for the address input, used by Autocomplete
                    type="text"
                    value={deliveryDetails.address}
                    onChange={(e) => setDeliveryDetails({ ...deliveryDetails, address: e.target.value })}
                    placeholder="Adresinizi girin"
                    className="modal-input"
                    // Disable input while the Maps API is loading
                    disabled={!isMapsApiLoaded}
                  />
                   {/* Show loading indicator for the map while API is loading */}
                  {!isMapsApiLoaded && (
                      <div style={{ height: '256px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid #E5E5E5', borderRadius: '8px', marginBottom: '16px' }}>
                           <p>Harita yükleniyor...</p>
                      </div>
                  )}
                   {/* Render the map container div only when API is loaded */}
                   {isMapsApiLoaded && (
                     <div ref={mapRef} className="map-container" style={{ width: '100%', height: '256px', marginBottom: '16px', border: '1px solid #E5E5E5', borderRadius: '8px' }} />
                   )}

                  <textarea
                    value={deliveryDetails.additionalInfo}
                    onChange={(e) => setDeliveryDetails({ ...deliveryDetails, additionalInfo: e.target.value })}
                    placeholder="Ek Adres Bilgileri (örn. Kat, Daire No)"
                    className="modal-textarea"
                    rows={2} // Adjusted rows for slightly less height
                  />
                  <input
                    type="tel" // Use type="tel" for phone input
                    value={deliveryDetails.phone}
                    onChange={(e) => setDeliveryDetails({ ...deliveryDetails, phone: e.target.value })}
                    placeholder="(5xx) xxx-xx-xx" // Updated placeholder
                    className="modal-input"
                    maxLength={10} // Basic length constraint (adjust if needed)
                    pattern="[0-9]{10}" // Basic pattern for 10 digits
                    title="Lütfen 10 haneli telefon numaranızı girin (başına 0 veya ülke kodu olmadan)" // Tooltip for pattern
                  />
                   {/* Payment Method Selection (only for Delivery) */}
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
               {/* Fields for Name and Surname (for both Delivery and Pickup) */}
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
            {/* Modal Buttons */}
            <div className="modal-buttons">
              <button
                onClick={handleDeliveryDetailsSubmit}
                className="modal-button primary"
                // Disable the submit button based on validation and map loading state
                disabled={(takeoutOption === 'Delivery' && (!isMapsApiLoaded || !deliveryLocation || !deliveryDetails.address.trim() || !deliveryDetails.phone.trim() || !deliveryDetails.name.trim() || !deliveryDetails.surname.trim())) ||
                          (takeoutOption === 'Pickup' && (!deliveryDetails.name.trim() || !deliveryDetails.surname.trim())) ||
                          !!modalError // Disable if there is a modal-specific error displayed
                         }
              >
                Onayla
              </button>
              <button
                onClick={() => {
                  // Close the modal and reset related states
                  setShowDeliveryDetailsModal(false);
                  setDeliveryDetails({ address: '', phone: '', name: '', surname: '', paymentMethod: 'Cash', additionalInfo: '' });
                  setDeliveryLocation(null); // Reset delivery location
                  setModalError(null); // Clear modal error on close
                  // Optionally reset order type/takeout option if closing this modal cancels the process
                  // setOrderType(null);
                  // setTakeoutOption(null);
                }}
                className="modal-button secondary"
              >
                İptal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Order Type Selection Modal */}
      {showOrderTypeModal && <OrderTypeModal onSelect={handleOrderTypeSelect} onClose={() => { setShowOrderTypeModal(false); setModalError(null); }} />}

      {/* Table Number Selection Modal */}
      {showTableNumberModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-content">
              <h2 className="modal-header">Masa Numarası</h2>
              {/* Display modal-specific error */}
              {modalError && <p className="modal-error">{modalError}</p>}
              {/* Show table number selection if tables are available */}
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
            {/* Modal Buttons */}
            <div className="modal-buttons">
              <button
                onClick={handleTableNumberSubmit}
                className="modal-button primary"
                // Disable if no tables, no table selected, or if there's a modal error
                disabled={getTablesForRestaurant().length === 0 || !tableNumber || !!modalError}
              >
                Onayla
              </button>
              <button
                onClick={() => {
                  setShowTableNumberModal(false);
                  setTableNumber(''); // Clear table number
                  setModalError(null); // Clear modal error on close
                }}
                className="modal-button secondary"
              >
                İptal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Takeout Option Selection Modal */}
      {showTakeoutOptionModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-content">
              <h2 className="modal-header">Teslimat Seçeneği</h2>
              {/* Display modal-specific error */}
              {modalError && <p className="modal-error">{modalError}</p>}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <button
                  onClick={() => handleTakeoutOptionSelect('Delivery')}
                  className="modal-button primary"
                >
                  Teslimat
                </button>
                <button
                  onClick={() => handleTakeoutOptionSelect('Pickup')}
                  className="modal-button primary"
                >
                  Restorandan Alım
                </button>
                <button
                  onClick={() => { setShowTakeoutOptionModal(false); setTakeoutOption(null); setModalError(null); }} // Clear state and error on close
                  className="modal-button secondary"
                >
                  İptal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Order Confirmation Modal */}
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
                onClick={() => setOrderConfirmation(null)} // Close confirmation modal
                className="modal-button primary"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cart Toggle Button - Hidden when any modal is open */}
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


      {/* Cart Panel - Shown when isCartOpen is true */}
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
                      ? `${item.item} (${item.options}) - ${item.price.toFixed(2)}₺` // Format price to 2 decimal places
                      : `${item.item} - ${item.price.toFixed(2)}₺`} {/* Format price */}
                    {item.note && <span className="cart-item-note">Not: {item.note}</span>}
                  </span>
                </li>
              ))
            )}
          </ul>
          {/* Display cart total if cart is not empty */}
          {cart.length > 0 && (
            <p className="cart-total">Toplam: {cartTotal.toFixed(2)}₺</p>
          )}
          {/* Place Order Button - Disabled if cart is empty */}
          <button
            onClick={handlePlaceOrder}
            disabled={cart.length === 0}
            className="cart-button"
          >
            Sipariş Ver
          </button>
        </div>
      )}

      {/* Notification (e.g., "Ürün sepete eklendi!") */}
      {showNotification && (
        <div className="notification">
          Ürün siparişe eklendi!
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <p className="footer-text">Sporla Kalın</p>
      </footer>

      {/* Options Modal - Conditionally rendered based on selectedItem */}
      {selectedItem && (() => {
        // Find the full item data to get option categories and allergens
        const selectedItemData = items.find(i => i.name === selectedItem.item && i.restaurant_id === getRestaurantId(selectedRestaurant));
        // Filter available options based on the item's option categories
        const filteredOptions = selectedItemData?.option_categories?.length > 0
          ? options.filter(opt => selectedItemData.option_categories.includes(opt.id))
          : [];
        // Filter allergens based on the item's allergens
        const filteredAllergens = selectedItemData?.allergens?.length > 0
          ? allergens.filter(a => selectedItemData.allergens.includes(a.id))
          : [];
        return (
          <OptionsModal
            item={selectedItem.item}
            price={selectedItem.price} // This is the base price used in the modal
            option_categories={filteredOptions}
            allergens={filteredAllergens}
            onSelect={(options, note) => handleOptionSelect(options, note)} // Handler for option selection
            onClose={() => setSelectedItem(null)} // Close modal handler
          />
        );
      })()}
    </div>
  );
}

export default App;