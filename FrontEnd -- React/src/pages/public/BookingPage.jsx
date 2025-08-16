import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import { Icon } from '@iconify/react/dist/iconify.js'
import Cardform from '../../components/payment/Cardform'
import Paypalform from '../../components/payment/PaypalformTEMP'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { PDFDownloadLink } from '@react-pdf/renderer';
import TicketDocument from '../../components/bookings/TicketDocument';
import { storeClientReservation } from '../../services/BookingService';
import { AddClient } from '../../services/ClientService';
import { storeClientPaymentInfo } from '../../services/PaymentService'
import { updateBookingWithPaymentId } from '../../services/BookingService';

const Reservation = () => {
  const [paymentmethod, setPaymentMethod] = useState('creditCard');
  const [currentStep, setCurrentStep] = useState(1); // Track current step (1, 2, or 3)
  const [ticketDownloaded, setTicketDownloaded] = useState(false);
  const flightid = useParams();
  const flights = useSelector(state => state.flights.flights)
  const flightwanted = flights.find(flights => flights.id == flightid.id);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const [clientInfo, setClientInfo] = useState({
    name: localStorage.getItem('userLoggedName') || '',
    email: localStorage.getItem('userLoggedEmail') || '',
    phone: '',
    country: '',
    city: '',
    passport_number: ''
  })

  const HandleInfoSubmit = (e) => {
    e.preventDefault();

    const requiredFields = ['phone', 'country', 'city', 'passport_number'];
    const allFieldsFilled = requiredFields.every(field => clientInfo[field]?.trim());

    if (allFieldsFilled) {
      setCurrentStep(2);
    } else {
      alert('Please fill all required fields');
    }
  }

  const handlePaymentMethod = (method) => {
    setPaymentMethod(method);
  }

  const getRandomSeatNumber = (flightNumber) => {
    console.log(`Generating random seat for flight: ${flightNumber}`);

    const seatNumbers = ['1A', '1B', '2A', '2B', '3A', '3B', '4A', '4B', '5A', '5B', '6A', '6B', '7A', '7B', '8A', '8B', '9A', '9B', '10A', '10B'];
    const randomIndex = Math.floor(Math.random() * seatNumbers.length);
    return `${flightNumber}-${seatNumbers[randomIndex]}`;
  }
  const handlePaymentSubmit = async (paymentData) => {
    setLoading(true);
    try {
      const now = new Date();
      const pad = (n) => n.toString().padStart(2, '0');
      const bookingDate = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

      const bookingData = {
        flight_id: flightwanted.id,
        client_email: clientInfo.email,
        seat_number: getRandomSeatNumber(flightwanted.flight_number),
        booking_status: 'booked',
        booking_date: bookingDate,
        ...paymentData,
      };

      const clientResponse = await AddClient(clientInfo);
      (clientResponse && clientResponse.id) && console.log('✅ Client added successfully.');
      (clientResponse && clientResponse.id) && localStorage.removeItem('cachedUserInfo');

      const Bookingresponse = await storeClientReservation(bookingData);
      (Bookingresponse && Bookingresponse.id) && console.log('✅ Booking stored successfully.');
      const BookingId = Bookingresponse.id;


      const paymentResponse = await storeClientPaymentInfo({
        BookingId: BookingId,
        ...paymentData,
        payment_status: 'completed',
      });
      (paymentResponse && paymentResponse.id) && console.log('✅ Payment stored successfully.');
      const paymentId = paymentResponse.id;


      const updateResponse = await updateBookingWithPaymentId(BookingId, paymentId);
      (updateResponse) && console.log('✅ Booking updated with payment ID.');

    } catch (error) {
      alert(error.message || 'Failed to process booking');
      console.error('Booking error:', error);
    } finally {
      setLoading(false);
      setCurrentStep(3);
      const pdfLink = document.querySelector('[download]');
      if (pdfLink) {
        pdfLink.click();
      }
    }
  };


  const goToPreviousStep = () => {
    setCurrentStep(currentStep - 1);
  }


  // Progress Steps Component
  const ProgressStep = ({ step, title, currentStep }) => (
    <div className="flex flex-col items-center gap-2">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-medium transition-colors
        ${currentStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500 border border-gray-200'}`}>
        {step}
      </div>
      <p className={`text-xs font-medium text-center ${currentStep >= step ? 'text-blue-600' : 'text-gray-500'}`}>
        {title}
      </p>
    </div>
  );


  return (
    <div className="min-h-screen bg-gray-50">
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24"></div>
        </div>
      )}
      <Navbar />
      <div className="max-w-5xl mx-auto px-3 py-4 sm:px-4 lg:px-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Main Content Area */}
          <div className="flex-1">
            {/* Progress Steps */}
            <div className="bg-white rounded-lg shadow-sm mb-4 p-4">
              <div className="grid grid-cols-3 gap-2">
                {[
                  { step: 1, title: "Customer Info" },
                  { step: 2, title: "Payment" },
                  { step: 3, title: "Confirmation" }
                ].map((item) => (
                  <ProgressStep key={item.step} {...item} currentStep={currentStep} />
                ))}
              </div>
            </div>

            {/* Step 1: Customer Information */}
            {currentStep === 1 && (
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h2 className="text-base font-semibold text-gray-800 mb-4">Customer Information</h2>
                <form onSubmit={HandleInfoSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Read-only fields */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={clientInfo.name}
                        className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded bg-gray-50 cursor-not-allowed"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={clientInfo.email}
                        className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded bg-gray-50 cursor-not-allowed"
                        readOnly
                      />
                    </div>

                    {/* Editable fields */}
                    {[
                      { name: "phone", label: "Phone", type: "tel" },
                      { name: "country", label: "Country", type: "text" },
                      { name: "city", label: "City", type: "text" },
                      { name: "passport_number", label: "Passport Number", type: "text" }
                    ].map((field) => (
                      <div key={field.name}>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          {field.label} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type={field.type}
                          name={field.name}
                          value={clientInfo[field.name]}
                          onChange={(e) => setClientInfo({ ...clientInfo, [e.target.name]: e.target.value })}
                          className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-1"
                    >
                      Continue
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Step 2: Payment Information */}
            {currentStep === 2 && (
              <div id="paymentDetails" className='bg-white rounded-lg shadow-sm p-4'>
                <h2 className='text-base font-semibold text-gray-800 mb-4'>Select Payment Method</h2>
                <div id="paymentChoice" className='flex flex-col sm:flex-row items-center gap-4 justify-center w-full sm:w-4/5 mx-auto'>
                  <div
                    className={`w-full sm:w-64 h-24 rounded-lg border transition-all duration-200 cursor-pointer
                      ${paymentmethod == 'creditCard'
                        ? 'border-2 border-blue-600 bg-blue-50'
                        : 'border border-gray-200 hover:border-blue-400'}`}
                    id='creditCard'
                    onClick={(e) => handlePaymentMethod(e.currentTarget.id)}
                  >
                    {paymentmethod == 'creditCard' && (
                      <></>
                    )}
                    <div className='flex flex-col justify-center items-center h-full'>
                      <img src="/visamaster.png" alt="Credit/Debit Card" className="h-8 mb-2" />
                      <p className='text-xs font-medium text-gray-700'>Credit/Debit Card</p>
                    </div>
                  </div>

                  <div
                    className={`w-full sm:w-64 h-24 rounded-lg border transition-all duration-200 cursor-pointer
                      ${paymentmethod == 'paypal'
                        ? 'border-2 border-blue-600 bg-blue-50'
                        : 'border border-gray-200 hover:border-blue-400'}`}
                    id='paypal'
                    onClick={(e) => handlePaymentMethod(e.currentTarget.id)}
                  >
                    {paymentmethod == 'paypal' && (
                      <></>
                    )}
                    <div className='flex flex-col justify-center items-center h-full'>
                      <img src="/paypallogo.png" alt="PayPal" className="h-8 mb-2" />
                      <p className='text-xs font-medium text-gray-700'>Pay with PayPal</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 border-t border-gray-100 pt-6">
                  {paymentmethod === 'creditCard' && (
                    <Cardform
                      onSubmit={handlePaymentSubmit}
                      onError={(msg) => alert(msg)}
                    />
                  )}
                  {paymentmethod === 'paypal' && (
                    <Paypalform
                      onSubmit={handlePaymentSubmit}
                      onError={(msg) => alert(msg)}
                    />
                  )}
                </div>

                <div className="flex justify-between gap-4 mt-6">
                  <button
                    onClick={goToPreviousStep}
                    className='px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded transition-colors duration-200'
                  >
                    Back
                  </button>

                </div>
              </div>
            )}

            {/* Step 3: Booking Confirmation */}
            {currentStep === 3 && (
              <div className="bg-white rounded-lg shadow-sm p-4">
                {/* Success Header */}
                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg mb-6">
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="text-green-600 w-5 h-5"
                  />
                  <p className="text-sm font-medium text-green-800">
                    Thank you! Your booking has been confirmed
                  </p>
                </div>

                {/* Booking Details */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-semibold text-gray-800 mb-4">
                      Booking Details
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-medium text-gray-500">Booking Reference</span>
                        <span className="text-sm font-semibold text-blue-600">
                          EF-{Math.floor(Math.random() * 10000)}-{Math.floor(Math.random() * 1000)}
                        </span>
                      </div>
                      <hr className="border-gray-200 my-3" />

                      {/* Traveler Information Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          { label: "Full Name", value: clientInfo.name },
                          { label: "Email", value: clientInfo.email },
                          { label: "Phone", value: clientInfo.phone },
                          { label: "City", value: clientInfo.city },
                          { label: "Country", value: clientInfo.country },
                          { label: "Passport Number", value: clientInfo.passport_number }
                        ].map((field, index) => (
                          <div key={index} className="space-y-1">
                            <p className="text-xs font-medium text-gray-500">{field.label}</p>
                            <p className="text-sm text-gray-900">{field.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                    <button
                      onClick={goToPreviousStep}
                      className="px-4 py-2 text-xs font-medium text-gray-700 bg-gray-100 
                      rounded hover:bg-gray-200 transition-colors duration-200"
                    >
                      Back to Payment
                    </button>
                    <PDFDownloadLink
                      document={<TicketDocument clientInfo={clientInfo} flight={flightwanted} />}
                      fileName={`easyfly-ticket-${clientInfo.name}.pdf`}
                    >
                      {({ loading }) => (
                        <button
                          className={`px-4 py-2 text-xs font-medium rounded transition-colors duration-200
                            ${ticketDownloaded
                              ? 'bg-green-600 hover:bg-green-700 text-white'
                              : 'bg-blue-600 hover:bg-blue-700 text-white'
                            }`}
                          onClick={() => !loading && setTicketDownloaded(true)}
                          disabled={loading}
                        >
                          {loading ? (
                            'Generating...'
                          ) : ticketDownloaded ? (
                            <span className="flex items-center gap-2">
                              <Icon icon="heroicons:check" className="w-4 h-4" />
                              Ticket Downloaded
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              <Icon icon="heroicons:arrow-down-tray" className="w-4 h-4" />
                              Download Ticket
                            </span>
                          )}
                        </button>
                      )}
                    </PDFDownloadLink>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar - Flight Details */}
          <div className="hidden lg:block w-72">
            <div className="sticky top-4">
              <FlightDetailsCard flight={flightwanted} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

// Update FlightDetailsCard component to be more compact
const FlightDetailsCard = ({ flight }) => (
  <div className="bg-white rounded-lg shadow-sm p-4">
    <div className="flex items-center justify-center mb-4">
      <img src={`http://localhost:8000/storage/${flight.logo}`} alt={flight.airline} className="h-12 w-auto" />
    </div>

    <div className="space-y-4 text-sm">
      <div>
        <h3 className="text-base font-semibold text-gray-800">
          {flight.departure_place} to {flight.arrival_place}
        </h3>
        <p className="text-xs text-gray-600">{flight.type_vol}</p>
      </div>

      <div className="flex flex-col items-center">
        <span className="text-sm font-medium">
          {flight.duration.hours}h {flight.duration.minutes}m
        </span>
        <div className="w-16 h-0.5 bg-blue-600 my-2" />
        <span className="text-sm text-gray-600">
          {flight.stops === 0 ? 'Non Stop' : `${flight.stops} stops`}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <Icon icon="pepicons-pencil:airplane" className="text-blue-600 w-5 h-5" />
          <div>
            <p className="font-semibold">{flight.heure_depart}</p>
            <p className="text-sm text-gray-600">{flight.departure_place}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Icon icon="pepicons-pencil:airplane" className="text-blue-600 w-5 h-5 rotate-90" />
          <div>
            <p className="font-semibold">{flight.heure_arrive}</p>
            <p className="text-sm text-gray-600">{flight.arrival_place}</p>
          </div>
        </div>
      </div>

      <div className="border-t pt-4 mt-4">
        <h4 className="text-lg font-semibold mb-4">Booking Details</h4>
        <div className="space-y-3">
          {[
            { label: "Airline", value: flight.airline },
            { label: "Flight type", value: flight.type },
            { label: "Total Payment", value: `${flight.price} $` }
          ].map((item) => (
            <div key={item.label} className="flex justify-between">
              <span className="text-sm text-gray-600">{item.label}</span>
              <span className="text-sm font-medium">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Reservation;