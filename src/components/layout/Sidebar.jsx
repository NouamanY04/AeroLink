import React, { useState } from 'react';
import { Home, Plane, Heart, User, CreditCard, HelpCircle, LogOut, Menu, X, Bell } from 'lucide-react';

const Sidebar = ({ activeSection, setActiveSection, isMobileMenuOpen, setIsMobileMenuOpen }) => {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: Home },
        { id: 'flights', label: 'My Flights', icon: Plane },
        { id: 'wishlist', label: 'Wishlist', icon: Heart },
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'payment', label: 'Payment', icon: CreditCard },
        { id: 'support', label: 'Support', icon: HelpCircle },
    ];

    const handleMenuClick = (sectionId) => {
        setActiveSection(sectionId);
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
            >
                {<Menu size={24} />}
            </button>

            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className="w-48 bg-white shadow-xl flex flex-col justify-between h-full lg:shadow-none lg:border-r lg:border-gray-200">
                {/* Sidebar Content */}
                <div className="flex flex-col flex-1">
                    {/* Logo */}
                    <div className="flex items-center justify-center h-10 px-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                        <div className="flex items-center space-x-1">
                            <svg
                                className="w-4 h-4 text-white"
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
                            <span className="text-xs font-medium">AeroLink</span>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-2 py-2 space-y-1">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = activeSection === item.id;

                            return (
                                <button
                                    key={item.id}
                                    onClick={() => handleMenuClick(item.id)}
                                    className={`
                                w-full flex items-center px-2 py-1 text-left rounded-lg transition-all duration-200 text-xs
                                ${isActive
                                            ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }
                            `}
                                >
                                    <Icon className={`h-3 w-3 mr-2 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                                    <span className="font-normal">{item.label}</span>
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* User Section at Bottom */}
                <div className="px-2 py-2 border-t border-gray-200">
                    <div className="flex items-center space-x-2 mb-3">
                        <div className="w-7 h-7 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                            JD
                        </div>
                        <div>
                            <p className="text-xs font-medium text-gray-900">John Doe</p>
                            <p className="text-[10px] text-gray-500">Premium Member</p>
                        </div>
                    </div>

                    <button className="w-full flex items-center px-2 py-1 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors text-xs">
                        <LogOut className="h-3 w-3 mr-2" />
                        <span className="text-xs font-normal">Logout</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default Sidebar;

