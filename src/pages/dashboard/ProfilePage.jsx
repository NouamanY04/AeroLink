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
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showCurrentPwd, setShowCurrentPwd] = useState(false);
  const [showNewPwd, setShowNewPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'security', label: 'Security', icon: Lock }
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

  const handlePasswordChange = async () => {
    setPasswordMessage('');
    setPasswordError('');
    try {
      const username = localStorage.getItem('userLoggedName');
      const userId = localStorage.getItem('userLoggedId');
      if (!username || !userId) return;

      // Change password in Laravel API
      const result = await ChangePassword(username, {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
        newPasswordConfirmation: passwordData.confirmPassword
      });

      // Change password in Supabase
      const { error: supabaseError } = await supabase.auth.updateUser({
        password: passwordData.newPassword
      });


      // Handle messages
      if (result && result.message && !supabaseError) {
        setPasswordMessage('Password updated successfully!');
      } else if (result && result.message && supabaseError) {
        setPasswordMessage(result.message);
        setPasswordError('Supabase password update failed: ' + supabaseError.message);
      } else if (supabaseError) {
        setPasswordError('Supabase password update failed: ' + supabaseError.message);
      } else {
        setPasswordMessage('Password updated successfully!');
      }
    } catch (error) {
      setPasswordError(error.message || 'Password change failed!');
    }
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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {successMessage && (
        <div className="mx-4 mt-4 mb-2 px-4 py-2 rounded bg-green-100 text-green-800 text-xs font-medium border border-green-300">
          {successMessage}
        </div>
      )}
      {/* Password Success/Error Message */}
      {passwordMessage && (
        <div className="mx-4 mt-2 mb-2 px-4 py-2 rounded bg-green-100 text-green-800 text-xs font-medium border border-green-300">
          {passwordMessage}
        </div>
      )}
      {passwordError && (
        <div className="mx-4 mt-2 mb-2 px-4 py-2 rounded bg-red-100 text-red-800 text-xs font-medium border border-red-300">
          {passwordError}
        </div>
      )}
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
                <div className={`w-14 h-14 bg-gradient-to-r ${avatarColor} rounded-full flex items-center justify-center text-white text-xl font-bold`}>
                  {avatarInitial}
                </div>
                <button className="absolute bottom-0 right-0 bg-white border border-gray-300 rounded-full p-0.5 shadow-sm hover:bg-gray-50 transition-colors">
                  <Camera className="h-3 w-3 text-gray-600" />
                </button>
              </div>
              <div>
              </div>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={personalInfo.FullName}
                  onChange={(e) => handlePersonalInfoChange('FullName', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-2 py-1 text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={personalInfo.email}
                  readOnly
                  onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                  className="w-full border border-gray-200 bg-gray-100 text-gray-400 rounded-lg px-2 py-1 text-xs cursor-not-allowed"
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
                <label className="block text-xs font-medium text-gray-700 mb-1">Country</label>
                <input
                  type="text"
                  value={personalInfo.country}
                  onChange={(e) => handlePersonalInfoChange('country', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-2 py-1 text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  value={personalInfo.city}
                  onChange={(e) => handlePersonalInfoChange('city', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-2 py-1 text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div >
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
                {/* Current Password */}
                <div className="relative">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Current Password</label>
                  <input
                    type={showCurrentPwd ? "text" : "password"}
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-2 py-1 text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-6 text-gray-500"
                    onClick={() => setShowCurrentPwd((v) => !v)}
                    tabIndex={-1}
                  >
                    {showCurrentPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {/* New Password */}
                <div className="relative">
                  <label className="block text-xs font-medium text-gray-700 mb-1">New Password</label>
                  <input
                    type={showNewPwd ? "text" : "password"}
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-2 py-1 text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-6 text-gray-500"
                    onClick={() => setShowNewPwd((v) => !v)}
                    tabIndex={-1}
                  >
                    {showNewPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {/* Confirm New Password */}
                <div className="relative">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Confirm New Password</label>
                  <input
                    type={showConfirmPwd ? "text" : "password"}
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-2 py-1 text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-6 text-gray-500"
                    onClick={() => setShowConfirmPwd((v) => !v)}
                    tabIndex={-1}
                  >
                    {showConfirmPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <button
                  onClick={handlePasswordChange}
                  className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors text-xs"
                >
                  Update Password
                </button>
              </div>
            </div>

          </div>
        )}

        {/* Save Button */}
        <div className="flex justify-end pt-4 border-t border-gray-200 mt-6">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center space-x-1 bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 transition-colors text-xs"
          >
            <Save className="h-3 w-3" />
            <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;

