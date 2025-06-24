import React, { useState, useEffect } from 'react';
import PageHeader from './PageHeader';
import axios from "axios";
import { FaBars, FaBell } from 'react-icons/fa';

export default function Layout({ children, pageTitle, pageIcon, pagePath, title2 }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [clientName, setClientName] = useState("");
  const USER_ID = localStorage.getItem('userLoggedId');
  console.log("thisis is :"+USER_ID)

  useEffect(() => {
    const fetchClientName = async () => {
      try {
        // For now, fetch client data directly for user with ID 1
        const client = await axios.get(`http://127.0.0.1:8000/api/clients/${USER_ID}`);
        setClientName(client.data.name);
        
      } catch (error) {
        console.error("Error fetching client data:", error);
        setClientName("Client"); // fallback name
      }
    };

    fetchClientName();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header
        className="flex items-center justify-between p-4 fixed top-0 left-0 right-0 z-50"
        style={{ backgroundColor: '#141517', height: '64px' }}>
        
        <div className="flex items-center space-x-4">
          <FaBars
            className="text-white text-xl cursor-pointer md:hidden"
            onClick={toggleSidebar}
          />
          <h1 className="text-xl font-bold text-white flex items-center space-x-2">
            <i className="fas fa-plane"></i>
            <span>EasyFly</span>
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <FaBell className="text-white text-xl hover:text-gray-300 cursor-pointer" />
          <a href="/account" className="flex items-center space-x-2">
            <img
              src="https://allpublicstorage.s3.amazonaws.com/account_photos/7540_photo_170_170_3e6b592ad9.jpg"
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <h2 className="text-white font-medium hidden md:block">
              {clientName || "Client"}
            </h2>
          </a>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1" style={{ marginTop: '64px', overflow: 'hidden' }}>
        {/* Sidebar */}
        <aside
          className={`fixed md:relative w-64 p-4 overflow-y-auto transform transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0`}
          style={{
            backgroundColor: '#141517',
            borderTop: '1px solid #2D2F33',
            height: 'calc(100vh - 64px)',
            zIndex: 40,
          }}>
          
          <div className="mt-18">
            <h1 className="text-gray-400 text-sm font-semibold mb-3 pl-3">MENU</h1>
            <div className="flex flex-col space-y-4 pl-5">
              <a href="/Dashboard" className="text-white hover:text-gray-300 flex items-center space-x-2">
                <i className="fa fa-dashboard"></i>
                <span>Dashboard</span>
              </a>
              <a href="/tickets" className="text-white hover:text-gray-300 flex items-center space-x-2">
                <i className="fa fa-ticket"></i>
                <span>Tickets</span>
              </a>
            </div>
          </div>

          <div className="mt-9">
            <h1 className="text-gray-400 text-sm font-semibold mb-3 pl-3">OTHERS</h1>
            <div className="flex flex-col space-y-4 pl-5">
              <a href="/account" className="text-white hover:text-gray-300 flex items-center space-x-2">
                <i className="fa fa-user"></i>
                <span>Account</span>
              </a>
              <a href="/help" className="text-white hover:text-gray-300 flex items-center space-x-2">
                <i className="fa fa-question-circle"></i>
                <span>Help</span>
              </a>
            </div>
          </div>
        </aside>

        {/* Page Content */}
        <div className="flex-1 flex flex-col overflow-y-auto" style={{ height: 'calc(100vh - 64px)' }}>
          <PageHeader
            title={pageTitle}
            icon={pageIcon}
            pathpage={pagePath}
            title2={title2}
          />
        
          <main className="flex-1 p-4" style={{ background: '#202125' }}>
            {children}
          </main>
          
          <footer
            className="p-4"
            style={{ backgroundColor: '#32333A', color: 'white' }}>
            © 2025 EasyFly
          </footer>
        </div>
      </div>
    </div>
  );
}
