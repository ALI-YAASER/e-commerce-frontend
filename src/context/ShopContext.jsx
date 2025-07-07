/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */
/* eslint-disable react/prop-types */

import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";



export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const delivery_fee = 10;

  // ✅ استخدم env أو fallback
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token,setToken]= useState('');
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select product size");
      return;
    }
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
    toast.success("Item added to cart!");
  if (token){
    try {
      await axios.post(`${backendUrl}/api/cart/add` , {itemId,size} , {headers: {token}})
    }catch(error){
      console.log(error);
      toast.error(error.message);
    }
  }

  };


  const fetchUserData = async () => {
    try {
      console.log("📌 Sending token:", token);

      const res = await axios.get(`${backendUrl}/api/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ الشكل الصحيح
        },
      });

      console.log("✅ Server response:", res.data);

      if (res.data.success) {
        setUserData(res.data.user);
      } else {
        toast.error("❌ Failed to fetch user");
      }
    } catch (err) {
      console.error("🔥 Error fetching user profile:", err?.response?.data || err.message);
      toast.error("Error fetching user profile");
    }
  };




  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
    if (token) {
      try {
        await axios.post(`${backendUrl}/api/cart/update`, { itemId, size, quantity }, { headers: { token } });
      } catch (error) {
        console.log(error);
        toast.error(error.message || "Error updating cart");
      }
    }

  };
  const getCartUser = async (token) => {
    try {
      const response = await axios.post(`${backendUrl}/api/cart/get`, {}, {
        headers: { token }
      });

      if (response.data.success) {
        setCartItems(response.data.message); // ✅ FIXED
      } else {
        toast.error(response.data.message || "Failed to fetch cart");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Something went wrong fetching cart");
    }
  };


  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalAmount;
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/products`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message || "Failed to fetch products");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Something went wrong while fetching products");
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

 useEffect(()=>{
    if(!token && localStorage.getItem('token')){
      setToken(localStorage.getItem('token'))
      getCartUser(localStorage.getItem('token'))

    }
 },[])

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      getCartUser(savedToken);
    }
  }, []);



  const value = {
    products ,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken,
    fetchUserData
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;