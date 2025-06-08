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
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2L3 7v11a1 1 0 001 1h3v-8h6v8h3a1 1 0 001-1V7l-7-5z" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-blue-600">SkyRoute</span>
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
            <Link to={'/login'}  className="hidden md:flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-700">U</span>
                </div>
                <span className="text-gray-700">Login</span>
            </Link>

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

