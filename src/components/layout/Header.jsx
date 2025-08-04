import React, { useEffect, useState } from 'react';
import { Bell, Search } from 'lucide-react';
import { supabase } from '../../services/supabaseClient';


const Header = ({ activeSection, avatarColor, avatarInitial }) => {

    const getSectionTitle = (section) => {
        const titles = {
            dashboard: 'Dashboard',
            profile: 'Profile Settings',
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
                    {/* Notifications */}
                    <button className="relative p-1 text-gray-400 hover:text-gray-600 transition-colors">
                        <Bell className="h-4 w-4" />
                        <span className="absolute top-0 right-0 h-1.5 w-1.5 bg-red-500 rounded-full"></span>
                    </button>


                    {/* User Avatar */}
                    <div className={`w-6 h-6 bg-gradient-to-r ${avatarColor} rounded-full flex items-center justify-center text-white font-semibold text-xs`}>
                        {avatarInitial}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;

