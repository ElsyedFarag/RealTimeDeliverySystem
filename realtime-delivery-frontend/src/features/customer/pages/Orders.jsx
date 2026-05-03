import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaSearch, FaFilter, FaStar, FaClock, FaMapMarkerAlt, 
  FaShoppingBag, FaTruck, FaCheckCircle, FaSpinner,
  FaTimesCircle, FaReceipt, FaCopy, FaDownload, FaEye
} from 'react-icons/fa';
import { MdDeliveryDining, MdRestaurant, MdPayment } from 'react-icons/md';
import { GiReceiveMoney } from 'react-icons/gi';

const Orders = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('active');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Mock orders data
  const orders = [
    {
      id: 'ORD-001',
      date: '2024-01-15T18:30:00',
      status: 'delivered',
      statusText: 'Delivered',
      items: [
        { name: 'Margherita Pizza', quantity: 2, price: 12.99 },
        { name: 'Garlic Bread', quantity: 1, price: 4.99 }
      ],
      total: 30.97,
      restaurant: 'Pizza Palace',
      restaurantImage: '🍕',
      deliveryAddress: '123 Main St, Apt 4B, New York, NY 10001',
      deliveryTime: '25 min',
      rating: 5,
      tracking: {
        orderPlaced: true,
        confirmed: true,
        preparing: true,
        onWay: true,
        delivered: true
      }
    },
    {
      id: 'ORD-002',
      date: '2024-01-14T12:15:00',
      status: 'on-way',
      statusText: 'On the Way',
      items: [
        { name: 'Cheeseburger', quantity: 1, price: 9.99 },
        { name: 'French Fries', quantity: 2, price: 3.99 },
        { name: 'Coke', quantity: 2, price: 2.50 }
      ],
      total: 22.97,
      restaurant: 'Burger King',
      restaurantImage: '🍔',
      deliveryAddress: '123 Main St, Apt 4B, New York, NY 10001',
      deliveryTime: '15-20 min',
      rating: null,
      tracking: {
        orderPlaced: true,
        confirmed: true,
        preparing: true,
        onWay: true,
        delivered: false
      },
      driver: {
        name: 'Mike Johnson',
        phone: '+1 (555) 123-4567',
        location: '1.2 km away',
        eta: '8 min'
      }
    },
    {
      id: 'ORD-003',
      date: '2024-01-14T19:45:00',
      status: 'preparing',
      statusText: 'Preparing',
      items: [
        { name: 'California Roll', quantity: 2, price: 15.99 },
        { name: 'Miso Soup', quantity: 1, price: 3.99 }
      ],
      total: 35.97,
      restaurant: 'Sushi Master',
      restaurantImage: '🍣',
      deliveryAddress: '123 Main St, Apt 4B, New York, NY 10001',
      deliveryTime: '30-35 min',
      rating: null,
      tracking: {
        orderPlaced: true,
        confirmed: true,
        preparing: true,
        onWay: false,
        delivered: false
      }
    },
    {
      id: 'ORD-004',
      date: '2024-01-13T20:00:00',
      status: 'confirmed',
      statusText: 'Confirmed',
      items: [
        { name: 'Pasta Carbonara', quantity: 1, price: 13.99 },
        { name: 'Tiramisu', quantity: 1, price: 5.99 }
      ],
      total: 19.98,
      restaurant: 'Italian Bistro',
      restaurantImage: '🍝',
      deliveryAddress: '123 Main St, Apt 4B, New York, NY 10001',
      deliveryTime: '35-40 min',
      rating: null,
      tracking: {
        orderPlaced: true,
        confirmed: true,
        preparing: false,
        onWay: false,
        delivered: false
      }
    },
    {
      id: 'ORD-005',
      date: '2024-01-12T13:30:00',
      status: 'cancelled',
      statusText: 'Cancelled',
      items: [
        { name: 'Fried Chicken', quantity: 1, price: 11.99 },
        { name: 'Mashed Potatoes', quantity: 1, price: 3.99 }
      ],
      total: 15.98,
      restaurant: 'KFC',
      restaurantImage: '🍗',
      deliveryAddress: '123 Main St, Apt 4B, New York, NY 10001',
      deliveryTime: 'cancelled',
      rating: null,
      tracking: {
        orderPlaced: true,
        confirmed: false,
        preparing: false,
        onWay: false,
        delivered: false
      }
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      'delivered': 'bg-green-100 text-green-700',
      'on-way': 'bg-blue-100 text-blue-700',
      'preparing': 'bg-yellow-100 text-yellow-700',
      'confirmed': 'bg-purple-100 text-purple-700',
      'cancelled': 'bg-red-100 text-red-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'delivered': return <FaCheckCircle />;
      case 'on-way': return <FaTruck />;
      case 'preparing': return <FaSpinner className="animate-spin" />;
      case 'confirmed': return <MdDeliveryDining />;
      case 'cancelled': return <FaTimesCircle />;
      default: return <FaClock />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const trackOrder = (orderId) => {
    navigate(`/track-order/${orderId}`);
  };

  const reorder = (order) => {
    console.log('Reorder:', order);
    alert(`Reorder placed for ${order.id}`);
  };

  const cancelOrder = (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      console.log('Cancel order:', orderId);
      alert('Order cancelled successfully');
    }
  };

  const copyOrderId = (orderId) => {
    navigator.clipboard.writeText(orderId);
    alert('Order ID copied to clipboard');
  };

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'active') {
      return ['on-way', 'preparing', 'confirmed'].includes(order.status);
    } else if (activeTab === 'completed') {
      return order.status === 'delivered';
    } else if (activeTab === 'cancelled') {
      return order.status === 'cancelled';
    }
    return true;
  }).filter(order => 
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.restaurant.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 -m-6 -mt-6 p-6 mb-6 rounded-b-2xl">
        <h1 className="text-3xl font-bold text-white mb-2">My Orders</h1>
        <p className="text-purple-100">Track and manage all your orders in one place</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-2">
            <FaShoppingBag className="text-purple-600 text-2xl" />
            <span className="text-2xl font-bold text-gray-800">{orders.length}</span>
          </div>
          <p className="text-sm text-gray-600">Total Orders</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-2">
            <FaTruck className="text-green-600 text-2xl" />
            <span className="text-2xl font-bold text-gray-800">
              {orders.filter(o => o.status === 'delivered').length}
            </span>
          </div>
          <p className="text-sm text-gray-600">Delivered</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-2">
            <FaSpinner className="text-yellow-600 text-2xl animate-spin" />
            <span className="text-2xl font-bold text-gray-800">
              {orders.filter(o => ['on-way', 'preparing', 'confirmed'].includes(o.status)).length}
            </span>
          </div>
          <p className="text-sm text-gray-600">Active Orders</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-2">
            <GiReceiveMoney className="text-blue-600 text-2xl" />
            <span className="text-2xl font-bold text-gray-800">
              ${orders.reduce((sum, o) => sum + o.total, 0).toFixed(0)}
            </span>
          </div>
          <p className="text-sm text-gray-600">Total Spent</p>
        </div>
      </div>

      {/* Tabs and Search */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex gap-2 border-b sm:border-b-0">
          <button
            onClick={() => setActiveTab('active')}
            className={`px-4 py-2 font-semibold transition-colors ${
              activeTab === 'active'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Active ({orders.filter(o => ['on-way', 'preparing', 'confirmed'].includes(o.status)).length})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-4 py-2 font-semibold transition-colors ${
              activeTab === 'completed'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Completed ({orders.filter(o => o.status === 'delivered').length})
          </button>
          <button
            onClick={() => setActiveTab('cancelled')}
            className={`px-4 py-2 font-semibold transition-colors ${
              activeTab === 'cancelled'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Cancelled ({orders.filter(o => o.status === 'cancelled').length})
          </button>
        </div>

        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by order ID or restaurant..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 w-full sm:w-64"
          />
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No orders found</h3>
            <p className="text-gray-500">You haven't placed any orders yet</p>
            <button
              onClick={() => navigate('/products')}
              className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-purple-700 transition-colors"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all">
              {/* Order Header */}
              <div className="p-4 border-b bg-gray-50">
                <div className="flex flex-wrap justify-between items-center gap-3">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{order.restaurantImage}</div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-gray-800">{order.restaurant}</h3>
                        <button onClick={() => copyOrderId(order.id)} className="text-gray-400 hover:text-purple-600">
                          <FaCopy size={14} />
                        </button>
                      </div>
                      <p className="text-sm text-gray-500">Order #{order.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span>{order.statusText}</span>
                    </span>
                    <span className="text-sm text-gray-500">{formatDate(order.date)}</span>
                  </div>
                </div>
              </div>

              {/* Order Body */}
              <div className="p-4">
                <div className="space-y-2 mb-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-gray-600">{item.quantity}x {item.name}</span>
                      <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-3 border-t">
                  <div>
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="text-xl font-bold text-purple-600">${order.total.toFixed(2)}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    {order.status === 'on-way' && (
                      <button
                        onClick={() => trackOrder(order.id)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                      >
                        Track Order
                      </button>
                    )}
                    
                    {order.status === 'delivered' && !order.rating && (
                      <button
                        onClick={() => navigate(`/rate-order/${order.id}`)}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
                      >
                        Rate Order
                      </button>
                    )}
                    
                    {order.status === 'delivered' && (
                      <button
                        onClick={() => reorder(order)}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                      >
                        Reorder
                      </button>
                    )}

                    {['confirmed', 'preparing'].includes(order.status) && (
                      <button
                        onClick={() => cancelOrder(order.id)}
                        className="px-4 py-2 border border-red-500 text-red-500 rounded-lg font-semibold hover:bg-red-50 transition-colors"
                      >
                        Cancel
                      </button>
                    )}

                    <button
                      onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {selectedOrder === order.id && (
                  <div className="mt-4 pt-4 border-t space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <FaMapMarkerAlt className="text-gray-400" />
                      <span className="text-gray-600">{order.deliveryAddress}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FaClock className="text-gray-400" />
                      <span className="text-gray-600">Delivery Time: {order.deliveryTime}</span>
                    </div>
                    
                    {/* Tracking Progress */}
                    {order.status !== 'cancelled' && (
                      <div className="mt-3">
                        <p className="text-sm font-semibold mb-2">Order Progress</p>
                        <div className="flex justify-between">
                          {[
                            { key: 'orderPlaced', label: 'Order Placed' },
                            { key: 'confirmed', label: 'Confirmed' },
                            { key: 'preparing', label: 'Preparing' },
                            { key: 'onWay', label: 'On the Way' },
                            { key: 'delivered', label: 'Delivered' }
                          ].map((step, idx) => (
                            <div key={idx} className="text-center flex-1">
                              <div className={`w-8 h-8 rounded-full mx-auto mb-1 flex items-center justify-center ${
                                order.tracking[step.key] 
                                  ? 'bg-green-500 text-white' 
                                  : 'bg-gray-200 text-gray-400'
                              }`}>
                                {order.tracking[step.key] ? <FaCheckCircle size={16} /> : idx + 1}
                              </div>
                              <p className="text-xs text-gray-600">{step.label}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Driver Info for On-Way Orders */}
                    {order.status === 'on-way' && order.driver && (
                      <div className="bg-blue-50 p-3 rounded-lg mt-3">
                        <p className="font-semibold text-sm mb-2">Driver Information</p>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm">{order.driver.name}</p>
                            <p className="text-xs text-gray-500">{order.driver.location}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold">ETA: {order.driver.eta}</p>
                            <a href={`tel:${order.driver.phone}`} className="text-xs text-purple-600">Call Driver</a>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Support Section */}
      <div className="bg-gray-50 rounded-xl p-6 text-center">
        <h3 className="font-semibold text-gray-800 mb-2">Need Help With Your Order?</h3>
        <p className="text-sm text-gray-600 mb-4">Our customer support team is available 24/7</p>
        <button
          onClick={() => navigate('/support')}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
        >
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default Orders;