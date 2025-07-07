/* eslint-disable no-unused-vars */

import React from 'react'
import Title from '../component/Title'
import {assets} from '../assets/frontend_assets/assets'
import NewsletterBox from '../component/NewsletterBox'


const About = () => {
  return (
    <div>
      <div className="text-3xl text-center px-8 py-5 border-t">
        <Title text1={'About'} text2={'Us'}/>
      </div>
      <div className="my-10 flex flex-col sm:flex-row gap-16">
        <div className="">
          <img className='w-full md:max-w-[450px]' src={assets.about_img}/>
        </div>
        <div className="my-10 flex-col justify-center gap-6 md:w-2/4  text-gray-600 ">
          <p>
          Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes</p>
          <p className='py-5'>Since our inception ,we ve worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.</p>
          <b className='py-5'>Our Mission</b>
          <p>Our mission at Forever is to empower customers with choice, convenience, and confidence. We are dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond</p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={'Why'} text2={'Choose Us'}/>
      </div>
        <div className="flex flex-col md:flex-row gap-6 text-sm mb-20 px-4">
            {[
                {
                    title: "Quality Assurance",
                    desc: "We meticulously select and vet each product to ensure it meets our stringent quality standards.",
                },
                {
                    title: "Exceptional Customer Service",
                    desc: "Our team of dedicated professionals is here to assist you every step of the way, ensuring your satisfaction is our top priority.",
                },
                {
                    title: "Convenience",
                    desc: "With our user-friendly interface and hassle-free ordering process, shopping has never been easier.",
                },
            ].map((item, index) => (
                <div
                    key={index}
                    className="flex-1 border border-gray-200 bg-white hover:bg-blue-500 hover:text-white transition-all duration-300 rounded-lg p-6 shadow-md hover:shadow-lg flex flex-col gap-4 text-center"
                >
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm">{item.desc}</p>
                </div>
            ))}
        </div>

        <NewsletterBox />
    </div>
  )
}

export default About