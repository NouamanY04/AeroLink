import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Lock, Globe, Utensils, Armchair, Save, Camera, Edit3, Eye, EyeOff } from 'lucide-react';
import { getClientInfo, UpdateClient, ChangePassword } from '../../services/ClientService';
import { supabase } from '../../services/supabaseClient';

const ProfileSettings = ({ onContentLoaded, avatarColor, avatarInitial }) => {
  const [activeTab, setActiveTab] = useState('personal');
  const [personalInfo, setPersonalInfo] = useState({
    FullName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    passportNumber: ''
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [clientInfoExists, setClientInfoExists] = useState(false);

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
  ];

  const handleGetClientInfo = async () => {
    try {
      const cachedUser = localStorage.getItem('cachedUserInfo');
      let userData;
      if (cachedUser) {
        userData = JSON.parse(cachedUser);
      } else {
        const username = localStorage.getItem('userLoggedName');
        if (!username) return;
        const response = await getClientInfo(username);
        userData = response.data && response.data.length > 0 ? response.data[0] : {};
        if (userData.client_info) {
          localStorage.setItem('cachedUserInfo', JSON.stringify(userData));
        } else {
          localStorage.setItem('cachedUserInfo', JSON.stringify({ user_info: userData.user_info }));
        }
      }

      setPersonalInfo({
        FullName: userData.user_info?.name || '',
        email: userData.user_info?.email || '',
        phone: userData.client_info?.phone || '',
        country: userData.client_info?.country || '',
        city: userData.client_info?.city || '',
        passportNumber: userData.client_info?.passport_number || ''
      });

      setClientInfoExists(!!userData.client_info);
    } catch (error) {
      // Handle error if needed
    }
  };

  // Only call API once when content is loaded
  useEffect(() => {
    if (onContentLoaded) {
      handleGetClientInfo();
    }
    // eslint-disable-next-line
  }, [onContentLoaded]);

  const handlePersonalInfoChange = (field, value) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSuccessMessage('');
    try {
      const userId = localStorage.getItem('userLoggedId');
      const username = localStorage.getItem('userLoggedName');
      if (!username || !userId) return;
      const updatedData = {
        name: personalInfo.FullName,
        email: personalInfo.email,
        phone: personalInfo.phone,
        country: personalInfo.country,
        city: personalInfo.city,
        passport_number: personalInfo.passportNumber
      };
      const result = await UpdateClient(username, updatedData);
      if (result.data) {
        // Always save as { user_info, client_info }
        const user_info = result.data.UserInfo || result.data.user_info || {};
        const client_info = result.data.ClientInfo || result.data.client_info || null;
        localStorage.setItem('cachedUserInfo', JSON.stringify({ user_info, client_info }));
        localStorage.setItem('userLoggedName', user_info.name || '');
        localStorage.setItem('userLoggedEmail', user_info.email || '');
        window.dispatchEvent(new Event('userInfoUpdated'));
        setSuccessMessage('Profile updated successfully!');

        // Update username in Supabase
        const { error } = await supabase
          .from('profiles')
          .update({ username: user_info.name })
          .eq('id', userId);

        if (error) {
          console.error('Supabase username update failed:', error.message);
        }
      }
    } catch (error) {
      console.error('Update failed:', error);
    }
    setIsSaving(false);
  };


  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 overflow-hidden">
      {successMessage && (
        <div className="mx-6 mt-6 mb-4 px-4 py-3 rounded-xl bg-emerald-50 text-emerald-800 text-sm font-medium border border-emerald-200 flex items-center space-x-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
          <span>{successMessage}</span>
        </div>
      )}
      {/* Header */}


      {/* Tabs */}
      <div className="border-b border-slate-200/60">
        <nav className="flex space-x-6 px-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 font-semibold text-sm transition-all duration-200 ${activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'personal' && (
          <div className="space-y-8">
            {/* Profile Picture */}
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className={`w-20 h-20 bg-gradient-to-r ${avatarColor} rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
                  {avatarInitial}
                </div>

              </div>
              <div>
                <h4 className="text-lg font-semibold text-slate-800 mb-1">Profile Photo</h4>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={personalInfo.FullName}
                  onChange={(e) => handlePersonalInfoChange('FullName', e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:bg-slate-50"
                  placeholder="Enter your full name"
                  readOnly={!clientInfoExists}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                <input
                  type="email"
                  value={personalInfo.email}
                  readOnly
                  className="w-full border border-slate-200 bg-slate-100 text-slate-500 rounded-xl px-4 py-3 text-sm cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Phone</label>
                {clientInfoExists ? (
                  <input
                    type="tel"
                    value={personalInfo.phone}
                    onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:bg-slate-50"
                    placeholder="Enter your phone number"
                  />
                ) : (
                  <div className="w-full px-4 py-3 text-sm text-slate-400 bg-slate-50 rounded-xl border border-slate-200">
                    Add a booking to unlock phone details.
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Country</label>
                {clientInfoExists ? (
                  <input
                    type="text"
                    value={personalInfo.country}
                    onChange={(e) => handlePersonalInfoChange('country', e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:bg-slate-50"
                    placeholder="Enter your country"
                  />
                ) : (
                  <div className="w-full px-4 py-3 text-sm text-slate-400 bg-slate-50 rounded-xl border border-slate-200">
                    Country will show after your first booking.
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">City</label>
                {clientInfoExists ? (
                  <input
                    type="text"
                    value={personalInfo.city}
                    onChange={(e) => handlePersonalInfoChange('city', e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:bg-slate-50"
                    placeholder="Enter your city"
                  />
                ) : (
                  <div className="w-full px-4 py-3 text-sm text-slate-400 bg-slate-50 rounded-xl border border-slate-200">
                    City will show after booking.
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Passport Number</label>
                {clientInfoExists ? (
                  <input
                    type="text"
                    value={personalInfo.passportNumber}
                    onChange={(e) => handlePersonalInfoChange('passportNumber', e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:bg-slate-50"
                    placeholder="Enter your passport number"
                  />
                ) : (
                  <div className="w-full px-4 py-3 text-sm text-slate-400 bg-slate-50 rounded-xl border border-slate-200">
                    Book a flight to add passport info.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}


        {/* Save Button */}
        {clientInfoExists && (
          <div className="flex justify-end pt-6 border-t border-slate-200/60 mt-8">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="h-4 w-4" />
              <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSettings;

