import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';

const Cart = () => {

  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {

    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item]
            })
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products])

  return (
    <div className='min-h-screen bg-dark-50 pt-20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        
        {/* Header */}
        <div className='text-center mb-12'>
          <Title text1={'YOUR'} text2={'CART'} />
          <p className='text-dark-600 mt-4'>
            {cartData.length === 0 ? 'Your cart is empty' : `${cartData.length} item${cartData.length > 1 ? 's' : ''} in your cart`}
          </p>
        </div>

        {cartData.length === 0 ? (
          <div className='text-center py-20'>
            <div className='w-24 h-24 bg-dark-200 rounded-full flex items-center justify-center mx-auto mb-6'>
              <svg className="w-12 h-12 text-dark-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
            </div>
            <h3 className='text-xl font-semibold text-dark-900 mb-2'>Your cart is empty</h3>
            <p className='text-dark-600 mb-6'>Looks like you haven't added any items to your cart yet.</p>
            <button 
              onClick={() => navigate('/collection')}
              className='btn-primary'
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className='bg-white rounded-2xl shadow-lg overflow-hidden mb-8'>
              {cartData.map((item, index) => {
                const productData = products.find((product) => product._id === item._id);

                return (
                  <div key={index} className={`p-6 ${index !== cartData.length - 1 ? 'border-b border-dark-100' : ''}`}>
                    <div className='flex items-center gap-6'>
                      {/* Product Image */}
                      <div className='w-20 h-20 rounded-lg overflow-hidden flex-shrink-0'>
                        <img 
                          className='w-full h-full object-cover' 
                          src={productData.image[0]} 
                          alt={productData.name} 
                        />
                      </div>
                      
                      {/* Product Details */}
                      <div className='flex-1 min-w-0'>
                        <h3 className='text-lg font-semibold text-dark-900 mb-2 line-clamp-2'>
                          {productData.name}
                        </h3>
                        <div className='flex items-center gap-4'>
                          <span className='text-xl font-bold text-roviks-600'>
                            {currency}{productData.price}
                          </span>
                          <span className='px-3 py-1 bg-roviks-50 text-roviks-700 text-sm font-medium rounded-full'>
                            Size: {item.size}
                          </span>
                        </div>
                      </div>
                      
                      {/* Quantity Controls */}
                      <div className='flex items-center gap-3'>
                        <div className='flex items-center border border-dark-200 rounded-lg'>
                          <button 
                            onClick={() => updateQuantity(item._id, item.size, Math.max(1, item.quantity - 1))}
                            className='w-10 h-10 flex items-center justify-center text-dark-600 hover:text-roviks-600 hover:bg-roviks-50 transition-colors duration-200'
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <input 
                            onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))} 
                            className='w-16 h-10 text-center border-0 focus:ring-0 text-dark-900 font-medium' 
                            type="number" 
                            min={1} 
                            defaultValue={item.quantity} 
                          />
                          <button 
                            onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                            className='w-10 h-10 flex items-center justify-center text-dark-600 hover:text-roviks-600 hover:bg-roviks-50 transition-colors duration-200'
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                        
                        {/* Remove Button */}
                        <button 
                          onClick={() => updateQuantity(item._id, item.size, 0)}
                          className='w-10 h-10 flex items-center justify-center text-dark-400 hover:text-roviks-600 hover:bg-roviks-50 rounded-lg transition-colors duration-200'
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Cart Summary */}
            <div className='flex justify-end'>
              <div className='w-full max-w-md'>
                <div className='bg-white rounded-2xl shadow-lg p-6'>
                  <CartTotal />
                  <button 
                    onClick={() => navigate('/place-order')} 
                    className='w-full btn-primary text-lg py-4 mt-6'
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Cart
