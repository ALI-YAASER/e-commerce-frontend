/* eslint-disable no-unused-vars */
import React, {useContext, useEffect, useState} from 'react';
import Title from '../component/Title';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import { Link } from 'react-router-dom';
import axios from "axios"; // ✅ استخدم react-router-dom وليس react-router

const Order = () => {
  const { currency, backendUrl , token } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([])
    const loadOrderData = async () => {
        try {
            if (!token) return null;
            const response = await axios.post( `${backendUrl}/api/orders/userOrders`, {}, {
                headers: { token }
            });
            console.log(response.data);
            if (response.data.success) {
                let allOrdersItems = [];
                response.data.orders.map((order)=>{
                    order.items.map((item)=>{
                        item['status'] = order.status;
                        item['payment'] = order.payment;
                        item['paymentMethod'] = order.paymentMethod;
                        item['data'] = order.data;
                        item.date = order.date;
                        allOrdersItems.push(item);
                    })
                })
                setOrderData(allOrdersItems.reverse()); // ✅ update state properly
            }

        } catch (error) {
            console.log("Failed to load orders:", error);
        }
    };


    useEffect(() => {
        loadOrderData();
    }, [token]);
  return (
      <div className='border-t pt-14'>
          <div className="text-2xl mb-3">
              <Title text1={'MY'} text2={'ORDERS'} />
          </div>

          <div className="">
              {orderData.map((item, index) =>{
                  return (

                  <div
                      className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
                      key={index}
                  >
                      <div className="flex items-start gap-6">
                          <Link to={`/product/${item.productId}`}>
                              <img
                                  src={
                                      Array.isArray(item.images) && item.images[0]
                                          ? backendUrl + item.images[0]
                                          : assets.placeholder_image
                                  }
                                  alt={item.name}
                                  className='w-16 sm:w-20 object-cover'
                                  onError={(e) => (e.target.src = assets.razorpay_logo)}
                              />
                          </Link>
                          <div>
                              <p className='text-xs sm:text-lg font-medium'>{item.name}</p>
                              <p className='mt-2 text-sm'>
                                  productId: <span className='text-gray-500'>{item.productId}</span>
                              </p>
                              <div className="flex items-center gap-5 mt-2 text-sm">
                                  <p>{currency} {item.price}</p>
                                  <p>Quantity: {item.quantity}</p> {/* ✅ هنا */}
                                  <p className='px-2 sm:p-4 sm:py-1'>Size: {item.size}</p>
                              </div>
                              <p className='mt-2 text-sm'>
                                  Date: <span className='text-gray-500'>{new Date(item.date).toLocaleDateString()}</span>
                              </p>
                              <p className='mt-2 text-sm'>
                                  paymentMethod: <span className='text-gray-500'>{item.paymentMethod}</span>
                              </p>
                          </div>
                      </div>

                      <div className="md:w-1/2 flex justify-between">
                          <div className="flex items-center gap-2">
                              <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                              <p className='text-sm md:text-base'>{item.status}</p>
                          </div>
                      </div>

                      <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-b-sm hover:bg-gray-100'>
                          Track Order
                      </button>
                  </div>
              ) }) }
          </div>
      </div>

  );
};

export default Order;
