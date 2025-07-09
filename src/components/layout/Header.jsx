import React from 'react';
import { Bell, Search } from 'lucide-react';

const Header = ({ activeSection }) => {
    const getSectionTitle = (section) => {
        const titles = {
            dashboard: 'Dashboard',
            flights: 'My Flights',
            wishlist: 'Wishlist',
            profile: 'Profile Settings',
            payment: 'Payment Methods',
            support: 'Support & Help'
        };
        return titles[section] || 'Dashboard';
    };

    return (
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-2 h-16">
            <div className="flex items-center justify-between">
                {/* Page Title */}
                <div className="ml-0 lg:ml-0">
                    <h1 className="text-base font-medium text-gray-900">{getSectionTitle(activeSection)}</h1>
                    <p className="text-[10px] text-gray-500 mt-1">
                        {new Date().toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </p>
                </div>

                {/* Header Actions */}
                <div className="flex items-center space-x-2">
                    {/* Search */}
                    <div className="hidden md:flex relative">
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-3 w-3" />
                        <input
                            type="text"
                            placeholder="Search flights, bookings..."
                            className="pl-7 pr-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-40 text-xs"
                        />
                    </div>

                    {/* Notifications */}
                    <button className="relative p-1 text-gray-400 hover:text-gray-600 transition-colors">
                        <Bell className="h-4 w-4" />
                        <span className="absolute top-0 right-0 h-1.5 w-1.5 bg-red-500 rounded-full"></span>
                    </button>


                    {/* User Avatar */}
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                        JD
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;

