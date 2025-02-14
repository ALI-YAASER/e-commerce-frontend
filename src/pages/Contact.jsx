import React from 'react'
import Title from '../component/Title'
import NewsletterBox from '../component/NewsletterBox'
import {assets} from '../assets/frontend_assets/assets'

const Contact = () => {
  return (
    <div className=''>
      <div className="text-3xl text-center px-8 py-5 border-t">
        <Title text1={'Contact'} text2={'Us'}/>
      </div>
      <div className="my-20 flex flex-col justify-center sm:flex-row gap-16">
        <div className="">
          <img className='w-full justify-center md:max-w-[450px]' src={assets.contact_img}/>
        </div>
        <div className="my-10 flex-col font-semibold py-3 justify-center gap-6 md:w-2/4  text-gray-600">
          <b>Our Store</b>
          <p className='py-4'>54709 Willms Station <br/>
          Suite 350, Washington, USA</p>
          <p className='py-4'>Tel: (415) 555‑0132</p>
          <p>Email: greatstackdev@gmail.com</p>
          <b className='py-4'>Careers at Forever</b>
          <p>Learn more about our teams and job openings.</p>
          <button className='border border-gray-400 text-ms text-gray-600 py-4 px-8 my-7 hover:bg-black hover:text-white cursor-pointer'>Explore Jobs</button>
        </div>
      </div>
      <NewsletterBox />
    </div>
  )
}

export default Contact