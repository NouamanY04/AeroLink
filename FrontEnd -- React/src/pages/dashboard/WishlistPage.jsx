import React, { useState } from 'react';
import { Heart, MapPin, Calendar, DollarSign, Plane, Trash2, Search, Filter, Plus } from 'lucide-react';

const Wishlist = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date-added');

  const wishlistItems = [
    {
      id: 1,
      destination: 'Paris, France',
      country: 'France',
      image: '🇫🇷',
      estimatedPrice: '$850',
      bestTimeToVisit: 'Apr - Jun, Sep - Oct',
      dateAdded: '2024-02-15',
      notes: 'Visit the Eiffel Tower and Louvre Museum',

    },
    {
      id: 2,
      destination: 'Tokyo, Japan',
      country: 'Japan',
      image: '🇯🇵',
      estimatedPrice: '$1,200',
      bestTimeToVisit: 'Mar - May, Sep - Nov',
      dateAdded: '2024-02-10',
      notes: 'Cherry blossom season and traditional temples',
    },
    {
      id: 3,
      destination: 'Santorini, Greece',
      country: 'Greece',
      image: '🇬🇷',
      estimatedPrice: '$950',
      bestTimeToVisit: 'Apr - Jun, Sep - Oct',
      dateAdded: '2024-01-28',
      notes: 'Beautiful sunsets and white architecture',
    },
    {
      id: 4,
      destination: 'Bali, Indonesia',
      country: 'Indonesia',
      image: '🇮🇩',
      estimatedPrice: '$750',
      bestTimeToVisit: 'Apr - Oct',
      dateAdded: '2024-01-20',
      notes: 'Tropical beaches and cultural experiences',
    },
    {
      id: 5,
      destination: 'Dubai, UAE',
      country: 'United Arab Emirates',
      image: '🇦🇪',
      estimatedPrice: '$1,100',
      bestTimeToVisit: 'Nov - Mar',
      dateAdded: '2024-01-15',
      notes: 'Modern architecture and luxury shopping',
    }
  ];

  const filteredItems = wishlistItems.filter(item =>
    item.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'destination':
        return a.destination.localeCompare(b.destination);
      case 'price-low':
        return parseInt(a.estimatedPrice.replace(/[$,]/g, '')) - parseInt(b.estimatedPrice.replace(/[$,]/g, ''));
      case 'price-high':
        return parseInt(b.estimatedPrice.replace(/[$,]/g, '')) - parseInt(a.estimatedPrice.replace(/[$,]/g, ''));
      case 'date-added':
      default:
        return new Date(b.dateAdded) - new Date(a.dateAdded);
    }
  });

  const removeFromWishlist = (id) => {
    console.log('Removing item from wishlist:', id);
  };


  const searchFlights = (destination) => {
    console.log('Searching flights to:', destination);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <h3 className="text-base font-semibold text-gray-900">My Wishlist</h3>
          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
            {sortedItems.length} {sortedItems.length > 1 ? 'destinations' : 'destination'}
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-1">Save destinations you want to visit</p>


        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-3">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-3 w-3" />
            <input
              type="text"
              placeholder="Search destinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-2 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs"
            />
          </div>

          <div className="flex items-center space-x-1">
            <Filter className="h-3 w-3 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-2 py-1 text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="date-added">Recently Added</option>
              <option value="destination">Destination A-Z</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Wishlist Items */}
      <div className="p-4">
        {sortedItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {sortedItems.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                {/* Card Header */}
                <div className="relative bg-gradient-to-r from-blue-500 to-blue-600 p-3 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{item.image}</span>
                      <div>
                        <h4 className="font-semibold text-sm">{item.destination}</h4>
                        <p className="text-blue-100 text-xs">{item.country}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="text-white hover:text-red-200 transition-colors"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-3 space-y-2">
                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <DollarSign className="h-3 w-3 text-gray-400" />
                      <span className="font-semibold text-xs text-gray-900">{item.estimatedPrice}</span>
                      <span className="text-[10px] text-gray-500">estimated</span>
                    </div>
                  </div>

                  {/* Best Time to Visit */}
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-600">Best time: {item.bestTimeToVisit}</span>
                  </div>

                  {/* Notes */}
                  {item.notes && (
                    <div className="bg-gray-50 rounded-lg p-2">
                      <p className="text-xs text-gray-600">{item.notes}</p>
                    </div>
                  )}

                  {/* Date Added */}
                  <div className="text-[10px] text-gray-400">
                    Added on {new Date(item.dateAdded).toLocaleDateString()}
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <Heart className="h-8 w-8 text-gray-300 mx-auto mb-2" />
            <h4 className="text-sm font-medium text-gray-900 mb-1">
              {searchQuery ? 'No destinations found' : 'Your wishlist is empty'}
            </h4>
            <p className="text-xs text-gray-500 mb-2">
              {searchQuery
                ? 'Try searching with different keywords'
                : 'Start adding destinations you want to visit'
              }
            </p>
            {!searchQuery && (
              <button className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors text-xs">
                Add Your First Destination
              </button>
            )}
          </div>
        )}
      </div>

    </div>
  );
};

export default Wishlist;

