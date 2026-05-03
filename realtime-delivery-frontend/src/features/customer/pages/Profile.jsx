import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit, 
  FaSave, FaTimes, FaCamera, FaCreditCard, FaHeart, 
  FaShoppingBag, FaClock, FaStar, FaSignOutAlt,
  FaChevronRight, FaLock, FaBell, FaLanguage, FaMoon,
  FaGlobe, FaAddressCard, FaHistory
} from 'react-icons/fa';
import { MdVerified, MdPayment, MdLocationOn } from 'react-icons/md';

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  
  // User data
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    joinDate: 'January 2024',
    avatar: '👨',
    isVerified: true,
    memberSince: '2024-01-15',
    totalOrders: 47,
    totalSpent: 1247.50,
    averageRating: 4.8
  });

  // Addresses
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'Home',
      address: '123 Main Street, Apt 4B',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      isDefault: true,
      phone: '+1 (555) 123-4567'
    },
    {
      id: 2,
      type: 'Work',
      address: '456 Business Ave, Floor 12',
      city: 'New York',
      state: 'NY',
      zipCode: '10018',
      isDefault: false,
      phone: '+1 (555) 987-6543'
    }
  ]);

  // Payment Methods
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'Visa',
      last4: '4242',
      expiryDate: '12/25',
      isDefault: true,
      cardholderName: 'John Doe'
    },
    {
      id: 2,
      type: 'Mastercard',
      last4: '5555',
      expiryDate: '08/26',
      isDefault: false,
      cardholderName: 'John Doe'
    }
  ]);

  // Wishlist
  const wishlist = [
    { id: 1, name: 'Margherita Pizza', restaurant: 'Pizza Palace', price: 12.99, image: '🍕' },
    { id: 2, name: 'Cheeseburger', restaurant: 'Burger King', price: 9.99, image: '🍔' },
    { id: 3, name: 'California Roll', restaurant: 'Sushi Master', price: 15.99, image: '🍣' }
  ];

  // Recent Orders
  const recentOrders = [
    { id: 'ORD-001', date: '2024-01-15', restaurant: 'Pizza Palace', total: 30.97, status: 'delivered' },
    { id: 'ORD-002', date: '2024-01-14', restaurant: 'Burger King', total: 22.97, status: 'delivered' },
    { id: 'ORD-003', date: '2024-01-13', restaurant: 'Sushi Master', total: 35.97, status: 'delivered' }
  ];

  // Settings
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    darkMode: false,
    language: 'English',
    currency: 'USD ($)'
  });

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      navigate('/login');
    }
  };

  const setDefaultAddress = (id) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
    alert('Default address updated');
  };

  const setDefaultPayment = (id) => {
    setPaymentMethods(paymentMethods.map(pm => ({
      ...pm,
      isDefault: pm.id === id
    })));
    alert('Default payment method updated');
  };

  const removeFromWishlist = (id) => {
    if (window.confirm('Remove from wishlist?')) {
      // Remove logic here
      alert('Removed from wishlist');
    }
  };

  const addToCart = (item) => {
    alert(`${item.name} added to cart!`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 -m-6 -mt-6 p-6 mb-6 rounded-b-2xl">
        <h1 className="text-3xl font-bold text-white mb-2">My Profile</h1>
        <p className="text-purple-100">Manage your account and preferences</p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="relative inline-block">
              <div className="text-7xl mb-3">{userData.avatar}</div>
              <button className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition-colors">
                <FaCamera size={12} />
              </button>
            </div>
            <div className="flex items-center justify-center gap-2">
              <h2 className="text-xl font-bold text-gray-800">{userData.name}</h2>
              {userData.isVerified && <MdVerified className="text-blue-500" />}
            </div>
            <p className="text-gray-500 text-sm mb-2">{userData.email}</p>
            <p className="text-gray-500 text-sm mb-4">{userData.phone}</p>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <p className="text-2xl font-bold text-purple-600">{userData.totalOrders}</p>
                <p className="text-xs text-gray-500">Total Orders</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">${userData.totalSpent}</p>
                <p className="text-xs text-gray-500">Total Spent</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Member since</span>
                <span className="font-medium">{userData.joinDate}</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="text-gray-500">Average rating</span>
                <div className="flex items-center gap-1">
                  <FaStar className="text-yellow-500" size={14} />
                  <span className="font-medium">{userData.averageRating}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <FaHeart className="text-purple-600" />
                  </div>
                  <span className="text-gray-600">Wishlist Items</span>
                </div>
                <span className="font-bold">{wishlist.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <FaShoppingBag className="text-green-600" />
                  </div>
                  <span className="text-gray-600">Saved Addresses</span>
                </div>
                <span className="font-bold">{addresses.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <MdPayment className="text-blue-600" />
                  </div>
                  <span className="text-gray-600">Payment Methods</span>
                </div>
                <span className="font-bold">{paymentMethods.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-md">
            <div className="flex overflow-x-auto border-b">
              {[
                { id: 'profile', label: 'Profile Info', icon: FaUser },
                { id: 'addresses', label: 'Addresses', icon: MdLocationOn },
                { id: 'payments', label: 'Payments', icon: MdPayment },
                { id: 'wishlist', label: 'Wishlist', icon: FaHeart },
                { id: 'settings', label: 'Settings', icon: FaBell }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'text-purple-600 border-b-2 border-purple-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon size={16} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            <div className="p-6">
              {/* Profile Info Tab */}
              {activeTab === 'profile' && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">Personal Information</h3>
                    <button
                      onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                      className="flex items-center gap-2 text-purple-600 hover:text-purple-700"
                    >
                      {isEditing ? <FaSave /> : <FaEdit />}
                      <span>{isEditing ? 'Save' : 'Edit'}</span>
                    </button>
                  </div>

                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={userData.name}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={userData.email}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={userData.phone}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-32 text-gray-500">Full Name:</div>
                        <div className="font-medium">{userData.name}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-32 text-gray-500">Email:</div>
                        <div className="font-medium">{userData.email}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-32 text-gray-500">Phone:</div>
                        <div className="font-medium">{userData.phone}</div>
                      </div>
                    </div>
                  )}

                  <div className="mt-6 pt-6 border-t">
                    <button className="text-red-600 hover:text-red-700 flex items-center gap-2">
                      <FaLock size={16} />
                      Change Password
                    </button>
                  </div>
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === 'addresses' && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">Saved Addresses</h3>
                    <button className="text-purple-600 hover:text-purple-700 flex items-center gap-2">
                      <span>+</span> Add New Address
                    </button>
                  </div>
                  <div className="space-y-4">
                    {addresses.map(addr => (
                      <div key={addr.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-gray-800">{addr.type}</h4>
                            {addr.isDefault && (
                              <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">Default</span>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <button className="text-purple-600 hover:text-purple-700">
                              <FaEdit size={14} />
                            </button>
                            <button className="text-red-600 hover:text-red-700">
                              <FaTimes size={14} />
                            </button>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm">{addr.address}</p>
                        <p className="text-gray-600 text-sm">{addr.city}, {addr.state} {addr.zipCode}</p>
                        <p className="text-gray-600 text-sm">{addr.phone}</p>
                        {!addr.isDefault && (
                          <button
                            onClick={() => setDefaultAddress(addr.id)}
                            className="mt-2 text-sm text-purple-600 hover:text-purple-700"
                          >
                            Set as Default
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Payments Tab */}
              {activeTab === 'payments' && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">Payment Methods</h3>
                    <button className="text-purple-600 hover:text-purple-700 flex items-center gap-2">
                      <span>+</span> Add Payment Method
                    </button>
                  </div>
                  <div className="space-y-4">
                    {paymentMethods.map(pm => (
                      <div key={pm.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <div className="text-2xl">💳</div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold text-gray-800">{pm.type} •••• {pm.last4}</h4>
                                {pm.isDefault && (
                                  <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">Default</span>
                                )}
                              </div>
                              <p className="text-sm text-gray-500">Expires {pm.expiryDate}</p>
                              <p className="text-sm text-gray-500">{pm.cardholderName}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button className="text-purple-600 hover:text-purple-700">
                              <FaEdit size={14} />
                            </button>
                            <button className="text-red-600 hover:text-red-700">
                              <FaTimes size={14} />
                            </button>
                          </div>
                        </div>
                        {!pm.isDefault && (
                          <button
                            onClick={() => setDefaultPayment(pm.id)}
                            className="mt-2 text-sm text-purple-600 hover:text-purple-700"
                          >
                            Set as Default
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Wishlist Tab */}
              {activeTab === 'wishlist' && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">My Wishlist ({wishlist.length})</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {wishlist.map(item => (
                      <div key={item.id} className="border rounded-lg p-3 flex items-center gap-3 hover:shadow-md transition-shadow">
                        <div className="text-4xl">{item.image}</div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800">{item.name}</h4>
                          <p className="text-sm text-gray-500">{item.restaurant}</p>
                          <p className="text-purple-600 font-bold mt-1">${item.price}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => addToCart(item)}
                            className="bg-purple-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-purple-700"
                          >
                            Add to Cart
                          </button>
                          <button
                            onClick={() => removeFromWishlist(item.id)}
                            className="text-red-600 text-sm hover:text-red-700"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <p className="font-medium text-gray-800">Email Notifications</p>
                        <p className="text-sm text-gray-500">Receive order updates via email</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={settings.emailNotifications} />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <p className="font-medium text-gray-800">Push Notifications</p>
                        <p className="text-sm text-gray-500">Get real-time alerts on your device</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={settings.pushNotifications} />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <p className="font-medium text-gray-800">Language</p>
                        <p className="text-sm text-gray-500">Choose your preferred language</p>
                      </div>
                      <select className="border rounded-lg px-3 py-1">
                        <option>English</option>
                        <option>Arabic</option>
                        <option>Spanish</option>
                        <option>French</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <p className="font-medium text-gray-800">Currency</p>
                        <p className="text-sm text-gray-500">Select your currency</p>
                      </div>
                      <select className="border rounded-lg px-3 py-1">
                        <option>USD ($)</option>
                        <option>EUR (€)</option>
                        <option>GBP (£)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-800">Recent Orders</h3>
              <button onClick={() => navigate('/orders')} className="text-purple-600 text-sm hover:text-purple-700">
                View All →
              </button>
            </div>
            <div className="space-y-3">
              {recentOrders.map(order => (
                <div key={order.id} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div>
                    <p className="font-medium text-gray-800">{order.restaurant}</p>
                    <p className="text-sm text-gray-500">Order #{order.id}</p>
                    <p className="text-xs text-gray-400">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-purple-600">${order.total}</p>
                    <p className="text-xs text-green-600">{order.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;