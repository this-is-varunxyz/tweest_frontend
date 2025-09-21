import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <section className='relative bg-white overflow-hidden'>
      <div className='max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32'>
        <div className='grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 xl:gap-20 items-center'>
          
          {/* Hero Content */}
          <div className='space-y-6 sm:space-y-8 text-center lg:text-left'>
            {/* Badge */}
            <div className='inline-flex items-center space-x-3 bg-gray-50 text-gray-700 px-3 sm:px-4 py-2 rounded-full border border-gray-200'>
              <div className='w-2 h-2 bg-black rounded-full'></div>
              <span className='text-xs sm:text-sm font-medium'>New Collection</span>
            </div>
            
            {/* Main Heading */}
            <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-black leading-tight'>
              Discover Your
              <span className='text-black block'>Perfect Style</span>
            </h1>
            
            {/* Description */}
            <p className='text-base sm:text-lg text-gray-600 max-w-lg mx-auto lg:mx-0 leading-relaxed'>
              Explore our curated collection of premium fashion items. From timeless classics to contemporary trends, find your unique expression.
            </p>
            
            {/* CTA Buttons */}
            <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start'>
              <button className='btn-primary'>
                Shop Collection
              </button>
              <button className='btn-outline'>
                Learn More
              </button>
            </div>
            
            {/* Stats */}
            <div className='flex items-center justify-center lg:justify-start space-x-6 sm:space-x-8 pt-4'>
              <div className='text-center'>
                <div className='text-xl sm:text-2xl font-bold text-black'>500+</div>
                <div className='text-xs sm:text-sm text-gray-500'>Products</div>
              </div>
              <div className='text-center'>
                <div className='text-xl sm:text-2xl font-bold text-black'>10k+</div>
                <div className='text-xs sm:text-sm text-gray-500'>Happy Customers</div>
              </div>
              <div className='text-center'>
                <div className='text-xl sm:text-2xl font-bold text-black'>50+</div>
                <div className='text-xs sm:text-sm text-gray-500'>Brands</div>
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className='relative order-first lg:order-last'>
            <div className='relative z-10'>
              <img 
                src={assets.hero_img} 
                alt="Fashion Collection" 
                className='w-full h-auto rounded-2xl shadow-2xl'
              />
            </div>
            
            {/* Decorative Elements */}
            <div className='absolute -top-2 sm:-top-4 -right-2 sm:-right-4 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gray-200 rounded-full opacity-60'></div>
            <div className='absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-gray-100 rounded-full opacity-40'></div>
            <div className='absolute top-1/2 -left-4 sm:-left-8 w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full opacity-80'></div>
          </div>
        </div>
      </div>
      
      {/* Background Pattern */}
      <div className='absolute inset-0 -z-10'>
        <div className='absolute top-0 left-0 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-gray-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse'></div>
        <div className='absolute top-0 right-0 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-gray-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000'></div>
      </div>
    </section>
  )
}

export default Hero
