// submit_order.cjs
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Config
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase env vars—check VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    console.log('Parsed body:', body);

    const cart = Array.isArray(body.cart) ? body.cart : [];
    const order_type = body.order_type || 'Takeout';
    const server_time = body.serverTime;
    const delivery_lat = body.delivery_lat;
    const delivery_lon = body.delivery_lon;
    const additional_info = body.additional_info;
    if (cart.length === 0) throw new Error('Cart is empty');
    if (!server_time) throw new Error('Server time missing');

    // Fetch working hours
    const { data: timesData, error: timesError } = await supabase
      .from('times')
      .select('*');
    if (timesError) throw timesError;
    const times = timesData || [];

    // Use server-provided IST
    const nowIST = new Date(server_time); // e.g., "2025-03-21T20:00:00Z"
    const nowMins = nowIST.getHours() * 60 + nowIST.getMinutes();
    const day = nowIST.toLocaleString('tr-TR', { weekday: 'long' }); // "Cuma"

    // Check current day's time ranges
    let isOpen = false;
    const dayTimes = times.filter(t => t.day.startsWith(day));
    for (const time of dayTimes) {
      if (!time.opening || !time.closing) continue;
      const openingMins = parseTimeToMinutes(time.opening);
      const closingMins = parseTimeToMinutes(time.closing);
      if (closingMins < openingMins) {
        if (nowMins >= openingMins || nowMins < closingMins) isOpen = true;
      } else if (nowMins >= openingMins && nowMins < closingMins) {
        isOpen = true;
      }
      if (isOpen) break;
    }

    if (!isOpen && times.length > 0) throw new Error('Kitchen is closed');
    if (times.length === 0) throw new Error('No working hours defined');

    // Order creation
    let orderData = { items: cart, status: 'pending', order_type };
    if (order_type === 'Dine In') {
      if (!body.table_number) throw new Error('Table number required for Dine In');
      orderData.table_number = body.table_number;
    } else if (order_type === 'Takeout') {
      if (!body.takeout_option) throw new Error('Takeout option (Delivery/Pickup) required');
      orderData.takeout_option = body.takeout_option;
      if (body.takeout_option === 'Delivery') {
        if (!body.address || !body.phone || !body.name || !body.payment_method || !delivery_lat || !delivery_lon) {
          throw new Error('Delivery requires address, phone, name, payment method, lat, and lon');
        }
        const { data: locationsData, error: locationsError } = await supabase
          .from('locations')
          .select('*');
        if (locationsError) throw locationsError;
        const locations = locationsData || [];
        console.log('Fetched locations:', locations);

        let closestBranch = null;
        let minDistance = Infinity;

        for (const loc of locations) {
          const distance = haversineDistance(delivery_lat, delivery_lon, loc.lat, loc.lon);
          console.log(`Distance to ${loc.name || loc.id}: ${distance} km (radius: ${loc.radius} km)`);
          if (distance <= loc.radius && distance < minDistance) {
            closestBranch = loc;
            minDistance = distance;
          }
        }

        if (!closestBranch) {
          throw new Error('Outside delivery zone');
        }
        orderData.address = body.address;
        orderData.phone = body.phone;
        orderData.name = body.name;
        orderData.payment_method = body.payment_method;
        orderData.delivery_lat = delivery_lat;
        orderData.delivery_lon = delivery_lon;
        orderData.additional_info = additional_info;
        orderData.branch_id = closestBranch.id;
      }
    }

    // Get last order ID
    const { data: ordersData, error: ordersError } = await supabase
      .from('orders')
      .select('order_id')
      .order('order_id', { ascending: false })
      .limit(1);
    if (ordersError) throw ordersError;
    const orders = ordersData || [];

    let orderId = orders.length === 0 ? '1' : (parseInt(orders[0].order_id, 10) + 1).toString();
    console.log('Generated order_id:', orderId);

    orderData.order_id = orderId; // Set order_id, not id
    orderData.id=Number(orderId);
    orderData.created_at = new Date().toISOString();

    console.log('orderData before insert:', orderData);

    const { data: result, error: insertError } = await supabase
      .from('orders')
      .insert(orderData)
      .select()
      .single();
    if (insertError) throw insertError;
    console.log('Order created:', result);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Order saved', orderId }), // Return order_id
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    };
  } catch (error) {
    console.error('Error:', error.message);
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid request', error: error.message }),
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    };
  }
};

function parseTimeToMinutes(timeStr) {
  const [hours, minutes] = timeStr.split('.').map(Number);
  return hours * 60 + minutes;
}