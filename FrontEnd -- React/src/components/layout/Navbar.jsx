import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../services/supabaseClient';
import { getStableAvatarColor } from '../../utils/Avatar';

// Array of gradient colors for avatar
const avatarColors = [
  'from-blue-500 to-blue-600',
  'from-red-500 to-red-600',
  'from-yellow-400 to-yellow-500',
  'from-green-500 to-green-600',
  'from-purple-500 to-purple-600',
  'from-pink-500 to-pink-600',
  'from-teal-500 to-teal-600',
  'from-indigo-500 to-indigo-600'
];

// Get initials from username (first letter of each word, max 2)
function getInitials(name) {
  if (!name) return 'U';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function Navbar() {
  const [user, setUser] = useState(null);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [avatarColor, setAvatarColor] = useState(avatarColors[Math.floor(Math.random() * avatarColors.length)]);
  const [avatarInitial, setAvatarInitial] = useState('U');
  const navigate = useNavigate();

  useEffect(() => {
    // Check auth status
    const checkAuth = async () => {
      const userId = localStorage.getItem('userLoggedId');
      if (userId) {
        await fetchUserProfile(userId);
      }
      setIsLoading(false);
    };

    checkAuth();

    // Listen for user info updates
    const updateAvatar = () => {
      const username = localStorage.getItem('userLoggedName') || '';
      setAvatarInitial(getInitials(username));
      setAvatarColor(getStableAvatarColor(username));
      setUser({ username });
    };
    updateAvatar();
    window.addEventListener('userInfoUpdated', updateAvatar);
    return () => window.removeEventListener('userInfoUpdated', updateAvatar);
  }, []);

  const fetchUserProfile = async (userId) => {
    try {
      const username = localStorage.getItem('userLoggedName');
      if (username) {
        setUser({ username });
        setAvatarInitial(getInitials(username));
        setAvatarColor(avatarColors[Math.floor(Math.random() * avatarColors.length)]);
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;

      setUser(data);
      setAvatarInitial(getInitials(data.username));
      setAvatarColor(avatarColors[Math.floor(Math.random() * avatarColors.length)]);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem('userLoggedId');
      localStorage.removeItem('userLoggedName');
      localStorage.removeItem('userLoggedEmail');
      localStorage.removeItem('cachedUserInfo');
      localStorage.removeItem('upcomingFlights')
      setShowUserDropdown(false); // Hide dropdown immediately
      setUser(null); // Remove user immediately
      setAvatarInitial('U');
      setAvatarColor(avatarColors[Math.floor(Math.random() * avatarColors.length)]);
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
            <Link to={'/FlightsDisplay'} className="text-gray-700 hover:text-blue-600 font-medium transition duration-300">Flights</Link>
            <Link to={'/about'} className="text-gray-700 hover:text-blue-600 font-medium transition duration-300">About Us</Link>
            <Link to={'/contact'} className="text-gray-700 hover:text-blue-600 font-medium transition duration-300">Contact Us</Link>
          </div>

          {/* User Account */}
          <div className="flex items-center space-x-4">
            {user && user.username ? (
              <div className="relative group hidden md:block">
                <button
                  className="flex items-center space-x-2 focus:outline-none"
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                >
                  <div className={`w-8 h-8 bg-gradient-to-r ${avatarColor} text-white rounded-full flex items-center justify-center font-bold`}>
                    {avatarInitial}
                  </div>
                </button>
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
                <span className="text-gray-700">Login</span>
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              aria-label="Open menu"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {showMobileMenu && (
          <div className="md:hidden flex flex-col space-y-2 pb-4 animate-fadeIn">
            <Link to={'/'} className="block px-4 py-2 text-gray-700 hover:text-blue-600 font-medium" onClick={() => setShowMobileMenu(false)}>Home</Link>
            <Link to={'/FlightsDisplay'} className="block px-4 py-2 text-gray-700 hover:text-blue-600 font-medium" onClick={() => setShowMobileMenu(false)}>Flights</Link>
            <Link to={'/about'} className="block px-4 py-2 text-gray-700 hover:text-blue-600 font-medium" onClick={() => setShowMobileMenu(false)}>About Us</Link>
            <Link to={'/contact'} className="block px-4 py-2 text-gray-700 hover:text-blue-600 font-medium" onClick={() => setShowMobileMenu(false)}>Contact Us</Link>
            {!user && (
              <Link to={'/login'} className="block px-4 py-2 text-gray-700 hover:text-blue-600 font-medium" onClick={() => setShowMobileMenu(false)}>Login</Link>
            )}
            {user && (
              <>
                <Link to="/dashboard" className="block px-4 py-2 text-gray-700 hover:text-blue-600 font-medium" onClick={() => setShowMobileMenu(false)}>Dashboard</Link>
                <button
                  onClick={() => { handleLogout(); setShowMobileMenu(false); }}
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}

      </div>
    </nav>
  );
}

export default Navbar;

