import React, { useEffect, useState } from 'react';
import { Plane, Clock, MapPin, Calendar, ArrowRight, ExternalLink } from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import TicketDocument from '../bookings/TicketDocument';
import { getUpcomingFlights } from '../../services/ClientService';

const UpcomingFlights = () => {
    const [flights, setFlights] = useState([]);
    const [clientInfo, setClientInfo] = useState(null);
    const [downloadedId, setDownloadedId] = useState(null);

    const getStatusColor = (status) => {
        switch (status) {
            case 'scheduled':
            case 'On Time':
                return 'bg-emerald-100 text-emerald-800 border-emerald-200';
            case 'Delayed':
            case 'delayed':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'Boarding':
            case 'boarding':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            default:
                return 'bg-slate-100 text-slate-800 border-slate-200';
        }
    };

    const getFlightClassColor = (flightClass) => {
        switch (flightClass?.toLowerCase()) {
            case 'first':
                return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'business':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'economy':
                return 'bg-slate-100 text-slate-800 border-slate-200';
            default:
                return 'bg-slate-100 text-slate-800 border-slate-200';
        }
    };

    useEffect(() => {
        const fetchUpcomingFlights = async () => {
            try {
                const username = localStorage.getItem('userLoggedName');
                if (username) {
                    const response = await getUpcomingFlights(username);
                    setFlights(response.data?.flights || []);
                    setClientInfo(response.data?.client || null);
                }
            } catch (error) {
                console.error('Error fetching upcoming flights:', error);
            }
        };

        fetchUpcomingFlights();
    }, []);

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 overflow-hidden">
            <div className="p-6 border-b border-slate-200/60 bg-gradient-to-r from-slate-50 to-blue-50/30">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-slate-800">Upcoming Flights</h3>
                        <p className="text-slate-600 text-sm mt-1">Your next adventures await</p>
                    </div>
                </div>
            </div>

            <div className="divide-y divide-slate-200/60">
                {flights.length === 0 ? (
                    <div className="p-6 text-center text-slate-500">No upcoming flights found.</div>
                ) : (
                    flights.map((item) => {
                        const flight = item.flight;
                        return (
                            <div key={item.booking_id} className="p-6 hover:bg-slate-50/50 transition-all duration-200 group">
                                <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                                    {/* Flight Info */}
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3 mb-4">
                                            <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center">
                                                {/* Airline logo or emoji, fallback to country flag */}
                                                {flight.airline?.image ? (
                                                    <img
                                                        src={`http://localhost:8000/storage/${flight.airline.image}`}
                                                        alt={flight.airline.name}
                                                        className="w-10 h-10 object-contain rounded"
                                                    />
                                                ) : (
                                                    <span className="text-2xl">{flight.airline?.country === 'Germany' ? '🇩🇪' : '✈️'}</span>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-slate-800 text-lg">{flight.airline?.name}</h4>
                                                <p className="text-slate-500 text-sm">{flight.flight_number}</p>
                                            </div>
                                            <div className="flex space-x-2">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(flight.status)}`}>
                                                    {flight.status}
                                                </span>
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getFlightClassColor(flight.class)}`}>
                                                    {flight.class}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Route */}
                                        <div className="flex items-center space-x-4 mb-4">
                                            <div className="text-center">
                                                <p className="text-2xl font-bold text-slate-800">
                                                    {flight.departure_time?.slice(11, 16)}
                                                </p>
                                                <p className="text-sm font-semibold text-slate-600">{flight.departure_airport?.code}</p>
                                                <p className="text-xs text-slate-500">{flight.departure_airport?.city}</p>
                                            </div>

                                            <div className="flex-1 flex items-center justify-center">
                                                <div className="flex items-center space-x-2 w-full max-w-xs">
                                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                    <div className="flex-1 h-0.5 bg-gradient-to-r from-blue-500 to-blue-300"></div>
                                                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                                        <Plane className="h-4 w-4 text-white" />
                                                    </div>
                                                    <div className="flex-1 h-0.5 bg-gradient-to-r from-blue-300 to-blue-500"></div>
                                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                </div>
                                            </div>

                                            <div className="text-center">
                                                <p className="text-2xl font-bold text-slate-800">
                                                    {flight.arrival_time?.slice(11, 16)}
                                                </p>
                                                <p className="text-sm font-semibold text-slate-600">{flight.arrival_airport?.code}</p>
                                                <p className="text-xs text-slate-500">{flight.arrival_airport?.city}</p>
                                            </div>
                                        </div>

                                        {/* Flight Details */}
                                        <div className="flex items-center space-x-6 text-sm text-slate-600">
                                            <div className="flex items-center space-x-2">
                                                <Calendar className="h-4 w-4 text-slate-400" />
                                                <span className="font-medium">{flight.departure_time?.slice(0, 10)}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <MapPin className="h-4 w-4 text-slate-400" />
                                                <span className="font-medium">{item.seat_number}</span>
                                            </div>

                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <div className="lg:ml-6 flex flex-col items-end">
                                        {clientInfo && (
                                            <PDFDownloadLink
                                                document={<TicketDocument clientInfo={clientInfo} flight={flight} />}
                                                fileName={`AeroLink-ticket-${clientInfo.name}-${flight.flight_number}.pdf`}
                                            >
                                                {({ loading }) => (
                                                    <button
                                                        className={`px-4 py-2 text-xs font-medium rounded transition-colors duration-200
                                                            ${downloadedId === item.booking_id
                                                                ? 'bg-green-600 hover:bg-green-700 text-white'
                                                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                                                            }`}
                                                        onClick={() => !loading && setDownloadedId(item.booking_id)}
                                                        disabled={loading}
                                                    >
                                                        {loading ? (
                                                            'Generating...'
                                                        ) : downloadedId === item.booking_id ? (
                                                            <span className="flex items-center gap-2">
                                                                <span className="w-4 h-4 bg-green-500 rounded-full inline-block"></span>
                                                                Ticket Downloaded
                                                            </span>
                                                        ) : (
                                                            <span className="flex items-center gap-2">
                                                                <span className="w-4 h-4 bg-blue-500 rounded-full inline-block"></span>
                                                                Download Ticket
                                                            </span>
                                                        )}
                                                    </button>
                                                )}
                                            </PDFDownloadLink>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default UpcomingFlights;

