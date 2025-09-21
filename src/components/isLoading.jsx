import React from 'react'

function LoadingSkeleton({noofskeleton}) {
  return (
<>

{
    [...Array(noofskeleton)].map((_,i)=>(
        <div key={i} className='animate-pulse bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden'>
        <div className='relative aspect-square bg-gray-200'></div>
        <div className='p-3 sm:p-4 space-y-2'>
            <div className='h-4 bg-gray-200 rounded w-3/4'></div>
            <div className='h-5 bg-gray-200 rounded w-1/2'></div>
        </div>
      </div>
    ))
}





</>
  )
}

export default LoadingSkeleton