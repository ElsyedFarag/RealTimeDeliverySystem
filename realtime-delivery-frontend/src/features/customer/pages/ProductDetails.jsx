import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaStar,
  FaClock,
  FaMapMarkerAlt,
  FaShoppingCart,
  FaHeart,
  FaRegHeart,
  FaMinus,
  FaPlus,
  FaCreditCard,
  FaTruck,
  FaShieldAlt,
  FaStore,
  FaPhone,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaChevronLeft,
  FaCheckCircle,
} from "react-icons/fa";
import { MdDeliveryDining, MdPayment, MdVerified } from "react-icons/md";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("medium");
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState("details");

  // Mock product data
  const product = {
    id: parseInt(id) || 1,
    name: "Margherita Pizza",
    restaurant: "Pizza Palace",
    rating: 4.8,
    reviews: 234,
    price: 12.99,
    originalPrice: 15.99,
    description:
      "Fresh mozzarella, tomato sauce, basil, and extra virgin olive oil on a crispy thin crust. A classic Italian pizza that never disappoints.",
    longDescription:
      "Our signature Margherita Pizza is made with the finest ingredients imported from Italy. The dough is hand-tossed and baked in a wood-fired oven to achieve the perfect crispy crust. Topped with San Marzano tomatoes, fresh buffalo mozzarella, fragrant basil leaves, and a drizzle of extra virgin olive oil.",
    image: "🍕",
    coverImage:
      "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=800",
    category: "Pizza",
    time: "25-30 min",
    distance: "1.2 km",
    deliveryFee: 2.99,
    minOrder: 10,
    isOffer: true,
    offerPrice: 10.99,
    tags: ["Italian", "Vegetarian", "Popular"],
    nutritionalInfo: {
      calories: "850 kcal",
      protein: "32g",
      carbs: "95g",
      fat: "28g",
    },
    ingredients: [
      "Fresh Mozzarella",
      "San Marzano Tomatoes",
      "Fresh Basil",
      "Extra Virgin Olive Oil",
      "Sea Salt",
      "Organic Flour",
    ],
    sizes: [
      { name: "small", label: "Small", price: 9.99, size: '8"' },
      { name: "medium", label: "Medium", price: 12.99, size: '12"' },
      { name: "large", label: "Large", price: 15.99, size: '14"' },
    ],
    extras: [
      { id: 1, name: "Extra Cheese", price: 1.99, popular: true },
      { id: 2, name: "Mushrooms", price: 1.5, popular: false },
      { id: 3, name: "Pepperoni", price: 2.5, popular: true },
      { id: 4, name: "Olives", price: 1.0, popular: false },
      { id: 5, name: "Bell Peppers", price: 1.25, popular: false },
    ],
    reviews_list: [
      {
        id: 1,
        user: "John D.",
        rating: 5,
        comment: "Best pizza in town! The crust is perfect.",
        date: "2024-01-15",
        avatar: "👨",
      },
      {
        id: 2,
        user: "Sarah M.",
        rating: 4,
        comment: "Very tasty, but delivery took a bit long.",
        date: "2024-01-10",
        avatar: "👩",
      },
      {
        id: 3,
        user: "Mike R.",
        rating: 5,
        comment: "Authentic Italian taste. Highly recommended!",
        date: "2024-01-05",
        avatar: "👨",
      },
    ],
  };

  const handleQuantityChange = (delta) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleExtraToggle = (extraId) => {
    if (selectedExtras.includes(extraId)) {
      setSelectedExtras(selectedExtras.filter((id) => id !== extraId));
    } else {
      setSelectedExtras([...selectedExtras, extraId]);
    }
  };

  const calculateTotal = () => {
    const sizePrice =
      sizes.find((s) => s.name === selectedSize)?.price || product.price;
    const extrasPrice = selectedExtras.reduce((sum, id) => {
      const extra = product.extras.find((e) => e.id === id);
      return sum + (extra?.price || 0);
    }, 0);
    return (sizePrice + extrasPrice) * quantity;
  };

  const addToCart = () => {
    const orderItem = {
      id: product.id,
      name: product.name,
      quantity,
      size: selectedSize,
      extras: selectedExtras.map((id) =>
        product.extras.find((e) => e.id === id),
      ),
      total: calculateTotal(),
    };
    console.log("Added to cart:", orderItem);
    alert(`${product.name} added to cart!`);
  };

  const buyNow = () => {
    addToCart();
    navigate("/checkout");
  };

  const sizes = product.sizes;
  const totalPrice = calculateTotal();

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors mb-4"
      >
        <FaChevronLeft size={16} />
        <span>Back to Menu</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Image */}
        <div className="space-y-4">
          <div className="relative bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl overflow-hidden">
            <div className="aspect-square flex items-center justify-center">
              <span className="text-9xl md:text-9xl">{product.image}</span>
            </div>

            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all"
            >
              {isWishlisted ? (
                <FaHeart className="text-red-500" size={20} />
              ) : (
                <FaRegHeart className="text-gray-400" size={20} />
              )}
            </button>

            {/* Offer Badge */}
            {product.isOffer && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-bold">
                SAVE ${(product.originalPrice - product.offerPrice).toFixed(2)}
              </div>
            )}
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2">
            <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer border-2 border-purple-500">
              <span className="text-3xl">{product.image}</span>
            </div>
            <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer">
              <span className="text-3xl">🍕</span>
            </div>
            <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer">
              <span className="text-3xl">🍅</span>
            </div>
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="space-y-6">
          {/* Title & Rating */}
          <div>
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                <div className="flex items-center gap-2 text-gray-600">
                  <FaStore size={16} />
                  <span>{product.restaurant}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-green-100 px-3 py-2 rounded-lg">
                <FaStar className="text-yellow-500" />
                <span className="font-bold">{product.rating}</span>
                <span className="text-gray-500">
                  ({product.reviews} reviews)
                </span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex gap-2 mt-3">
              {product.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Delivery Info */}
          <div className="flex flex-wrap gap-4 p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2">
              <FaClock className="text-purple-600" />
              <div>
                <p className="text-xs text-gray-500">Delivery Time</p>
                <p className="font-semibold">{product.time}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-purple-600" />
              <div>
                <p className="text-xs text-gray-500">Distance</p>
                <p className="font-semibold">{product.distance}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FaTruck className="text-purple-600" />
              <div>
                <p className="text-xs text-gray-500">Delivery Fee</p>
                <p className="font-semibold">${product.deliveryFee}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MdPayment className="text-purple-600" />
              <div>
                <p className="text-xs text-gray-500">Min Order</p>
                <p className="font-semibold">${product.minOrder}</p>
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="border-t border-b py-4">
            {product.isOffer ? (
              <div>
                <span className="text-3xl font-bold text-purple-600">
                  ${(product.offerPrice * quantity).toFixed(2)}
                </span>
                <span className="text-lg text-gray-400 line-through ml-2">
                  ${(product.originalPrice * quantity).toFixed(2)}
                </span>
                <span className="text-sm text-green-600 ml-2">
                  Save $
                  {(
                    (product.originalPrice - product.offerPrice) *
                    quantity
                  ).toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-3xl font-bold text-purple-600">
                ${(product.price * quantity).toFixed(2)}
              </span>
            )}
          </div>

          {/* Size Selection */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Select Size</h3>
            <div className="flex gap-3">
              {sizes.map((size) => (
                <button
                  key={size.name}
                  onClick={() => setSelectedSize(size.name)}
                  className={`flex-1 p-3 border-2 rounded-xl text-center transition-all ${
                    selectedSize === size.name
                      ? "border-purple-600 bg-purple-50"
                      : "border-gray-200 hover:border-purple-300"
                  }`}
                >
                  <p className="font-semibold">{size.label}</p>
                  <p className="text-sm text-gray-500">{size.size}</p>
                  <p className="text-purple-600 font-bold">${size.price}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Extras */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Add Extras</h3>
            <div className="grid grid-cols-2 gap-2">
              {product.extras.map((extra) => (
                <button
                  key={extra.id}
                  onClick={() => handleExtraToggle(extra.id)}
                  className={`p-3 border rounded-xl text-left transition-all flex justify-between items-center ${
                    selectedExtras.includes(extra.id)
                      ? "border-purple-600 bg-purple-50"
                      : "border-gray-200 hover:border-purple-300"
                  }`}
                >
                  <div>
                    <p className="font-medium">{extra.name}</p>
                    <p className="text-sm text-purple-600">+${extra.price}</p>
                  </div>
                  {extra.popular && (
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
                      Popular
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Quantity</h3>
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
              >
                <FaMinus />
              </button>
              <span className="text-xl font-semibold w-12 text-center">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
              >
                <FaPlus />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={addToCart}
              className="flex-1 bg-gray-100 text-purple-600 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
            >
              <FaShoppingCart />
              Add to Cart
            </button>
            <button
              onClick={buyNow}
              className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Buy Now
            </button>
          </div>

          {/* Features */}
          <div className="flex justify-around pt-4 border-t">
            <div className="text-center">
              <FaTruck className="mx-auto text-gray-400 mb-1" />
              <p className="text-xs text-gray-500">
                Free delivery
                <br />
                on orders $20+
              </p>
            </div>
            <div className="text-center">
              <FaShieldAlt className="mx-auto text-gray-400 mb-1" />
              <p className="text-xs text-gray-500">
                Secure
                <br />
                payment
              </p>
            </div>
            <div className="text-center">
              <MdVerified className="mx-auto text-gray-400 mb-1" />
              <p className="text-xs text-gray-500">
                Quality
                <br />
                guarantee
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-8">
        <div className="flex gap-4 border-b">
          <button
            onClick={() => setActiveTab("details")}
            className={`pb-2 px-4 font-semibold transition-colors ${
              activeTab === "details"
                ? "text-purple-600 border-b-2 border-purple-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Details
          </button>
          <button
            onClick={() => setActiveTab("ingredients")}
            className={`pb-2 px-4 font-semibold transition-colors ${
              activeTab === "ingredients"
                ? "text-purple-600 border-b-2 border-purple-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Ingredients
          </button>
          <button
            onClick={() => setActiveTab("nutrition")}
            className={`pb-2 px-4 font-semibold transition-colors ${
              activeTab === "nutrition"
                ? "text-purple-600 border-b-2 border-purple-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Nutrition
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`pb-2 px-4 font-semibold transition-colors ${
              activeTab === "reviews"
                ? "text-purple-600 border-b-2 border-purple-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Reviews ({product.reviews_list.length})
          </button>
        </div>

        <div className="p-6 bg-gray-50 rounded-xl mt-4">
          {activeTab === "details" && (
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                {product.longDescription || product.description}
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500" />
                  <span>Fresh ingredients daily</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500" />
                  <span>Wood-fired oven baked</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500" />
                  <span>Premium Italian cheese</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500" />
                  <span>Family recipe since 1985</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "ingredients" && (
            <div className="grid grid-cols-2 gap-3">
              {product.ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500" size={14} />
                  <span>{ingredient}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "nutrition" && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(product.nutritionalInfo).map(([key, value]) => (
                <div key={key} className="text-center p-3 bg-white rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">{value}</p>
                  <p className="text-sm text-gray-500 capitalize">{key}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-4">
              {/* Average Rating Summary */}
              <div className="flex items-center gap-4 p-4 bg-white rounded-lg">
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-600">
                    {product.rating}
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`${i < Math.floor(product.rating) ? "text-yellow-500" : "text-gray-300"}`}
                        size={16}
                      />
                    ))}
                  </div>
                  <div className="text-sm text-gray-500">
                    {product.reviews} reviews
                  </div>
                </div>
                <div className="flex-1 space-y-1">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center gap-2">
                      <span className="text-sm w-8">{star}★</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-yellow-500 rounded-full"
                          style={{ width: `${Math.random() * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews List */}
              {product.reviews_list.map((review) => (
                <div key={review.id} className="p-4 bg-white rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-xl">
                      {review.avatar}
                    </div>
                    <div>
                      <p className="font-semibold">{review.user}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={`${i < review.rating ? "text-yellow-500" : "text-gray-300"}`}
                              size={12}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">
                          {review.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Similar Products */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          You Might Also Like
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-all"
            >
              <div className="h-32 bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center">
                <span className="text-4xl">🍕</span>
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-sm">Pepperoni Pizza</h3>
                <p className="text-purple-600 font-bold mt-1">$14.99</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
