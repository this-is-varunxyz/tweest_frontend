import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)

  const [name,setName] = useState('')
  const [password,setPasword] = useState('')
  const [email,setEmail] = useState('')

  const onSubmitHandler = async (event) => {
      event.preventDefault();
      try {
        if (currentState === 'Sign Up') {
          
          const response = await axios.post(backendUrl + '/api/user/register',{name,email,password})
          if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem('token',response.data.token)
          } else {
            toast.error(response.data.message)
          }

        } else {

          const response = await axios.post(backendUrl + '/api/user/login', {email,password})
          if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem('token',response.data.token)
          } else {
            toast.error(response.data.message)
          }

        }


      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
  }

  useEffect(()=>{
    if (token) {
      navigate('/')
    }
  },[token])

  return (
    <div className='min-h-screen bg-white flex items-center justify-center px-3 sm:px-4'>
      <div className='w-full max-w-sm sm:max-w-md'>
        {/* Header */}
        <div className='text-center mb-6 sm:mb-8'>
          <div className='flex items-center justify-center space-x-2 sm:space-x-3 mb-4 sm:mb-6'>
            <div className='w-10 h-10 sm:w-12 sm:h-12 bg-black rounded-lg sm:rounded-xl flex items-center justify-center'>
              <span className='text-white font-display font-bold text-xl sm:text-2xl'>R</span>
            </div>
            <span className='text-2xl sm:text-3xl font-display font-bold text-black'>Tweest</span>
          </div>
          <h1 className='text-xl sm:text-2xl font-bold text-black mb-2'>
            {currentState === 'Login' ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className='text-gray-600 text-sm sm:text-base'>
            {currentState === 'Login' 
              ? 'Sign in to your account to continue' 
              : 'Join us and discover your perfect style'
            }
          </p>
        </div>

        {/* Form */}
        <div className='bg-white rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100'>
          <form onSubmit={onSubmitHandler} className='space-y-4 sm:space-y-6'>
            {currentState === 'Sign Up' && (
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Full Name</label>
                <input 
                  onChange={(e)=>setName(e.target.value)} 
                  value={name} 
                  className='input-field' 
                  type="text" 
                  placeholder='Enter your full name' 
                  required
                />
              </div>
            )}
            
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Email Address</label>
              <input 
                onChange={(e)=>setEmail(e.target.value)} 
                value={email} 
                className='input-field' 
                type="email" 
                placeholder='Enter your email' 
                required
              />
            </div>
            
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Password</label>
              <input 
                onChange={(e)=>setPasword(e.target.value)} 
                value={password} 
                className='input-field' 
                type="password" 
                placeholder='Enter your password' 
                required
              />
            </div>

            <div className='flex items-center justify-between text-xs sm:text-sm'>
              {currentState === 'Login' && (
                <a href="#" className='text-black hover:text-gray-700 font-medium transition-colors duration-200'>
                  Forgot password?
                </a>
              )}
              <button 
                type="button"
                onClick={() => setCurrentState(currentState === 'Login' ? 'Sign Up' : 'Login')}
                className='text-black hover:text-gray-700 font-medium transition-colors duration-200'
              >
                {currentState === 'Login' ? 'Create account' : 'Already have an account?'}
              </button>
            </div>

            <button 
              type="submit" 
              className='w-full btn-primary text-base sm:text-lg py-3 sm:py-4'
            >
              {currentState === 'Login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {/* Divider */}
          {/* <div className='mt-6 sm:mt-8 text-center'>
            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t border-gray-200'></div>
              </div>
              <div className='relative flex justify-center text-xs sm:text-sm'>
                <span className='px-2 bg-white text-gray-500'>Or continue with</span>
              </div>
            </div>
          </div> */}

          {/* Social Login */}
          {/* <div className='mt-4 sm:mt-6 grid grid-cols-2 gap-2 sm:gap-3'>
            <button className='w-full inline-flex justify-center py-2 sm:py-3 px-3 sm:px-4 border border-gray-200 rounded-lg shadow-sm bg-white text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200'>
              <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
            <button className='w-full inline-flex justify-center py-2 sm:py-3 px-3 sm:px-4 border border-gray-200 rounded-lg shadow-sm bg-white text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200'>
              <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
              Twitter
            </button>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default Login
