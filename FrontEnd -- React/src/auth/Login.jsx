import React, { useState } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from "@iconify/react";
import { supabase } from '../services/supabaseClient';

const Login = () => {
  //handle login info
  const [userInfo, setUserInfo] = useState({ email: '', password: '' });

  //handle password appearence
  const [isPasswordAppear, setisPasswordAppear] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!userInfo.email.trim() || !userInfo.password.trim()) {
      setError('Please enter both email and password');
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: userInfo.email,
        password: userInfo.password,
      });

      if (error) throw error;


      if (data.user) {

        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (profileError) throw profileError;

        const username = profileData?.username || data.user.email.split('@')[0];
        localStorage.setItem('userLoggedId', data.user.id);
        localStorage.setItem('userLoggedEmail', data.user.email);
        localStorage.setItem('userLoggedName', username);
        navigate('/');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message === 'Invalid login credentials'
        ? 'Invalid email or password'
        : 'An error occurred during login'
      );
    } finally {
      setLoading(false);
    }
  }

  const HandlePasswordAppearence = () => {
    setisPasswordAppear(!isPasswordAppear);
  }

  return (
    <div>
      <Navbar />
      <div className='min-h-fill bg-gray-50 py-4 sm:py-6 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md mx-auto'>
          <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6'>
            <div className='text-center'>
              <h2 className='text-xl font-semibold text-gray-900'>Welcome back</h2>
              <p className='mt-2 text-sm text-gray-600'>
                Please sign in to your account
              </p>
            </div>

            <form onSubmit={handleLogin} className='space-y-4'>
              <div className='flex flex-row p-2 border border-gray-200 hover:border-blue-400 transition-colors duration-300 rounded-md w-[90%] sm:w-4/5 m-auto gap-2'>
                <Icon icon="mdi:email-outline" width="16" height="16" style={{ color: '2569CE' }}
                  className="sm:w-[18px] sm:h-[18px]" />
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder='Email'
                  autoComplete="off"
                  onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                  className='focus:outline-none w-full text-xs sm:text-sm'
                />
              </div>
              <div className='flex justify-between p-2 border border-gray-200 hover:border-blue-400 transition-colors duration-300 rounded-md w-[90%] sm:w-4/5 m-auto'>
                <div className='flex flex-row items-center gap-2 flex-1'>
                  <Icon icon="mdi:password" width="16" height="16" style={{ color: '2569CE' }}
                    className="sm:w-[18px] sm:h-[18px]" />
                  <input
                    type={isPasswordAppear ? 'text' : 'password'}
                    name="password"
                    id="password"
                    placeholder='Password'
                    onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
                    className='focus:outline-none w-full text-xs sm:text-sm'
                  />
                </div>
                <div className='flex items-center'>
                  <Icon
                    icon={isPasswordAppear ? "iconamoon:eye-off-light" : "lucide:eye"}
                    width="16"
                    height="16"
                    style={{ color: '#9d9d9d' }}
                    onClick={HandlePasswordAppearence}
                    className="sm:w-[18px] sm:h-[18px] cursor-pointer hover:text-blue-600"
                  />
                </div>
              </div>
              {error && (
                <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                  {error}
                </div>
              )}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md
                  shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                  disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors duration-200'
                >
                  {loading ? 'Signing in...' : 'Sign in'}
                </button>
              </div>
            </form>

            <div className='text-center'>
              <Link
                to="/PasswordRegistration"
                className='text-sm text-blue-600 hover:text-blue-500 transition-colors duration-200'
              >
                Forgot your password?
              </Link>
            </div>

            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t border-gray-200'></div>
              </div>
              <div className='relative flex justify-center text-sm'>
                <span className='px-2 bg-white text-gray-500'>Don't have an account?</span>
              </div>
            </div>

            <div className='text-center'>
              <Link
                to="/signup"
                className='inline-flex items-center justify-center px-4 py-2 border border-blue-600
                text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50
                transition-colors duration-200'
              >
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Login