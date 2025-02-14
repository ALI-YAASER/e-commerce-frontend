import React from 'react'

const NewsletterBox = () => {
  return (
    <div className='text-center'>
        <h1 className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</h1>
        <p className='text-gray-400 mt-3'>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
        </p>
        <form className=' w-full sm:w-1/2 flex gap-3 mx-auto my-6 pl-3 border border-gray-300 items-center'>
            <input className='w-full sm:flex-1 outline-none' type='email' placeholder='Enter your email id' />
            <button type='submit' className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
        </form>
    </div>
  )
}

export default NewsletterBox