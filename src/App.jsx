import React from "react";
import Login from "./auth/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./auth/Signup";
import BookingPage from './pages/public/BookingPage'
import Home from './pages/public/HomePage'
import FlightsDisplay from "./pages/public/FlightsPage";
import ForgetPassword from "./auth/ForgetPassword";
import About from "./pages/public/AboutPage";
import Contact from "./pages/public/ContactPage";
import AppDashboard from "./AppDashboard"; // Assuming this is the main dashboard component

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/FlightsDisplay' element={<FlightsDisplay />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/reservation/:id' element={<BookingPage />} />
        <Route path='/PasswordRegistration' element={<ForgetPassword />} />
        <Route path='/PasswordRegistration/:id' element={<ForgetPassword />} />
        <Route path='/dashboard' element={<AppDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;