import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useLocation } from 'react-router-dom';

const SearchBar = () => {

    const { search, setSearch, showSearch, setShowSearch} = useContext(ShopContext);
    const [visible,setVisible] = useState(false)
    const location = useLocation();

    useEffect(()=>{
        if (location.pathname.includes('collection')) {
            setVisible(true);
        }
        else {
            setVisible(false)
        }
    },[location])
    
  return showSearch && visible ? (
    <div className='bg-white border-b border-dark-100 shadow-sm'>
      <div className='max-w-2xl mx-auto px-4 py-6'>
        <div className='relative'>
          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
            <svg className="h-5 w-5 text-dark-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input 
            value={search} 
            onChange={(e)=>setSearch(e.target.value)} 
            className='block w-full pl-10 pr-12 py-3 border border-dark-200 rounded-lg focus:ring-2 focus:ring-roviks-500 focus:border-transparent transition-all duration-200 text-dark-900 placeholder-dark-400' 
            type="text" 
            placeholder='Search for products...'
          />
          <div className='absolute inset-y-0 right-0 flex items-center'>
            <button
              onClick={()=>setShowSearch(false)}
              className='p-2 text-dark-400 hover:text-roviks-600 hover:bg-roviks-50 rounded-md transition-colors duration-200'
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        {search && (
          <div className='mt-3 text-sm text-dark-500'>
            <span className='font-medium'>Searching for:</span> "{search}"
          </div>
        )}
      </div>
    </div>
  ) : null
}

export default SearchBar
