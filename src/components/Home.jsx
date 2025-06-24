import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetch_data_flights, setInfoContact, setInfoTrip } from '../actions';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import SearchForm from './SearchForm';
import DestinationCard from './DestinationCard';
import Footer from './Footer';


function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State from Redux
  const infoTrip = useSelector((state) => state.infoTrip.infoTrip);

  // Local states for UI interactions
  const [airportSuggestions, setAirportSuggestions] = useState({ departure: [], arrival: [] });
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [focusedField, setFocusedField] = useState(null);
  const [notification, setNotification] = useState('');

  // Refs for sections
  const ReasonsSection = useRef();
  const headerSection = useRef();

  // Updated popular destinations with better images
  const listpopularDestination = [
    {
      title: 'Blue Mountains Day Trip from Sydney',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      location: 'Sydney, Australia',
      rate: '4.8',
      price: 340
    },
    {
      title: 'Stonehenge, Windsor Castle, and Bath',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      location: 'London, UK',
      rate: '4.6',
      price: 280
    },
    {
      title: 'Santorini Island Hopping',
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80',
      location: 'Santorini, Greece',
      rate: '4.9',
      price: 520
    },
    {
      title: 'Tokyo City Explorer',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1494&q=80',
      location: 'Tokyo, Japan',
      rate: '4.7',
      price: 680
    },
    {
      title: 'Machu Picchu Adventure',
      image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80',
      location: 'Cusco, Peru',
      rate: '4.8',
      price: 750
    },
    {
      title: 'Dubai Desert Safari',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      location: 'Dubai, UAE',
      rate: '4.5',
      price: 420
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased">
      <Navbar />

      {/* Hero Section */}
      <header className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20 text-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-5xl font-extrabold leading-tight mb-4 animate-fade-in-up">
            Your Gateway to the Skies — Fast, Easy, Reliable
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Find the best flights at unbeatable prices
          </p>
          <SearchForm />
        </div>
      </header>

      {/* Popular Destinations Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Most Popular Destinations</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover amazing places around the world with our curated selection of top destinations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {listpopularDestination.map((destination, index) => (
            <DestinationCard key={index} destination={destination} />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose AeroLink?</h2>
            <p className="text-lg text-gray-600">We make travel booking simple and affordable</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
              <p className="text-gray-600">We guarantee the lowest prices on flights worldwide</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Booking</h3>
              <p className="text-gray-600">Book your flights in just a few clicks</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 109.75 9.75A9.75 9.75 0 0012 2.25z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Our customer support team is always here to help</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;

