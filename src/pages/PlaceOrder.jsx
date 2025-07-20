/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import Title from '../component/Title'
import CartTotal from '../component/CartTotal'
import { assets } from '../assets/frontend_assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from "axios";
import {toast} from "react-toastify";
import product from "./product.jsx";

const PlaceOrder = () => {
  const [method,setMethod] = useState('cod');
  const {navigate ,cartItems, setCartItems,backendUrl, token, products , getCartAmount ,currency,delivery_fee} = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
  })
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData(data=> ({...data, [name]: value}))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      // Validate cart has items
      if (Object.keys(cartItems).length === 0) {
        toast.error("Your cart is empty");
        return;
      }

      // Process cart items
      let orderItems = [];
      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          const quantity = cartItems[itemId][size];
          if (quantity > 0) {
            const product = products.find(p => p._id === itemId);
            if (product) {
              orderItems.push({
                productId: itemId,
                name: product.name,
                price: product.price,
                size,
                quantity,
                images: product.images
              });
            }
          }
        }
      }

      // Prepare order data
      const orderData = {
        items: orderItems,
        name: formData.firstName + ' ' + formData.lastName,
        amount: getCartAmount() + delivery_fee,
        paymentMethod: method.toUpperCase(),
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country
        },
        customerDetails: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone
        }
      };

      switch (method) {
        case 'cod':
          { const response = await axios.post(backendUrl+'/api/orders/place',orderData,{headers:{token}});
          if(response.data.success){
            setCartItems({})
            navigate('/orders')

          }else{
            toast.error(response.data.message)
          }
          break; }
          case 'stripe':
             { const responseStripe = await axios.post(backendUrl+'/api/orders/stripe',orderData,{headers:{token}});
          if(responseStripe.data.success){
           const {session_url} = responseStripe.data
           window.location.replace(session_url)
          }else{
            toast.error(response.data.message)
          }
          break; }
          case 'paymob':
                { const responsepaymob = await axios.post(backendUrl+'/api/orders/paymob',orderData,{headers:{token}});
          if(responsepaymob.data.success){
           const {session_url} = responsepaymob.data
          //  window.location.replace(session_url)
           navigate('/orders/${userId}')
           setCartItems([])
          }else{
            toast.error(response.data.message)
          }
          break; }


          default:
            break;

      }



      // Make API request with proper headers
      // const response = await axios.post(
      //     `${backendUrl}/api/orders/place`, // Note singular 'order' to match backend
      //     orderData,
      //     {
      //       headers:
      //         {token}
      //
      //     }
      // );
      const response = await axios.post(
          `${backendUrl}/api/orders/place`, // تأكد من وجود 's' في 'orders'
          orderData,
          { headers: { token } }
      );


      if (response.data.success) {
        setCartItems({});
        toast.success("Order placed successfully!");
        navigate('/order'); // Changed to plural for consistency
      } else {
        toast.error(response.data.message || "Order failed");
      }
    } catch (error) {
      console.log("Order error:", {
        message: error.message,
        response: error.response?.data,
        config: error.config
      });
    }
  };
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* left side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className="flex gap-3">
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' onChange={onChangeHandler} name="firstName" value={formData.firstName} type='text' placeholder='firstname' required/>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' onChange={onChangeHandler} name="lastName" value={formData.lastName} type='text' placeholder='lastname' required/>
        </div>
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' onChange={onChangeHandler} name="email" value={formData.email} type='email' placeholder='Email addess' required/>
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' onChange={onChangeHandler} name="street" value={formData.street} type='text' placeholder='Street' required/>
        <div className="flex gap-3">
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' onChange={onChangeHandler} name="city" value={formData.city} type='text' placeholder='City' required/>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' onChange={onChangeHandler} name="state" value={formData.state} type='text' placeholder='State' required/>
        </div>
        <div className="flex gap-3">
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' onChange={onChangeHandler} name="zipCode" value={formData.zipCode} type='number' placeholder='Zip code' required/>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' onChange={onChangeHandler} name="country" value={formData.country} type='text' placeholder='Country' required/>
        </div>
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' onChange={onChangeHandler} name="phone" value={formData.phone} type='number' placeholder='Phone' required/>
      </div>
      {/* Right side */}
      <div className="mt-8">
          <div className="mt-8 min-w-80">
            <CartTotal />
          </div>
          <div className="mt-12">
            <Title text1={'Payment'} text2={'Method'} />
            <div className="flex gap-3 flex-col lg:flex-row">
              <div onClick={()=>setMethod('stripe')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-500':''}`} ></p>
                <img className='h-5 mx-4' src={assets.stripe_logo} alt=''/>
              </div>
              <div onClick={()=>setMethod('paymob')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'paymob' ? 'bg-green-500':''}`} ></p>
                <img className='h-5 mx-4' src={assets.razorpay_logo} alt=''/>
              </div>
              <div onClick={()=>setMethod('cod')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-500':''}`} ></p>
                <p className='text-gray-500 text-sm font-medium mx-4 '>CASH ON DELIVERY</p>
              </div>
            </div>
            <div className="w-full text-end mt-8">
            <button type="submit"   className="bg-black text-white text-sm my-8 px-8 py-4 cursor-pointer">Place Order</button>
          </div>
          </div>
      </div>
    </form>
  )
}

export default PlaceOrder
