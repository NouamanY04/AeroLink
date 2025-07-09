import React, { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import WelcomePanel from './components/dashboard/WelcomePanel';
import UpcomingFlights from './components/dashboard/UpcomingFlights';
import FlightHistory from './pages/dashboard/FlightHistoryPage';
import NotificationsCenter from './components/dashboard/NotificationsCenter';
import ProfileSettings from './pages/dashboard/ProfilePage';
import PaymentMethods from './pages/dashboard/PaymentPage';
import SupportCenter from './pages/dashboard/SupportCenterPage';
import Wishlist from './pages/dashboard/WishlistPage';

function AppDashboard() {
    const [activeSection, setActiveSection] = useState('dashboard');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
            case 'flights':
                return <FlightHistory />;
            case 'wishlist':
                return <Wishlist />;
            case 'profile':
                return <ProfileSettings />;
            case 'payment':
                return <PaymentMethods />;
            case 'support':
                return <SupportCenter />;
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
                    />
                </div>

                {/* Main Content */}
                <div className="flex-1 pl-48">
                    {/* Fixed Header */}
                    <div className="fixed top-0 left-48 right-0 z-40 h-16 ">
                        <Header activeSection={activeSection} />
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

