// /* eslint-disable no-unused-vars */
// import React, { useContext, useEffect, useState } from 'react';
// import Title from '../component/Title';
// import { ShopContext } from '../context/ShopContext';
// import { assets } from '../assets/frontend_assets/assets';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
//
// const Order = () => {
//     const { currency, backendUrl, token, products } = useContext(ShopContext);
//     const [orderData, setOrderData] = useState([]);
//
//     const loadOrderData = async () => {
//         try {
//             if (!token) return;
//
//             const response = await axios.post(`${backendUrl}/api/orders/userOrders`, {}, {
//                 headers: { token }
//             });
//
//             if (response.data.success) {
//                 const allItems = response.data.orders.flatMap(order =>
//                     order.items.map(item => ({
//                         ...item,
//                         status: order.status,
//                         payment: order.payment,
//                         paymentMethod: order.paymentMethod,
//                         date: order.date
//                     }))
//                 );
//
//                 setOrderData(allItems.reverse());
//             }
//         } catch (error) {
//             console.error("Failed to load orders:", error);
//         }
//     };
//
//     useEffect(() => {
//         if (token) {
//             loadOrderData();
//         }
//     }, [token]);
//
//     return (
//         <div className='border-t pt-14'>
//             <div className="text-2xl mb-3">
//                 <Title text1={'MY'} text2={'ORDERS'} />
//             </div>
//
//             <div className="">
//                 {orderData.length === 0 ? (
//                     <div className="text-center text-gray-500 py-20">
//                         <img src={assets.empty_cart_icon} alt="No orders" className="mx-auto w-24 mb-4" />
//                         <p>You haven't placed any orders yet.</p>
//                     </div>
//                 ) : (
//                     orderData.map((item, index) => {
//                         const productData = products.find(product => product._id === item.productId);
//
//                         if (!productData) {
//                             return (
//                                 <div key={index} className="py-4 border-t border-b text-red-500">
//                                     ❌ Product not found (ID: {item.productId})
//                                 </div>
//                             );
//                         }
//
//                         const imageUrl = Array.isArray(productData.images)
//                             ? productData.images[0]
//                             : productData.images;
//
//                         const displayImage = imageUrl?.startsWith("http")
//                             ? imageUrl
//                             : backendUrl + imageUrl;
//
//                         return (
//                             <div
//                                 className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
//                                 key={index}
//                             >
//                                 <div className="flex items-start gap-6">
//                                     <Link to={`/product/${item.productId}`}>
//                                         <img
//                                             src={displayImage}
//                                             alt={productData?.name || 'Product'}
//                                             className='w-16 sm:w-20 object-cover'
//                                             onError={(e) => (e.target.src = assets.placeholder_image)}
//                                         />
//                                     </Link>
//                                     <div>
//                                         <p className='text-xs sm:text-lg font-medium'>
//                                             {productData?.name || item.name || 'Unnamed Product'}
//                                         </p>
//                                         <p className='mt-2 text-sm'>
//                                             productId: <span className='text-gray-500'>{item.productId}</span>
//                                         </p>
//                                         <div className="flex items-center gap-5 mt-2 text-sm">
//                                             <p>{currency} {item.price}</p>
//                                             <p>Quantity: {item.quantity}</p>
//                                             <p className='px-2 sm:p-4 sm:py-1'>Size: {item.size}</p>
//                                         </div>
//                                         <p className='mt-2 text-sm'>
//                                             Date: <span className='text-gray-500'>{new Date(item.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
//                                         </p>
//                                         <p className='mt-2 text-sm'>
//                                             Payment method: <span className='text-gray-500'>{item.paymentMethod}</span>
//                                         </p>
//                                     </div>
//                                 </div>
//
//                                 <div className="md:w-1/2 flex justify-between">
//                                     <div className="flex items-center gap-2">
//                                         <span className='min-w-2 h-2 rounded-full bg-green-500'></span>
//                                         <p className='text-sm md:text-base'>{item.status}</p>
//                                     </div>
//                                 </div>
//
//                                 <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-b-sm hover:bg-gray-100'>
//                                     Track Order
//                                 </button>
//                             </div>
//                         );
//                     })
//                 )}
//             </div>
//         </div>
//     );
// };
//
// export default Order;
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import Title from '../component/Title';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const Order = () => {
    const { currency, backendUrl, token, products } = useContext(ShopContext);
    const [orderData, setOrderData] = useState([]);

    const loadOrderData = async () => {
        try {
            if (!token) return;

            const response = await axios.post(`${backendUrl}/api/orders/userOrders`, {}, {
                headers: { token }
            });

            if (response.data.success) {
                const allItems = response.data.orders.flatMap(order =>
                    order.items.map(item => ({
                        ...item,
                        status: order.status,
                        payment: order.payment,
                        paymentMethod: order.paymentMethod,
                        date: order.date
                    }))
                );

                setOrderData(allItems.reverse());
            }
        } catch (error) {
            console.error("Failed to load orders:", error);
        }
    };

    useEffect(() => {
        if (token) {
            loadOrderData();
        }
    }, [token]);

    return (
        <div className='border-t pt-14'>
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-2xl mb-3"
            >
                <Title text1={'MY'} text2={'ORDERS'} />
            </motion.div>

            <div>
                {orderData.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-center text-gray-500 py-20"
                    >
                        <img src={assets.empty_cart_icon} alt="No orders" className="mx-auto w-24 mb-4" />
                        <p>You haven't placed any orders yet.</p>
                    </motion.div>
                ) : (
                    orderData.map((item, index) => {
                        const productData = products.find(product => product._id === item.productId);
                        if (!productData) {
                            return (
                                <div key={index} className="py-4 border-t border-b text-red-500">
                                    ❌ Product not found (ID: {item.productId})
                                </div>
                            );
                        }

                        const imageUrl = Array.isArray(productData.images)
                            ? productData.images[0]
                            : productData.images;

                        const displayImage = imageUrl?.startsWith("http")
                            ? imageUrl
                            : backendUrl + imageUrl;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                viewport={{ once: true }}
                                className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
                            >
                                <div className="flex items-start gap-6">
                                    <Link to={`/product/${item.productId}`}>
                                        <img
                                            src={displayImage}
                                            alt={productData?.name || 'Product'}
                                            className='w-16 sm:w-20 object-cover'
                                            onError={(e) => (e.target.src = assets.placeholder_image)}
                                        />
                                    </Link>
                                    <div>
                                        <p className='text-xs sm:text-lg font-medium'>
                                            {productData?.name || item.name || 'Unnamed Product'}
                                        </p>
                                        <p className='mt-2 text-sm'>
                                            productId: <span className='text-gray-500'>{item.productId}</span>
                                        </p>
                                        <div className="flex items-center gap-5 mt-2 text-sm">
                                            <p>{currency} {item.price}</p>
                                            <p>Quantity: {item.quantity}</p>
                                            <p className='px-2 sm:p-4 sm:py-1'>Size: {item.size}</p>
                                        </div>
                                        <p className='mt-2 text-sm'>
                                            Date: <span className='text-gray-500'>
                                                {new Date(item.date).toLocaleDateString('en-GB', {
                                                    day: '2-digit',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                        </p>
                                        <p className='mt-2 text-sm'>
                                            Payment method: <span className='text-gray-500'>{item.paymentMethod}</span>
                                        </p>
                                    </div>
                                </div>

                                <div className="md:w-1/2 flex justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className='min-w-2 h-2 rounded-full bg-green-500'></span>
                                        <p className='text-sm md:text-base'>{item.status}</p>
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className='border px-4 py-2 text-sm font-medium rounded-b-sm hover:bg-gray-100'
                                >
                                    Track Order
                                </motion.button>
                            </motion.div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default Order;
