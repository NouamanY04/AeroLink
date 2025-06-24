import React from 'react';
import Layout from '../Layouts/Layout';

export default function Contactus({title}) {
  document.title = title;
  return (
    <Layout pageTitle="Contact Us" pageIcon="fa-comments" pagePath="Dashboard" title2="Contact">
      <div className="bg-[#2C2D33] p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>
        
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
              <div className="flex items-center border border-gray-600 rounded-md p-2 bg-[#2C2D33]">
                <i className="fas fa-user text-gray-400 mr-3"></i>
                <input
                  type="text"
                  className="w-full bg-transparent text-white focus:outline-none"
                  placeholder="Your name"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <div className="flex items-center border border-gray-600 rounded-md p-2 bg-[#2C2D33]">
                <i className="fas fa-envelope text-gray-400 mr-3"></i>
                <input
                  type="email"
                  className="w-full bg-transparent text-white focus:outline-none"
                  placeholder="Your email"
                />
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
            <div className="flex items-center border border-gray-600 rounded-md p-2 bg-[#2C2D33]">
              <i className="fas fa-tag text-gray-400 mr-3"></i>
              <input
                type="text"
                className="w-full bg-transparent text-white focus:outline-none"
                placeholder="Message subject"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
            <div className="border border-gray-600 rounded-md p-2 bg-[#2C2D33]">
              <textarea
                className="w-full bg-transparent text-white focus:outline-none min-h-[120px]"
                placeholder="Your message here..."
              ></textarea>
            </div>
          </div>
          
          <button
            type="submit"
            className="px-6 py-2 bg-[#1989FE] text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
    </Layout>
  )
}