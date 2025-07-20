/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import Title from '../component/Title';
import { ShopContext } from '../context/ShopContext';
import CartTotal from "../component/CartTotal";
import { assets } from '../assets/frontend_assets/assets';

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    updateQuantity,
    navigate,
    backendUrl, // ✅ مهم لعرض الصور
  } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {

    if (products.length > 0) {
      const tempData = [];

      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          if (cartItems[itemId][size] > 0) {
            const product = products.find((p) => p._id === itemId);
            if (product) {
              tempData.push({
                _id: itemId,
                size: size,
                quantity: cartItems[itemId][size],
              });
            }
          }
        }
      }

      setCartData(tempData);
    }

  }, [cartItems, products]);

  return (
    <div className='border-t pt-14'>
      <div className="text-2xl mb-3">
        <Title text1={'Your'} text2={'CART'} />
      </div>

      {/* Cart List */}
      <div className="">
        {cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id);

          const imageUrl = Array.isArray(productData?.images)
              ? productData.images[0]
              : productData?.images;

          const displayImage = imageUrl?.startsWith("http")
              ? imageUrl
              : backendUrl + imageUrl;
          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                {/* ✅ صورة المنتج */}
                {/*<img*/}
                {/*  src={*/}
                {/*    Array.isArray(productData.images) && productData.images[0]*/}
                {/*      ? backendUrl + productData.images[0]*/}
                {/*      : assets.placeholder_image*/}
                {/*  }*/}
                {/*  alt={productData.name}*/}
                {/*  className='w-16 sm:w-20 object-cover'*/}
                {/*  onError={(e) => (e.target.src = assets.placeholder_image)}*/}
                {/*/>*/}
                <img
                    src={displayImage}
                    alt={productData.name}
                    className='w-16 sm:w-20 object-cover'
                    onError={(e) => (e.target.src = assets.placeholder_image)}
                />
                {/* تفاصيل المنتج */}
                <div>
                  <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>{currency} {productData.price}</p>
                    <p className='px-2 sm:p-4 sm:py-1 border bg-slate-50'>{item.size}</p>
                  </div>
                </div>
              </div>

              {/* الكمية */}
              <input
                onChange={(e) =>
                  e.target.value === '' || e.target.value === '0'
                    ? null
                    : updateQuantity(item._id, item.size, Number(e.target.value))
                }
                className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1'
                type='number'
                min={1}
                defaultValue={item.quantity}
              />

              {/* حذف المنتج */}
              <img
                onClick={() => updateQuantity(item._id, item.size, 0)}
                className='w-4 mr-4 sm:w-5 cursor-pointer'
                src={assets.bin_icon}
                alt='Delete'
              />
            </div>
          );
        })}
      </div>

      {/* المجموع */}
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => navigate('/place-order')}
              className="bg-black text-white text-sm my-8 px-8 py-4 cursor-pointer"
            >
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
