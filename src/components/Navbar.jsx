import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {

    const [visible,setVisible] = useState(false);

    const {setShowSearch , getCartCount , navigate, token, setToken, setCartItems} = useContext(ShopContext);

    const logout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
    }

  return (
    <>
      <style jsx>{`
        :root {
          --cube-size: 26px; /* Change this value to resize the cube easily */
          --cube-half: calc(var(--cube-size) / 2);
          --cube-border: 1.5px;
          
          /* Cube colors - change these to customize colors */
          --cube-color-1: #ffffff; /* White */
          --cube-color-2: #ef4444; /* Red */
          --cube-color-3: #3b82f6; /* Blue */
          --cube-color-4: #22c55e; /* Green */
          --cube-color-5: #f59e0b; /* Orange/Yellow */
          --cube-color-6: #1f1f1f;  /* Black/Dark */
          --cube-border-color: #000000;
        }
        
        .rubiks-cube {
          width: var(--cube-size);
          height: var(--cube-size);
          position: relative;
          transform-style: preserve-3d;
          animation: scramblingCube 8s infinite ease-in-out;
          perspective: 800px;
        }
        
        .cube-face {
          position: absolute;
          width: var(--cube-size);
          height: var(--cube-size);
          border: var(--cube-border) solid var(--cube-border-color);
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(3, 1fr);
          gap: 1px;
          background-color: var(--cube-border-color);
        }
        
        .cube-face.front {
          transform: rotateY(0deg) translateZ(var(--cube-half));
        }
        
        .cube-face.back {
          transform: rotateY(180deg) translateZ(var(--cube-half));
        }
        
        .cube-face.right {
          transform: rotateY(90deg) translateZ(var(--cube-half));
        }
        
        .cube-face.left {
          transform: rotateY(-90deg) translateZ(var(--cube-half));
        }
        
        .cube-face.top {
          transform: rotateX(90deg) translateZ(var(--cube-half));
        }
        
        .cube-face.bottom {
          transform: rotateX(-90deg) translateZ(var(--cube-half));
        }
        
        .cube-sticker {
          border-radius: 1px;
          border: 1px solid var(--cube-border-color);
          transition: all 0.3s ease;
        }
        
        /* Scrambled patterns for each face - keeping it unsolved */
        .cube-face.front .cube-sticker:nth-child(1) { background-color: var(--cube-color-1); }
        .cube-face.front .cube-sticker:nth-child(2) { background-color: var(--cube-color-2); }
        .cube-face.front .cube-sticker:nth-child(3) { background-color: var(--cube-color-3); }
        .cube-face.front .cube-sticker:nth-child(4) { background-color: var(--cube-color-4); }
        .cube-face.front .cube-sticker:nth-child(5) { background-color: var(--cube-color-1); }
        .cube-face.front .cube-sticker:nth-child(6) { background-color: var(--cube-color-5); }
        .cube-face.front .cube-sticker:nth-child(7) { background-color: var(--cube-color-2); }
        .cube-face.front .cube-sticker:nth-child(8) { background-color: var(--cube-color-6); }
        .cube-face.front .cube-sticker:nth-child(9) { background-color: var(--cube-color-3); }
        
        .cube-face.back .cube-sticker:nth-child(1) { background-color: var(--cube-color-5); }
        .cube-face.back .cube-sticker:nth-child(2) { background-color: var(--cube-color-1); }
        .cube-face.back .cube-sticker:nth-child(3) { background-color: var(--cube-color-4); }
        .cube-face.back .cube-sticker:nth-child(4) { background-color: var(--cube-color-2); }
        .cube-face.back .cube-sticker:nth-child(5) { background-color: var(--cube-color-5); }
        .cube-face.back .cube-sticker:nth-child(6) { background-color: var(--cube-color-6); }
        .cube-face.back .cube-sticker:nth-child(7) { background-color: var(--cube-color-3); }
        .cube-face.back .cube-sticker:nth-child(8) { background-color: var(--cube-color-1); }
        .cube-face.back .cube-sticker:nth-child(9) { background-color: var(--cube-color-4); }
        
        .cube-face.right .cube-sticker:nth-child(1) { background-color: var(--cube-color-2); }
        .cube-face.right .cube-sticker:nth-child(2) { background-color: var(--cube-color-3); }
        .cube-face.right .cube-sticker:nth-child(3) { background-color: var(--cube-color-1); }
        .cube-face.right .cube-sticker:nth-child(4) { background-color: var(--cube-color-5); }
        .cube-face.right .cube-sticker:nth-child(5) { background-color: var(--cube-color-2); }
        .cube-face.right .cube-sticker:nth-child(6) { background-color: var(--cube-color-4); }
        .cube-face.right .cube-sticker:nth-child(7) { background-color: var(--cube-color-6); }
        .cube-face.right .cube-sticker:nth-child(8) { background-color: var(--cube-color-1); }
        .cube-face.right .cube-sticker:nth-child(9) { background-color: var(--cube-color-5); }
        
        .cube-face.left .cube-sticker:nth-child(1) { background-color: var(--cube-color-4); }
        .cube-face.left .cube-sticker:nth-child(2) { background-color: var(--cube-color-6); }
        .cube-face.left .cube-sticker:nth-child(3) { background-color: var(--cube-color-2); }
        .cube-face.left .cube-sticker:nth-child(4) { background-color: var(--cube-color-1); }
        .cube-face.left .cube-sticker:nth-child(5) { background-color: var(--cube-color-4); }
        .cube-face.left .cube-sticker:nth-child(6) { background-color: var(--cube-color-3); }
        .cube-face.left .cube-sticker:nth-child(7) { background-color: var(--cube-color-5); }
        .cube-face.left .cube-sticker:nth-child(8) { background-color: var(--cube-color-2); }
        .cube-face.left .cube-sticker:nth-child(9) { background-color: var(--cube-color-6); }
        
        .cube-face.top .cube-sticker:nth-child(1) { background-color: var(--cube-color-3); }
        .cube-face.top .cube-sticker:nth-child(2) { background-color: var(--cube-color-5); }
        .cube-face.top .cube-sticker:nth-child(3) { background-color: var(--cube-color-6); }
        .cube-face.top .cube-sticker:nth-child(4) { background-color: var(--cube-color-4); }
        .cube-face.top .cube-sticker:nth-child(5) { background-color: var(--cube-color-3); }
        .cube-face.top .cube-sticker:nth-child(6) { background-color: var(--cube-color-1); }
        .cube-face.top .cube-sticker:nth-child(7) { background-color: var(--cube-color-2); }
        .cube-face.top .cube-sticker:nth-child(8) { background-color: var(--cube-color-5); }
        .cube-face.top .cube-sticker:nth-child(9) { background-color: var(--cube-color-4); }
        
        .cube-face.bottom .cube-sticker:nth-child(1) { background-color: var(--cube-color-6); }
        .cube-face.bottom .cube-sticker:nth-child(2) { background-color: var(--cube-color-4); }
        .cube-face.bottom .cube-sticker:nth-child(3) { background-color: var(--cube-color-5); }
        .cube-face.bottom .cube-sticker:nth-child(4) { background-color: var(--cube-color-3); }
        .cube-face.bottom .cube-sticker:nth-child(5) { background-color: var(--cube-color-6); }
        .cube-face.bottom .cube-sticker:nth-child(6) { background-color: var(--cube-color-2); }
        .cube-face.bottom .cube-sticker:nth-child(7) { background-color: var(--cube-color-1); }
        .cube-face.bottom .cube-sticker:nth-child(8) { background-color: var(--cube-color-3); }
        .cube-face.bottom .cube-sticker:nth-child(9) { background-color: var(--cube-color-4); }
        
        @keyframes scramblingCube {
          0% {
            transform: rotateX(-20deg) rotateY(35deg) rotateZ(0deg);
          }
          
          12.5% {
            transform: rotateX(-20deg) rotateY(125deg) rotateZ(0deg);
          }
          
          25% {
            transform: rotateX(70deg) rotateY(125deg) rotateZ(0deg);
          }
          
          37.5% {
            transform: rotateX(70deg) rotateY(215deg) rotateZ(0deg);
          }
          
          50% {
            transform: rotateX(-20deg) rotateY(305deg) rotateZ(0deg);
          }
          
          62.5% {
            transform: rotateX(-20deg) rotateY(395deg) rotateZ(0deg);
          }
          
          75% {
            transform: rotateX(-20deg) rotateY(395deg) rotateZ(90deg);
          }
          
          87.5% {
            transform: rotateX(25deg) rotateY(485deg) rotateZ(90deg);
          }
          
          100% {
            transform: rotateX(-20deg) rotateY(395deg) rotateZ(0deg);
          }
        }
        
        /* Add subtle glow effect during animation */
        .rubiks-cube:hover {
          filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.3));
        }
        
        @media (max-width: 640px) {
          :root {
            --cube-size: 22px;
            --cube-border: 1px;
          }
        }
      `}</style>
      
      <nav className='bg-white border-b border-gray-200 sticky top-0 z-40 backdrop-blur-sm bg-white/95'>
        <div className='w-full'>
          <div className='flex items-center justify-between h-14 sm:h-16 md:h-18 px-4 sm:px-6 lg:px-8'>
            
            {/* Logo with Rubik's Cube - Left Side */}
            <Link to='/' className='flex items-center flex-shrink-0 space-x-3'>
              <span className='text-2xl sm:text-3xl font-bold text-black' style={{fontFamily: 'Montserrat, sans-serif'}}>Tweest</span>
              {/* <div className='rubiks-cube'>
                <div className='cube-face front'>
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className='cube-sticker'></div>
                  ))}
                </div>
                <div className='cube-face back'>
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className='cube-sticker'></div>
                  ))}
                </div>
                <div className='cube-face right'>
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className='cube-sticker'></div>
                  ))}
                </div>
                <div className='cube-face left'>
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className='cube-sticker'></div>
                  ))}
                </div>
                <div className='cube-face top'>
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className='cube-sticker'></div>
                  ))}
                </div>
                <div className='cube-face bottom'>
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className='cube-sticker'></div>
                  ))}
                </div>
              </div> */}
            </Link>

            {/* Desktop Navigation - Center */}
            <div className='hidden lg:flex items-center justify-center flex-1 max-w-md mx-8'>
              <ul className='flex items-center space-x-8'>
                <li>
                  <NavLink to='/' className={({isActive}) => 
                    `relative group py-2 px-1 font-medium text-sm transition-colors duration-200 ${
                      isActive ? 'text-black' : 'text-gray-600 hover:text-black'
                    }`
                  }>
                    Home
                    <div className='absolute bottom-0 left-0 right-0 h-0.5 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200'></div>
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/collection' className={({isActive}) => 
                    `relative group py-2 px-1 font-medium text-sm transition-colors duration-200 ${
                      isActive ? 'text-black' : 'text-gray-600 hover:text-black'
                    }`
                  }>
                    Collection
                    <div className='absolute bottom-0 left-0 right-0 h-0.5 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200'></div>
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/about' className={({isActive}) => 
                    `relative group py-2 px-1 font-medium text-sm transition-colors duration-200 ${
                      isActive ? 'text-black' : 'text-gray-600 hover:text-black'
                    }`
                  }>
                    About
                    <div className='absolute bottom-0 left-0 right-0 h-0.5 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200'></div>
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/contact' className={({isActive}) => 
                    `relative group py-2 px-1 font-medium text-sm transition-colors duration-200 ${
                      isActive ? 'text-black' : 'text-gray-600 hover:text-black'
                    }`
                  }>
                    Contact
                    <div className='absolute bottom-0 left-0 right-0 h-0.5 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200'></div>
                  </NavLink>
                </li>
              </ul>
            </div>

            {/* Right Side Icons */}
            <div className='flex items-center space-x-2 sm:space-x-3 flex-shrink-0'>
              
              {/* Search Icon */}
              <button 
                onClick={() => { setShowSearch(true); navigate('/collection') }}
                className='p-2 sm:p-2.5 text-gray-400 hover:text-black hover:bg-gray-50 rounded-lg transition-all duration-200'
                aria-label="Search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              
              {/* Profile Icon - Desktop Only */}
              <div className='hidden sm:block relative group'>
                <button 
                  onClick={() => token ? null : navigate('/login')}
                  className='p-2 sm:p-2.5 text-gray-400 hover:text-black hover:bg-gray-50 rounded-lg transition-all duration-200'
                  aria-label="Profile"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
                
                {token && (
                  <div className='absolute right-0 top-full mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50'>
                    <div className='bg-white rounded-xl shadow-lg border border-gray-100 py-2 min-w-[160px]'>
                      <button onClick={() => navigate('/profile')} className='w-full text-left px-4 py-2 text-gray-600 hover:text-black hover:bg-gray-50 transition-colors duration-200 text-sm'>
                        My Profile
                      </button>
                      <button 
                        onClick={() => navigate('/orders')} 
                        className='w-full text-left px-4 py-2 text-gray-600 hover:text-black hover:bg-gray-50 transition-colors duration-200 text-sm'
                      >
                        Orders
                      </button>
                      <button 
                        onClick={logout} 
                        className='w-full text-left px-4 py-2 text-gray-600 hover:text-black hover:bg-gray-50 transition-colors duration-200 text-sm'
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div> 
              
              {/* Cart Icon */}
              <Link 
                to='/cart' 
                className='relative p-2 sm:p-2.5 text-gray-400 hover:text-black hover:bg-gray-50 rounded-lg transition-all duration-200'
                aria-label="Shopping cart"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 7a2 2 0 01-2 2H8a2 2 0 01-2-2L5 9z" />
                </svg>
                {getCartCount() > 0 && (
                  <span className='absolute -top-1 -right-1 w-5 h-5 bg-black text-white text-xs rounded-full flex items-center justify-center font-medium min-w-[20px]'>
                    {getCartCount() > 99 ? '99+' : getCartCount()}
                  </span>
                )}
              </Link> 
              
              {/* Mobile Menu Button */}
              <button 
                onClick={() => setVisible(true)} 
                className='lg:hidden p-2 sm:p-2.5 text-gray-400 hover:text-black hover:bg-gray-50 rounded-lg transition-all duration-200'
                aria-label="Open menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button> 
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      {visible && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
            onClick={() => setVisible(false)}
          ></div>
          
          {/* Sidebar */}
          <div className={`absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
            visible ? 'translate-x-0' : 'translate-x-full'
          }`}>
            
            {/* Sidebar Header */}
            <div className='flex items-center justify-between px-6 py-4 border-b border-gray-200'>
              <div className='flex items-center space-x-3'>
                <span className='text-2xl font-bold text-black' style={{fontFamily: 'Montserrat, sans-serif'}}>Roviks</span>
                <div className='rubiks-cube'>
                  <div className='cube-face front'>
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className='cube-sticker'></div>
                    ))}
                  </div>
                  <div className='cube-face back'>
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className='cube-sticker'></div>
                    ))}
                  </div>
                  <div className='cube-face right'>
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className='cube-sticker'></div>
                    ))}
                  </div>
                  <div className='cube-face left'>
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className='cube-sticker'></div>
                    ))}
                  </div>
                  <div className='cube-face top'>
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className='cube-sticker'></div>
                    ))}
                  </div>
                  <div className='cube-face bottom'>
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className='cube-sticker'></div>
                    ))}
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setVisible(false)}
                className='p-2 text-gray-400 hover:text-black hover:bg-gray-50 rounded-lg transition-all duration-200'
                aria-label="Close menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Navigation Links */}
            <div className='py-6'>
              <NavLink 
                to='/' 
                onClick={() => setVisible(false)}
                className={({isActive}) => 
                  `block px-6 py-3 text-base font-medium transition-colors duration-200 ${
                    isActive 
                      ? 'text-black bg-gray-50 border-r-2 border-black' 
                      : 'text-gray-600 hover:text-black hover:bg-gray-50'
                  }`
                }
              >
                Home
              </NavLink>
              
              <NavLink 
                to='/collection' 
                onClick={() => setVisible(false)}
                className={({isActive}) => 
                  `block px-6 py-3 text-base font-medium transition-colors duration-200 ${
                    isActive 
                      ? 'text-black bg-gray-50 border-r-2 border-black' 
                      : 'text-gray-600 hover:text-black hover:bg-gray-50'
                  }`
                }
              >
                Collection
              </NavLink>
              
              <NavLink 
                to='/about' 
                onClick={() => setVisible(false)}
                className={({isActive}) => 
                  `block px-6 py-3 text-base font-medium transition-colors duration-200 ${
                    isActive 
                      ? 'text-black bg-gray-50 border-r-2 border-black' 
                      : 'text-gray-600 hover:text-black hover:bg-gray-50'
                  }`
                }
              >
                About
              </NavLink>
              
              <NavLink 
                to='/contact' 
                onClick={() => setVisible(false)}
                className={({isActive}) => 
                  `block px-6 py-3 text-base font-medium transition-colors duration-200 ${
                    isActive 
                      ? 'text-black bg-gray-50 border-r-2 border-black' 
                      : 'text-gray-600 hover:text-black hover:bg-gray-50'
                  }`
                }
              >
                Contact
              </NavLink>
            </div>

            {/* User Section */}
            <div className='border-t border-gray-200 px-6 py-4'>
              {token ? (
                <div className='space-y-1'>
                  <div className='flex items-center space-x-3 px-3 py-2 text-sm text-gray-500'>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>Account</span>
                  </div>
                  
                  <button 
                    onClick={() => {setVisible(false); navigate('/profile');}} 
                    className='w-full text-left px-3 py-2 text-gray-600 hover:text-black hover:bg-gray-50 rounded-lg transition-colors duration-200'
                  >
                    My Profile
                  </button>
                  
                  <button 
                    onClick={() => {setVisible(false); navigate('/orders');}} 
                    className='w-full text-left px-3 py-2 text-gray-600 hover:text-black hover:bg-gray-50 rounded-lg transition-colors duration-200'
                  >
                    Orders
                  </button>
                  
                  <button 
                    onClick={() => {setVisible(false); logout();}} 
                    className='w-full text-left px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200'
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => {setVisible(false); navigate('/login');}} 
                  className='w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200'
                >
                  Sign In
                </button>
              )}
            </div>

            {/* Footer */}
            <div className='absolute bottom-0 left-0 right-0 p-6 bg-gray-50'>
              <div className='text-center text-sm text-gray-500'>
                <p>&copy; 2024 Roviks. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar