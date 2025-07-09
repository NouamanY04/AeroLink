import React, { useState } from 'react';
import { Filter, Download, Calendar, MapPin, Plane, ChevronLeft, ChevronRight, Search, CheckCircle, XCircle, Clock } from 'lucide-react';

const FlightHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    dateRange: '',
    destination: '',
    airline: '',
    status: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  const flightHistory = [
    {
      id: 1,
      flightNumber: 'EF 1001',
      airline: 'Emirates',
      from: 'Dubai',
      to: 'New York',
      fromCode: 'DXB',
      toCode: 'JFK',
      date: '2024-02-15',
      departureTime: '08:30',
      arrivalTime: '14:45',
      status: 'Completed',
      class: 'Business',
      price: '$2,450',
      logo: '🇦🇪'
    },
    {
      id: 2,
      flightNumber: 'EF 2002',
      airline: 'Lufthansa',
      from: 'Frankfurt',
      to: 'Tokyo',
      fromCode: 'FRA',
      toCode: 'NRT',
      date: '2024-01-28',
      departureTime: '11:20',
      arrivalTime: '06:15+1',
      status: 'Completed',
      class: 'Economy',
      price: '$890',
      logo: '🇩🇪'
    },
    {
      id: 3,
      flightNumber: 'EF 3003',
      airline: 'Air France',
      from: 'Paris',
      to: 'London',
      fromCode: 'CDG',
      toCode: 'LHR',
      date: '2024-01-10',
      departureTime: '16:45',
      arrivalTime: '17:30',
      status: 'Cancelled',
      class: 'Economy',
      price: '$320',
      logo: '🇫🇷'
    },
    {
      id: 4,
      flightNumber: 'EF 4004',
      airline: 'Singapore Airlines',
      from: 'Singapore',
      to: 'Sydney',
      fromCode: 'SIN',
      toCode: 'SYD',
      date: '2023-12-20',
      departureTime: '23:55',
      arrivalTime: '09:30+1',
      status: 'Completed',
      class: 'First',
      price: '$3,200',
      logo: '🇸🇬'
    },
    {
      id: 5,
      flightNumber: 'EF 5005',
      airline: 'British Airways',
      from: 'London',
      to: 'Los Angeles',
      fromCode: 'LHR',
      toCode: 'LAX',
      date: '2023-11-15',
      departureTime: '12:30',
      arrivalTime: '16:45',
      status: 'Delayed',
      class: 'Premium Economy',
      price: '$1,650',
      logo: '🇬🇧'
    }
  ];

  const itemsPerPage = 3;
  const totalPages = Math.ceil(flightHistory.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFlights = flightHistory.slice(startIndex, endIndex);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Cancelled':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'Delayed':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      case 'Delayed':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
          <h3 className="text-base font-semibold text-gray-900">Flight History</h3>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-1 px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-xs"
            >
              <Filter className="h-3 w-3" />
              <span>Filters</span>
            </button>

            <button className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors text-xs">
              <Download className="h-3 w-3" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Date Range</label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-2 py-1 text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filters.dateRange}
                  onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                >
                  <option value="">All Time</option>
                  <option value="last-month">Last Month</option>
                  <option value="last-3-months">Last 3 Months</option>
                  <option value="last-year">Last Year</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Destination</label>
                <input
                  type="text"
                  placeholder="Search destination..."
                  className="w-full border border-gray-300 rounded-lg px-2 py-1 text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filters.destination}
                  onChange={(e) => handleFilterChange('destination', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Airline</label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-2 py-1 text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filters.airline}
                  onChange={(e) => handleFilterChange('airline', e.target.value)}
                >
                  <option value="">All Airlines</option>
                  <option value="emirates">Emirates</option>
                  <option value="lufthansa">Lufthansa</option>
                  <option value="air-france">Air France</option>
                  <option value="singapore">Singapore Airlines</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-2 py-1 text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                >
                  <option value="">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="delayed">Delayed</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Flight List */}
      <div className="divide-y divide-gray-200">
        {currentFlights.map((flight) => (
          <div key={flight.id} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-2 lg:space-y-0">
              {/* Flight Info */}
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-lg">{flight.logo}</span>
                  <div>
                    <h4 className="font-semibold text-xs text-gray-900">{flight.airline}</h4>
                    <p className="text-[11px] text-gray-500">{flight.flightNumber}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(flight.status)}
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${getStatusColor(flight.status)}`}>
                      {flight.status}
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
                    <span>{flight.date}</span>
                  </div>
                  <div>
                    <span className="font-medium">{flight.class}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">{flight.price}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col space-y-1 lg:ml-4">
                <button className="bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors text-xs font-medium">
                  Download Receipt
                </button>
                <button className="border border-gray-300 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors text-xs font-medium">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500">
            Showing {startIndex + 1} to {Math.min(endIndex, flightHistory.length)} of {flightHistory.length} flights
          </p>

          <div className="flex items-center space-x-1">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-3 w-3" />
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-2 py-1 rounded-lg text-xs font-medium transition-colors ${currentPage === index + 1
                  ? 'bg-blue-600 text-white'
                  : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightHistory;

