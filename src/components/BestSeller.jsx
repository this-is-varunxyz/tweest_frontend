import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';
import { NavLink } from 'react-router-dom';
import LoadingSkeleton from './isLoading';

const BestSeller = () => {

    const {products} = useContext(ShopContext);
    const [bestSeller,setBestSeller] = useState([]);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        const bestProduct = products.filter((item)=>(item.bestseller));
        setBestSeller(bestProduct.slice(0,5))
        if(products.length>0){
          setLoading(false);
        }
    },[products])

  return (
    <div className='my-10'>
      <div className='text-center text-3xl py-8'>
        <Title text1={'BEST'} text2={'SELLERS'}/>
        {/* <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.
        </p> */}
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
          loading ? (
            <LoadingSkeleton noofskeleton={5} />
          ) : (
            bestSeller.map((item,index)=>(
                <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
            ))  )
        }
      </div>
       <div className='text-center mt-8 sm:mt-12'>
          <NavLink to="/collection"  className='bg-black hover:bg-gray-80 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 active:scale-95'>
            View All Collections
          </NavLink>
        </div>
    </div>
  )
  
       
    
}

export default BestSeller
