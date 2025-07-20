/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { assets } from "../assets/frontend_assets/assets"; // تأكد من وجود placeholder داخل هذا الملف

const ProductItem = ({ id, image, name, price }) => {
  const { currency, backendUrl } = useContext(ShopContext);
  const imageUrl = Array.isArray(image) ? image[0] : image;

  const displayImage = imageUrl?.startsWith('http')
      ? imageUrl
      : backendUrl + imageUrl;

  return (
    <Link
      to={`/product/${id}`}
      className='text-gray-700 cursor-pointer border border-gray-100 rounded-md transition duration-150 ease-in-out hover:shadow-lg'
    >
      <div className="overflow-hidden">
        <img
          src={displayImage}
          alt={name}
          className='hover:scale-110 transition-transform duration-300 ease-in-out w-full h-55 object-cover rounded-t-md'
          onError={(e) => {
            e.target.src = assets.placeholder_image;
          }}
        />
      </div>
      <div className="p-3">
        <p className='text-sm font-medium text-gray-800 truncate'>{name}</p>
        <p className='text-sm font-semibold text-green-600'>{currency} {price}</p>
      </div>
    </Link>
  );
};

export default ProductItem;
