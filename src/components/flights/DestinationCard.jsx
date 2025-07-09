import React from 'react';

function DestinationCard({ destination, onSelect }) {
    return (
        <div
            className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 cursor-pointer"
            onClick={() => onSelect && onSelect(destination)}
        >
            <img
                src={destination.image || 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'}
                alt={destination.title}
                className="w-full h-48 object-cover"
            />
            <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 line-clamp-2">{destination.title}</h3>
                <p className="text-gray-600 mb-4">{destination.location}</p>
                <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-blue-600">${destination.price}</span>
                    <div className="flex items-center">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span>{destination.rate}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DestinationCard;