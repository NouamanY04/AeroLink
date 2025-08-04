import React, { useState, useEffect } from "react";
import Layout from "../Layouts/Layout";
import axios from "axios";

export default function Dashboard({ title }) {
  document.title = title;

  const [totalTickets, setTotalTickets] = useState(0);
  const [deniedTickets, setDeniedTickets] = useState(0);
  const [nomuser, setNomuser] = useState('');
  const [loading, setLoading] = useState(true);

  const USER_ID = localStorage.getItem('userLoggedId');

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/clients-reserved");

        const userReservations = response.data.filter(
          reservation => reservation.client?.user_id === USER_ID
        );

        if (userReservations.length > 0) {
          setNomuser(userReservations[0].client.name);
        }

        const denied = userReservations.filter(r => r.status === 'cancelled').length;

        const validStatuses = ['confirmed', 'booked', 'check-in'];
        const confirmedCount = userReservations.filter(r =>
          validStatuses.includes(r.status)
        ).length;

        setDeniedTickets(denied);
        setTotalTickets(confirmedCount);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  return (
    <Layout pageTitle="Dashboard" pageIcon="fa-leaf" pagePath="Dashboard" title2="">
      {loading ? (
        <div className="flex justify-center items-center w-full py-10">
          <i className="fas fa-spinner fa-spin text-white text-2xl"></i>
          <span className="text-white ml-2">Loading data...</span>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-4 p-4">
          {/* Total Tickets */}
          <div className="w-full sm:w-64 h-64 sm:h-60 flex flex-col justify-center items-center text-white rounded-lg shadow-lg relative bg-green-600">
            <a
              href="/tickets"
              className="absolute top-4 right-2 px-1 py-1 font-semibold text-xs bg-[#06281E] text-white rounded"
            >
              View All
            </a>
            <i className="fas fa-ticket-alt text-4xl mb-4"></i>
            <h2 className="text-2xl font-bold">Tickets</h2>
            <p className="text-5xl font-bold">{totalTickets}</p>
          </div>

          {/* Denied Tickets */}
          <div className="w-full sm:w-64 h-64 sm:h-60 flex flex-col justify-center items-center text-white rounded-lg shadow-lg relative bg-red-500">
            <a
              href="/denied-tickets"
              className="absolute top-4 right-2 px-1 py-1 font-semibold text-xs bg-[#06281E] text-white rounded"
            >
              View All
            </a>
            <i className="fas fa-times-circle text-4xl mb-4"></i>
            <h2 className="text-2xl font-bold">Denied Tickets</h2>
            <p className="text-5xl font-bold">{deniedTickets}</p>
          </div>

          {/* Contact Us */}
          <div className="w-full sm:w-64 h-64 sm:h-60 flex flex-col justify-center items-center text-white rounded-lg shadow-lg bg-[#2C2D33]">
            <i className="fas fa-envelope text-4xl mb-4"></i>
            <h2 className="text-2xl font-bold mb-2">Contact Us</h2>
            <p className="text-sm text-center text-gray-300 mb-4">
              Have any questions? Stay in touch
            </p>
            <button
              className="px-6 py-2 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all"
            >
              Message Us
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}
