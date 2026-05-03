import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTruck,
  FaClock,
  FaMapMarkerAlt,
  FaStar,
  FaCreditCard,
  FaHeadphones,
  FaHamburger,
  FaPizzaSlice,
  FaFish,
} from "react-icons/fa";
import { MdFastfood } from "react-icons/md";

const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    { icon: FaTruck, title: "Fast Delivery", desc: "30-45 min delivery time" },
    {
      icon: FaClock,
      title: "Real-time Tracking",
      desc: "Track your order live",
    },
    {
      icon: FaCreditCard,
      title: "Secure Payment",
      desc: "Multiple payment options",
    },
    { icon: FaHeadphones, title: "24/7 Support", desc: "Always here to help" },
  ];

  const popularItems = [
    {
      id: 1,
      name: "Margherita Pizza",
      price: "$12.99",
      rating: 4.8,
      icon: FaPizzaSlice,
      time: "25-30 min",
    },
    {
      id: 2,
      name: "Cheeseburger",
      price: "$9.99",
      rating: 4.6,
      icon: FaHamburger,
      time: "15-20 min",
    },
    {
      id: 3,
      name: "Grilled Fish",
      price: "$15.99",
      rating: 4.9,
      icon: FaFish,
      time: "20-25 min",
    },
    {
      id: 4,
      name: "Fast Food Combo",
      price: "$13.99",
      rating: 4.7,
      icon: MdFastfood,
      time: "20-25 min",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full">
          <FaTruck size={18} />
          <span className="text-sm font-semibold">
            Free Delivery on Orders over $20
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Delicious Food,
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
            {" "}
            Delivered Fast
          </span>
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Order from the best restaurants in town and get real-time updates on
          your delivery
        </p>

        <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mt-6">
          <div className="flex-1 relative">
            <FaMapMarkerAlt
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Enter your delivery address"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            onClick={() => navigate("/menu")}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
          >
            Find Food
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all text-center group"
            >
              <div className="bg-purple-100 text-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Icon size={28} />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-500">{feature.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Popular Items */}
      <div className="mt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Popular Near You</h2>
          <button
            onClick={() => navigate("/products")}
            className="text-purple-600 font-semibold hover:text-purple-700"
          >
            View All →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all cursor-pointer"
              >
                <div className="h-48 bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center">
                  <Icon size={80} className="text-purple-600" />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-800 text-lg">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded-lg">
                      <FaStar size={14} className="text-yellow-500" />
                      <span className="text-sm font-semibold">
                        {item.rating}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-2xl font-bold text-purple-600">
                      {item.price}
                    </span>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <FaClock size={14} />
                      <span>{item.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Order?</h2>
        <p className="text-purple-100 mb-6">
          Get your favorite food delivered right to your doorstep
        </p>
        <button className="bg-white text-purple-600 px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all">
          Start Ordering Now
        </button>
      </div>
    </div>
  );
};

export default HomePage;
