import React, { useState, useEffect } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import WelcomePanel from './components/dashboard/WelcomePanel';
import UpcomingFlights from './components/dashboard/UpcomingFlights';
import NotificationsCenter from './components/dashboard/NotificationsCenter';
import ProfileSettings from './pages/dashboard/ProfilePage';
import { getStableAvatarColor } from './utils/Avatar';

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

function getInitials(name) {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
}

function AppDashboard() {
    const [activeSection, setActiveSection] = useState('dashboard');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isContentLoaded, setIsContentLoaded] = useState(false);
    const [avatarColor, setAvatarColor] = useState(avatarColors[Math.floor(Math.random() * avatarColors.length)]);
    const [avatarInitial, setAvatarInitial] = useState('U');

    useEffect(() => {
        setIsContentLoaded(true);
    }, []);

    useEffect(() => {
        // Set initial and color when user info changes
        const updateAvatar = () => {
            const username = localStorage.getItem('userLoggedName') || '';
            setAvatarInitial(getInitials(username));
            setAvatarColor(getStableAvatarColor(username));
        };
        updateAvatar();
        window.addEventListener('userInfoUpdated', updateAvatar);
        return () => window.removeEventListener('userInfoUpdated', updateAvatar);
    }, []);

    // This function returns the appropriate component based on the active section
    // This function is used to render the main content of the dashboard in the main return statement
    // default is the dashboard section (welcome panel and upcoming flights)
    const renderContent = () => {
        switch (activeSection) {
            case 'dashboard':
                return (
                    <div className="space-y-6">
                        <WelcomePanel />
                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                            <div className="xl:col-span-2">
                                <UpcomingFlights />
                            </div>
                            <div>
                                <NotificationsCenter />
                            </div>
                        </div>
                    </div>
                );
            case 'profile':
                return <ProfileSettings onContentLoaded={isContentLoaded} avatarColor={avatarColor} avatarInitial={avatarInitial} />;
            default:
                return (
                    <div className="space-y-6">
                        <WelcomePanel />
                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                            <div className="xl:col-span-2">
                                <UpcomingFlights />
                            </div>
                            <div>
                                <NotificationsCenter />
                            </div>
                        </div>
                    </div>
                );
        }
    };

    // The main return statement renders the entire dashboard layout
    // It includes the sidebar, header, and main content area
    // The main content area is populated based on the active section in the function renderContent
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex">
                {/* Sidebar */}
                <div className="fixed left-0 top-0 h-screen w-48 z-50">
                    <Sidebar
                        activeSection={activeSection}
                        setActiveSection={setActiveSection}
                        isMobileMenuOpen={isMobileMenuOpen}
                        setIsMobileMenuOpen={setIsMobileMenuOpen}
                        avatarColor={avatarColor}
                        avatarInitial={avatarInitial}
                    />
                </div>

                {/* Main Content */}
                <div className="flex-1 pl-48">
                    {/* Fixed Header */}
                    <div className="fixed top-0 left-48 right-0 z-40 h-16 ">
                        <Header activeSection={activeSection} avatarColor={avatarColor} avatarInitial={avatarInitial} />
                    </div>

                    {/* Page Content */}
                    <main className="p-6 pt-16">
                        {renderContent()}
                    </main>
                </div>
            </div>
        </div>
    );
}

export default AppDashboard;

