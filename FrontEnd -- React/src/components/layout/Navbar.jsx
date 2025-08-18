import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../services/supabaseClient';
import { getStableAvatarColor } from '../../utils/Avatar';
import { FiInfo, FiChevronDown, FiMenu, FiMail, FiX, FiUser, FiLogOut, FiHome, FiAirplay } from "react-icons/fi";
// Array of aviation-themed gradient colors for avatar
const avatarColors = [
  'from-sky-500 to-blue-600',
  'from-blue-500 to-indigo-600',
  'from-cyan-500 to-blue-600',
  'from-slate-500 to-slate-600',
  'from-indigo-500 to-blue-600',
  'from-teal-500 to-cyan-600',
  'from-blue-600 to-purple-600',
  'from-sky-400 to-sky-600'
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
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
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
    <nav className="bg-gradient-to-r from-sky-600 via-blue-700 to-indigo-800 backdrop-blur-lg sticky top-0 z-50 border-b border-sky-400/20">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex justify-between items-center py-3">
          {/* Logo as link to Home */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20 group-hover:scale-105 transition-all duration-300">
                <FiAirplay className="w-5 h-5 text-white transform rotate-45" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-orange-400 to-red-500 rounded-full opacity-80"></div>
            </div>
            <span className="text-2xl font-bold text-white tracking-tight group-hover:text-sky-200 transition-colors duration-300">
              AeroLink
            </span>
          </Link>

          {/* Centered Navigation Links */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm rounded-full px-2 py-1 border border-white/20">
              <Link
                to="/"
                className="flex items-center space-x-2 px-3 py-2 rounded-full text-white/90 hover:text-white hover:bg-white/20 font-medium transition-all duration-300 group"
              >
                <FiHome className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                <span>Home</span>
              </Link>
              <Link
                to="/FlightsDisplay"
                className="flex items-center space-x-2 px-3 py-2 rounded-full text-white/90 hover:text-white hover:bg-white/20 font-medium transition-all duration-300 group"
              >
                <FiAirplay className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                <span>Flights</span>
              </Link>
              <Link
                to="/about"
                className="flex items-center space-x-2 px-3 py-2 rounded-full text-white/90 hover:text-white hover:bg-white/20 font-medium transition-all duration-300 group"
              >
                <FiInfo className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                <span>About</span>
              </Link>
              <Link
                to="/contact"
                className="flex items-center space-x-2 px-3 py-2 rounded-full text-white/90 hover:text-white hover:bg-white/20 font-medium transition-all duration-300 group"
              >
                <FiMail className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                <span>Contact</span>
              </Link>
            </div>
          </div>

          {/* Right side: Profile/Login */}
          <div className="flex items-center space-x-3">

            {/* Profile/Login */}
            {user && user.username ? (
              <div className="relative group hidden md:block">
                <button
                  className="flex items-center space-x-2 focus:outline-none group"
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                >
                  <div className={`w-10 h-10 bg-gradient-to-r ${avatarColor} text-white rounded-full flex items-center justify-center font-bold shadow-lg border-2 border-white/20 group-hover:scale-105 transition-all duration-300`}>
                    {avatarInitial}
                  </div>
                  <FiChevronDown className={`w-4 h-4 text-white/80 transition-transform duration-300 ${showUserDropdown ? 'rotate-180' : ''}`} />
                </button>
                {showUserDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-lg border border-white/20 rounded-xl shadow-2xl z-50 overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-200/50">
                      <p className="text-sm font-medium text-gray-700">Welcome back!</p>
                      <p className="text-xs text-gray-500 truncate">{user.username}</p>
                    </div>
                    <Link
                      to="/dashboard"
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-sky-50 transition-colors duration-200 group"
                    >
                      <FiUser className="w-5 h-5 mr-3 text-sky-600 group-hover:scale-110 transition-transform duration-200" />
                      <span className="font-medium">Dashboard</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-200 group"
                    >
                      <FiLogOut className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:flex items-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20 transition-all duration-300 group"
              >
                <FiUser className="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-300" />
                <span className="text-white font-medium">Login</span>
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white/20"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              aria-label="Toggle menu"
            >
              {showMobileMenu ? (
                <FiX className="w-6 h-6 text-white" />
              ) : (
                <FiMenu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {showMobileMenu && (
          <div className="md:hidden bg-white/10 backdrop-blur-lg rounded-xl mx-2 mb-4 border border-white/20 overflow-hidden">
            <div className="flex flex-col">
              <Link
                to="/"
                className="flex items-center px-4 py-3 text-white hover:bg-white/10 font-medium transition-colors duration-200 group"
                onClick={() => setShowMobileMenu(false)}
              >
                <FiHome className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
                <span>Home</span>
              </Link>
              <Link
                to="/FlightsDisplay"
                className="flex items-center px-4 py-3 text-white hover:bg-white/10 font-medium transition-colors duration-200 group"
                onClick={() => setShowMobileMenu(false)}
              >
                <FiAirplay className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
                <span>Flights</span>
              </Link>
              <div className="border-t border-white/20 my-1"></div>
              <Link
                to="/about"
                className="flex items-center px-4 py-3 text-white hover:bg-white/10 font-medium transition-colors duration-200 group"
                onClick={() => setShowMobileMenu(false)}
              >
                <FiInfo className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
                <span>About</span>
              </Link>
              <Link
                to="/contact"
                className="flex items-center px-4 py-3 text-white hover:bg-white/10 font-medium transition-colors duration-200 group"
                onClick={() => setShowMobileMenu(false)}
              >
                <FiInfo className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
                <span>Help</span>
              </Link>
              {!user && (
                <>
                  <div className="border-t border-white/20 my-1"></div>
                  <Link
                    to="/login"
                    className="flex items-center px-4 py-3 text-white hover:bg-white/10 font-medium transition-colors duration-200 group"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <FiUser className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
                    <span>Login</span>
                  </Link>
                </>
              )}
              {user && (
                <>
                  <div className="border-t border-white/20 my-1"></div>
                  <Link
                    to="/dashboard"
                    className="flex items-center px-4 py-3 text-white hover:bg-white/10 font-medium transition-colors duration-200 group"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <FiUser className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
                    <span>Dashboard</span>
                  </Link>
                  <button
                    onClick={() => { handleLogout(); setShowMobileMenu(false); }}
                    className="flex items-center w-full px-4 py-3 text-red-300 hover:bg-red-500/20 transition-colors duration-200 group"
                  >
                    <FiLogOut className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
                    <span className="font-medium">Logout</span>
                  </button>
                </>
              )}
            </div>
          </div>
        )}

      </div>
    </nav>
  );
}

export default Navbar;

