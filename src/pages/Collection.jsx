import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {

  const { products , search , showSearch } = useContext(ShopContext);
  const [showFilter,setShowFilter] = useState(false);
  const [filterProducts,setFilterProducts] = useState([]);
  const [category,setCategory] = useState([]);
  const [subCategory,setSubCategory] = useState([]);
  const [sortType,setSortType] = useState('relavent')

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
        setCategory(prev=> prev.filter(item => item !== e.target.value))
    }
    else{
      setCategory(prev => [...prev,e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev=> prev.filter(item => item !== e.target.value))
    }
    else{
      setSubCategory(prev => [...prev,e.target.value])
    }
  }

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0 ) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
    }

    setFilterProducts(productsCopy)
  }

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a,b)=>(a.price - b.price)));
        break;

      case 'high-low':
        setFilterProducts(fpCopy.sort((a,b)=>(b.price - a.price)));
        break;

      default:
        applyFilter();
        break;
    }
  }

  useEffect(()=>{
      applyFilter();
  },[category,subCategory,search,showSearch,products])

  useEffect(()=>{
    sortProduct();
  },[sortType])

  return (
    <div className='min-h-screen bg-white'>
      {/* Mobile Filter Toggle Button */}
      <div className='lg:hidden sticky top-16 z-30 bg-white border-b border-gray-200 px-4 py-3'>
        <button 
          onClick={()=>setShowFilter(!showFilter)} 
          className='w-full flex items-center justify-between bg-gray-50 hover:bg-gray-100 px-4 py-3 rounded-lg border border-gray-200 transition-colors duration-200'
        >
          <span className='text-sm font-medium text-gray-700'>Filters & Categories</span>
          <div className='flex items-center space-x-2'>
            <span className='text-xs text-gray-500'>
              {category.length + subCategory.length > 0 ? `${category.length + subCategory.length} active` : 'No filters'}
            </span>
            <svg 
              className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${showFilter ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>
      </div>

      <div className='flex flex-col lg:flex-row gap-4 lg:gap-8 px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8'>
        
        {/* Filter Sidebar */}
        <div className={`lg:min-w-64 lg:max-w-64 ${showFilter ? 'block' : 'hidden lg:block'}`}>
          {/* Mobile Filter Header */}
          <div className='lg:hidden flex items-center justify-between mb-4 pb-3 border-b border-gray-200'>
            <h2 className='text-lg font-semibold text-black'>Filters</h2>
            <button 
              onClick={()=>setShowFilter(false)}
              className='p-2 text-gray-400 hover:text-black hover:bg-gray-50 rounded-lg transition-colors duration-200'
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Category Filter */}
          <div className='bg-white border border-gray-200 rounded-lg p-4 mb-4'>
            <h3 className='text-sm font-semibold text-black mb-3 flex items-center'>
              <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7a2 2 0 013 12V7a4 4 0 014-4z" />
              </svg>
              CATEGORIES
            </h3>
            <div className='space-y-2'>
              {['Men', 'Women', 'Kids'].map((cat) => (
                <label key={cat} className='flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors duration-200'>
                  <input 
                    className='w-4 h-4 text-black border-gray-300 rounded focus:ring-black focus:ring-2' 
                    type="checkbox" 
                    value={cat} 
                    onChange={toggleCategory}
                    checked={category.includes(cat)}
                  />
                  <span className='text-sm text-gray-700 capitalize'>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* SubCategory Filter */}
          <div className='bg-white border border-gray-200 rounded-lg p-4 mb-4'>
            <h3 className='text-sm font-semibold text-black mb-3 flex items-center'>
              <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              TYPE
            </h3>
            <div className='space-y-2'>
              {['Topwear', 'Bottomwear', 'Winterwear'].map((subCat) => (
                <label key={subCat} className='flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors duration-200'>
                  <input 
                    className='w-4 h-4 text-black border-gray-300 rounded focus:ring-black focus:ring-2' 
                    type="checkbox" 
                    value={subCat} 
                    onChange={toggleSubCategory}
                    checked={subCategory.includes(subCat)}
                  />
                  <span className='text-sm text-gray-700'>{subCat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Active Filters Summary */}
          {(category.length > 0 || subCategory.length > 0) && (
            <div className='bg-gray-50 border border-gray-200 rounded-lg p-4'>
              <h4 className='text-sm font-medium text-black mb-2'>Active Filters</h4>
              <div className='space-y-1'>
                {category.map(cat => (
                  <span key={cat} className='inline-block bg-black text-white text-xs px-2 py-1 rounded-full mr-2 mb-2'>
                    {cat}
                  </span>
                ))}
                {subCategory.map(subCat => (
                  <span key={subCat} className='inline-block bg-gray-700 text-white text-xs px-2 py-1 rounded-full mr-2 mb-2'>
                    {subCat}
                  </span>
                ))}
              </div>
              <button 
                onClick={() => {setCategory([]); setSubCategory([]);}}
                className='text-xs text-gray-600 hover:text-black underline mt-2'
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className='flex-1 min-w-0'>
          {/* Header Section */}
          <div className='mb-6 sm:mb-8'>
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6'>
              <Title text1={'ALL'} text2={'COLLECTIONS'} />
              
              {/* Sort Dropdown */}
              <div className='flex items-center space-x-3'>
                <label className='text-sm font-medium text-gray-700 hidden sm:block'>Sort by:</label>
                <select 
                  onChange={(e)=>setSortType(e.target.value)} 
                  value={sortType}
                  className='border-2 border-gray-300 text-sm px-3 py-2 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 bg-white'
                >
                  <option value="relavent">Most Relevant</option>
                  <option value="low-high">Price: Low to High</option>
                  <option value="high-low">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className='flex items-center justify-between text-sm text-gray-600 mb-4'>
              <span>{filterProducts.length} products found</span>
              <span className='hidden sm:block'>Showing all results</span>
            </div>
          </div>

          {/* Products Grid - Same as Home Page */}
          {filterProducts.length > 0 ? (
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
              {filterProducts.map((item,index)=>(
                <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
              ))}
            </div>
          ) : (
            <div className='text-center py-12 sm:py-16'>
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <h3 className='text-lg font-medium text-gray-700 mb-2'>No products found</h3>
              <p className='text-sm text-gray-500 mb-4'>Try adjusting your filters or search terms</p>
              <button 
                onClick={() => {setCategory([]); setSubCategory([]);}}
                className='bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition-colors duration-200'
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Collection
