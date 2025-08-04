import React from 'react';
import { Plane, Calendar } from 'lucide-react';

const WelcomePanel = () => {
    const stats = [
        {
            title: 'Upcoming Flights',
            value: '3',
            icon: Plane,
            color: 'bg-blue-500',
        },
        {
            title: 'Total Bookings',
            value: '24',
            icon: Calendar,
            color: 'bg-green-500',
        },
    ];

    return (
        <div className="space-y-4">
            {/* Quick Stats */}
            <div className="flex flex-row gap-6 mt-3 w-full">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={index}
                            className="bg-white rounded-lg px-8 py-2 shadow-sm border border-gray-200 hover:shadow-md transition-shadow flex items-center flex-1 min-w-0 h-20"
                        >
                            <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center mr-4`}>
                                <Icon className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-0">{stat.value}</h3>
                                <p className="text-sm text-gray-600 mb-0">{stat.title}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default WelcomePanel;

