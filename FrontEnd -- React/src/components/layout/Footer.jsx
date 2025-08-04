import React from 'react';

function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-2xl font-bold mb-4">AeroLink</h3>
                        <p className="text-gray-400">Making travel accessible and affordable for everyone.</p>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Home</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Flights</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">About Us</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Support</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Help Center</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Terms of Service</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Privacy Policy</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Refund Policy</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Connect</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Facebook</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Twitter</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Instagram</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">LinkedIn</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-8 text-center">
                    <p className="text-gray-400">&copy; 2025 AeroLink. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

