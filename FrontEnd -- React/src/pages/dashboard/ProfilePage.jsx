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

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
  ];

  const handleGetClientInfo = async () => {
    try {
      // Try to get cached user info
      const cachedUser = localStorage.getItem('cachedUserInfo');
      if (cachedUser) {
        const userData = JSON.parse(cachedUser);
        setPersonalInfo({
          FullName: userData.name || '',
          email: userData.email || '',
          phone: userData.phone || '',
          country: userData.country || '',
          city: userData.city || '',
          passportNumber: userData.passport_number || ''
        });
        return; // Skip API call if cache exists
      }

      // Otherwise, fetch from API
      const username = localStorage.getItem('userLoggedName');
      if (!username) return;
      const response = await getClientInfo(username);
      const userData = response.data && response.data.length > 0 ? response.data[0] : {};
      setPersonalInfo({
        FullName: userData.name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        country: userData.country || '',
        city: userData.city || '',
        passportNumber: userData.passport_number || ''
      });
      // Cache the user info for future use
      localStorage.setItem('cachedUserInfo', JSON.stringify(userData));
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
      const userId = localStorage.getItem('userLoggedId'); // Make sure you store user id in localStorage
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
        localStorage.setItem('cachedUserInfo', JSON.stringify(result.data));
        localStorage.setItem('userLoggedName', result.data.name || '');
        localStorage.setItem('userLoggedEmail', result.data.email || '');
        window.dispatchEvent(new Event('userInfoUpdated'));
        setSuccessMessage('Profile updated successfully!');

        // Update username in Supabase
        const { error } = await supabase
          .from('profiles')
          .update({ username: result.data.name })
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
                <button className="absolute -bottom-1 -right-1 bg-white border-2 border-slate-200 rounded-xl p-2 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110">
                  <Camera className="h-4 w-4 text-slate-600" />
                </button>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-slate-800 mb-1">Profile Photo</h4>
                <p className="text-slate-600 text-sm">Upload a new profile picture</p>
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
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                <input
                  type="email"
                  value={personalInfo.email}
                  readOnly
                  onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                  className="w-full border border-slate-200 bg-slate-100 text-slate-500 rounded-xl px-4 py-3 text-sm cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={personalInfo.phone}
                  onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:bg-slate-50"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Country</label>
                <input
                  type="text"
                  value={personalInfo.country}
                  onChange={(e) => handlePersonalInfoChange('country', e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:bg-slate-50"
                  placeholder="Enter your country"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">City</label>
                <input
                  type="text"
                  value={personalInfo.city}
                  onChange={(e) => handlePersonalInfoChange('city', e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:bg-slate-50"
                  placeholder="Enter your city"
                />
              </div>

              <div >
                <label className="block text-sm font-semibold text-slate-700 mb-2">Passport Number</label>
                <input
                  type="text"
                  value={personalInfo.passportNumber}
                  onChange={(e) => handlePersonalInfoChange('passportNumber', e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:bg-slate-50"
                  placeholder="Enter your passport number"
                />
              </div>
            </div>
          </div>
        )}


        {/* Save Button */}
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
      </div>
    </div>
  );
};

export default ProfileSettings;

