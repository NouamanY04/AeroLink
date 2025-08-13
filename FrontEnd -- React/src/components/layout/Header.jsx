import React, { useEffect, useState } from 'react';
import { Bell, Search, ArrowLeft, Globe } from 'lucide-react';
import { supabase } from '../../services/supabaseClient';
import { useNavigate } from 'react-router-dom';

const Header = ({ activeSection, avatarColor, avatarInitial }) => {
    const navigate = useNavigate();

    const getSectionTitle = (section) => {
        const titles = {
            dashboard: 'Dashboard',
            profile: 'Profile Settings',
        };
        return titles[section] || 'Dashboard';
    };

    const handleReturnToWebsite = () => {
        navigate('/');
    };

    return (
        <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200/60 px-6 py-4 h-16">
            <div className="flex items-center justify-between h-full">
                {/* Page Title and Return Button */}
                <div className="flex items-center space-x-4">
                    <button
                        onClick={handleReturnToWebsite}
                        className="relative flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-xl font-semibold text-sm hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 transform group"
                    >
                        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200" />
                        {/* Tooltip message */}
                        <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-1 bg-slate-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                            Return to AeroLink Website
                        </span>
                    </button>

                    <div className="ml-4">
                        <h1 className="text-xl font-semibold text-slate-800 tracking-tight">{getSectionTitle(activeSection)}</h1>
                    </div>
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

