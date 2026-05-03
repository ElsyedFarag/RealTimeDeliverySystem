import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  FaMapMarkerAlt, FaClock, FaTruck, FaCheckCircle, 
  FaSpinner, FaPhone, FaComment, FaStar, FaCopy,
  FaArrowLeft, FaLocationArrow, FaMotorcycle
} from 'react-icons/fa';
import { MdDeliveryDining, MdRestaurant, MdHome } from 'react-icons/md';
import { GiReceiveMoney } from 'react-icons/gi';

const Tracking = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showDriverLocation, setShowDriverLocation] = useState(true);

  // Real-time clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate driver position updates
      console.log('Updating driver location...');
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Mock order tracking data
  const trackingData = {
    orderId: orderId || 'ORD-002',
    restaurant: {
      name: 'Burger King',
      address: '123 Restaurant Ave, Downtown',
      location: { lat: 40.7128, lng: -74.0060 },
      image: '🍔',
      phone: '+1 (555) 123-4567'
    },
    customer: {
      name: 'John Doe',
      address: '456 Customer St, Apt 4B',
      location: { lat: 40.7580, lng: -73.9855 },
      phone: '+1 (555) 987-6543'
    },
    driver: {
      name: 'Mike Johnson',
      phone: '+1 (555) 444-7777',
      rating: 4.9,
      totalDeliveries: 1234,
      vehicle: 'Honda Civic',
      plateNumber: 'XYZ-1234',
      image: '👨',
      currentLocation: { lat: 40.7355, lng: -73.9955 },
      eta: '8 minutes',
      distance: '1.2 km'
    },
    order: {
      items: [
        { name: 'Cheeseburger', quantity: 1, price: 9.99 },
        { name: 'French Fries', quantity: 2, price: 3.99 },
        { name: 'Coke', quantity: 2, price: 2.50 }
      ],
      total: 22.97,
      deliveryFee: 2.99,
      tax: 2.30,
      grandTotal: 28.26,
      paymentMethod: 'Credit Card',
      specialInstructions: 'Leave at front door, ring bell'
    },
    status: 'on-way',
    statusText: 'Your order is on the way!',
    statusCode: 3, // 0: placed, 1: confirmed, 2: preparing, 3: on-way, 4: delivered
    timeline: [
      { time: '6:30 PM', status: 'Order Placed', completed: true, icon: '📝' },
      { time: '6:32 PM', status: 'Order Confirmed', completed: true, icon: '✅' },
      { time: '6:35 PM', status: 'Restaurant Preparing', completed: true, icon: '🍳' },
      { time: '6:50 PM', status: 'Driver Assigned', completed: true, icon: '👨' },
      { time: '7:00 PM', status: 'Driver Picked Up', completed: true, icon: '🛵' },
      { time: '7:08 PM', status: 'On the Way', completed: true, icon: '🚚' },
      { time: '7:15 PM', status: 'Arriving Soon', completed: false, icon: '📍' },
      { time: '7:20 PM', status: 'Delivered', completed: false, icon: '🏠' }
    ],
    estimatedDelivery: '7:20 PM',
    remainingTime: '12 min'
  };

  const getProgressPercentage = () => {
    return (trackingData.statusCode / 4) * 100;
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const copyOrderId = () => {
    navigator.clipboard.writeText(trackingData.orderId);
    alert('Order ID copied to clipboard');
  };

  const contactDriver = () => {
    window.location.href = `tel:${trackingData.driver.phone}`;
  };

  const messageDriver = () => {
    alert('Messaging feature coming soon!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 -m-6 -mt-6 p-6 mb-6 rounded-b-2xl">
        <button
          onClick={() => navigate(-1)}
          className="text-white mb-4 flex items-center gap-2 hover:text-purple-200 transition-colors"
        >
          <FaArrowLeft size={18} />
          <span>Back to Orders</span>
        </button>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">Track Your Order</h1>
            <div className="flex items-center gap-2 text-purple-100">
              <span>Order #{trackingData.orderId}</span>
              <button onClick={copyOrderId} className="hover:text-white">
                <FaCopy size={14} />
              </button>
            </div>
          </div>
          <div className="text-right">
            <div className="text-white text-2xl font-bold">{trackingData.remainingTime}</div>
            <div className="text-purple-200 text-sm">Estimated arrival</div>
          </div>
        </div>
      </div>

      {/* Real-time Status Bar */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <FaSpinner className="text-green-600 text-xl animate-spin" />
            <div className="absolute inset-0 rounded-full animate-ping bg-green-400 opacity-75"></div>
          </div>
          <div>
            <p className="font-semibold text-green-800">{trackingData.statusText}</p>
            <p className="text-sm text-green-600">Last updated: {formatTime(currentTime)}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-green-700">Live tracking</p>
          <p className="text-xs text-green-600">Real-time updates</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Tracking Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Map Section */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-4 border-b">
              <h3 className="font-semibold text-gray-800">Live Location Tracking</h3>
              <p className="text-sm text-gray-500">Driver is {trackingData.driver.distance} away</p>
            </div>
            <div className="relative h-96 bg-gradient-to-br from-purple-100 to-indigo-100">
              {/* Mock Map */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🗺️</div>
                  <p className="text-gray-500">Interactive map would load here</p>
                  <p className="text-sm text-gray-400">Showing driver location and route</p>
                </div>
              </div>
              
              {/* Map Controls */}
              <div className="absolute bottom-4 right-4 space-y-2">
                <button className="bg-white p-2 rounded-lg shadow-md hover:shadow-lg">
                  <FaLocationArrow />
                </button>
                <button className="bg-white p-2 rounded-lg shadow-md hover:shadow-lg">
                  <span className="text-lg">+</span>
                </button>
                <button className="bg-white p-2 rounded-lg shadow-md hover:shadow-lg">
                  <span className="text-lg">-</span>
                </button>
              </div>
            </div>
            
            {/* Location Info */}
            <div className="p-4 border-t grid grid-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <MdRestaurant className="text-purple-600 mt-1" />
                <div>
                  <p className="text-xs text-gray-500">Restaurant</p>
                  <p className="font-medium text-sm">{trackingData.restaurant.name}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MdHome className="text-purple-600 mt-1" />
                <div>
                  <p className="text-xs text-gray-500">Your Location</p>
                  <p className="font-medium text-sm">{trackingData.customer.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-semibold text-gray-800 mb-6">Order Timeline</h3>
            <div className="relative">
              {/* Progress Bar */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
              <div 
                className="absolute left-6 top-0 w-0.5 bg-purple-600 transition-all duration-500"
                style={{ height: `${getProgressPercentage()}%` }}
              ></div>
              
              {/* Timeline Items */}
              <div className="space-y-6 relative">
                {trackingData.timeline.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center ${
                      item.completed ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-400'
                    }`}>
                      <span className="text-xl">{item.icon}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className={`font-semibold ${item.completed ? 'text-gray-800' : 'text-gray-400'}`}>
                            {item.status}
                          </p>
                          <p className="text-sm text-gray-500">{item.time}</p>
                        </div>
                        {item.completed && <FaCheckCircle className="text-green-500" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Driver & Order Info */}
        <div className="space-y-6">
          {/* Driver Card */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Your Driver</h3>
            <div className="text-center mb-4">
              <div className="text-6xl mb-2">{trackingData.driver.image}</div>
              <h4 className="font-bold text-gray-800">{trackingData.driver.name}</h4>
              <div className="flex items-center justify-center gap-1 mt-1">
                <FaStar className="text-yellow-500" />
                <span className="text-sm font-semibold">{trackingData.driver.rating}</span>
                <span className="text-xs text-gray-500">({trackingData.driver.totalDeliveries} deliveries)</span>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Vehicle:</span>
                <span className="font-medium">{trackingData.driver.vehicle}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Plate Number:</span>
                <span className="font-medium">{trackingData.driver.plateNumber}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Distance:</span>
                <span className="font-medium">{trackingData.driver.distance}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">ETA:</span>
                <span className="font-medium text-green-600">{trackingData.driver.eta}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={contactDriver}
                className="flex-1 bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
              >
                <FaPhone size={14} />
                Call
              </button>
              <button
                onClick={messageDriver}
                className="flex-1 border border-purple-600 text-purple-600 py-2 rounded-lg font-semibold hover:bg-purple-50 transition-colors flex items-center justify-center gap-2"
              >
                <FaComment size={14} />
                Message
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Order Summary</h3>
            <div className="space-y-3 mb-4">
              {trackingData.order.items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.quantity}x {item.name}</span>
                  <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t pt-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${trackingData.order.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span>${trackingData.order.deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span>${trackingData.order.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold mt-2 pt-2 border-t">
                  <span>Total</span>
                  <span className="text-purple-600">${trackingData.order.grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-3">
              <p className="text-xs text-gray-500 mb-1">Payment Method</p>
              <p className="text-sm font-medium">{trackingData.order.paymentMethod}</p>
            </div>
            
            {trackingData.order.specialInstructions && (
              <div className="border-t pt-3">
                <p className="text-xs text-gray-500 mb-1">Special Instructions</p>
                <p className="text-sm text-gray-700">{trackingData.order.specialInstructions}</p>
              </div>
            )}
          </div>

          {/* Need Help */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
            <h4 className="font-semibold text-gray-800 mb-2">Need Help?</h4>
            <p className="text-sm text-gray-600 mb-3">Contact our support team for assistance</p>
            <button className="w-full bg-white text-purple-600 py-2 rounded-lg font-semibold border border-purple-600 hover:bg-purple-50 transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </div>

      {/* Estimated Delivery Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 text-white text-center">
        <FaClock className="mx-auto text-3xl mb-2" />
        <h3 className="text-xl font-bold mb-1">Estimated Delivery Time</h3>
        <p className="text-3xl font-bold mb-2">{trackingData.estimatedDelivery}</p>
        <p className="text-purple-200">Your order is {trackingData.remainingTime} away</p>
      </div>

      {/* Share Tracking Link */}
      <div className="bg-white rounded-xl shadow-md p-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-800">Share Tracking Link</p>
          <p className="text-xs text-gray-500">Let others track your order</p>
        </div>
        <button className="bg-gray-100 text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
          Share Link
        </button>
      </div>
    </div>
  );
};

export default Tracking;