import React, { useState } from 'react';
import { CreditCard, Plus, Edit3, Trash2, Shield, Calendar, DollarSign, Download, Eye, MoreHorizontal } from 'lucide-react';

const PaymentMethods = () => {
  const [activeTab, setActiveTab] = useState('cards');
  const [showAddCard, setShowAddCard] = useState(false);
  const [newCard, setNewCard] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingAddress: ''
  });

  const paymentMethods = [
    {
      id: 1,
      type: 'visa',
      lastFour: '4532',
      expiryDate: '12/25',
      cardholderName: 'John Doe',
      isDefault: true,
      logo: '💳'
    },
    {
      id: 2,
      type: 'mastercard',
      lastFour: '8901',
      expiryDate: '08/26',
      cardholderName: 'John Doe',
      isDefault: false,
      logo: '💳'
    },
    {
      id: 3,
      type: 'paypal',
      email: 'john.doe@example.com',
      isDefault: false,
      logo: '🅿️'
    }
  ];

  const billingHistory = [
    {
      id: 1,
      date: '2024-02-15',
      description: 'Flight EF 1234 - New York to London',
      amount: '$2,450.00',
      status: 'Paid',
      paymentMethod: 'Visa ****4532'
    },
    {
      id: 2,
      date: '2024-01-28',
      description: 'Flight EF 2002 - Frankfurt to Tokyo',
      amount: '$890.00',
      status: 'Paid',
      paymentMethod: 'Mastercard ****8901'
    },
    {
      id: 3,
      date: '2024-01-10',
      description: 'Flight EF 3003 - Paris to London (Refunded)',
      amount: '-$320.00',
      status: 'Refunded',
      paymentMethod: 'Visa ****4532'
    },
    {
      id: 4,
      date: '2023-12-20',
      description: 'Flight EF 4004 - Singapore to Sydney',
      amount: '$3,200.00',
      status: 'Paid',
      paymentMethod: 'PayPal'
    }
  ];

  const tabs = [
    { id: 'cards', label: 'Payment Methods' },
    { id: 'billing', label: 'Billing History' }
  ];

  const handleAddCard = () => {
    // Handle add card logic
    console.log('Adding new card:', newCard);
    setShowAddCard(false);
    setNewCard({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardholderName: '',
      billingAddress: ''
    });
  };

  const handleDeleteCard = (cardId) => {
    // Handle delete card logic
    console.log('Deleting card:', cardId);
  };

  const handleSetDefault = (cardId) => {
    // Handle set default card logic
    console.log('Setting default card:', cardId);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800';
      case 'Refunded':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-base font-semibold text-gray-900">Payment & Billing</h3>
        <p className="text-xs text-gray-500 mt-1">Manage your payment methods and view billing history</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-4 px-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 border-b-2 font-medium text-xs transition-colors ${activeTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-4">
        {activeTab === 'cards' && (
          <div className="space-y-4">
            {/* Add New Card Button */}
            <div className="flex justify-between items-center">
              <h4 className="text-base font-medium text-gray-900">Saved Payment Methods</h4>
              <button
                onClick={() => setShowAddCard(true)}
                className="flex items-center space-x-1 bg-blue-600 text-white px-2 py-1 rounded-lg hover:bg-blue-700 transition-colors text-xs"
              >
                <Plus className="h-3 w-3" />
                <span>Add Payment Method</span>
              </button>
            </div>

            {/* Payment Methods List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {paymentMethods.map((method) => (
                <div key={method.id} className="border border-gray-200 rounded-lg p-2 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{method.logo}</span>
                      <div>
                        <h5 className="font-medium text-xs text-gray-900 capitalize">
                          {method.type === 'paypal' ? 'PayPal' : method.type}
                        </h5>
                        <p className="text-[11px] text-gray-500">
                          {method.type === 'paypal'
                            ? method.email
                            : `**** **** **** ${method.lastFour}`
                          }
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1">
                      {method.isDefault && (
                        <span className="px-1.5 py-0.5 bg-green-100 text-green-800 text-[10px] rounded-full font-medium">
                          Default
                        </span>
                      )}
                      <button className="text-gray-400 hover:text-gray-600 transition-colors">
                        <MoreHorizontal className="h-3 w-3" />
                      </button>
                    </div>
                  </div>

                  {method.type !== 'paypal' && (
                    <div className="text-xs text-gray-500 mb-2">
                      <p>Expires {method.expiryDate}</p>
                      <p>{method.cardholderName}</p>
                    </div>
                  )}

                  <div className="flex space-x-1">
                    {!method.isDefault && (
                      <button
                        onClick={() => handleSetDefault(method.id)}
                        className="flex-1 text-blue-600 hover:text-blue-700 text-[11px] font-medium"
                      >
                        Set as Default
                      </button>
                    )}
                    <button className="text-gray-600 hover:text-gray-700 text-[11px] font-medium">
                      <Edit3 className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => handleDeleteCard(method.id)}
                      className="text-red-600 hover:text-red-700 text-[11px] font-medium"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Card Form */}
            {showAddCard && (
              <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                <h5 className="text-base font-medium text-gray-900 mb-2">Add New Payment Method</h5>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1">Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={newCard.cardNumber}
                      onChange={(e) => setNewCard(prev => ({ ...prev, cardNumber: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-2 py-1 text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={newCard.expiryDate}
                      onChange={(e) => setNewCard(prev => ({ ...prev, expiryDate: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-2 py-1 text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      value={newCard.cvv}
                      onChange={(e) => setNewCard(prev => ({ ...prev, cvv: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-2 py-1 text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1">Cardholder Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={newCard.cardholderName}
                      onChange={(e) => setNewCard(prev => ({ ...prev, cardholderName: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-2 py-1 text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1">Billing Address</label>
                    <textarea
                      placeholder="123 Main St, City, State, ZIP"
                      value={newCard.billingAddress}
                      onChange={(e) => setNewCard(prev => ({ ...prev, billingAddress: e.target.value }))}
                      rows={2}
                      className="w-full border border-gray-300 rounded-lg px-2 py-1 text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    onClick={() => setShowAddCard(false)}
                    className="px-2 py-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddCard}
                    className="px-2 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs"
                  >
                    Add Card
                  </button>
                </div>
              </div>
            )}

            {/* Security Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-2">
              <div className="flex items-start space-x-2">
                <Shield className="h-4 w-4 text-blue-600 mt-0.5" />
                <div>
                  <h5 className="text-xs font-medium text-blue-900">Secure Payment Processing</h5>
                  <p className="text-xs text-blue-700 mt-1">
                    Your payment information is encrypted and securely processed. We never store your full card details.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'billing' && (
          <div className="space-y-4">
            {/* Billing Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div className="bg-blue-50 rounded-lg p-2">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-xs text-blue-600 font-medium">Total Spent</p>
                    <p className="text-lg font-bold text-blue-900">$6,220</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-2">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-xs text-green-600 font-medium">This Year</p>
                    <p className="text-lg font-bold text-green-900">$3,340</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 rounded-lg p-2">
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-xs text-purple-600 font-medium">Transactions</p>
                    <p className="text-lg font-bold text-purple-900">24</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Billing History */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-base font-medium text-gray-900">Billing History</h4>
                <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-xs font-medium">
                  <Download className="h-3 w-3" />
                  <span>Export All</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 px-2 font-medium text-xs text-gray-900">Date</th>
                      <th className="text-left py-2 px-2 font-medium text-xs text-gray-900">Description</th>
                      <th className="text-left py-2 px-2 font-medium text-xs text-gray-900">Amount</th>
                      <th className="text-left py-2 px-2 font-medium text-xs text-gray-900">Payment Method</th>
                      <th className="text-left py-2 px-2 font-medium text-xs text-gray-900">Status</th>
                      <th className="text-left py-2 px-2 font-medium text-xs text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {billingHistory.map((transaction) => (
                      <tr key={transaction.id} className="hover:bg-gray-50">
                        <td className="py-2 px-2 text-xs text-gray-900">{transaction.date}</td>
                        <td className="py-2 px-2 text-xs text-gray-900">{transaction.description}</td>
                        <td className={`py-2 px-2 text-xs font-medium ${transaction.amount.startsWith('-') ? 'text-green-600' : 'text-gray-900'
                          }`}>
                          {transaction.amount}
                        </td>
                        <td className="py-2 px-2 text-xs text-gray-600">{transaction.paymentMethod}</td>
                        <td className="py-2 px-2">
                          <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-medium ${getStatusColor(transaction.status)}`}>
                            {transaction.status}
                          </span>
                        </td>
                        <td className="py-2 px-2">
                          <div className="flex items-center space-x-1">
                            <button className="text-blue-600 hover:text-blue-700 text-xs">
                              <Eye className="h-3 w-3" />
                            </button>
                            <button className="text-blue-600 hover:text-blue-700 text-xs">
                              <Download className="h-3 w-3" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentMethods;

