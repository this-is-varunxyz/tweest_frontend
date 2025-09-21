import React from 'react'

const Title = ({text1,text2}) => {
  return (
    <div className='text-center mb-6 sm:mb-8'>
      <div className='inline-flex items-center gap-3 mb-3 sm:mb-4'>
        <div className='w-8 h-0.5 sm:w-12 bg-black'></div>
        <span className='text-xl  sm:text-xl font-bold text-black uppercase tracking-wider'>{text1}</span>
        <div className='w-8 h-0.5 sm:w-12 bg-black'></div>
      </div>
      <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-black leading-tight'>
        {text2}
      </h2>
    </div>
  )
}

export default Title
