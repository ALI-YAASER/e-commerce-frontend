// /* eslint-disable no-unused-vars */
// import React from 'react'
// import { assets } from '../assets/frontend_assets/assets'
//
// const Footer = () => {
//   return (
//     <div>
//     <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
//         <div className="">
//             <img src={assets.logo} className='w-36 mb-5' />
//             <p className='w-full md:w-2/3 text-gray-500'>
//             Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
//             </p>
//         </div>
//         <div className="">
//         <h6 className="footer-title font-medium text-2xl mb-8">Company</h6>
//         <ul className='flex flex-col gap-2 text-gray-700 '>
//             <li>
//             <a className="link link-hover">Home</a>
//             </li>
//             <li>
//             <a className="link link-hover">About us</a>
//             </li>
//             <li>
//             <a className="link link-hover">Delivery</a>
//             </li>
//             <li>
//             <a className="link link-hover">Privacy policy</a>
//             </li>
//         </ul>
//         </div>
//         <div className="">
// <p className='font-medium text-2xl mb-8'>GET IN TOUCH</p>
//                 <ul className='flex flex-col gap-2 text-gray-700 '>
//                     <li>+201123434175</li>
//                     <li>yly741689@gmail.com</li>
//                 </ul>
//         </div>
//     </div>
//     <hr className=' border-2 border-gray-800'/>
//     <p className='text-center py-5 text-gray-500'>Copyright 2024 © GreatStack.dev - All Right Reserved.</p>
//     </div>
//   )
// }
//
// export default Footer

import React from 'react';
import { assets } from '../assets/frontend_assets/assets';

const Footer = () => {
    return (
        <footer className="bg-white text-sm text-gray-700 mt-40 px-4 sm:px-12">
            <div className="max-w-6xl mx-auto flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-12 py-12">
                {/* Logo and Description */}
                <div>
                    <img src={assets.logo} alt="logo" className="w-36 mb-4" />
                    <p className="text-gray-500 leading-relaxed max-w-md">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text since the 1500s.
                    </p>
                </div>

                {/* Company Links */}
                <div>
                    <h6 className="text-xl font-semibold mb-4 text-gray-900">Company</h6>
                    <ul className="space-y-2">
                        <li><a href="/" className="hover:text-blue-600 transition">Home</a></li>
                        <li><a href="/about" className="hover:text-blue-600 transition">About us</a></li>
                        <li><a href="/order" className="hover:text-blue-600 transition">Delivery</a></li>
                        <li><a href="#" className="hover:text-blue-600 transition">Privacy Policy</a></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h6 className="text-xl font-semibold mb-4 text-gray-900">Get in Touch</h6>
                    <ul className="space-y-2">
                        <li className="hover:text-blue-600 transition">+20 1026126552</li>
                        <li className="hover:text-blue-600 transition">yly741689@gmail.com</li>
                    </ul>
                </div>
            </div>

            {/* Divider and Footer Note */}
            <hr className="border-gray-300" />
            <p className="text-center text-gray-500 py-5 text-xs sm:text-sm">
                © 2024 GreatStack.dev — All Rights Reserved.
            </p>
        </footer>
    );
};

export default Footer;
