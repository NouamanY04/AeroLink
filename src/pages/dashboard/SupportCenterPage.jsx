import React, { useState } from 'react';
import { HelpCircle, MessageCircle, Phone, Mail, Search, ChevronDown, ChevronRight, Send, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const SupportCenter = () => {
  const [activeTab, setActiveTab] = useState('faq');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [contactForm, setContactForm] = useState({
    subject: '',
    category: '',
    message: '',
    priority: 'medium'
  });

  const tabs = [
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
    { id: 'contact', label: 'Contact Support', icon: MessageCircle }
  ];

  const faqCategories = [
    {
      title: 'Booking & Reservations',
      faqs: [
        {
          id: 1,
          question: 'How can I cancel my flight booking?',
          answer: 'You can cancel your flight booking by going to "My Flights" section and clicking on the "Cancel" button next to your booking. Please note that cancellation fees may apply depending on your ticket type and timing.'
        },
        {
          id: 2,
          question: 'Can I change my flight dates?',
          answer: 'Yes, you can change your flight dates subject to availability and fare difference. Go to "My Flights", select your booking, and click "Modify". Change fees may apply.'
        },
        {
          id: 3,
          question: 'How do I select my seat?',
          answer: 'You can select your seat during booking or later by going to "My Flights" and clicking "Seat Selection". Some seats may have additional charges.'
        }
      ]
    },
    {
      title: 'Check-in & Boarding',
      faqs: [
        {
          id: 4,
          question: 'When can I check in for my flight?',
          answer: 'Online check-in opens 24 hours before departure for most flights. You can check in through our website or mobile app.'
        },
        {
          id: 5,
          question: 'What documents do I need for international flights?',
          answer: 'For international flights, you need a valid passport and may require a visa depending on your destination. Check visa requirements for your specific destination.'
        },
        {
          id: 6,
          question: 'What is the baggage allowance?',
          answer: 'Baggage allowance varies by ticket type and destination. Economy class typically includes 1 carry-on bag (8kg) and 1 checked bag (23kg) for international flights.'
        }
      ]
    },
    {
      title: 'Payment & Refunds',
      faqs: [
        {
          id: 7,
          question: 'What payment methods do you accept?',
          answer: 'We accept major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers. All payments are processed securely.'
        },
        {
          id: 8,
          question: 'How long do refunds take?',
          answer: 'Refunds typically take 7-14 business days to process back to your original payment method. The exact time depends on your bank or card issuer.'
        },
        {
          id: 9,
          question: 'Can I get a refund for a cancelled flight?',
          answer: 'If we cancel your flight, you are entitled to a full refund or rebooking at no extra cost. Refunds for passenger-initiated cancellations depend on your ticket type.'
        }
      ]
    }
  ];

  const contactOptions = [
    {
      type: 'phone',
      title: 'Phone Support',
      description: '24/7 customer service',
      contact: '+1 (800) 123-4567',
      icon: Phone,
      available: true
    },
    {
      type: 'email',
      title: 'Email Support',
      description: 'Response within 24 hours',
      contact: 'support@AeroLink.com',
      icon: Mail,
      available: true
    },
    {
      type: 'chat',
      title: 'Live Chat',
      description: 'Available 9 AM - 9 PM EST',
      contact: 'Start Chat',
      icon: MessageCircle,
      available: false
    }
  ];

  const recentTickets = [
    {
      id: 'T001',
      subject: 'Flight cancellation refund',
      status: 'resolved',
      date: '2024-02-15',
      category: 'Refunds'
    },
    {
      id: 'T002',
      subject: 'Seat selection issue',
      status: 'in-progress',
      date: '2024-02-20',
      category: 'Booking'
    },
    {
      id: 'T003',
      subject: 'Baggage allowance question',
      status: 'pending',
      date: '2024-02-22',
      category: 'General'
    }
  ];

  const filteredFaqs = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0);

  const toggleFaq = (faqId) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting contact form:', contactForm);
    // Handle form submission
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-base font-semibold text-gray-900">Support & Help Center</h3>
        <p className="text-xs text-gray-500 mt-1">Get help with your bookings and account</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-4 px-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-1 py-2 border-b-2 font-medium text-xs transition-colors ${activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
              >
                <Icon className="h-3 w-3" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-4">
        {activeTab === 'faq' && (
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-3 w-3" />
              <input
                type="text"
                placeholder="Search frequently asked questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs"
              />
            </div>

            {/* FAQ Categories */}
            <div className="space-y-3">
              {filteredFaqs.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">{category.title}</h4>
                  <div className="space-y-1">
                    {category.faqs.map((faq) => (
                      <div key={faq.id} className="border border-gray-200 rounded-lg">
                        <button
                          onClick={() => toggleFaq(faq.id)}
                          className="w-full flex items-center justify-between p-2 text-left hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-medium text-xs text-gray-900">{faq.question}</span>
                          {expandedFaq === faq.id ? (
                            <ChevronDown className="h-3 w-3 text-gray-500" />
                          ) : (
                            <ChevronRight className="h-3 w-3 text-gray-500" />
                          )}
                        </button>
                        {expandedFaq === faq.id && (
                          <div className="px-2 pb-2">
                            <p className="text-xs text-gray-600">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {searchQuery && filteredFaqs.length === 0 && (
              <div className="text-center py-4">
                <HelpCircle className="h-6 w-6 text-gray-300 mx-auto mb-2" />
                <h4 className="text-sm font-medium text-gray-900 mb-1">No results found</h4>
                <p className="text-xs text-gray-500">Try searching with different keywords or contact our support team.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="space-y-4">
            {/* Contact Options */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Contact Options</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {contactOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <div key={option.type} className="border border-gray-200 rounded-lg p-2 hover:shadow transition-shadow">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Icon className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <h5 className="font-medium text-xs text-gray-900">{option.title}</h5>
                          <p className="text-[10px] text-gray-500">{option.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-900">{option.contact}</span>
                        <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-medium ${option.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                          {option.available ? 'Available' : 'Offline'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Submit a Support Request</h4>
              <form onSubmit={handleContactSubmit} className="space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Subject</label>
                    <input
                      type="text"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-2 py-1 text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Brief description of your issue"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={contactForm.category}
                      onChange={(e) => setContactForm(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-2 py-1 text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select a category</option>
                      <option value="booking">Booking & Reservations</option>
                      <option value="checkin">Check-in & Boarding</option>
                      <option value="payment">Payment & Refunds</option>
                      <option value="baggage">Baggage</option>
                      <option value="technical">Technical Issues</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    value={contactForm.priority}
                    onChange={(e) => setContactForm(prev => ({ ...prev, priority: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-2 py-1 text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    value={contactForm.message}
                    onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-2 py-1 text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Please provide detailed information about your issue..."
                  />
                </div>

                <button
                  type="submit"
                  className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors text-xs"
                >
                  <Send className="h-3 w-3" />
                  <span>Submit Request</span>
                </button>
              </form>
            </div>

            {/* Recent Tickets */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Recent Support Tickets</h4>
              <div className="space-y-2">
                {recentTickets.map((ticket) => (
                  <div key={ticket.id} className="border border-gray-200 rounded-lg p-2 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(ticket.status)}
                        <div>
                          <h5 className="font-medium text-xs text-gray-900">#{ticket.id} - {ticket.subject}</h5>
                          <p className="text-[10px] text-gray-500">{ticket.category} • {ticket.date}</p>
                        </div>
                      </div>
                      <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-medium ${getStatusColor(ticket.status)}`}>
                        {ticket.status.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupportCenter;

