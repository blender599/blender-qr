let orders = [];

module.exports = {
  getOrders: async () => {
    console.log('Retrieving orders:', JSON.stringify(orders, null, 2));
    return orders;
  },
  addOrder: async (order) => {
    if (!order || typeof order !== 'object') {
      console.error('Invalid order:', order);
      throw new Error('Order must be an object');
    }
    console.log('Adding order before:', JSON.stringify(orders, null, 2));
    orders.push(order);
    console.log('Adding order after:', JSON.stringify(orders, null, 2));
  },
  updateOrder: async (id, status) => {
    console.log(`Updating order ${id} to ${status}:`, JSON.stringify(orders, null, 2));
    orders = orders.map(o => (o.id === Number(id) ? { ...o, status: status === 'Aktif' ? 'active' : status === 'Tamamlandı' ? 'done' : status } : o));
    console.log('Orders after update:', JSON.stringify(orders, null, 2));
  },
  removeOrder: async (id) => {
    console.log(`Removing order ${id}:`, JSON.stringify(orders, null, 2));
    orders = orders.filter(o => o.id !== Number(id));
    console.log('Orders after removal:', JSON.stringify(orders, null, 2));
  },
};