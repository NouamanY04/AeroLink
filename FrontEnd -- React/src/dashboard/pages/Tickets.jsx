import React, { useEffect, useState } from 'react';
import Layout from '../Layouts/Layout';
import { FaTicketAlt, FaDownload, FaPlusCircle } from 'react-icons/fa';
import axios from 'axios';

export default function Tickets({ title }) {
  const [reservations, setReservations] = useState([]);
  const [airlines, setAirlines] = useState([]);
  const [loading, setLoading] = useState(true);

  const USER_ID = localStorage.getItem('userLoggedId');

  useEffect(() => {
    document.title = title;

    const fetchData = async () => {
      try {
        const [reservationsRes, airlinesRes] = await Promise.all([
          axios.get('http://127.0.0.1:8000/api/reservations'),
          axios.get('http://127.0.0.1:8000/api/airline'),
        ]);

        const filteredReservations = reservationsRes.data.filter(
          (reservation) => reservation.client?.user_id === USER_ID
        );

        setReservations(filteredReservations);
        setAirlines(airlinesRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [title]);

  const getAirlineImage = (airlineId) => {
    const airline = airlines.find((a) => a.id === airlineId);
    return airline ? `http://127.0.0.1:8000/storage/${airline.image}` : './logo192.png';
  };

  const getAirlineName = (airlineId) => {
    const airline = airlines.find((a) => a.id === airlineId);
    return airline ? airline.name : 'Unknown Airline';
  };

  return (
    <Layout pageTitle="Tickets" pageIcon="fa-ticket" pagePath="Dashboard" title2="Tickets">
      <div className="flex flex-col items-start p-6 text-white w-full">
        {/* New Ticket Button */}
        <div className="w-full mb-6 flex justify-end">
          <a
            href="/new-ticket"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow transition-all"
          >
            <FaPlusCircle />
            <span>Get New Ticket</span>
          </a>
        </div>

        {/* Tickets List */}
        <div className="w-full">
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <i className="fas fa-spinner fa-spin text-2xl text-white mr-2"></i>
              <span>Loading tickets...</span>
            </div>
          ) : reservations.length === 0 ? (
            <div className="text-center text-gray-300 py-8">No tickets found for this user.</div>
          ) : (
            reservations.map((reservation) => (
              <div
                key={reservation.id}
                className="p-6 rounded-lg mb-4"
                style={{ background: '#2C2D33', color: 'white' }}
              >
                <div className="flex justify-between items-center flex-wrap gap-4">
                  {/* Ticket ID */}
                  <div className="flex items-center gap-1">
                    <FaTicketAlt className="text-blue-500" />
                    <h2>{String(reservation.id).padStart(6, '0')}</h2>
                  </div>

                  {/* Airline Logo + Name */}
                  <div className="flex items-center gap-2">
                    <img
                      src={getAirlineImage(reservation.flight.airline_id)}
                      alt="Airline Logo"
                      className="w-10 h-10 rounded-full border-2 border-white object-cover"
                    />
                    <span className="text-white text-sm font-semibold">
                      {getAirlineName(reservation.flight.airline_id)}
                    </span>
                  </div>

                  {/* Price + Status */}
                  <div className="flex items-center gap-4">
                    <h2>{reservation.flight.price} $</h2>
                    <span
                      className={`${reservation.status === 'confirmed'
                        ? 'bg-green-500'
                        : reservation.status === 'cancelled'
                          ? 'bg-red-500'
                          : reservation.status === 'check-in'
                            ? 'bg-blue-500'
                            : 'bg-yellow-500'
                        } text-white px-3 py-1 rounded-full text-sm`}
                    >
                      {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                    </span>
                  </div>

                  {/* Download Button */}
                  <div className="flex items-center gap-2 text-blue-500 cursor-pointer">
                    <FaDownload />
                    <span>Download</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}
