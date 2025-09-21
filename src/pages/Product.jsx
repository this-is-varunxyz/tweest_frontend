import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

  const { productId } = useParams();
  const { products, addToCart, formatPrice, navigate, token, backendUrl } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('')
  const [size,setSize] = useState('')
  const [color, setColor] = useState('')
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [photos, setPhotos] = useState([]);
  const [submittingReview, setSubmittingReview] = useState(false);
  const [lightbox, setLightbox] = useState({ open: false, src: '' });

  const fetchProductData = async () => {

    products.map((item) => {
      if (item._id === productId) {
        setProductData(item)
        setImage(item.image[0])
        return null;
      }
    })

  }

  const submitReview = async () => {
    // Validation checks
    if (!token) {
      toast.error('Please login to submit a review');
      navigate('/login');
      return;
    }
    
    if (rating === 0) {
      toast.error('Please select a star rating');
      return;
    }

    if (!comment.trim()) {
      toast.error('Please write a review comment');
      return;
    }

    try {
      setSubmittingReview(true);
      
      const formData = new FormData();
      formData.append('rating', String(rating));
      formData.append('comment', comment.trim());
      
      // Add photos if any
      if (photos && photos.length > 0) {
        photos.forEach((file, index) => {
          formData.append('photos', file);
        });
      }

      console.log('Submitting review to:', `${backendUrl}/api/product/${productData._id}/review`);
      console.log('Rating:', rating, 'Comment:', comment, 'Photos:', photos.length);

      const response = await fetch(`${backendUrl}/api/product/${productData._id}/review`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Try this format
          'token': token // Keep your original format too
        },
        body: formData
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error:', errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log('Response data:', data);

      if (data.success) {
        // Update product data with new review
        setProductData(data.product);
        
        // Reset form
        setRating(0);
        setComment('');
        setPhotos([]);
        
        // Clear file input
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = '';
        
        toast.success('Review submitted successfully!');
      } else {
        toast.error(data.message || 'Failed to submit review');
      }

    } catch (error) {
      console.error('Review submission error:', error);
      
      // More specific error messages
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        toast.error('Network error. Please check your connection and try again.');
      } else if (error.message.includes('401')) {
        toast.error('Authentication failed. Please login again.');
        navigate('/login');
      } else if (error.message.includes('400')) {
        toast.error('Invalid request. Please check your input and try again.');
      } else if (error.message.includes('500')) {
        toast.error('Server error. Please try again later.');
      } else {
        toast.error(`Error: ${error.message || 'Something went wrong'}`);
      }
    } finally {
      setSubmittingReview(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId,products])

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/*----------- Product Data-------------- */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/*---------- Product Images------------- */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
              {
                productData.image.map((item,index)=>(
                  <img onClick={()=>setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
                ))
              }
          </div>
          <div className='w-full sm:w-[80%]'>
              <img className='w-full h-auto' src={image} alt="" />
          </div>
        </div>

        {/* -------- Product Info ---------- */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className=' flex items-center gap-1 mt-2'>
              {[1,2,3,4,5].map(n => (
                <img key={n} src={(productData.averageRating || 0) >= n ? assets.star_icon : assets.star_dull_icon} alt="" className="w-3.5" />
              ))}
              <p className='pl-2'>({productData.numReviews || 0})</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{formatPrice(productData.price)}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
              <p>Select Size</p>
              <div className='flex gap-2'>
                {productData.sizes.map((item,index)=>(
                  <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`} key={index}>{item}</button>
                ))}
              </div>
          </div>
          {productData.colors && productData.colors.length > 0 && (
            <div className='flex flex-col gap-4 my-4'>
              <p>Select Color</p>
              <div className='flex gap-2 flex-wrap'>
                {productData.colors.map((c,index)=>(
                  <button onClick={()=>setColor(c)} className={`border py-2 px-4 bg-gray-100 ${c === color ? 'border-orange-500' : ''}`} key={index}>{c}</button>
                ))}
              </div>
            </div>
          )}
          <div className='flex gap-3'>
            <button onClick={()=>{ if(!size){toast.error('Select Product Size'); return;} if(productData.colors?.length && !color){toast.error('Select Product Color'); return;} addToCart(productData._id, color ? `${size}|${color}` : size)}} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
            <button onClick={()=>{ if(!size){toast.error('Select Product Size'); return;} if(productData.colors?.length && !color){toast.error('Select Product Color'); return;} addToCart(productData._id, color ? `${size}|${color}` : size); navigate('/place-order'); }} className='bg-orange-600 text-white px-8 py-3 text-sm active:bg-orange-700'>BUY NOW</button>
          </div>
          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
              <p>100% Original product.</p>
              <p>Cash on delivery is available on this product.</p>
              <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* ---------- Description & Review Section ------------- */}
      <div className='mt-20'>
        {/* <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p>
          <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
        </div> */}

        {/* ----- Reviews List ----- */}
        <div className='mt-10'>
          <h3 className='text-lg font-semibold mb-4'>Customer Reviews</h3>
          <div className='flex flex-col gap-5'>
            {productData.reviews && productData.reviews.length > 0 ? (
              productData.reviews.map((rev, idx) => (
                <div key={idx} className='border p-4 rounded'>
                  <div className='flex items-center gap-2'>
                    {[1,2,3,4,5].map(n => (
                      <img key={n} src={n <= rev.rating ? assets.star_icon : assets.star_dull_icon} alt="star" className='w-3.5' />
                    ))}
                    <span className='text-xs text-gray-500 ml-2'>{new Date(rev.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className='mt-2 text-gray-700'>{rev.comment}</p>
                  {rev.photos && rev.photos.length > 0 && (
                    <div className='flex gap-2 mt-2 flex-wrap'>
                      {rev.photos.map((p, i) => (
                        <img 
                          key={i} 
                          src={p} 
                          alt='review' 
                          className='w-20 h-20 object-cover rounded cursor-pointer hover:opacity-90'
                          onClick={() => setLightbox({ open: true, src: p })}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className='text-gray-500'>No reviews yet.</p>
            )}
          </div>
        </div>

        {/* ----- Add Review Form ----- */}
        <div className='mt-10'>
          <h3 className='text-lg font-semibold mb-3'>Add a review</h3>
          <div className='flex flex-col gap-3 max-w-xl'>
            <div className='flex items-center gap-2'>
              {[1,2,3,4,5].map(n => (
                <img
                  key={n}
                  onClick={() => setRating(n)}
                  src={n <= rating ? assets.star_icon : assets.star_dull_icon}
                  alt='star'
                  className='w-5 cursor-pointer'
                />
              ))}
              <span className='text-sm text-gray-600 ml-2'>{rating} / 5</span>
            </div>
            <textarea 
              value={comment} 
              onChange={(e)=>setComment(e.target.value)} 
              className='border p-2 rounded' 
              rows={4} 
              placeholder='Write your review...'
            />
            <input 
              type='file' 
              multiple 
              accept='image/*' 
              onChange={(e)=> setPhotos(Array.from(e.target.files || []))}
            />
            <div>
              <button
                type='button'
                onClick={submitReview}
                disabled={submittingReview}
                className={`bg-black text-white px-6 py-2 text-sm rounded ${submittingReview ? 'opacity-60 cursor-not-allowed' : ''}`}
              >
                {submittingReview ? 'Submitting...' : 'Submit Review'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --------- display related products ---------- */}

      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

      {/* Lightbox Modal */}
      {lightbox.open && (
        <div 
          className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50'
          onClick={() => setLightbox({ open: false, src: '' })}
        >
          <img 
            src={lightbox.src} 
            alt='full' 
            className='max-w-[90vw] max-h-[85vh] object-contain'
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

    </div>
  ) : <div className=' opacity-0'></div>
}

export default Product