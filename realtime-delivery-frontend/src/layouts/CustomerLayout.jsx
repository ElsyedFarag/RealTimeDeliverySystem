import React, { useState, useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { 
  FiHome, FiShoppingBag, FiClock, FiUser, FiLogOut, 
  FiBell, FiSearch, FiMenu, FiX, FiShoppingCart, 
  FiMapPin, FiHeadphones, FiTag, FiStar, FiChevronRight,
  FiMail, FiLock, FiEye, FiEyeOff, FiUserPlus
} from "react-icons/fi";

const CustomerLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [cartCount, setCartCount] = useState(3);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const navigate = useNavigate();

  // Form state
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const mockNotification = {
        id: Date.now(),
        message: "Your order is being prepared",
        time: new Date().toLocaleTimeString(),
        type: "info"
      };
      setNotifications(prev => [mockNotification, ...prev].slice(0, 5));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  // Check if user is logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const navItems = [
    { path: "/", icon: FiHome, label: "Home" },
    { path: "/orders", icon: FiShoppingBag, label: "My Orders" },
    { path: "/tracking", icon: FiClock, label: "Track Order" },
    { path: "/profile", icon: FiUser, label: "Profile" },
    { path: "/support", icon: FiHeadphones, label: "Support" },
    { path: "/offers", icon: FiTag, label: "Offers" },
    { path: "/reviews", icon: FiStar, label: "Reviews" },
  ];

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const newErrors = {};
    
    if (!loginForm.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(loginForm.email)) newErrors.email = 'Email is invalid';
    
    if (!loginForm.password) newErrors.password = 'Password is required';
    else if (loginForm.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    if (Object.keys(newErrors).length === 0) {
      // Mock login - replace with actual API call
      console.log('Login:', loginForm);
      localStorage.setItem('authToken', 'mock-token');
      localStorage.setItem('userData', JSON.stringify({ email: loginForm.email, name: 'John Doe' }));
      setIsLoggedIn(true);
      setIsAuthModalOpen(false);
      setLoginForm({ email: '', password: '' });
      alert('Login successful!');
    } else {
      setErrors(newErrors);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const newErrors = {};
    
    if (!registerForm.name) newErrors.name = 'Name is required';
    if (!registerForm.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(registerForm.email)) newErrors.email = 'Email is invalid';
    
    if (!registerForm.phone) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10,}$/.test(registerForm.phone.replace(/\D/g, ''))) newErrors.phone = 'Valid phone number is required';
    
    if (!registerForm.password) newErrors.password = 'Password is required';
    else if (registerForm.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    if (registerForm.password !== registerForm.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (Object.keys(newErrors).length === 0) {
      // Mock register - replace with actual API call
      console.log('Register:', registerForm);
      localStorage.setItem('authToken', 'mock-token');
      localStorage.setItem('userData', JSON.stringify({ 
        name: registerForm.name, 
        email: registerForm.email,
        phone: registerForm.phone 
      }));
      setIsLoggedIn(true);
      setIsAuthModalOpen(false);
      setRegisterForm({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
      alert('Registration successful!');
    } else {
      setErrors(newErrors);
    }
  };

  const handleInputChange = (e, formType) => {
    const { name, value } = e.target;
    if (formType === 'login') {
      setLoginForm({ ...loginForm, [name]: value });
    } else {
      setRegisterForm({ ...registerForm, [name]: value });
    }
    // Clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const switchMode = () => {
    setIsLoginMode(!isLoginMode);
    setErrors({});
    setLoginForm({ email: '', password: '' });
    setRegisterForm({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800">
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button 
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
            
            <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigate("/")}>
              <div className="bg-gradient-to-br from-purple-600 to-indigo-600 p-2 rounded-xl shadow-md group-hover:shadow-lg transition-all">
                <FiShoppingBag size={24} className="text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-800">QuickOrder</h1>
                <span className="text-xs text-purple-600 font-semibold">Real-time</span>
              </div>
            </div>
          </div>

          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <FiSearch size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search products, restaurants, or cuisines..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
              <FiMapPin size={16} className="text-purple-600" />
              <span className="text-sm font-medium text-gray-700">New York, NY</span>
              <FiChevronRight size={14} className="text-gray-400" />
            </div>

            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <FiBell size={20} className="text-gray-600" />
              {notifications.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>

            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors" onClick={() => setIsCartOpen(!isCartOpen)}>
              <FiShoppingCart size={20} className="text-gray-600" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {!isLoggedIn ? (
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg transition-all hover:shadow-md"
              >
                <FiUser size={18} />
                <span>Login</span>
              </button>
            ) : (
              <button 
                onClick={handleLogout}
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all hover:shadow-md"
              >
                <FiLogOut size={18} />
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="bg-gray-900 text-white px-4 md:px-8 py-2 flex flex-wrap justify-between items-center gap-2 text-xs md:text-sm">
        <div className="flex items-center gap-2">
          <span className="text-gray-400">Real-time:</span>
          <span className="text-green-400 font-semibold flex items-center gap-1">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Live
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-400">Server Time:</span>
          <span className="font-mono">{currentTime.toLocaleTimeString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-400">Active Orders:</span>
          <span className="font-bold text-yellow-400">2</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-400">Delivery:</span>
          <span className="font-medium">30-45 min</span>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-6 flex gap-6 relative min-h-[calc(100vh-130px)]">
        <aside className={`fixed lg:sticky top-24 left-0 h-full w-72 bg-white shadow-xl z-40 transform transition-transform duration-300 lg:transform-none ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}>
          <div className="p-6 flex flex-col h-full">
            <nav className="flex-1 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) => `
                      flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                      ${isActive 
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md' 
                        : 'text-gray-700 hover:bg-gray-100 hover:translate-x-1'
                      }
                    `}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>

            <div className="pt-6 mt-6 border-t border-gray-200">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <FiHeadphones size={18} className="text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">24/7 Support</p>
                  <p className="text-sm font-semibold text-gray-800">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
        )}

        <main className="flex-1 min-w-0">
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <Outlet />
          </div>
        </main>

        {isCartOpen && (
          <>
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity"
              onClick={() => setIsCartOpen(false)}
            ></div>
            <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 animate-slide-in">
              <div className="flex flex-col h-full">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-800">Your Cart</h3>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <FiX size={20} />
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="text-center py-12">
                    <FiShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500">Your cart is empty</p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="mt-4 text-purple-600 font-medium hover:text-purple-700"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>
                
                <div className="p-6 border-t border-gray-200">
                  <div className="flex justify-between mb-4">
                    <span className="text-gray-600">Total:</span>
                    <strong className="text-xl text-gray-800">$0.00</strong>
                  </div>
                  <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all">
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Auth Modal - Login/Register */}
      {isAuthModalOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity"
            onClick={() => setIsAuthModalOpen(false)}
          ></div>
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-modal-slide-in">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">
                  {isLoginMode ? 'Welcome Back!' : 'Create Account'}
                </h2>
                <button 
                  onClick={() => setIsAuthModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <FiX size={24} />
                </button>
              </div>

              <div className="p-6">
                {/* Login Form */}
                {isLoginMode ? (
                  <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <div className="relative">
                        <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={loginForm.email}
                          onChange={(e) => handleInputChange(e, 'login')}
                          className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="you@example.com"
                        />
                      </div>
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                      <div className="relative">
                        <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={loginForm.password}
                          onChange={(e) => handleInputChange(e, 'login')}
                          className={`w-full pl-10 pr-12 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                            errors.password ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                        </button>
                      </div>
                      {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    </div>

                    <div className="text-right">
                      <button type="button" className="text-sm text-purple-600 hover:text-purple-700">
                        Forgot Password?
                      </button>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:shadow-lg transition-all"
                    >
                      Sign In
                    </button>
                  </form>
                ) : (
                  // Register Form
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <div className="relative">
                        <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          name="name"
                          value={registerForm.name}
                          onChange={(e) => handleInputChange(e, 'register')}
                          className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                            errors.name ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="John Doe"
                        />
                      </div>
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <div className="relative">
                        <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={registerForm.email}
                          onChange={(e) => handleInputChange(e, 'register')}
                          className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="you@example.com"
                        />
                      </div>
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <div className="relative">
                        <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={registerForm.phone}
                          onChange={(e) => handleInputChange(e, 'register')}
                          className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                            errors.phone ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="+1 234 567 8900"
                        />
                      </div>
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                      <div className="relative">
                        <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={registerForm.password}
                          onChange={(e) => handleInputChange(e, 'register')}
                          className={`w-full pl-10 pr-12 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                            errors.password ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                        </button>
                      </div>
                      {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                      <div className="relative">
                        <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={registerForm.confirmPassword}
                          onChange={(e) => handleInputChange(e, 'register')}
                          className={`w-full pl-10 pr-12 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                            errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                        </button>
                      </div>
                      {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:shadow-lg transition-all"
                    >
                      Create Account
                    </button>
                  </form>
                )}

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-center text-sm text-gray-600">
                    {isLoginMode ? "Don't have an account? " : "Already have an account? "}
                    <button
                      type="button"
                      onClick={switchMode}
                      className="text-purple-600 font-semibold hover:text-purple-700"
                    >
                      {isLoginMode ? "Sign Up" : "Sign In"}
                    </button>
                  </p>
                </div>

                {/* Social Login Options */}
                <div className="mt-4">
                  <p className="text-center text-xs text-gray-500 mb-3">Or continue with</p>
                  <div className="flex gap-3">
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <span className="text-xl">G</span>
                      <span className="text-sm">Google</span>
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <span className="text-xl">f</span>
                      <span className="text-sm">Facebook</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 lg:hidden z-30">
        <div className="flex justify-around py-2">
          {navItems.slice(0, 4).map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all
                  ${isActive 
                    ? 'text-purple-600' 
                    : 'text-gray-600 hover:text-purple-600'
                  }
                `}
              >
                <Icon size={22} />
                <span className="text-xs">{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        
        @keyframes modal-slide-in {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        
        .animate-modal-slide-in {
          animation: modal-slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CustomerLayout;