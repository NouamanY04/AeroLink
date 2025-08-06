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
        <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200/60 px-6 py-4 h-16">
            <div className="flex items-center justify-between h-full">
                {/* Page Title */}
                <div className="ml-0 lg:ml-0">
                    <h1 className="text-xl font-semibold text-slate-800 tracking-tight">{getSectionTitle(activeSection)}</h1>

                </div>

                {/* Header Actions */}
                <div className="flex items-center space-x-4">
                    {/* Notifications */}
                    <button className="relative p-3 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-all duration-200 group">
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
                        <span className="absolute inset-0 bg-slate-100 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                    </button>

                    {/* User Avatar */}
                    <div className={`w-10 h-10 bg-gradient-to-r ${avatarColor} rounded-xl flex items-center justify-center text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer hover:scale-105`}>
                        {avatarInitial}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;

