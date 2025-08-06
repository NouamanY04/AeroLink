import React, { useState, useEffect } from 'react';
import { Home, Plane, Heart, User, CreditCard, HelpCircle, LogOut, Menu, X, Bell } from 'lucide-react';
import { getStableAvatarColor } from '../../utils/Avatar';

const Sidebar = ({ activeSection, setActiveSection, isMobileMenuOpen, setIsMobileMenuOpen, avatarColor, avatarInitial }) => {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: Home },
        { id: 'profile', label: 'Profile', icon: User },
    ];

    const [userName, setUserName] = useState('User');
    const [userEmail, setUserEmail] = useState('');


    useEffect(() => {
        const updateUserInfo = () => {
            const username = localStorage.getItem('userLoggedName') || '';
            const email = localStorage.getItem('userLoggedEmail') || '';
            setUserName(username || 'User');
            setUserEmail(email);
        };
        updateUserInfo();
        window.addEventListener('userInfoUpdated', updateUserInfo);
        return () => window.removeEventListener('userInfoUpdated', updateUserInfo);
    }, []);

    const handleMenuClick = (sectionId) => {
        setActiveSection(sectionId);
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
                {<Menu size={20} />}
            </button>

            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className="w-64 bg-white/90 backdrop-blur-md shadow-2xl flex flex-col justify-between h-full border-r border-slate-200/60">
                {/* Sidebar Content */}
                <div className="flex flex-col flex-1">
                    {/* Logo */}
                    <div className="flex items-center justify-center h-16 px-4 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white shadow-lg">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
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
                            <span className="text-lg font-bold tracking-wide">AeroLink</span>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-6 space-y-2">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = activeSection === item.id;

                            return (
                                <button
                                    key={item.id}
                                    onClick={() => handleMenuClick(item.id)}
                                    className={`
                                        w-full flex items-center px-4 py-3 text-left rounded-xl transition-all duration-200 text-sm font-medium group
                                        ${isActive
                                            ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border border-blue-200 shadow-sm'
                                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800 hover:shadow-sm'
                                        }
                                    `}
                                >
                                    <Icon className={`h-5 w-5 mr-3 transition-colors duration-200 ${isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                                    <span className="font-medium">{item.label}</span>
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* User Section at Bottom */}
                <div className="px-4 py-6 border-t border-slate-200/60 bg-slate-50/50">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${avatarColor} rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                            {avatarInitial}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-slate-800 truncate">{userName}</p>
                            <p className="text-xs text-slate-500 truncate">{userEmail}</p>
                        </div>
                    </div>

                    <button className="w-full flex items-center justify-center px-4 py-3 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-all duration-200 text-sm font-medium group">
                        <LogOut className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform duration-200" />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default Sidebar;

