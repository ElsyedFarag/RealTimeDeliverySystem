import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaStar, FaStarHalfAlt, FaRegStar, FaUser, FaClock, 
  FaThumbsUp, FaThumbsDown, FaFlag, FaShare, FaReply,
  FaCheckCircle, FaCamera, FaFilter, FaSearch, FaSort,
  FaEdit, FaTrash, FaHeart, FaRegHeart
} from 'react-icons/fa';
import { MdVerified, MdRestaurant } from 'react-icons/md';

const Reviews = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('my-reviews');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRating, setSelectedRating] = useState(0);
  const [sortBy, setSortBy] = useState('recent');
  const [showWriteReview, setShowWriteReview] = useState(false);
  
  // State for new review
  const [newReview, setNewReview] = useState({
    rating: 0,
    title: '',
    comment: '',
    images: []
  });

  // Mock data - User's reviews
  const myReviews = [
    {
      id: 1,
      productName: 'Margherita Pizza',
      restaurant: 'Pizza Palace',
      rating: 5,
      title: 'Best pizza in town!',
      comment: 'Absolutely delicious! The crust was perfectly crispy and the toppings were fresh. Will definitely order again.',
      date: '2024-01-15',
      likes: 24,
      dislikes: 2,
      images: ['🍕', '🍅'],
      isVerified: true,
      orderId: 'ORD-001',
      helpful: true
    },
    {
      id: 2,
      productName: 'Cheeseburger',
      restaurant: 'Burger King',
      rating: 4,
      title: 'Great burger, fast delivery',
      comment: 'Juicy burger with fresh ingredients. Delivery was super fast. Would recommend!',
      date: '2024-01-10',
      likes: 15,
      dislikes: 1,
      images: ['🍔'],
      isVerified: true,
      orderId: 'ORD-002',
      helpful: true
    },
    {
      id: 3,
      productName: 'California Roll',
      restaurant: 'Sushi Master',
      rating: 5,
      title: 'Authentic Japanese taste',
      comment: 'Very fresh and tasty. The sushi was prepared perfectly. Best sushi delivery in NYC!',
      date: '2024-01-05',
      likes: 32,
      dislikes: 0,
      images: ['🍣', '🥢'],
      isVerified: true,
      orderId: 'ORD-003',
      helpful: true
    }
  ];

  // Mock data - All reviews for products
  const allReviews = [
    {
      id: 101,
      productName: 'Margherita Pizza',
      restaurant: 'Pizza Palace',
      user: 'Sarah Johnson',
      userAvatar: '👩',
      rating: 5,
      title: 'Amazing pizza!',
      comment: 'The best Margherita pizza I\'ve ever had. The cheese is high quality and the sauce is perfect.',
      date: '2024-01-14',
      likes: 45,
      dislikes: 3,
      isVerified: true,
      helpfulCount: 38
    },
    {
      id: 102,
      productName: 'Cheeseburger',
      restaurant: 'Burger King',
      user: 'Mike Smith',
      userAvatar: '👨',
      rating: 4,
      title: 'Good value for money',
      comment: 'Tasty burger, good portion size. Fries could be crispier though.',
      date: '2024-01-12',
      likes: 28,
      dislikes: 5,
      isVerified: true,
      helpfulCount: 22
    },
    {
      id: 103,
      productName: 'Pepperoni Pizza',
      restaurant: 'Pizza Hut',
      user: 'Emily Brown',
      userAvatar: '👩',
      rating: 4.5,
      title: 'Quick delivery, great taste',
      comment: 'Pepperoni was spicy and delicious. Delivery was 15 minutes early!',
      date: '2024-01-11',
      likes: 52,
      dislikes: 2,
      isVerified: true,
      helpfulCount: 41
    },
    {
      id: 104,
      productName: 'Pasta Carbonara',
      restaurant: 'Italian Bistro',
      user: 'David Wilson',
      userAvatar: '👨',
      rating: 3,
      title: 'Decent but not great',
      comment: 'The pasta was okay but a bit too salty. Portion size was good.',
      date: '2024-01-09',
      likes: 12,
      dislikes: 8,
      isVerified: true,
      helpfulCount: 10
    },
    {
      id: 105,
      productName: 'Fried Chicken',
      restaurant: 'KFC',
      user: 'Lisa Anderson',
      userAvatar: '👩',
      rating: 5,
      title: 'Crispy and juicy!',
      comment: 'Best fried chicken delivery. Stayed crispy even after delivery. Highly recommend!',
      date: '2024-01-08',
      likes: 67,
      dislikes: 1,
      isVerified: true,
      helpfulCount: 59
    }
  ];

  // Pending reviews (orders waiting for review)
  const pendingReviews = [
    {
      id: 1,
      productName: 'Sushi Deluxe',
      restaurant: 'Tokyo Sushi',
      orderId: 'ORD-004',
      date: '2024-01-13',
      image: '🍱',
      price: 24.99
    },
    {
      id: 2,
      productName: 'BBQ Chicken Wings',
      restaurant: 'Wing Stop',
      orderId: 'ORD-005',
      date: '2024-01-12',
      image: '🍗',
      price: 12.99
    }
  ];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-500" />);
      } else if (hasHalfStar && i === fullStars + 1) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-500" />);
      }
    }
    return stars;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const handleRatingClick = (rating) => {
    setNewReview({ ...newReview, rating });
  };

  const submitReview = () => {
    if (newReview.rating === 0) {
      alert('Please select a rating');
      return;
    }
    if (!newReview.comment.trim()) {
      alert('Please write a review');
      return;
    }
    console.log('Review submitted:', newReview);
    alert('Thank you for your review!');
    setShowWriteReview(false);
    setNewReview({ rating: 0, title: '', comment: '', images: [] });
  };

  const handleLike = (reviewId) => {
    console.log('Liked review:', reviewId);
  };

  const handleReport = (reviewId) => {
    if (window.confirm('Report this review?')) {
      console.log('Reported review:', reviewId);
      alert('Review reported to admin');
    }
  };

  const deleteReview = (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      console.log('Deleted review:', reviewId);
      alert('Review deleted successfully');
    }
  };

  const editReview = (reviewId) => {
    console.log('Edit review:', reviewId);
    alert('Edit feature coming soon');
  };

  const getFilteredReviews = () => {
    let reviews = activeTab === 'my-reviews' ? myReviews : allReviews;
    
    if (searchTerm) {
      reviews = reviews.filter(r => 
        r.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.restaurant.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (r.title && r.title.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (selectedRating > 0) {
      reviews = reviews.filter(r => Math.floor(r.rating) === selectedRating);
    }
    
    if (sortBy === 'recent') {
      reviews.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === 'rating-high') {
      reviews.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'rating-low') {
      reviews.sort((a, b) => a.rating - b.rating);
    } else if (sortBy === 'helpful') {
      reviews.sort((a, b) => (b.likes || b.helpfulCount) - (a.likes || a.helpfulCount));
    }
    
    return reviews;
  };

  const filteredReviews = getFilteredReviews();

  // Statistics
  const avgRating = (myReviews.reduce((sum, r) => sum + r.rating, 0) / myReviews.length).toFixed(1);
  const ratingDistribution = {
    5: myReviews.filter(r => r.rating === 5).length,
    4: myReviews.filter(r => r.rating === 4).length,
    3: myReviews.filter(r => r.rating === 3).length,
    2: myReviews.filter(r => r.rating === 2).length,
    1: myReviews.filter(r => r.rating === 1).length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 -m-6 -mt-6 p-6 mb-6 rounded-b-2xl">
        <h1 className="text-3xl font-bold text-white mb-2">Reviews & Ratings</h1>
        <p className="text-purple-100">Share your experience and read what others say</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <div className="text-4xl font-bold text-purple-600">{avgRating}</div>
          <div className="flex justify-center my-2">{renderStars(parseFloat(avgRating))}</div>
          <p className="text-gray-600">Average Rating</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <div className="text-4xl font-bold text-purple-600">{myReviews.length}</div>
          <div className="text-gray-600 mt-2">Total Reviews</div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <div className="text-4xl font-bold text-purple-600">
            {myReviews.reduce((sum, r) => sum + (r.likes || 0), 0)}
          </div>
          <div className="text-gray-600 mt-2">Helpful Votes</div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <div className="text-4xl font-bold text-purple-600">{pendingReviews.length}</div>
          <div className="text-gray-600 mt-2">Pending Reviews</div>
        </div>
      </div>

      {/* Rating Distribution */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="font-semibold text-gray-800 mb-4">Rating Distribution</h3>
        <div className="space-y-2">
          {[5,4,3,2,1].map(star => (
            <div key={star} className="flex items-center gap-3">
              <div className="w-12 text-sm font-medium">{star} ★</div>
              <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-purple-600 rounded-full"
                  style={{ width: `${(ratingDistribution[star] / myReviews.length) * 100}%` }}
                ></div>
              </div>
              <div className="w-12 text-sm text-gray-500">{ratingDistribution[star]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs and Filters */}
      <div className="bg-white rounded-xl shadow-md">
        <div className="flex flex-wrap justify-between items-center p-4 border-b">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('my-reviews')}
              className={`px-4 py-2 font-semibold transition-colors ${
                activeTab === 'my-reviews'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              My Reviews ({myReviews.length})
            </button>
            <button
              onClick={() => setActiveTab('all-reviews')}
              className={`px-4 py-2 font-semibold transition-colors ${
                activeTab === 'all-reviews'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              All Reviews ({allReviews.length})
            </button>
            <button
              onClick={() => setActiveTab('pending')}
              className={`px-4 py-2 font-semibold transition-colors ${
                activeTab === 'pending'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Pending ({pendingReviews.length})
            </button>
          </div>
          
          <div className="flex gap-2 mt-2 sm:mt-0">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search reviews..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-3 py-1 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-2 py-1 border rounded-lg text-sm"
            >
              <option value="recent">Most Recent</option>
              <option value="rating-high">Highest Rated</option>
              <option value="rating-low">Lowest Rated</option>
              <option value="helpful">Most Helpful</option>
            </select>
          </div>
        </div>

        {/* Filter by rating */}
        <div className="px-4 py-2 border-b flex gap-2 overflow-x-auto">
          <button
            onClick={() => setSelectedRating(0)}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedRating === 0 ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {[5,4,3,2,1].map(rating => (
            <button
              key={rating}
              onClick={() => setSelectedRating(rating)}
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                selectedRating === rating ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {rating} ★
            </button>
          ))}
        </div>

        {/* Write Review Button */}
        {activeTab === 'pending' && pendingReviews.length > 0 && (
          <div className="p-4 border-b bg-yellow-50">
            <p className="text-sm text-yellow-800 mb-3">
              You have {pendingReviews.length} order{pendingReviews.length > 1 ? 's' : ''} waiting for your review
            </p>
            <button
              onClick={() => setShowWriteReview(true)}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 text-sm"
            >
              Write a Review
            </button>
          </div>
        )}

        {/* Write Review Modal */}
        {showWriteReview && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">Write a Review</h2>
                <button onClick={() => setShowWriteReview(false)} className="text-gray-400 hover:text-gray-600">
                  ✕
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(star => (
                      <button
                        key={star}
                        onClick={() => handleRatingClick(star)}
                        className="text-3xl focus:outline-none"
                      >
                        {star <= newReview.rating ? (
                          <FaStar className="text-yellow-500" />
                        ) : (
                          <FaRegStar className="text-yellow-500" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Review Title</label>
                  <input
                    type="text"
                    placeholder="Summarize your experience"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={newReview.title}
                    onChange={(e) => setNewReview({...newReview, title: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
                  <textarea
                    rows="4"
                    placeholder="Share your experience with this product..."
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={newReview.comment}
                    onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Add Photos (Optional)</label>
                  <div className="border-2 border-dashed rounded-lg p-4 text-center">
                    <FaCamera className="mx-auto text-gray-400 text-2xl mb-2" />
                    <p className="text-sm text-gray-500">Click to upload photos</p>
                  </div>
                </div>
              </div>
              <div className="p-6 border-t flex gap-3">
                <button
                  onClick={() => setShowWriteReview(false)}
                  className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={submitReview}
                  className="flex-1 bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700"
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reviews List */}
        <div className="p-6 space-y-6">
          {filteredReviews.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">No reviews yet</h3>
              <p className="text-gray-500">Be the first to write a review</p>
            </div>
          ) : (
            filteredReviews.map((review) => (
              <div key={review.id} className="border-b last:border-b-0 pb-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-800">{review.productName}</h3>
                      {review.isVerified && (
                        <span className="flex items-center gap-1 text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded">
                          <FaCheckCircle size={10} />
                          Verified
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{review.restaurant}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1">
                        {renderStars(review.rating)}
                      </div>
                      <span className="text-sm font-semibold">{review.rating}</span>
                    </div>
                  </div>
                  
                  {activeTab === 'my-reviews' && (
                    <div className="flex gap-2">
                      <button onClick={() => editReview(review.id)} className="text-purple-600 hover:text-purple-700">
                        <FaEdit size={16} />
                      </button>
                      <button onClick={() => deleteReview(review.id)} className="text-red-600 hover:text-red-700">
                        <FaTrash size={16} />
                      </button>
                    </div>
                  )}
                </div>

                <h4 className="font-semibold text-gray-800 mb-2">{review.title}</h4>
                <p className="text-gray-600 mb-3">{review.comment}</p>

                {review.images && review.images.length > 0 && (
                  <div className="flex gap-2 mb-3">
                    {review.images.map((img, idx) => (
                      <div key={idx} className="text-3xl bg-gray-100 p-2 rounded-lg">
                        {img}
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap justify-between items-center mt-3">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <FaUser size={12} />
                      <span>{review.user || 'You'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaClock size={12} />
                      <span>{formatDate(review.date)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-2 sm:mt-0">
                    <button
                      onClick={() => handleLike(review.id)}
                      className="flex items-center gap-1 text-sm text-gray-500 hover:text-purple-600"
                    >
                      <FaThumbsUp size={14} />
                      <span>Helpful ({review.likes || review.helpfulCount || 0})</span>
                    </button>
                    <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-purple-600">
                      <FaReply size={14} />
                      <span>Reply</span>
                    </button>
                    <button
                      onClick={() => handleReport(review.id)}
                      className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-600"
                    >
                      <FaFlag size={14} />
                      <span>Report</span>
                    </button>
                    <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-purple-600">
                      <FaShare size={14} />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Tips for Writing Reviews */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
        <h3 className="font-semibold text-gray-800 mb-3">Tips for Writing Great Reviews</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-start gap-2">
            <div className="text-2xl">📝</div>
            <div>
              <p className="font-medium text-sm">Be Specific</p>
              <p className="text-xs text-gray-500">Share details about what you liked or didn't like</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="text-2xl">📸</div>
            <div>
              <p className="font-medium text-sm">Add Photos</p>
              <p className="text-xs text-gray-500">Photos help others see the actual product</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="text-2xl">💝</div>
            <div>
              <p className="font-medium text-sm">Be Honest</p>
              <p className="text-xs text-gray-500">Your honest feedback helps everyone</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;