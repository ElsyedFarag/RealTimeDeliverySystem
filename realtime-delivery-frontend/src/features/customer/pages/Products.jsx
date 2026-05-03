import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaFilter,
  FaStar,
  FaClock,
  FaShoppingCart,
  FaHeart,
  FaRegHeart,
  FaTimes,
  FaPizzaSlice,
  FaHamburger,
  FaFish,
} from "react-icons/fa";
import {
  MdFastfood,
  MdLocalPizza,
  MdRestaurant,
  MdOutlineRestaurant,
} from "react-icons/md";
import { IoFastFood } from "react-icons/io5";

const Products = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("popular");
  const [wishlist, setWishlist] = useState([]);

  const categories = [
    { id: "all", name: "All", icon: MdRestaurant },
    { id: "pizza", name: "Pizza", icon: FaPizzaSlice },
    { id: "burger", name: "Burgers", icon: FaHamburger },
    { id: "sushi", name: "Sushi", icon: FaFish },
    { id: "pasta", name: "Pasta", icon: MdFastfood },
    { id: "chicken", name: "Chicken", icon: IoFastFood },
  ];

  const products = [
    {
      id: 1,
      name: "Margherita Pizza",
      category: "pizza",
      price: 12.99,
      originalPrice: 15.99,
      rating: 4.8,
      reviews: 234,
      time: "25-30 min",
      image: "🍕",
      restaurant: "Pizza Palace",
      isOffer: true,
      offerPrice: 10.99,
    },
    {
      id: 2,
      name: "Cheeseburger",
      category: "burger",
      price: 9.99,
      originalPrice: 12.99,
      rating: 4.6,
      reviews: 189,
      time: "15-20 min",
      image: "🍔",
      restaurant: "Burger King",
      isOffer: false,
    },
    {
      id: 3,
      name: "California Roll",
      category: "sushi",
      price: 15.99,
      originalPrice: 18.99,
      rating: 4.9,
      reviews: 312,
      time: "20-25 min",
      image: "🍣",
      restaurant: "Sushi Master",
      isOffer: true,
      offerPrice: 13.99,
    },
    {
      id: 4,
      name: "Pasta Carbonara",
      category: "pasta",
      price: 13.99,
      originalPrice: 16.99,
      rating: 4.7,
      reviews: 156,
      time: "20-25 min",
      image: "🍝",
      restaurant: "Italian Bistro",
      isOffer: false,
    },
    {
      id: 5,
      name: "Fried Chicken",
      category: "chicken",
      price: 11.99,
      originalPrice: 14.99,
      rating: 4.5,
      reviews: 278,
      time: "15-20 min",
      image: "🍗",
      restaurant: "KFC",
      isOffer: true,
      offerPrice: 9.99,
    },
    {
      id: 6,
      name: "Pepperoni Pizza",
      category: "pizza",
      price: 14.99,
      originalPrice: 17.99,
      rating: 4.9,
      reviews: 423,
      time: "25-30 min",
      image: "🍕",
      restaurant: "Pizza Hut",
      isOffer: false,
    },
    {
      id: 7,
      name: "Veggie Burger",
      category: "burger",
      price: 8.99,
      originalPrice: 10.99,
      rating: 4.4,
      reviews: 98,
      time: "15-20 min",
      image: "🍔",
      restaurant: "Green Bites",
      isOffer: true,
      offerPrice: 7.99,
    },
    {
      id: 8,
      name: "Dragon Roll",
      category: "sushi",
      price: 18.99,
      originalPrice: 22.99,
      rating: 4.8,
      reviews: 267,
      time: "25-30 min",
      image: "🍱",
      restaurant: "Tokyo Sushi",
      isOffer: false,
    },
  ];

  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter((id) => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  };

  const getFilteredProducts = () => {
    let filtered = products;

    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.restaurant.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        filtered.sort((a, b) => b.reviews - a.reviews);
    }

    return filtered;
  };

  const filteredProducts = getFilteredProducts();

  const addToCart = (product) => {
    console.log("Added to cart:", product);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 -m-6 -mt-6 p-6 mb-6 rounded-b-2xl">
        <h1 className="text-3xl font-bold text-white mb-2">Our Menu</h1>
        <p className="text-purple-100">
          Discover delicious food from best restaurants
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="sticky top-20 bg-white z-20 py-4 -mt-4">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for food or restaurants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 flex items-center gap-2"
          >
            <FaFilter />
            <span className="hidden sm:inline">Filters</span>
          </button>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="popular">Most Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {/* Categories */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? "bg-purple-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Icon size={18} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-4 p-4 border border-gray-200 rounded-xl bg-gray-50">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">Advanced Filters</h3>
              <button onClick={() => setShowFilters(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-gray-600">Price Range</label>
                <input type="range" className="w-full mt-1" min="0" max="50" />
              </div>
              <div>
                <label className="text-sm text-gray-600">Delivery Time</label>
                <select className="w-full mt-1 p-2 border rounded-lg">
                  <option>Any time</option>
                  <option>Under 15 min</option>
                  <option>15-25 min</option>
                  <option>25-35 min</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-600">Rating</label>
                <select className="w-full mt-1 p-2 border rounded-lg">
                  <option>Any rating</option>
                  <option>4.5+ stars</option>
                  <option>4.0+ stars</option>
                  <option>3.5+ stars</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="flex justify-between items-center">
        <p className="text-gray-600">
          Found{" "}
          <span className="font-bold text-purple-600">
            {filteredProducts.length}
          </span>{" "}
          items
        </p>
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="text-sm text-purple-600 hover:text-purple-700"
          >
            Clear search
          </button>
        )}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all cursor-pointer"
          >
            {/* Product Image */}
            <div
              className="relative h-48 bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center group-hover:scale-105 transition-transform duration-300"
              onClick={() => navigate(`/products/${product.id}`)}
            >
              <span className="text-7xl">{product.image}</span>

              {/* Wishlist Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(product.id);
                }}
                className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-all"
              >
                {wishlist.includes(product.id) ? (
                  <FaHeart className="text-red-500" size={18} />
                ) : (
                  <FaRegHeart className="text-gray-400" size={18} />
                )}
              </button>

              {/* Offer Badge */}
              {product.isOffer && (
                <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
                  SAVE $
                  {(
                    product.originalPrice -
                    (product.offerPrice || product.price)
                  ).toFixed(2)}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div
              className="p-4"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-gray-800 text-lg group-hover:text-purple-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500">{product.restaurant}</p>
                </div>
                <div className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded-lg">
                  <FaStar className="text-yellow-500" size={12} />
                  <span className="text-sm font-semibold">
                    {product.rating}
                  </span>
                  <span className="text-xs text-gray-500">
                    ({product.reviews})
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                <FaClock size={12} />
                <span>{product.time}</span>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  {product.isOffer && product.offerPrice ? (
                    <>
                      <span className="text-2xl font-bold text-purple-600">
                        ${product.offerPrice}
                      </span>
                      <span className="text-sm text-gray-400 line-through ml-2">
                        ${product.originalPrice}
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold text-purple-600">
                      ${product.price}
                    </span>
                  )}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                  className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <FaShoppingCart size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🍽️</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            No products found
          </h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
            }}
            className="mt-4 text-purple-600 font-semibold hover:text-purple-700"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Load More Button */}
      {filteredProducts.length > 0 && filteredProducts.length >= 8 && (
        <div className="text-center pt-6">
          <button className="px-6 py-2 border-2 border-purple-600 text-purple-600 rounded-xl font-semibold hover:bg-purple-600 hover:text-white transition-all">
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
