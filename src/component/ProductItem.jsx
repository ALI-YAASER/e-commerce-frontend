/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router';

const ProductItem = ({id,image,name , price}) => {
    const { currency} = useContext(ShopContext) ;
  return (
    <Link className='text-gray-700 cursor-pointer border border-gray-100 rounded-b-md transition duration-150 ease-in-out  ' to={`/product/${id}`}>
        <div className="overflow-hidden">
            <img className='hover:scale-110 transition-all duration-300 ease-in-out' src={image[0]} alt='' />
        </div>
        <p className='pt-3 pb-1 text-sm text-gray-500 m-1'>{name}</p>
        <p className='text-sm font-medium text-green-600 m-1'>{currency} {price}</p>
    </Link>
  )
}

export default ProductItem