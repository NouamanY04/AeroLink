import React from 'react';
import { Plane, Clock, MapPin, Calendar, ArrowRight } from 'lucide-react';

const UpcomingFlights = () => {
    const upcomingFlights = [
        {
            id: 1,
            flightNumber: 'EF 1234',
            airline: 'Emirates',
            from: 'New York',
            to: 'London',
            fromCode: 'JFK',
            toCode: 'LHR',
            departureDate: '2024-03-15',
            departureTime: '14:30',
            arrivalDate: '2024-03-16',
            arrivalTime: '02:45',
            duration: '7h 15m',
            class: 'Business',
            gate: 'A12',
            status: 'On Time',
            logo: '🇦🇪'
        },
        {
            id: 2,
            flightNumber: 'EF 5678',
            airline: 'Lufthansa',
            from: 'London',
            to: 'Tokyo',
            fromCode: 'LHR',
            toCode: 'NRT',
            departureDate: '2024-03-20',
            departureTime: '10:15',
            arrivalDate: '2024-03-21',
            arrivalTime: '06:30',
            duration: '11h 15m',
            class: 'Economy',
            gate: 'B7',
            status: 'Delayed',
            logo: '🇩🇪'
        },
        {
            id: 3,
            flightNumber: 'EF 9012',
            airline: 'Air France',
            from: 'Tokyo',
            to: 'Paris',
            fromCode: 'NRT',
            toCode: 'CDG',
            departureDate: '2024-03-25',
            departureTime: '16:45',
            arrivalDate: '2024-03-25',
            arrivalTime: '21:30',
            duration: '12h 45m',
            class: 'First',
            gate: 'C15',
            status: 'Boarding',
            logo: '🇫🇷'
        }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'On Time':
                return 'bg-green-100 text-green-800';
            case 'Delayed':
                return 'bg-red-100 text-red-800';
            case 'Boarding':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getFlightClassColor = (flightClass) => {
        switch (flightClass) {
            case 'First':
                return 'bg-purple-100 text-purple-800';
            case 'Business':
                return 'bg-blue-100 text-blue-800';
            case 'Economy':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-gray-900">Upcoming Flights</h3>
                    <button className="text-blue-600 hover:text-blue-700 text-xs font-medium">
                        View All
                    </button>
                </div>
            </div>

            <div className="divide-y divide-gray-200">
                {upcomingFlights.map((flight) => (
                    <div key={flight.id} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-2 lg:space-y-0">
                            {/* Flight Info */}
                            <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                    <span className="text-lg">{flight.logo}</span>
                                    <div>
                                        <h4 className="font-semibold text-sm text-gray-900">{flight.airline}</h4>
                                        <p className="text-xs text-gray-500">{flight.flightNumber}</p>
                                    </div>
                                    <div className="flex space-x-1">
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${getStatusColor(flight.status)}`}>
                                            {flight.status}
                                        </span>
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${getFlightClassColor(flight.class)}`}>
                                            {flight.class}
                                        </span>
                                    </div>
                                </div>

                                {/* Route */}
                                <div className="flex items-center space-x-2 mb-2">
                                    <div className="text-center">
                                        <p className="text-base font-bold text-gray-900">{flight.departureTime}</p>
                                        <p className="text-xs text-gray-500">{flight.fromCode}</p>
                                        <p className="text-[10px] text-gray-400">{flight.from}</p>
                                    </div>

                                    <div className="flex-1 flex items-center justify-center">
                                        <div className="flex items-center space-x-1">
                                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                            <div className="flex-1 h-px bg-gray-300"></div>
                                            <Plane className="h-3 w-3 text-blue-500" />
                                            <div className="flex-1 h-px bg-gray-300"></div>
                                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                        </div>
                                    </div>

                                    <div className="text-center">
                                        <p className="text-base font-bold text-gray-900">{flight.arrivalTime}</p>
                                        <p className="text-xs text-gray-500">{flight.toCode}</p>
                                        <p className="text-[10px] text-gray-400">{flight.to}</p>
                                    </div>
                                </div>

                                {/* Flight Details */}
                                <div className="flex items-center space-x-4 text-xs text-gray-500">
                                    <div className="flex items-center space-x-1">
                                        <Calendar className="h-3 w-3" />
                                        <span>{flight.departureDate}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Clock className="h-3 w-3" />
                                        <span>{flight.duration}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <MapPin className="h-3 w-3" />
                                        <span>Gate {flight.gate}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col space-y-1 lg:ml-4">
                                <button className="bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors text-xs font-medium">
                                    Check In
                                </button>
                                <button className="border border-gray-300 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors text-xs font-medium">
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="p-4 bg-gray-50 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                    <button className="flex items-center space-x-1 bg-white border border-gray-300 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors text-xs">
                        <Calendar className="h-3 w-3" />
                        <span>Manage Bookings</span>
                    </button>
                    <button className="flex items-center space-x-1 bg-white border border-gray-300 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors text-xs">
                        <MapPin className="h-3 w-3" />
                        <span>Flight Status</span>
                    </button>
                    <button className="flex items-center space-x-1 bg-white border border-gray-300 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors text-xs">
                        <Plane className="h-3 w-3" />
                        <span>Seat Selection</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpcomingFlights;

