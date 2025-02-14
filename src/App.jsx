/* eslint-disable no-unused-vars */
import React from 'react'
import { Routes, Route } from "react-router";
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder'
import Order from './pages/Order'
import Product from './pages/product'
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import SearchBar from './component/SearchBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css' ;

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer />
      <Navbar/>
      <SearchBar/>
      <Routes>
      <  Route path="/" element={<Home />} />
      <  Route path="/collection" element={<Collection />} />
      <  Route path="/about" element={<About />} />
      <  Route path="/contact" element={<Contact />} />
      <  Route path="/login" element={<Login />} />
      <  Route path="/Cart" element={<Cart />} />
      <  Route path="/order" element={<Order />} />
      <  Route path="/place-order" element={<PlaceOrder />} />
      <  Route path="/product/:productId" element={< Product />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
