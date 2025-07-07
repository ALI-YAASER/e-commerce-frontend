/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import {assets} from '../assets/frontend_assets/assets'
import { NavLink , Link } from 'react-router'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {
    const [Visible ,setVisible] = useState(false)
    const {setShowSearch , getCartCount , navigate , token , setToken , setCartItems } = useContext(ShopContext);
    const logout = () => {
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
        navigate('/')
    }
  return (
    <div className='flex items-center justify-between py-5 font-medium' > 
    <Link to='/'>
    <img src={assets.logo} alt='' className='w-36' />
    </Link>
    <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        <NavLink to='/' className='flex flex-col items-center gap-1'>
        <p>HOME</p>
        <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/collection' className='flex flex-col items-center gap-1'>
        <p>COLLECTION</p>
        <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='about' className='flex flex-col items-center gap-1'>
        <p>ABOUT</p>
        <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='contact' className='flex flex-col items-center gap-1'>
        <p>CONTACT</p>
        <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
    </ul>
    <div className="flex items-center gap-6">
        <img onClick={()=> setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt=''/>
        <div className="group relative">
         <img onClick={()=> token ? null : navigate('/login')} src={assets.profile_icon} className='w-5 cursor-pointer' alt=''/>
        { token && 
         <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 ">
         <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-stone-100 text-gray-500">
             <p onClick={()=> navigate('/profile')} className='cursor-pointer hover:text-black'>My Profile</p>
             <p onClick={()=> navigate('/order')} className='cursor-pointer hover:text-black'>Orders</p>
             <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
         </div>
     </div>

        }
        </div>
        <Link to='/cart' className='relative'>
        <img src={assets.cart_icon} className='w-5 cursor-pointer' alt=''/>
        <p className='absolute right-[-4px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[9px]' >{getCartCount()}</p>
        </Link>
        <img onClick={()=>setVisible(true)}  src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt=''/>
    </div>
    {/*<div className={` absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all duration-300 ${ Visible ? 'w-64' : 'w-0' }`}>*/}
    {/*    <div className="flex flex-col text-gray-600 ">*/}
    {/*        <div onClick={()=>setVisible(false)}  className="flex items-center gap-4 p-3">*/}
    {/*        <img  src={assets.dropdown_icon} className='h-5 cursor-pointer rotate-180' alt=''/>*/}
    {/*            <p>Back</p>*/}
    {/*        </div>*/}
    {/*        <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border'  to='/'>Home</NavLink>*/}
    {/*        <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/collection' >*/}
    {/*    COLLECTION*/}

    {/*    </NavLink>*/}
    {/*    <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='about' >*/}
    {/*    <p>ABOUT</p>*/}
    {/*    */}
    {/*    </NavLink>*/}
    {/*    <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='contact'>*/}
    {/*    <p>CONTACT</p>*/}
    {/*    </NavLink>*/}
    {/*    </div>*/}
    {/*</div>*/}
        <div
            className={`fixed top-0 right-0 h-full z-50 bg-white shadow-lg transition-all duration-300 ease-in-out ${
                Visible ? 'w-64' : 'w-0'
            } overflow-hidden`}
        >
            <div className="flex flex-col h-full text-gray-700">
                {/* Header - Close */}
                <div
                    onClick={() => setVisible(false)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer border-b"
                >
                    <img src={assets.dropdown_icon} className="h-5 rotate-180" alt="Back" />
                    <p className="font-medium">Back</p>
                </div>

                {/* Links */}
                <nav className="flex flex-col text-sm font-medium">
                    <NavLink
                        onClick={() => setVisible(false)}
                        to="/"
                        className="py-3 px-6 border-b hover:bg-gray-100 transition"
                    >
                        Home
                    </NavLink>
                    <NavLink
                        onClick={() => setVisible(false)}
                        to="/collection"
                        className="py-3 px-6 border-b hover:bg-gray-100 transition"
                    >
                        Collection
                    </NavLink>
                    <NavLink
                        onClick={() => setVisible(false)}
                        to="/about"
                        className="py-3 px-6 border-b hover:bg-gray-100 transition"
                    >
                        About
                    </NavLink>
                    <NavLink
                        onClick={() => setVisible(false)}
                        to="/contact"
                        className="py-3 px-6 border-b hover:bg-gray-100 transition"
                    >
                        Contact
                    </NavLink>
                </nav>
            </div>
        </div>

    </div>
  )
}

export default Navbar