import React, { useState } from 'react';
import { User, Mail, Phone, Lock, Globe, Utensils, Armchair, Save, Camera, Edit3 } from 'lucide-react';

const ProfileSettings = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [personalInfo, setPersonalInfo] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1990-05-15',
    nationality: 'United States',
    passportNumber: 'US123456789'
  });

  const [travelPreferences, setTravelPreferences] = useState({
    seatPreference: 'aisle',
    mealPreference: 'vegetarian',
    language: 'english',
    currency: 'usd',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'security', label: 'Security', icon: Lock }
  ];

  const handlePersonalInfoChange = (field, value) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }));
  };

  const handlePreferenceChange = (field, value) => {
    setTravelPreferences(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (type, value) => {
    setTravelPreferences(prev => ({
      ...prev,
      notifications: { ...prev.notifications, [type]: value }
    }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Handle save logic here
    console.log('Saving profile data...');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-base font-semibold text-gray-900">Profile Settings</h3>
        <p className="text-xs text-gray-500 mt-1">Manage your account settings and preferences</p>
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
        {activeTab === 'personal' && (
          <div className="space-y-4">
            {/* Profile Picture */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  JD
                </div>
                <button className="absolute bottom-0 right-0 bg-white border border-gray-300 rounded-full p-0.5 shadow-sm hover:bg-gray-50 transition-colors">
                  <Camera className="h-3 w-3 text-gray-600" />
                </button>
              </div>
              <div>
                <h4 className="text-base font-medium text-gray-900">Profile Picture</h4>
                <p className="text-xs text-gray-500">Update your profile picture</p>
                <button className="mt-1 text-blue-600 hover:text-blue-700 text-xs font-medium">
                  Change Picture
                </button>
              </div>
            </div>

            {/* Personal Information Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  value={personalInfo.firstName}
                  onChange={(e) => handlePersonalInfoChange('firstName', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-2 py-1 text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  value={personalInfo.lastName}
                  onChange={(e) => handlePersonalInfoChange('lastName', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-2 py-1 text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={personalInfo.email}
                  onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-2 py-1 text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={personalInfo.phone}
                  onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-2 py-1 text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={personalInfo.dateOfBirth}
                  onChange={(e) => handlePersonalInfoChange('dateOfBirth', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-2 py-1 text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Nationality</label>
                <select
                  value={personalInfo.nationality}
                  onChange={(e) => handlePersonalInfoChange('nationality', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-2 py-1 text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-700 mb-1">Passport Number</label>
                <input
                  type="text"
                  value={personalInfo.passportNumber}
                  onChange={(e) => handlePersonalInfoChange('passportNumber', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-2 py-1 text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-4">
            {/* Change Password */}
            <div>
              <h4 className="text-base font-medium text-gray-900 mb-2">Change Password</h4>
              <div className="space-y-2 max-w-xs">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Current Password</label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-2 py-1 text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">New Password</label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-2 py-1 text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-2 py-1 text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <button className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors text-xs">
                  Update Password
                </button>
              </div>
            </div>

            {/* Account Deletion */}
            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-base font-medium text-gray-900 mb-2">Danger Zone</h4>
              <div className="border border-red-200 rounded-lg p-2 bg-red-50">
                <h5 className="text-xs font-medium text-red-900 mb-1">Delete Account</h5>
                <p className="text-[10px] text-red-700 mb-2">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <button className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition-colors text-xs">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="flex justify-end pt-4 border-t border-gray-200 mt-6">
          <button
            onClick={handleSave}
            className="flex items-center space-x-1 bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 transition-colors text-xs"
          >
            <Save className="h-3 w-3" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;

