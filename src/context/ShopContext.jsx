/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */
/* eslint-disable react/prop-types */


import { createContext, useEffect, useState } from "react";
import { products } from "../assets/frontend_assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
    const currency = "$";
    const delivery_fee = 10;
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const navigate = useNavigate() ;



    // const addToCart = (itemId, size) => {
    //     if (!size) {
    //         toast.error("Select product size");
    //         return;
    //     }
    
    //     setCartItems((prevCart) => {
    //         const newCart = { ...prevCart };
    
    //         if (!newCart[itemId]) {
    //             newCart[itemId] = {};
    //         }
    
    //         newCart[itemId][size] = (newCart[itemId][size] || 0) + 1;
    
    //         return newCart;
    //     });
    
    //     toast.success("Item added to cart!");
    // };
    
    // const getCartCount = () => {
    //     return Object.values(cartItems || {}).reduce(
    //         (totalCount, sizes) => totalCount + Object.values(sizes || {}).reduce((sum, count) => sum + count, 0),
    //         0
    //     );
    // };
    


    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error("Select product size");
            return;
        }
        let cartData = structuredClone(cartItems) ;
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1 ;
            }else{
                cartData[itemId][size] = 1 ;
            }            
        }
        else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData) ;
    };

    const getCartCount = () => {
        let totalCount = 0;
        for(const items in cartItems){
        for(const item in cartItems[items]){
            try{
            if(cartItems[items][item] > 0 ) {
                totalCount += cartItems[items][item]                  
            }
            } catch (error){
        }
        }
    }
        return   totalCount ;
        
    };


        const updateQuantity = async (itemId,size,quantity) =>{
            let cartData = structuredClone(cartItems);
            cartData[itemId][size] = quantity ;
            setCartItems(cartData);
        }

        const getCartAmount = () => {
            let totalAmount = 0 ;

            for(const items in cartItems){
                let itemInfo = products.find((product)=> product._id === items)
                for(const item in cartItems[items]){
                    try{
                    if(cartItems[items][item] > 0 ) {
                        totalAmount += itemInfo.price * cartItems[items][item]                  
                    }
                    } catch (error){
                }
                }
            }
                return   totalAmount ;

        }



    useEffect(() => {
        console.log(cartItems)
    }, [cartItems]);






    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
    };

    return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
