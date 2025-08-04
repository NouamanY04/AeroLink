import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faCog, faTachometerAlt } from '@fortawesome/free-solid-svg-icons';

const UserMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const menuRef = useRef();

    useEffect(() => {
        // Check localStorage for user data
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
            setIsLoggedIn(true);
        }

        // Close menu when clicking outside
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        setIsLoggedIn(false);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={menuRef}>
            {/* User Icon/Avatar Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition-colors duration-200"
            >
                {isLoggedIn ? (
                    <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-gray-800 font-medium text-sm">
                        {user?.username?.charAt(0).toUpperCase() || 'U'}
                    </div>
                ) : (
                    <FontAwesomeIcon
                        icon={faUser}
                        className="text-lg text-white hover:scale-105 transition-transform duration-200"
                    />
                )}
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 transform opacity-0 animate-fadeIn">
                    {isLoggedIn ? (
                        <>
                            <div className="px-4 py-2 border-b border-gray-100">
                                <p className="text-sm font-medium text-gray-900">{user?.username}</p>
                                <p className="text-xs text-gray-500">{user?.email}</p>
                            </div>
                            <Link to="/dashboard" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                <FontAwesomeIcon icon={faTachometerAlt} className="w-4 h-4 mr-2" />
                                Dashboard
                            </Link>
                            <Link to="/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                <FontAwesomeIcon icon={faCog} className="w-4 h-4 mr-2" />
                                Settings
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                            >
                                <FontAwesomeIcon icon={faSignOutAlt} className="w-4 h-4 mr-2" />
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserMenu;