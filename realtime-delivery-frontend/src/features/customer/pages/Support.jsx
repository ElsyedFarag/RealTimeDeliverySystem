import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaHeadphones, FaEnvelope, FaPhone, FaComment, 
  FaWhatsapp, FaFacebookMessenger, FaTwitter,
  FaQuestionCircle, FaFileAlt, FaTicketAlt,
  FaClock, FaCheckCircle, FaStar, FaSearch,
  FaArrowRight, FaPaperPlane, FaUserCircle,
  FaPaperclip, FaSmile, FaShieldAlt, FaTruck,
  FaCreditCard, FaUser, FaShoppingBag, FaMapMarkerAlt
} from 'react-icons/fa';
import { MdLiveHelp, MdEmail, MdChat, MdVerified } from 'react-icons/md';

const Support = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { id: 1, type: 'bot', message: 'Hello! How can I help you today?', time: '10:30 AM' }
  ]);

  // FAQ Categories
  const categories = [
    { id: 'all', name: 'All', icon: FaQuestionCircle, count: 24 },
    { id: 'orders', name: 'Orders', icon: FaShoppingBag, count: 8 },
    { id: 'delivery', name: 'Delivery', icon: FaTruck, count: 6 },
    { id: 'payments', name: 'Payments', icon: FaCreditCard, count: 5 },
    { id: 'account', name: 'Account', icon: FaUser, count: 3 },
    { id: 'returns', name: 'Returns', icon: FaShieldAlt, count: 2 }
  ];

  // FAQs Data
  const faqs = [
    {
      id: 1,
      category: 'orders',
      question: 'How do I track my order?',
      answer: 'You can track your order in real-time by going to "My Orders" section and clicking on "Track Order" button. You will see the live location of your delivery driver and estimated arrival time.',
      helpful: 234
    },
    {
      id: 2,
      category: 'orders',
      question: 'Can I cancel my order?',
      answer: 'Orders can be cancelled within 5 minutes of placing them. Go to "My Orders" and click "Cancel Order". If the restaurant has already started preparing, cancellation may not be possible.',
      helpful: 189
    },
    {
      id: 3,
      category: 'orders',
      question: 'How do I modify my order?',
      answer: 'To modify your order, you need to cancel it within the cancellation window and place a new order. Contact support if you need assistance with modifications.',
      helpful: 156
    },
    {
      id: 4,
      category: 'delivery',
      question: 'How long does delivery take?',
      answer: 'Delivery typically takes 25-45 minutes depending on your location and restaurant preparation time. You can see real-time tracking once your order is confirmed.',
      helpful: 342
    },
    {
      id: 5,
      category: 'delivery',
      question: 'Is there free delivery?',
      answer: 'Yes! We offer free delivery on orders over $20. Some restaurants may also have their own free delivery promotions.',
      helpful: 278
    },
    {
      id: 6,
      category: 'payments',
      question: 'What payment methods are accepted?',
      answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, Google Pay, and cash on delivery in select areas.',
      helpful: 423
    },
    {
      id: 7,
      category: 'payments',
      question: 'Is my payment information secure?',
      answer: 'Yes, we use industry-standard SSL encryption and never store your full payment details. All transactions are processed securely.',
      helpful: 267
    },
    {
      id: 8,
      category: 'account',
      question: 'How do I reset my password?',
      answer: 'Click on "Forgot Password" on the login page. You will receive an email with instructions to reset your password.',
      helpful: 198
    },
    {
      id: 9,
      category: 'account',
      question: 'How can I change my email address?',
      answer: 'Go to Profile Settings > Account Information > Edit Email. You will need to verify the new email address.',
      helpful: 134
    },
    {
      id: 10,
      category: 'returns',
      question: 'What is your refund policy?',
      answer: 'If there is an issue with your order, contact us within 24 hours. We offer full refunds for incorrect or missing items, and partial refunds for quality issues.',
      helpful: 245
    },
    {
      id: 11,
      category: 'returns',
      question: 'How do I report a problem with my order?',
      answer: 'Go to "My Orders", select the order, and click "Report Problem". You can also contact our support team directly via chat or phone.',
      helpful: 167
    },
    {
      id: 12,
      category: 'delivery',
      question: 'Can I change my delivery address after ordering?',
      answer: 'Address changes are only possible if the order has not been confirmed by the restaurant. Contact support immediately if you need to change your address.',
      helpful: 123
    }
  ];

  // Support Tickets
  const supportTickets = [
    { id: 'TKT-001', subject: 'Late Delivery', status: 'resolved', date: '2024-01-10' },
    { id: 'TKT-002', subject: 'Wrong Item Received', status: 'in-progress', date: '2024-01-12' },
    { id: 'TKT-003', subject: 'Payment Issue', status: 'open', date: '2024-01-14' }
  ];

  const getFilteredFAQs = () => {
    let filtered = faqs;
    
    if (activeCategory !== 'all') {
      filtered = filtered.filter(f => f.category === activeCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(f => 
        f.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.answer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  const filteredFAQs = getFilteredFAQs();

  const sendMessage = () => {
    if (!chatMessage.trim()) return;
    
    setChatMessages([
      ...chatMessages,
      { id: Date.now(), type: 'user', message: chatMessage, time: new Date().toLocaleTimeString() }
    ]);
    
    // Simulate bot response
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        id: Date.now(),
        type: 'bot',
        message: 'Thank you for your message. A support agent will respond shortly. In the meantime, you might find the answer in our FAQ section.',
        time: new Date().toLocaleTimeString()
      }]);
    }, 1000);
    
    setChatMessage('');
  };

  const markHelpful = (faqId) => {
    console.log('Marked helpful:', faqId);
  };

  const createTicket = () => {
    navigate('/support/ticket/new');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 -m-6 -mt-6 p-6 mb-6 rounded-b-2xl">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Customer Support</h1>
            <p className="text-purple-100">We're here to help 24/7</p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-lg px-4 py-2 text-white text-center">
            <div className="text-2xl font-bold">24/7</div>
            <div className="text-xs">Support</div>
          </div>
        </div>
      </div>

      {/* Contact Options */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg transition-all cursor-pointer">
          <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
            <FaComment className="text-purple-600 text-xl" />
          </div>
          <h3 className="font-semibold text-gray-800">Live Chat</h3>
          <p className="text-xs text-gray-500">Response in &lt; 2 min</p>
          <button 
            onClick={() => setShowChat(true)}
            className="mt-2 text-purple-600 text-sm font-semibold"
          >
            Start Chat →
          </button>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg transition-all cursor-pointer">
          <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
            <FaWhatsapp className="text-blue-600 text-2xl" />
          </div>
          <h3 className="font-semibold text-gray-800">WhatsApp</h3>
          <p className="text-xs text-gray-500">+1 (555) 123-4567</p>
          <button className="mt-2 text-blue-600 text-sm font-semibold">
            Message Us →
          </button>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg transition-all cursor-pointer">
          <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
            <FaPhone className="text-green-600 text-xl" />
          </div>
          <h3 className="font-semibold text-gray-800">Call Us</h3>
          <p className="text-xs text-gray-500">24/7 Hotline</p>
          <a href="tel:+15551234567" className="mt-2 text-green-600 text-sm font-semibold block">
            Call Now →
          </a>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg transition-all cursor-pointer">
          <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
            <FaEnvelope className="text-red-600 text-xl" />
          </div>
          <h3 className="font-semibold text-gray-800">Email</h3>
          <p className="text-xs text-gray-500">Reply in &lt; 24 hours</p>
          <button className="mt-2 text-red-600 text-sm font-semibold">
            Send Email →
          </button>
        </div>
      </div>

      {/* Live Chat Modal */}
      {showChat && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-md h-[500px] flex flex-col">
            <div className="p-4 border-b bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-t-xl flex justify-between items-center">
              <div className="flex items-center gap-2">
                <FaHeadphones />
                <h3 className="font-semibold">Live Support</h3>
              </div>
              <button onClick={() => setShowChat(false)} className="text-white">✕</button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.map(msg => (
                <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg ${
                    msg.type === 'user' 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    <p className="text-sm">{msg.message}</p>
                    <p className={`text-xs mt-1 ${msg.type === 'user' ? 'text-purple-200' : 'text-gray-400'}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  onClick={sendMessage}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                >
                  <FaPaperPlane />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search FAQ */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">How can we help you?</h2>
          <p className="text-gray-500">Search for answers or browse topics below</p>
        </div>
        <div className="relative max-w-2xl mx-auto">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search for questions, topics, or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      {/* FAQ Categories */}
      <div className="flex overflow-x-auto gap-2 pb-2">
        {categories.map(cat => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon size={18} />
              <span>{cat.name}</span>
              <span className={`text-xs ${activeCategory === cat.id ? 'text-purple-200' : 'text-gray-400'}`}>
                ({cat.count})
              </span>
            </button>
          );
        })}
      </div>

      {/* FAQs List */}
      <div className="bg-white rounded-xl shadow-md">
        <div className="p-6 space-y-4">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">No results found</h3>
              <p className="text-gray-500">Try different keywords or contact our support team</p>
            </div>
          ) : (
            filteredFAQs.map((faq, index) => (
              <div key={faq.id} className={`pb-4 ${index !== filteredFAQs.length - 1 ? 'border-b' : ''}`}>
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none">
                    <div className="flex-1 pr-4">
                      <h3 className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
                        {faq.question}
                      </h3>
                    </div>
                    <div className="text-purple-600 group-open:rotate-180 transition-transform">
                      <FaArrowRight />
                    </div>
                  </summary>
                  <div className="mt-3 pl-0">
                    <p className="text-gray-600 mb-3">{faq.answer}</p>
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => markHelpful(faq.id)}
                        className="flex items-center gap-1 text-sm text-gray-500 hover:text-green-600"
                      >
                        <FaCheckCircle />
                        Helpful ({faq.helpful})
                      </button>
                      <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-purple-600">
                        <FaStar />
                        Give Feedback
                      </button>
                    </div>
                  </div>
                </details>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Support Tickets */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">Your Support Tickets</h3>
          <button 
            onClick={createTicket}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 text-sm flex items-center gap-2"
          >
            <FaTicketAlt size={14} />
            New Ticket
          </button>
        </div>
        
        {supportTickets.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No support tickets yet</p>
        ) : (
          <div className="space-y-3">
            {supportTickets.map(ticket => (
              <div key={ticket.id} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div>
                  <p className="font-semibold text-gray-800">#{ticket.id}</p>
                  <p className="text-sm text-gray-600">{ticket.subject}</p>
                  <p className="text-xs text-gray-400">{ticket.date}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                    ticket.status === 'resolved' ? 'bg-green-100 text-green-700' :
                    ticket.status === 'in-progress' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {ticket.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-4 text-white">
          <h4 className="font-semibold mb-1">Report a Problem</h4>
          <p className="text-sm opacity-90 mb-3">Issue with your recent order?</p>
          <button className="bg-white text-blue-600 px-4 py-1 rounded-lg text-sm font-semibold">
            Report Now
          </button>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-4 text-white">
          <h4 className="font-semibold mb-1">Provide Feedback</h4>
          <p className="text-sm opacity-90 mb-3">Help us improve our service</p>
          <button className="bg-white text-green-600 px-4 py-1 rounded-lg text-sm font-semibold">
            Give Feedback
          </button>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-4 text-white">
          <h4 className="font-semibold mb-1">Request Feature</h4>
          <p className="text-sm opacity-90 mb-3">Suggest new features or improvements</p>
          <button className="bg-white text-orange-600 px-4 py-1 rounded-lg text-sm font-semibold">
            Request Feature
          </button>
        </div>
      </div>

      {/* Business Hours */}
      <div className="bg-gray-50 rounded-xl p-6 text-center">
        <FaClock className="text-purple-600 text-2xl mx-auto mb-2" />
        <h3 className="font-semibold text-gray-800 mb-1">24/7 Customer Support</h3>
        <p className="text-sm text-gray-600">
          Live chat and phone support available 24 hours a day, 7 days a week
        </p>
        <p className="text-xs text-gray-500 mt-2">
          Email response within 24 hours | Average wait time: &lt; 2 minutes
        </p>
      </div>
    </div>
  );
};

export default Support;