import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

function About() {
    return (
        <div className="font-istok">
            <Navbar />

            {/* Hero Section - More compact header */}
            <header className="bg-blue-800  text-white py-14 px-3">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
                        About SkyRoute
                    </h1>
                    <p className="text-lg text-center max-w-2xl mx-auto">
                        Your trusted partner in air travel, making flight bookings simple,
                        affordable, and accessible to everyone around the world.
                    </p>
                </div>
            </header>

            {/* Mission Section - Adjusted spacing */}
            <section className="py-12 px-3">
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="rounded-lg overflow-hidden shadow-lg">
                            <img
                                src="hero-airplane.jpg"
                                alt="Airplane view"
                                className="w-full h-[320px] object-cover"
                            />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                            <p className="text-gray-600 text-base mb-4">
                                At SkyRoute, we're committed to revolutionizing the way people book their flights.
                                Our mission is to provide a seamless, user-friendly platform that makes finding
                                and booking the perfect flight as easy as possible.
                            </p>
                            <ul className="space-y-2">
                                {[
                                    'Best prices guaranteed',
                                    'Simple and secure booking process',
                                    '24/7 customer support',
                                    'Access to global destinations'
                                ].map((item, index) => (
                                    <li key={index} className="flex items-center gap-3">
                                        <FontAwesomeIcon icon={faCheck} className="text-green-500" />
                                        <span className="text-gray-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section - Refined card design */}
            <section className="bg-gray-50 py-12 px-3">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl font-bold text-center mb-8">Our Values</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                title: "Transparency",
                                image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
                                description: "We believe in clear, upfront pricing with no hidden fees."
                            },
                            {
                                title: "Reliability",
                                image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80",
                                description: "Count on us for accurate information and dependable service."
                            },
                            {
                                title: "Innovation",
                                image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
                                description: "Constantly improving our platform for a better booking experience."
                            }
                        ].map((value, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                            >
                                <div className="relative h-40">
                                    <img
                                        src={value.image}
                                        alt={value.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                                    <p className="text-gray-600 text-sm">{value.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section - Compact stats display */}
            <section className="py-12 px-3">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { number: '1M+', label: 'Happy Customers' },
                            { number: '100+', label: 'Countries Served' },
                            { number: '500+', label: 'Airlines Partners' },
                            { number: '24/7', label: 'Customer Support' }
                        ].map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-3xl font-bold text-blue-600 mb-1">
                                    {stat.number}
                                </div>
                                <div className="text-gray-600 text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Global Presence Section - Refined spacing */}
            <section className="bg-gray-50 py-12 px-3">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-2xl font-bold mb-6">Our Global Presence</h2>
                    <p className="text-base text-gray-600 max-w-2xl mx-auto">
                        With offices around the world and a network of partners spanning every continent,
                        we're able to offer our customers unparalleled access to flights worldwide,
                        while maintaining local expertise and personalized service.
                    </p>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default About;