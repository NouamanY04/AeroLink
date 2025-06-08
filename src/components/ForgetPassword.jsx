import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Icon } from "@iconify/react";
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';


const ForgetPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', message: '' });

  const [isFirstPasswordAppear, setisFirstPasswordAppear] = useState(false);
  const [isSecPasswordAppear, setisSecPasswordAppear] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email is required');
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email');
      return false;
    }
    return true;
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage({ type: '', message: '' });

    if (!validateEmail(email)) {
      setLoading(false);
      return;
    }

    try {
      // Add debug logging
      console.log('Initiating password reset for:', email);

      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/PasswordRegistration`,
      });

      // Log the response for debugging
      console.log('Reset password response:', { data, error });

      if (error) {
        throw error;
      }

      // Check if the email exists in the auth system
      const { data: userExists, error: userError } = await supabase
        .from('profiles')
        .select('email')
        .eq('email', email)
        .single();

      if (userError && userError.code !== 'PGRST116') {
        console.error('Error checking user:', userError);
        throw new Error('Error verifying email address');
      }

      if (!userExists) {
        setStatusMessage({
          type: 'error',
          message: 'No account found with this email address'
        });
        return;
      }

      setStatusMessage({
        type: 'success',
        message: 'Reset link sent! Check your email inbox (including spam folder).'
      });
      setStep(2);

    } catch (error) {
      console.error('Password reset error:', error);
      setStatusMessage({
        type: 'error',
        message: error.message === 'Email rate limit exceeded'
          ? 'Please wait a few minutes before trying again'
          : `Error: ${error.message || 'Failed to send reset email'}`
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage({ type: '', message: '' });

    if (!validateEmail(email)) {
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          shouldCreateUser: false, // Don't create new user if doesn't exist
        }
      });

      if (error) throw error;

      setStatusMessage({
        type: 'success',
        message: 'OTP sent! Check your email inbox'
      });
      setStep(2);
    } catch (error) {
      console.error('OTP send error:', error);
      setStatusMessage({
        type: 'error',
        message: `Error: ${error.message}`
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setOtpError('');

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'email'
      });

      if (error) throw error;

      if (data.user) {
        setStatusMessage({
          type: 'success',
          message: 'OTP verified successfully!'
        });
        setStep(3);
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      setOtpError('Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPasswordError('');

    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      setStatusMessage({
        type: 'success',
        message: 'Password updated successfully!'
      });
      // Redirect to login after 2 seconds
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      console.error('Password update error:', error);
      setPasswordError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const BackButton = () => (
    <button
      type="button"
      onClick={handleBack}
      className="absolute top-0 left-0 p-2 text-gray-600 hover:text-gray-800 transition-colors"
    >
      <Icon icon="fluent-mdl2:back" width="16" height="16" />
    </button>
  );

  const stepComponents = {
    1: (
      <div className={`transform transition-all duration-500 ${step === 1 ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
        <form onSubmit={handleSendOTP}>
          <div className='flex flex-col items-center justify-center gap-1'>
            <div className="border border-gray-400 p-2 rounded-md flex items-center justify-center">
              <Icon icon="ion:finger-print" width="20" height="20" style={{ color: 'dark' }} />
            </div>
            <h2 className="text-xl font-semibold">Forgot Password?</h2>
            <p className='text-gray-500 text-sm'>No worries, we'll send you reset instructions</p>
          </div>
          <div className='w-80 sm:w-96 m-auto mt-8'>
            <div className="flex flex-col space-y-2">
              <label htmlFor="email" className="text-sm">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError('');
                  setStatusMessage({ type: '', message: '' });
                }}
                disabled={loading}
                required
                className={`border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder='Enter your email'
              />
              {emailError && (
                <p className="text-red-500 text-xs mt-1">{emailError}</p>
              )}
              {statusMessage.message && (
                <p className={`text-sm mt-1 ${statusMessage.type === 'success' ? 'text-green-600' : 'text-red-500'
                  }`}>
                  {statusMessage.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-600 text-white rounded-md p-2 mt-4 text-sm hover:bg-blue-700 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
              {loading ? 'Sending...' : 'Reset Password'}
            </button>
            <Link
              to="/login"
              className='flex items-center justify-center gap-1 mt-4 text-sm text-gray-600 hover:text-gray-800'
            >
              <Icon icon="fluent-mdl2:back" width="16" height="16" />
              <span>Back to login</span>
            </Link>
          </div>
        </form>
      </div>
    ),
    2: (
      <div className={`transform transition-all duration-500 ${step === 2 ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
        <form onSubmit={handleVerifyOTP} className="relative">
          <BackButton />
          <div className='flex flex-col items-center justify-center gap-1'>
            <div className="border border-gray-400 p-2 rounded-md flex items-center justify-center">
              <Icon icon="mdi:password-check" width="20" height="20" style={{ color: 'dark' }} />
            </div>
            <h2 className="text-xl font-semibold">Enter OTP Code</h2>
            <p className='text-gray-500 text-sm'>We sent a code to your email</p>
            <p className="font-medium text-gray-800">{email}</p>
          </div>
          <div className='w-80 sm:w-96 m-auto mt-8'>
            <div className="flex flex-col space-y-2">
              <label htmlFor="otp" className="text-sm">OTP Code</label>
              <input
                type="text"
                name="otp"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value);
                  setOtpError('');
                  setStatusMessage({ type: '', message: '' });
                }}
                disabled={loading}
                required
                className={`border ${otpError ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder='Enter the 6-digit code'
              />
              {otpError && (
                <p className="text-red-500 text-xs mt-1">{otpError}</p>
              )}
              {statusMessage.message && (
                <p className={`text-sm mt-1 ${statusMessage.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
                  {statusMessage.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-600 text-white rounded-md p-2 mt-4 text-sm hover:bg-blue-700 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
            <button
              type="button"
              onClick={handleSendOTP}
              disabled={loading}
              className="w-full text-gray-600 text-sm mt-4 hover:text-gray-800"
            >
              Didn't receive the code? Send again
            </button>
          </div>
        </form>
      </div>
    ),
    3: (
      <div className={`transform transition-all duration-500 ${step === 3 ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
        <form onSubmit={handleUpdatePassword} className="relative">
          <BackButton />
          <div className='flex flex-col items-center justify-center gap-1 mt-8'>
            <div className="border border-gray-400 p-2 rounded-md flex items-center justify-center">
              <Icon icon="solar:password-outline" width="20" height="20" style={{ color: '#6c6c6c' }} />
            </div>
            <h2 className="text-xl font-semibold">Set New Password</h2>
            <p className='text-gray-500 text-sm'>Must be at least 8 characters</p>
          </div>
          <div className='w-80 sm:w-96 m-auto mt-8 space-y-4'>
            <div className="space-y-2">
              <label className="text-sm">New Password</label>
              <div className='relative'>
                <input
                  type={isFirstPasswordAppear ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    setPasswordError('');
                  }}
                  className='w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
                <button
                  type="button"
                  onClick={() => setisFirstPasswordAppear(!isFirstPasswordAppear)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  <Icon
                    icon={isFirstPasswordAppear ? "iconamoon:eye-off-light" : "lucide:eye"}
                    width="16"
                    height="16"
                    style={{ color: '#9d9d9d' }}
                  />
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm">Confirm Password</label>
              <div className='relative'>
                <input
                  type={isSecPasswordAppear ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setPasswordError('');
                  }}
                  className='w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
                <button
                  type="button"
                  onClick={() => setisSecPasswordAppear(!isSecPasswordAppear)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  <Icon
                    icon={isSecPasswordAppear ? "iconamoon:eye-off-light" : "lucide:eye"}
                    width="16"
                    height="16"
                    style={{ color: '#9d9d9d' }}
                  />
                </button>
              </div>
            </div>
            {passwordError && (
              <p className="text-red-500 text-xs mt-1">{passwordError}</p>
            )}
            <button
              type="submit"
              className='w-full bg-blue-600 text-white rounded-md p-2 mt-6 text-sm hover:bg-blue-700 transition-colors'
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    )
  };

  return (
    <div>
      <Navbar />
      <div className='bg-gray-200 min-h-screen py-8 px-4'>
        <div className='bg-white max-w-md mx-auto rounded-lg shadow-md p-6 overflow-hidden relative'>
          <div className="w-full h-1 bg-gray-200 mb-8">
            <div
              className="h-full bg-blue-600 transition-all duration-500 ease-in-out"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>

          <div className="relative">
            {stepComponents[step]}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ForgetPassword;