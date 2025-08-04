import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'
import Footer from './Footer'
import { Icon } from "@iconify/react";
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { createUser } from '../services/UserService';

const Signup = () => {
  const [user, setUser] = useState({ username: '', email: '', password: '' });
  const [isPasswordAppear, setisPasswordAppear] = useState(false);
  const [isAgree, setisAgree] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const HandlePasswordAppearence = () => {
    setisPasswordAppear(!isPasswordAppear);
  }

  const HandleSubmit = async (e) => {
    e.preventDefault();

    if (!isAgree) {
      setError('You must agree to the terms before continuing.');
      return;
    }

    if (!user.username || !user.password || !user.email) {
      setError('All fields are required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // 1. Sign up with Supabase
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: user.email,
        password: user.password,
        options: {
          data: {
            username: user.username,
          }
        }
      });

      if (authError) throw authError;

      // 2. Store in Supabase profiles
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: authData.user.id,
            username: user.username,
            email: user.email,
          }
        ]);

      if (profileError) throw profileError;

      // 3. Store in Laravel backend
      await createUser({
        name: user.username,
        email: user.email,
        password: user.password
      });

      // Success - redirect to login
      navigate('/login');

    } catch (error) {
      // Cleanup if Laravel registration fails
      if (error.response) {
        const { data: authUser } = await supabase.auth.getUser();
        if (authUser?.user) {
          await supabase.auth.admin.deleteUser(authUser.user.id);
        }
      }
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Navbar />
      <div className='bg-gray-200 min-h-screen py-8 sm:py-12 md:py-16'>
        <div className='bg-white w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] m-auto border border-gray-300 rounded-lg shadow-lg 
            min-h-[450px] flex flex-col sm:flex-row overflow-hidden'>
          {/* Left Side - Full Height */}
          <div className='bg-gradient-to-br from-blue-600 to-blue-800 w-full sm:w-1/2 p-6 sm:p-8 flex flex-col justify-center min-h-[450px]'>
            <h1 className='text-white font-semibold text-lg sm:text-xl md:text-2xl'>AeroLink</h1>
            <p className='text-white/90 font-medium text-[10px] sm:text-xs md:text-sm mt-2'>
              Book Your Next Adventure with Ease
            </p>
          </div>

          {/* Right Side - Form */}
          <div className='w-full sm:w-1/2 p-4 sm:p-6 flex items-center'>
            <div className="w-[92%] sm:w-[85%] mx-auto p-4 sm:p-6 border border-gray-300 rounded-lg shadow-sm flex flex-col gap-4">
              <h2 className='font-bold text-blue-600 text-base sm:text-lg text-center'>Get Started</h2>
              <p className='text-gray-500 text-[10px] sm:text-xs text-center'>Welcome To AeroLink - Let's create your account</p>

              {/* Form Inputs */}
              <form onSubmit={HandleSubmit} className='flex flex-col gap-3'>
                <div className='flex flex-row items-center border border-gray-200 p-2 rounded-md hover:border-blue-400 transition-colors duration-300'>
                  <Icon icon="material-symbols:person" width="14" height="14"
                    className="sm:w-4 sm:h-4" style={{ color: '2569CE' }} />
                  <input
                    type="text"
                    name="username"
                    placeholder='Name'
                    value={user.username}
                    onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
                    className='focus:outline-none w-full text-[10px] sm:text-xs ml-2'
                  />
                </div>

                <div className='flex flex-row items-center border border-gray-200 p-2 rounded-md hover:border-blue-400 transition-colors duration-300'>
                  <Icon icon="mdi:email-outline" width="14" height="14"
                    className="sm:w-4 sm:h-4" style={{ color: '2569CE' }} />
                  <input type='email' name="email" placeholder='Email' value={user.email}
                    onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
                    className='focus:outline-none w-full text-[10px] sm:text-xs ml-2' />
                </div>

                <div className='flex flex-row items-center justify-between border border-gray-200 p-2 rounded-md hover:border-blue-400 transition-colors duration-300'>
                  <div className='flex items-center flex-1'>
                    <Icon icon="mdi:password" width="14" height="14"
                      className="sm:w-4 sm:h-4" style={{ color: '2569CE' }} />
                    <input type={isPasswordAppear ? 'text' : 'password'} name="password"
                      placeholder='Password' value={user.password}
                      onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
                      className='focus:outline-none w-full text-[10px] sm:text-xs ml-2' />
                  </div>
                  <Icon icon={isPasswordAppear ? "iconamoon:eye-off-light" : "lucide:eye"}
                    width="16" height="16" style={{ color: '#9d9d9d' }}
                    onClick={HandlePasswordAppearence}
                    className="sm:w-[18px] sm:h-[18px] cursor-pointer hover:text-blue-600 transition-colors duration-300" />
                </div>

                <div className='flex items-center gap-2 text-[10px] sm:text-xs'>
                  <input type="checkbox" className='w-3 h-3 rounded accent-blue-600' onChange={() => setisAgree(!isAgree)} />
                  <p className='font-medium'>
                    I agree to All <span className='text-blue-600 hover:underline cursor-pointer'>Terms</span>,
                    <span className='text-blue-600 hover:underline cursor-pointer'>Privacy Policy</span> And <span className='text-blue-600 hover:underline cursor-pointer'>Fees</span>
                  </p>
                </div>

                {error && (
                  <div className="text-red-500 text-xs text-center mb-2 bg-red-50 p-2 rounded-md">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!isAgree || loading}
                  className={`w-full px-4 py-2 text-xs font-medium rounded transition-colors duration-200
    ${isAgree && !loading
                      ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
                      : 'bg-blue-300 text-white cursor-not-allowed'}`}
                >
                  {loading ? 'Creating Account...' : 'Continue'}
                </button>
              </form>

              <p className='text-[10px] sm:text-xs font-medium text-center'>
                Have an Account?
                <Link to="/login" className='text-blue-600 hover:underline ml-1 transition-colors duration-300'>Log in</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Signup
