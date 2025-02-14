/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import Title from '../component/Title'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import { Link } from 'react-router';

const Order = () => {
    const{products, currency  } = useContext(ShopContext) ;
    
  return (
    <div className='border-t pt-14'>
      <div className="text-2xl mb-3">
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>
          <div className="">
                {
                products.slice(1,4).map((item,index)=>( 
                      <div className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4 " key={index}>
                        <div className="flex items-start gap-6">
                            <Link to='../pages/Login.jsx'>  <img src={item.image[0]} alt='' className='w-16 sm:w-20'/> </Link>  
                            <div className="">
                              <p className='text-xs sm:text-lg font-medium'>{item.name}</p>
                              <div className="flex items-center  gap-5 mt-2">
                                <p>{currency} {item.price}</p>
                                <p>Quantity: 1</p>
                                <p className='px-2 sm:p-4  sm:py-1' >Size: L</p>
                              </div>
                              <p className='mt-2'>Date: <span className='text-gray-500'>25, May, 2024</span></p>
                            </div>
                        </div>
                        <div className="md:w-1/2 flex justify-between">
                          <div className="flex items-center gap-2">
                            <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                            <p className='text-sm md:text-base'>Ready to ship</p>
                          </div>
                        </div>
                          <button className='border px-4 py-2 text-sm font-medium rounded-b-sm'>Track Order</button>
                      </div>
                    )
                )
              }
            </div>
    </div>
  )
}

export default Order