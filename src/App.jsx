import React from "react";
import Login from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import BookingPage from './components/BookingPage'
import Home from './components/Home'
import Flights from "./components/Flights";
import ForgetPassword from "./components/ForgetPassword";
import About from "./components/About";
import Contact from "./components/Contact";
import Layout from './dashboard/Layouts/Layout';
import Dashboard from './dashboard/pages/Dashboard';
import Contactus from './dashboard/pages/Contact-us';
import Account from './dashboard/pages/Account';
import Tickets from './dashboard/pages/Tickets';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/flights' element={<Flights />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/reservation/:id' element={<BookingPage />} />
        <Route path='/PasswordRegistration' element={<ForgetPassword />} />
        <Route path='/PasswordRegistration/:id' element={<ForgetPassword />} />
        <Route path="/dashboard" element={<Dashboard title="Dashboard" />} />
        <Route path="/help" element={<Contactus title="Contact Us" />} />
        <Route path="/account" element={<Account title="Account" />} />
        <Route path="/tickets" element={<Tickets title="Tickets" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;