/* eslint-disable no-unused-vars */
import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const Footer = () => {
  return (
    <div>
    <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div className="">
            <img src={assets.logo} className='w-36 mb-5' />
            <p className='w-full md:w-2/3 text-gray-500'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </p>
        </div>
        <div className="">
        <h6 className="footer-title font-medium text-2xl mb-8">Company</h6>
        <ul className='flex flex-col gap-2 text-gray-700 '>
            <li>
            <a className="link link-hover">Home</a> 
            </li>
            <li>
            <a className="link link-hover">About us</a>
            </li>
            <li>
            <a className="link link-hover">Delivery</a>
            </li>
            <li>
            <a className="link link-hover">Privacy policy</a>
            </li>
        </ul>
        </div>
        <div className="">
<p className='font-medium text-2xl mb-8'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 text-gray-700 '>
                    <li>+201123434175</li>
                    <li>yly741689@gmail.com</li>
                </ul>
        </div>
    </div>
    <hr className=' border-2 border-gray-800'/>
    <p className='text-center py-5 text-gray-500'>Copyright 2024 © GreatStack.dev - All Right Reserved.</p>
    </div>
  )
}

export default Footer