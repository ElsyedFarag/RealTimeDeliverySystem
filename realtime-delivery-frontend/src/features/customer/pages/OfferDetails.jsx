import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  FaTag, FaClock, FaCopy, FaGift, FaPercent, 
  FaFire, FaStar, FaCalendarAlt, FaArrowLeft,
  FaCheckCircle, FaTicketAlt, FaChartLine, FaShare,
  FaHeart, FaRegHeart, FaInfoCircle, FaShoppingBag,
  FaStore, FaUsers, FaAward, FaRocket
} from 'react-icons/fa';
import { MdLocalOffer, MdNewReleases, MdVerified, MdRestaurant } from 'react-icons/md';

const OfferDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [copiedCode, setCopiedCode] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  // Mock offer data based on id
  const getOfferData = (offerId) => {
    const offers = {
      1: {
        id: 1,
        title: '50% OFF on First Order',
        description: 'Get 50% off your first order when you spend $30 or more. This is a limited time offer for new customers.',
        longDescription: 'Welcome to QuickOrder! As a special thank you for joining us, we\'re offering an incredible 50% discount on your very first order. This offer is our way of introducing you to the amazing variety of restaurants and cuisines available on our platform. Whether you\'re craving pizza, sushi, burgers, or something exotic, this discount will make your first experience even more delightful.',
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
        usedCount: 1234,
        remainingUses: 8766,
        terms: [
          'Valid for first time users only',
          'Maximum discount $25',
          'Minimum order $30',
          'Cannot be combined with other offers',
          'Valid for one time use only'
        ],
        applicableRestaurants: ['All Restaurants'],
        excludedItems: ['Alcoholic beverages', 'Gift cards'],
        steps: [
          'Add items worth $30 or more to your cart',
          'Proceed to checkout',
          'Enter code WELCOME50 in the promo code field',
          'Discount will be applied automatically'
        ],
        tips: 'Order from featured restaurants to get the best value for your discount!'
      },
      2: {
        id: 2,
        title: 'Free Delivery',
        description: 'Free delivery on all orders above $20',
        longDescription: 'Tired of paying delivery fees? With our Free Delivery offer, you can enjoy your favorite meals without any additional delivery charges. Simply spend $20 or more and the delivery fee is on us! This offer is perfect for everyday orders and family meals.',
        code: 'FREESHIP',
        discount: 'Free Delivery',
        discountValue: 0,
        type: 'delivery',
        minSpend: 20,
        maxDiscount: null,
        validUntil: '2024-02-28',
        image: '🚚',
        bgColor: 'from-blue-500 to-cyan-500',
        isNew: false,
        isFeatured: true,
        usedCount: 3421,
        remainingUses: 6579,
        terms: [
          'Minimum order $20 required',
          'Valid for delivery only (not pickup)',
          'Cannot be combined with other offers',
          'Valid for all restaurants'
        ],
        applicableRestaurants: ['All Restaurants'],
        excludedItems: [],
        steps: [
          'Add items worth $20 or more to your cart',
          'Select delivery option at checkout',
          'Enter code FREESHIP',
          'Delivery fee will be waived'
        ],
        tips: 'Combine with restaurant specials for maximum savings!'
      },
      3: {
        id: 3,
        title: '20% Off on Sushi',
        description: 'Enjoy 20% off on all sushi items',
        longDescription: 'Sushi lovers, this one\'s for you! Get 20% off on all sushi items from participating Japanese restaurants. From classic California rolls to specialty dragon rolls, enjoy premium sushi at discounted prices.',
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
        usedCount: 892,
        remainingUses: 1108,
        terms: [
          'Valid only on sushi items',
          'Minimum order $25',
          'Maximum discount $15',
          'Excludes drinks and appetizers'
        ],
        applicableRestaurants: ['Sushi Master', 'Tokyo Sushi', 'Osaka Japanese'],
        excludedItems: ['Drinks', 'Appetizers', 'Desserts'],
        steps: [
          'Browse sushi items from participating restaurants',
          'Add at least $25 worth of sushi to cart',
          'Enter code SUSHI20 at checkout',
          'Enjoy 20% off your sushi order'
        ],
        tips: 'Try the Chef\'s Special roll for the best value!'
      }
    };
    return offers[offerId] || offers[1];
  };

  const offer = getOfferData(id);

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getDaysLeft = (dateString) => {
    const endDate = new Date(dateString);
    const today = new Date();
    const diffTime = endDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysLeft = getDaysLeft(offer.validUntil);
  const isExpiringSoon = daysLeft <= 3 && daysLeft > 0;

  const applyOffer = () => {
    copyToClipboard(offer.code);
    setTimeout(() => {
      navigate('/products');
    }, 1500);
  };

  const shareOffer = () => {
    if (navigator.share) {
      navigator.share({
        title: offer.title,
        text: `Check out this offer: ${offer.title}`,
        url: window.location.href,
      });
    } else {
      alert('Share this offer with your friends!');
    }
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors mb-4"
      >
        <FaArrowLeft size={16} />
        <span>Back to Offers</span>
      </button>

      {/* Main Offer Card */}
      <div className={`bg-gradient-to-r ${offer.bgColor} rounded-2xl shadow-xl overflow-hidden`}>
        <div className="p-6 md:p-8 text-white relative">
          {offer.isNew && (
            <div className="absolute top-4 right-4 bg-yellow-400 text-purple-900 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
              <MdNewReleases size={16} />
              New
            </div>
          )}
          
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="text-8xl md:text-9xl">{offer.image}</div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                {isExpiringSoon && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    🔥 {daysLeft} days left
                  </span>
                )}
                <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-sm">
                  {offer.type === 'percentage' && `${offer.discountValue}% OFF`}
                  {offer.type === 'delivery' && 'Free Delivery'}
                  {offer.type === 'fixed' && `$${offer.discountValue} OFF`}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-3">{offer.title}</h1>
              <p className="text-white/90 text-lg mb-4">{offer.description}</p>
              
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="bg-white/20 backdrop-blur rounded-lg px-4 py-2">
                  <code className="text-xl font-mono font-bold">{offer.code}</code>
                </div>
                <button
                  onClick={() => copyToClipboard(offer.code)}
                  className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
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
                <button
                  onClick={shareOffer}
                  className="bg-white/20 backdrop-blur px-6 py-2 rounded-lg font-semibold hover:bg-white/30 transition-all flex items-center gap-2"
                >
                  <FaShare />
                  Share
                </button>
                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className="bg-white/20 backdrop-blur px-6 py-2 rounded-lg font-semibold hover:bg-white/30 transition-all flex items-center gap-2"
                >
                  {isSaved ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
                  {isSaved ? 'Saved' : 'Save'}
                </button>
              </div>
              
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <FaCalendarAlt />
                  <span>Valid until: {formatDate(offer.validUntil)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaUsers />
                  <span>Used by {offer.usedCount}+ people</span>
                </div>
                {offer.remainingUses && (
                  <div className="flex items-center gap-2">
                    <FaChartLine />
                    <span>{offer.remainingUses} uses left</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Offer Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-md p-4 text-center">
          <div className="text-purple-600 text-2xl mb-2">💰</div>
          <div className="text-2xl font-bold text-gray-800">{offer.discount}</div>
          <div className="text-xs text-gray-500">Discount</div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 text-center">
          <div className="text-purple-600 text-2xl mb-2">🛒</div>
          <div className="text-2xl font-bold text-gray-800">${offer.minSpend}</div>
          <div className="text-xs text-gray-500">Min. Spend</div>
        </div>
        {offer.maxDiscount && (
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <div className="text-purple-600 text-2xl mb-2">🎯</div>
            <div className="text-2xl font-bold text-gray-800">${offer.maxDiscount}</div>
            <div className="text-xs text-gray-500">Max Discount</div>
          </div>
        )}
        <div className="bg-white rounded-xl shadow-md p-4 text-center">
          <div className="text-purple-600 text-2xl mb-2">⏰</div>
          <div className="text-2xl font-bold text-gray-800">{daysLeft}</div>
          <div className="text-xs text-gray-500">Days Left</div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Terms & Conditions */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FaInfoCircle className="text-purple-600" />
            Terms & Conditions
          </h3>
          <ul className="space-y-2">
            {offer.terms.map((term, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-600">
                <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" size={14} />
                <span className="text-sm">{term}</span>
              </li>
            ))}
          </ul>
          
          {offer.applicableRestaurants.length > 0 && offer.applicableRestaurants[0] !== 'All Restaurants' && (
            <div className="mt-4 pt-4 border-t">
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <MdRestaurant />
                Applicable Restaurants
              </h4>
              <div className="flex flex-wrap gap-2">
                {offer.applicableRestaurants.map((restaurant, index) => (
                  <span key={index} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                    {restaurant}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {offer.excludedItems.length > 0 && (
            <div className="mt-4 pt-4 border-t">
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <FaTag />
                Excluded Items
              </h4>
              <div className="flex flex-wrap gap-2">
                {offer.excludedItems.map((item, index) => (
                  <span key={index} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* How to Use */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FaRocket className="text-purple-600" />
            How to Use This Offer
          </h3>
          <div className="space-y-4">
            {offer.steps.map((step, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="bg-purple-100 text-purple-600 w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-gray-700">{step}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-purple-50 rounded-lg">
            <div className="flex items-start gap-2">
              <FaAward className="text-purple-600 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Pro Tip</h4>
                <p className="text-sm text-gray-600">{offer.tips}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={applyOffer}
          className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
        >
          <FaShoppingBag />
          Apply Offer & Start Shopping
        </button>
        <button
          onClick={() => navigate('/offers')}
          className="flex-1 border-2 border-purple-600 text-purple-600 py-4 rounded-xl font-bold text-lg hover:bg-purple-50 transition-all flex items-center justify-center gap-2"
        >
          <FaGift />
          Browse More Offers
        </button>
      </div>

      {/* Similar Offers */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">You Might Also Like</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-4 text-white cursor-pointer hover:shadow-lg transition-all">
            <div className="flex items-center gap-3">
              <div className="text-3xl">💰</div>
              <div>
                <p className="font-bold">$10 Off on $50</p>
                <p className="text-sm opacity-90">Code: SAVE10</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl p-4 text-white cursor-pointer hover:shadow-lg transition-all">
            <div className="flex items-center gap-3">
              <div className="text-3xl">🍕</div>
              <div>
                <p className="font-bold">Buy 1 Get 1 Free</p>
                <p className="text-sm opacity-90">Code: BOGOPIZZA</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl p-4 text-white cursor-pointer hover:shadow-lg transition-all">
            <div className="flex items-center gap-3">
              <div className="text-3xl">🎓</div>
              <div>
                <p className="font-bold">Student Discount</p>
                <p className="text-sm opacity-90">Code: STUDENT15</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-800 mb-1">Can I use multiple offers at once?</h4>
            <p className="text-sm text-gray-600">No, only one promo code can be applied per order. However, you can combine with restaurant specials.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-1">What if my order is cancelled?</h4>
            <p className="text-sm text-gray-600">If your order is cancelled, the promo code will still be valid for future use (if within validity period).</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-1">Is the discount applied before or after tax?</h4>
            <p className="text-sm text-gray-600">Discount is applied to the subtotal before tax and delivery fees.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferDetails;