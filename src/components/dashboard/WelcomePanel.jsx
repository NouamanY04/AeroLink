import React from 'react';
import { Plane, Calendar, MapPin, TrendingUp } from 'lucide-react';

const WelcomePanel = () => {
    const stats = [
        {
            title: 'Upcoming Flights',
            value: '3',
            icon: Plane,
            color: 'bg-blue-500',
            change: '+2 this month'
        },
        {
            title: 'Total Bookings',
            value: '24',
            icon: Calendar,
            color: 'bg-green-500',
            change: '+4 this year'
        },
        {
            title: 'Destinations Visited',
            value: '12',
            icon: MapPin,
            color: 'bg-purple-500',
            change: '+3 new cities'
        },
        {
            title: 'Miles Earned',
            value: '45,230',
            icon: TrendingUp,
            color: 'bg-orange-500',
            change: '+2,340 this month'
        }
    ];

    return (
        <div className="space-y-4">
            {/* Welcome Message */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-4 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold mb-1">Welcome back, John! ✈️</h2>
                        <p className="text-blue-100 text-xs">
                            Ready for your next adventure? You have 3 upcoming flights.
                        </p>
                    </div>
                    <div className="hidden md:block">
                        <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                            <Plane className="h-5 w-5 text-white" />
                        </div>
                    </div>
                </div>

                {/* Quick Action */}
                <div className="mt-4">
                    <button className="bg-white text-blue-600 px-4 py-1.5 rounded-md font-medium text-xs hover:bg-blue-50 transition-colors">
                        Book New Flight
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-2">
                                <div className={`w-8 h-8 ${stat.color} rounded-lg flex items-center justify-center`}>
                                    <Icon className="h-4 w-4 text-white" />
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-1">{stat.value}</h3>
                                <p className="text-xs text-gray-600 mb-1">{stat.title}</p>
                                <p className="text-[10px] text-green-600 font-medium">{stat.change}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default WelcomePanel;

