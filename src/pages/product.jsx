/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import RelatedProducts from '../component/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { products, addToCart, backendUrl } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  useEffect(() => {
    const found = products.find((item) => item._id === productId);
    if (found) {
      setProductData(found);
      setImage(
        Array.isArray(found.images) && found.images[0]
          ? backendUrl + found.images[0]
          : assets.placeholder_image
      );
    }
  }, [productId, products]);

  if (!productData) {
    return <div className="p-10 text-center text-gray-500">Loading product...</div>;
  }

  return (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product Image */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          {/* Thumbnails */}
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {Array.isArray(productData.images) && productData.images.length > 0 ? (
              productData.images.map((img, index) => (
                <img
                  key={index}
                  onClick={() => setImage(backendUrl + img)}
                  src={backendUrl + img}
                  alt=""
                  className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
                />
              ))
            ) : (
              <img src={assets.placeholder_image} className="w-full" alt="No images" />
            )}
          </div>

          {/* Main Image */}
          <div className="w-full sm:w-[80%]">
            <img src={image} alt='' className='w-full h-auto object-cover' />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt='' className='w-3.5' />
            <img src={assets.star_icon} alt='' className='w-3.5' />
            <img src={assets.star_icon} alt='' className='w-3.5' />
            <img src={assets.star_icon} alt='' className='w-3.5' />
            <img src={assets.star_dull_icon} alt='' className='w-3.5' />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>${productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>

          {/* Sizes */}
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {Array.isArray(productData.sizes) &&
                productData.sizes.map((item, index) => (
                  <button
                    onClick={() => setSize(item)}
                    className={`border py-2 px-4 bg-gray-50 ${item === size ? 'border-orange-500 bg-gray-200' : ''}`}
                    key={index}
                  >
                    {item}
                  </button>
                ))}
            </div>
          </div>

          {/* Add to cart */}
          <button
            onClick={() => addToCart(productData._id, size)}
            className='bg-black text-white py-2 px-2 text-sm active:bg-gray-700'
          >
            ADD TO CART
          </button>

          {/* Info */}
          <hr className='mt-8 sm:w-4/5' />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description & Reviews */}
      <div className="mt-8">
        <div className="flex">
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-600">
          <p>
            An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet...
          </p>
          <p>
            E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations.
          </p>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  );
};

export default Product;
