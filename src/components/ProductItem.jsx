import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import {Link} from 'react-router-dom'

const ProductItem = ({id,image,name,price}) => {
    
    const {currency} = useContext(ShopContext);

  return (
    <Link onClick={()=>scrollTo(0,0)} to={`/product/${id}`} className='group block'>
      <div className='bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden'>
        {/* Image Container with Fixed Aspect Ratio */}
        <div className='relative aspect-square overflow-hidden bg-gray-50'>
          <img 
            className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out' 
            src={image[0]} 
            alt={name}
            loading="lazy"
          />
          
          {/* Quick Actions Overlay */}
          {/* <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center'>
            <div className='opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 space-y-2'>
              <button className='w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors duration-200 shadow-lg'>
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              <button className='w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors duration-200 shadow-lg'>
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                </svg>
              </button>
            </div>
          </div> */}
          
          {/* Sale Badge */}
          <div className='absolute top-2 sm:top-3 left-2 sm:left-3'>
            <span className='bg-black text-white text-xs font-medium px-2 py-1 rounded-full shadow-sm'>
              New
            </span>
          </div>
        </div>
        
        {/* Product Info */}
        <div className='p-3 sm:p-4 space-y-2'>
          <h3 className='font-medium text-black group-hover:text-gray-700 transition-colors duration-200 line-clamp-2 text-sm sm:text-base leading-tight'>
            {name}
          </h3>
          <div className='flex items-center justify-between'>
            <span className='text-base sm:text-lg font-bold text-black'>
              {currency}{price}
            </span>
            {/* <div className='flex items-center space-x-1'>
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductItem
