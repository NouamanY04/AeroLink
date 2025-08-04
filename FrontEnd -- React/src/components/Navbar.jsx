import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

function Navbar() {
  const [user, setUser] = useState(null);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add this line
  const navigate = useNavigate();


  useEffect(() => {
    // Check auth status
    const checkAuth = async () => {
      const userId = localStorage.getItem('userLoggedId');
      if (userId) {
        await fetchUserProfile(userId);
      }
      setIsLoading(false); // Set loading to false after check
    };

    checkAuth();


    // Logo animation
    const addAnimationEffect = () => {
      const element = document.getElementById("hiddenElement");
      if (element) element.classList.add("animate-fadeIn");
    };
    const movingElement = document.getElementById("movingElement");
    if (movingElement) {
      movingElement.addEventListener("animationend", addAnimationEffect);
    }

    return () => {
      ;
    };
  }, []);

  const fetchUserProfile = async (userId) => {
    try {
      const username = localStorage.getItem('username');
      if (username) {
        setUser({ username });
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;

      setUser(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };


  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem('userLoggedId');
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };


  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </div>
            <span className="text-2xl font-bold text-blue-600">AeroLink</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link to={'/'} className="text-gray-700 hover:text-blue-600 font-medium transition duration-300">Home</Link>
            <Link to={'/flights'} className="text-gray-700 hover:text-blue-600 font-medium transition duration-300">Flights</Link>
            <Link to={'/about'} className="text-gray-700 hover:text-blue-600 font-medium transition duration-300">About Us</Link>
            <Link to={'/contact'} className="text-gray-700 hover:text-blue-600 font-medium transition duration-300">Contact Us</Link>
          </div>

          {/* User Account */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative group hidden md:block">
                <button
                  className="flex items-center space-x-2 focus:outline-none"
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                >
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    {user.username ? user.username.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="text-gray-700">{user.username || 'User'}</span>
                </button>

                {/* Dropdown */}
                {showUserDropdown && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-md z-50">
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to={'/login'} className="hidden md:flex items-center space-x-2">
                {user ? <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-700">L</span>
                </div>
                  : ''}
                <span className="text-gray-700">Login</span>
              </Link>
            )}


            {/* Mobile menu button */}
            <button className="md:hidden p-2">
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

