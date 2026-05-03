import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaTag, FaClock, FaCopy, FaGift, FaPercent, 
  FaFire, FaStar, FaCalendarAlt, FaArrowRight,
  FaCheckCircle, FaTicketAlt, FaChartLine
} from 'react-icons/fa';
import { MdLocalOffer, MdNewReleases, MdVerified } from 'react-icons/md';

const Offers = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [copiedCode, setCopiedCode] = useState(null);

  // Offers data
  const offers = [
    {
      id: 1,
      title: '50% OFF on First Order',
      description: 'Get 50% off your first order when you spend $30 or more',
      code: 'WELCOME50',
      discount: '50%',
      discountValue: 50,
      type: 'percentage',
      minSpend: 30,
      maxDiscount: 25,
      validUntil: '2024-02-15',
      image: '🎉',
      bgColor: 'from-pink-500 to-rose-500',
      isNew: true,
      isFeatured: true,
      categories: ['all', 'food'],
      usedCount: 1234,
      remainingUses: 8766,
      terms: 'Valid for first time users only. Maximum discount $25.'
    },
    {
      id: 2,
      title: 'Free Delivery',
      description: 'Free delivery on all orders above $20',
      code: 'FREESHIP',
      discount: 'Free',
      discountValue: 0,
      type: 'delivery',
      minSpend: 20,
      maxDiscount: null,
      validUntil: '2024-02-28',
      image: '🚚',
      bgColor: 'from-blue-500 to-cyan-500',
      isNew: false,
      isFeatured: true,
      categories: ['all', 'food', 'delivery'],
      usedCount: 3421,
      remainingUses: 6579,
      terms: 'Free delivery on orders over $20. Cannot be combined with other offers.'
    },
    {
      id: 3,
      title: '$10 Off on $50',
      description: 'Save $10 when you spend $50 or more',
      code: 'SAVE10',
      discount: '$10',
      discountValue: 10,
      type: 'fixed',
      minSpend: 50,
      maxDiscount: null,
      validUntil: '2024-02-20',
      image: '💰',
      bgColor: 'from-green-500 to-emerald-500',
      isNew: true,
      isFeatured: false,
      categories: ['all', 'food'],
      usedCount: 567,
      remainingUses: 9433,
      terms: 'Minimum order $50. Valid for one time use.'
    },
    {
      id: 4,
      title: '20% Off on Sushi',
      description: 'Enjoy 20% off on all sushi items',
      code: 'SUSHI20',
      discount: '20%',
      discountValue: 20,
      type: 'percentage',
      minSpend: 25,
      maxDiscount: 15,
      validUntil: '2024-02-25',
      image: '🍣',
      bgColor: 'from-orange-500 to-red-500',
      isNew: false,
      isFeatured: true,
      categories: ['all', 'sushi', 'japanese'],
      usedCount: 892,
      remainingUses: 1108,
      terms: 'Valid only on sushi items. Maximum discount $15.'
    },
    {
      id: 5,
      title: 'Buy 1 Get 1 Free',
      description: 'Buy any pizza and get another free',
      code: 'BOGOPIZZA',
      discount: 'BOGO',
      discountValue: 100,
      type: 'bogo',
      minSpend: 15,
      maxDiscount: null,
      validUntil: '2024-02-18',
      image: '🍕',
      bgColor: 'from-purple-500 to-indigo-500',
      isNew: true,
      isFeatured: true,
      categories: ['all', 'pizza', 'food'],
      usedCount: 234,
      remainingUses: 1766,
      terms: 'Buy any large pizza, get a medium pizza free. Limited time offer.'
    },
    {
      id: 6,
      title: 'Student Discount',
      description: '15% off for students with valid ID',
      code: 'STUDENT15',
      discount: '15%',
      discountValue: 15,
      type: 'percentage',
      minSpend: 15,
      maxDiscount: 20,
      validUntil: '2024-12-31',
      image: '🎓',
      bgColor: 'from-yellow-500 to-amber-500',
      isNew: false,
      isFeatured: false,
      categories: ['all', 'food'],
      usedCount: 4567,
      remainingUses: 5433,
      terms: 'Valid student ID required. Maximum discount $20.'
    },
    {
      id: 7,
      title: 'Weekend Special',
      description: 'Get 30% off on orders placed between 6 PM - 9 PM on weekends',
      code: 'WEEKEND30',
      discount: '30%',
      discountValue: 30,
      type: 'percentage',
      minSpend: 25,
      maxDiscount: 20,
      validUntil: '2024-03-01',
      image: '🌙',
      bgColor: 'from-indigo-500 to-purple-500',
      isNew: false,
      isFeatured: true,
      categories: ['all', 'food'],
      usedCount: 1234,
      remainingUses: 3766,
      terms: 'Valid on weekends only. Minimum order $25.'
    },
    {
      id: 8,
      title: 'Refer a Friend',
      description: 'Get $15 credit when you refer a friend',
      code: 'REFER15',
      discount: '$15',
      discountValue: 15,
      type: 'fixed',
      minSpend: 20,
      maxDiscount: null,
      validUntil: '2024-12-31',
      image: '👥',
      bgColor: 'from-teal-500 to-green-500',
      isNew: false,
      isFeatured: false,
      categories: ['all', 'referral'],
      usedCount: 8901,
      remainingUses: 1099,
      terms: 'Valid for both referrer and friend. Credits valid for 30 days.'
    }
  ];

  // Exclusive deals for specific restaurants
  const restaurantDeals = [
    {
      id: 1,
      restaurant: 'Pizza Palace',
      offer: 'Buy 1 Get 1 Free',
      code: 'PALACEBOGO',
      image: '🍕',
      bgColor: 'from-red-500 to-orange-500'
    },
    {
      id: 2,
      restaurant: 'Sushi Master',
      offer: '20% Off on all rolls',
      code: 'SUSHIMASTER',
      image: '🍣',
      bgColor: 'from-green-500 to-teal-500'
    },
    {
      id: 3,
      restaurant: 'Burger King',
      offer: 'Free Fries with any burger',
      code: 'BKFRIES',
      image: '🍔',
      bgColor: 'from-yellow-500 to-orange-500'
    }
  ];

  const getFilteredOffers = () => {
    let filtered = offers;
    
    if (activeTab === 'featured') {
      filtered = offers.filter(o => o.isFeatured);
    } else if (activeTab !== 'all') {
      filtered = offers.filter(o => o.categories.includes(activeTab));
    }
    
    return filtered;
  };

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getDaysLeft = (dateString) => {
    const endDate = new Date(dateString);
    const today = new Date();
    const diffTime = endDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getOfferTypeColor = (type) => {
    const colors = {
      percentage: 'bg-purple-100 text-purple-700',
      fixed: 'bg-green-100 text-green-700',
      delivery: 'bg-blue-100 text-blue-700',
      bogo: 'bg-pink-100 text-pink-700'
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
  };

  const getOfferTypeText = (type) => {
    const texts = {
      percentage: 'Percentage Off',
      fixed: 'Fixed Amount',
      delivery: 'Free Delivery',
      bogo: 'Buy One Get One'
    };
    return texts[type] || 'Special Offer';
  };

  const filteredOffers = getFilteredOffers();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 -m-6 -mt-6 p-6 mb-6 rounded-b-2xl">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Offers & Deals</h1>
            <p className="text-purple-100">Save big with exclusive coupons and discounts</p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-lg px-4 py-2 text-white">
            <div className="text-2xl font-bold">{offers.length}</div>
            <div className="text-xs">Active Offers</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-xl p-4 text-white">
          <div className="text-2xl mb-1">🎉</div>
          <div className="text-2xl font-bold">50% OFF</div>
          <div className="text-xs opacity-90">First Order</div>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-4 text-white">
          <div className="text-2xl mb-1">🚚</div>
          <div className="text-2xl font-bold">FREE</div>
          <div className="text-xs opacity-90">Delivery</div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-4 text-white">
          <div className="text-2xl mb-1">💰</div>
          <div className="text-2xl font-bold">$10 OFF</div>
          <div className="text-xs opacity-90">On $50+</div>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-4 text-white">
          <div className="text-2xl mb-1">🍕</div>
          <div className="text-2xl font-bold">BOGO</div>
          <div className="text-xs opacity-90">Buy 1 Get 1</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-md">
        <div className="flex overflow-x-auto border-b">
          {[
            { id: 'all', label: 'All Offers', icon: FaTag },
            { id: 'featured', label: 'Featured', icon: FaFire },
            { id: 'food', label: 'Food', icon: FaGift },
            { id: 'delivery', label: 'Delivery', icon: FaClock },
            { id: 'referral', label: 'Referral', icon: FaChartLine }
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

        {/* Offers Grid */}
        <div className="p-6">
          {filteredOffers.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🏷️</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">No offers available</h3>
              <p className="text-gray-500">Check back later for new deals!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredOffers.map((offer) => {
                const daysLeft = getDaysLeft(offer.validUntil);
                const isExpiringSoon = daysLeft <= 3 && daysLeft > 0;
                
                return (
                  <div
                    key={offer.id}
                    className={`bg-gradient-to-r ${offer.bgColor} rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:scale-[1.02] cursor-pointer`}
                    onClick={() => navigate(`/offers/${offer.id}`)}
                  >
                    <div className="p-6 text-white relative">
                      {offer.isNew && (
                        <div className="absolute top-4 right-4 bg-yellow-400 text-purple-900 px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                          <MdNewReleases size={12} />
                          New
                        </div>
                      )}
                      
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="text-5xl mb-3">{offer.image}</div>
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-2xl font-bold">{offer.title}</h3>
                            {daysLeft <= 7 && daysLeft > 0 && (
                              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                {daysLeft} days left
                              </span>
                            )}
                          </div>
                          <p className="text-white/90 text-sm mb-4">{offer.description}</p>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-sm">
                              Min spend: ${offer.minSpend}
                            </span>
                            <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-sm">
                              Valid until: {formatDate(offer.validUntil)}
                            </span>
                            {offer.remainingUses && (
                              <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-sm">
                                {offer.remainingUses} uses left
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className="bg-white/20 backdrop-blur rounded-lg px-4 py-2">
                              <code className="text-lg font-mono font-bold">{offer.code}</code>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                copyToClipboard(offer.code);
                              }}
                              className="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                            >
                              {copiedCode === offer.code ? (
                                <>
                                  <FaCheckCircle />
                                  Copied!
                                </>
                              ) : (
                                <>
                                  <FaCopy />
                                  Copy Code
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-4xl font-bold mb-2">{offer.discount}</div>
                          <div className={`text-xs px-2 py-1 rounded ${getOfferTypeColor(offer.type)} bg-white/90 backdrop-blur`}>
                            {getOfferTypeText(offer.type)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-white/20">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <FaCalendarAlt size={12} />
                            <span>{daysLeft > 0 ? `${daysLeft} days remaining` : 'Expired'}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span>Used by {offer.usedCount}+ people</span>
                            <FaArrowRight size={12} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Restaurant Exclusive Deals */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Restaurant Exclusive Deals</h2>
            <p className="text-sm text-gray-500">Special offers from your favorite restaurants</p>
          </div>
          <button className="text-purple-600 font-semibold hover:text-purple-700">
            View All →
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {restaurantDeals.map((deal) => (
            <div
              key={deal.id}
              className={`bg-gradient-to-r ${deal.bgColor} rounded-xl p-4 text-white cursor-pointer hover:shadow-lg transition-all`}
              onClick={() => navigate(`/restaurant/${deal.id}`)}
            >
              <div className="flex items-center gap-3">
                <div className="text-4xl">{deal.image}</div>
                <div className="flex-1">
                  <h3 className="font-bold">{deal.restaurant}</h3>
                  <p className="text-sm opacity-90">{deal.offer}</p>
                  <div className="mt-2 text-xs bg-white/20 inline-block px-2 py-1 rounded">
                    Code: {deal.code}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
        <h3 className="font-semibold text-gray-800 mb-4 text-center">How to Use Offers</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">1️⃣</span>
            </div>
            <p className="font-medium">Find an Offer</p>
            <p className="text-sm text-gray-500">Browse through our latest deals</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">2️⃣</span>
            </div>
            <p className="font-medium">Copy Code</p>
            <p className="text-sm text-gray-500">Click copy to save the promo code</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">3️⃣</span>
            </div>
            <p className="font-medium">Apply at Checkout</p>
            <p className="text-sm text-gray-500">Paste code when placing your order</p>
          </div>
        </div>
      </div>

      {/* Referral Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 text-white text-center">
        <FaGift className="text-4xl mx-auto mb-3" />
        <h3 className="text-2xl font-bold mb-2">Invite Friends, Get $15</h3>
        <p className="text-purple-100 mb-4">Share your unique referral code and earn credits for every friend who joins</p>
        <div className="flex items-center justify-center gap-3">
          <div className="bg-white/20 backdrop-blur rounded-lg px-6 py-2">
            <code className="text-lg font-mono">FRIEND2024</code>
          </div>
          <button className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all">
            Invite Now
          </button>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-white rounded-xl shadow-md p-6 text-center">
        <h3 className="font-semibold text-gray-800 mb-2">Never Miss a Deal!</h3>
        <p className="text-sm text-gray-500 mb-4">Subscribe to get exclusive offers and early access to sales</p>
        <div className="flex max-w-md mx-auto gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Offers;