import React from 'react'
import { faEnvelope, faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Footer from './Footer';
import { faFacebook, faInstagram, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import Navbar from './Navbar';

function Contact() {
  return (
    <div className='bg-[#FCFDFF] font-sans'>
      <Navbar />
      <header className='py-6 px-4 md:px-6 lg:px-8 max-w-4xl mx-auto'>
        <div className="title text-gray-800 text-xl md:text-2xl font-semibold text-center">
          Contact Our Support Team
        </div>
        <div className="description mt-2 text-gray-500 text-sm md:text-base text-center">
          Have a question about our services or need assistance with your booking? Our support team is here to help. Chat with our assistance team and get your answer in less than 5 minutes.
        </div>
      </header>

      {/* Main content */}
      <main className='my-6 flex flex-col lg:flex-row gap-6 items-start justify-center px-4 md:px-6 lg:px-8 max-w-4xl mx-auto'>
        {/* Form section */}
        <form onSubmit={(event) => event.preventDefault()} className='w-full lg:w-[600px] grid grid-cols-2 gap-4'>
          <div>
            <label htmlFor="first-name" className='text-sm font-medium'>First Name</label>
            <input type="text" name="first-name" id="first-name"
              className='mt-2 w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-gray-700 text-sm outline-none transition-all duration-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 shadow-sm hover:border-gray-400' />
          </div>
          <div>
            <label htmlFor="last-name" className='text-sm font-medium'>Last Name</label>
            <input type="text" name="last-name" id="last-name"
              className='mt-2 w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-gray-700 text-sm outline-none transition-all duration-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 shadow-sm hover:border-gray-400' />
          </div>
          <div className='col-span-2'>
            <label htmlFor="email" className='text-sm font-medium'>Email</label>
            <input type="text" name="email" id="email"
              className='mt-2 w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-gray-700 text-sm outline-none transition-all duration-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 shadow-sm hover:border-gray-400' />
          </div>
          <div className='col-span-2'>
            <label htmlFor="message" className='text-sm font-medium'>Comment or Message</label>
            <textarea name="message" id="message"
              className='mt-2 w-full h-40 resize-none p-3 rounded-md border border-gray-300 bg-white text-gray-700 text-sm outline-none transition-all duration-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 shadow-sm hover:border-gray-400'></textarea>
          </div>
          <button className='w-1/2 text-white text-sm bg-indigo-500 py-2 hover:bg-indigo-600 rounded-md mx-auto col-span-2'>
            Send
          </button>
        </form>

        {/* Contact info section */}
        <div className="chat-info w-full lg:w-[300px] text-gray-500 flex flex-col gap-6">
          <div className="social-media">
            <div className='text-lg font-medium mb-2 text-black'>
              Chat with our support team
            </div>
            <div className="space-y-2">
              <div><FontAwesomeIcon icon={faFacebook} className='mr-2 text-xl text-blue-600' /><a href="https://facebook.com" className="text-sm">Facebook</a></div>
              <div><FontAwesomeIcon icon={faWhatsapp} className='mr-2 text-xl text-green-600' /><a href="https://whatsapp.com" className="text-sm">WhatsApp</a></div>
              <div><FontAwesomeIcon icon={faInstagram} className='mr-2 text-xl text-red-600' /><a href="https://instagram.com" className="text-sm">Instagram</a></div>
              <div><FontAwesomeIcon icon={faTwitter} className='mr-2 text-xl text-sky-600' /><a href="https://twitter.com" className="text-sm">Twitter</a></div>
            </div>
          </div>
          <div className="email">
            <div className='text-lg font-medium mb-2 text-black'>
              Contact us via email
            </div>
            <div><FontAwesomeIcon icon={faEnvelope} className='mr-2' /> support@SkyRoute.com</div>
          </div>
          <div className="call">
            <div className='text-lg font-medium mb-2 text-black'>
              Call us (8 AM - 7 PM)
            </div>
            <div><FontAwesomeIcon icon={faPhone} className='mr-2' /> +212 45 45 05 57</div>
          </div>
          <div className="visit">
            <div className='text-lg font-medium mb-2 text-black'>
              Visit us
            </div>
            <div><FontAwesomeIcon icon={faMapMarkerAlt} className='mr-2' /> SYBA, Marrakech</div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Contact;