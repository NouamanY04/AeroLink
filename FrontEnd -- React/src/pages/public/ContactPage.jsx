import React, { useState } from 'react'
import { faEnvelope, faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Footer from '../../components/layout/Footer';
import { faFacebook, faInstagram, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import Navbar from '../../components/layout/Navbar';
import { AddContactRequest } from '../../services/ContactService';

function Contact() {
  const [userInfo, setUserInfo] = useState({
    username: localStorage.getItem('userLoggedName') || '',
    email: localStorage.getItem('userLoggedEmail') || '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(false);
    try {
      await AddContactRequest({
        name: userInfo.username,
        email: userInfo.email,
        message: userInfo.message
      });
      setSuccess(true);
      setUserInfo({ ...userInfo, message: '' });
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    } catch (error) {
      setError(true);
      setTimeout(() => setError(false), 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-[#FCFDFF] font-sans'>
      <Navbar />
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24"></div>
        </div>
      )}
      {showPopup && (
        <div className="fixed top-19 left-1/2 transform -translate-x-1/2 z-50 bg-green-600 text-white px-4 py-2 rounded shadow-lg text-[8px] font-medium transition-all duration-300">
          Thank you for contacting us! We will get back to you soon.
        </div>
      )}
      {error && (
        <div className="fixed top-19 left-1/2 transform -translate-x-1/2 z-50 bg-red-500 text-white px-4 py-2 rounded shadow-lg text-[8px] font-medium transition-all duration-300">
          Sorry, your message could not be sent. Please try again.
        </div>
      )}
      {(!userInfo.username || !userInfo.email) && (
        <div className="fixed top-19 left-1/2 transform -translate-x-1/2 z-50 bg-red-600 text-white px-4 py-2 rounded shadow-lg text-[8px] font-medium transition-all duration-300">
          Only signed up users can contact our team. Thank you.
        </div>
      )}
      <header className='py-6 px-4 md:px-6 lg:px-8 max-w-4xl mx-auto'>
        <div className="title text-gray-800 text-2xl md:text-4xl font-semibold text-center">
          How We Can Help ?
        </div>
      </header>

      {/* Main content */}
      <main className='my-6 flex flex-col lg:flex-row gap-6 items-start justify-center px-4 md:px-6 lg:px-8 max-w-4xl mx-auto'>
        {/* Form section */}
        <form onSubmit={handleSubmit} className='w-full lg:w-[600px] grid grid-cols-2 gap-4'>
          <div className='col-span-2'>
            <label htmlFor="username" className='text-sm font-medium'>Name</label>
            <input
              type="text"
              name="username"
              id="username"
              value={userInfo.username}
              onChange={handleChange}
              required
              className='mt-2 w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-gray-700 text-sm outline-none transition-all duration-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 shadow-sm hover:border-gray-400'
              readOnly
            />
          </div>
          <div className='col-span-2'>
            <label htmlFor="email" className='text-sm font-medium'>Email</label>
            <input
              type="text"
              name="email"
              id="email"
              value={userInfo.email}
              onChange={handleChange}
              required
              className='mt-2 w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-gray-700 text-sm outline-none transition-all duration-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 shadow-sm hover:border-gray-400'
              readOnly
            />
          </div>
          <div className='col-span-2'>
            <label htmlFor="message" className='text-sm font-medium'>Comment or Message</label>
            <textarea
              name="message"
              id="message"
              value={userInfo.message}
              onChange={handleChange}
              required
              className='mt-2 w-full h-40 resize-none p-3 rounded-md border border-gray-300 bg-white text-gray-700 text-sm outline-none transition-all duration-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 shadow-sm hover:border-gray-400'
            ></textarea>
          </div>
          <button
            type="submit"
            className='w-1/2 text-white text-sm bg-gradient-to-r from-sky-600 via-blue-700 to-indigo-800 py-2 hover:bg-indigo-600 rounded-md mx-auto col-span-2'
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </main>
      <Footer />
    </div>
  )
}

export default Contact;