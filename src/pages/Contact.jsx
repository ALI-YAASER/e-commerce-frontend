import React from 'react'
import Title from '../component/Title'
import NewsletterBox from '../component/NewsletterBox'
import { assets } from '../assets/frontend_assets/assets'
import { motion } from 'framer-motion'

const Contact = () => {
    return (
        <div className=''>
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-3xl text-center px-8 py-5 border-t"
            >
                <Title text1={'Contact'} text2={'Us'} />
            </motion.div>

            <div className="my-20 flex flex-col justify-center sm:flex-row gap-16">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <img
                        className='w-full justify-center md:max-w-[450px]'
                        src={assets.contact_img}
                        alt="Contact"
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="my-10 flex-col font-semibold py-3 justify-center gap-6 md:w-2/4 text-gray-600"
                >
                    <b>Our Store</b>
                    <p className='py-4'>54709 Willms Station <br />
                        Suite 350, Washington, USA</p>
                    <p className='py-4'>Tel: (415) 555‑0132</p>
                    <p>Email: greatstackdev@gmail.com</p>
                    <b className='py-4'>Careers at Forever</b>
                    <p>Learn more about our teams and job openings.</p>
                    <button className='border border-gray-400 text-ms text-gray-600 py-4 px-8 my-7 hover:bg-black hover:text-white cursor-pointer'>
                        Explore Jobs
                    </button>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <NewsletterBox />
            </motion.div>
        </div>
    )
}

export default Contact
