import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';
import LoadingSkeleton from './isLoading';
import { NavLink } from 'react-router-dom';

const LatestCollection = () => {

const [loading,setLoading] = useState(true);

    const { products } = useContext(ShopContext);
    const [latestProducts,setLatestProducts] = useState([]);

    useEffect(()=>{
        setLatestProducts(products.slice(0,6));
        if(products.length>0){
          setLoading(false);
        }
    },[products])

  return (
    <section  id="latest-collection" className='py-8 sm:py-12 lg:py-16'>
      <div className='text-center mb-8 sm:mb-12 px-4'>
        <Title text1={'Define The Future'} text2={' LATEST COLLECTIONS'} />
        <p className='max-w-2xl mx-auto text-xs sm:text-base text-black leading-relaxed'>
         
        </p>
      </div>

      {/* Products Grid - Same as Home Page */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 px-4'>
       {loading ? (
    <LoadingSkeleton  noofskeleton={6} />
) : (
    latestProducts.map((item, index) => (
        <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
    ))
)}
      </div>

      {/* View All Button */}
     
    </section>
  )
}

export default LatestCollection
