import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

const CartTotal = () => {

    const { delivery_fee, getCartAmount, formatPrice } = useContext(ShopContext);

  return (
    <div className='w-full'>
      <h3 className='text-lg sm:text-xl font-semibold text-black mb-4 sm:mb-6'>Order Summary</h3>

      <div className='space-y-3 sm:space-y-4'>
        <div className='flex justify-between items-center py-2'>
          <span className='text-gray-600 text-sm sm:text-base'>Subtotal</span>
          <span className='font-medium text-black text-sm sm:text-base'>{formatPrice(getCartAmount())}</span>
        </div>
        
        <div className='flex justify-between items-center py-2'>
          <span className='text-gray-600 text-sm sm:text-base'>Shipping Fee</span>
          <span className='font-medium text-black text-sm sm:text-base'>{formatPrice(delivery_fee)}</span>
        </div>
        
        <div className='border-t border-gray-200 pt-3 sm:pt-4'>
          <div className='flex justify-between items-center'>
            <span className='text-base sm:text-lg font-semibold text-black'>Total</span>
            <span className='text-xl sm:text-2xl font-bold text-black'>
              {formatPrice(getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee)}
            </span>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className='mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-50 rounded-lg'>
        <div className='flex items-start space-x-3'>
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className='text-xs sm:text-sm text-gray-600'>
            <p className='font-medium text-gray-700 mb-1'>Free shipping on orders over {formatPrice(50)}</p>
            <p>Estimated delivery: 3-5 business days</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartTotal
