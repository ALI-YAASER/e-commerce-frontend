/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import ProductItem from '../component/ProductItem';
import Title from '../component/Title';
const Collection = () => {
    const {products} =useContext(ShopContext);
  const [showFilter , setShowFilter] = useState(false) ;
  const [filterProducts , setFilterProducts] = useState([]);
  const [category , setCategory] = useState([]);
  const [subCategory , setSubCategory] = useState([]);
  const [sortType,setSortType] = useState("relavent");

const toggleCategory = (e) => {
  if(category.includes(e.target.value)){
      setCategory(prev => prev.filter(item => item !== e.target.value))
  }
  else{
    setCategory(prev => [...prev,e.target.value])
  }
}
const toggleSubCategory = (e) =>{
  if(subCategory.includes(e.target.value)){
    setSubCategory(prev => prev.filter(item => item !== e.target.value))
  }else{
    setSubCategory(prev => [...prev,e.target.value])
  }
}

const applyFilter = () => {
  let productsCopy = products.slice();
  if(category.length > 0){
    productsCopy =productsCopy.filter(
      item => category.includes(item.category)
    )
  }
  if(subCategory.length > 0){
  productsCopy =productsCopy.filter(
    item => subCategory.includes(item.subCategory)
  )
  } 
  setFilterProducts(productsCopy)
}

const sortProducts = () =>{
  let fpCopy = filterProducts.slice();
  switch(sortType){
    case 'low-high' :
      setFilterProducts(fpCopy.sort((a,b)=>(a.price - b.price))) ;
      break ;
      case 'high-low' :
      setFilterProducts(fpCopy.sort((a,b)=>(b.price - a.price))) ;
      break ;
      default :
      applyFilter();
      break;

  }
}


  useEffect(()=>{
applyFilter() ;
},[category,subCategory])
  useEffect(()=>{
    sortProducts();
  },[sortType])

  useEffect(()=>{
setFilterProducts(products)
},[products])



  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filter Options */}
      <div className="min-w-60">
        <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>Filters
          <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showFilter ?'rotate-90' : ''}`} />
        </p>
        {/* Category Filter */}
        <div className={`border border-gray-300 pl-3 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block `}>
          <p className='py-3 text-sm font-medium'>Categories</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-600">
            <p className='flex gap-2'>
              <input value={'Men'} type='checkbox' className='w-3' onChange={toggleCategory} />Men
            </p>
            <p className='flex gap-2'>
              <input value={'Women'} type='checkbox' className='w-3' onChange={toggleCategory} />Women
            </p>
            <p className='flex gap-2'>
              <input value={'Kids'} type='checkbox' className='w-3' onChange={toggleCategory} />Kids
            </p>
          </div>
        </div>
        <div className={`border border-gray-300 pl-3 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block `}>
          <p className='py-3 text-sm font-medium'>TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-600">
            <p className='flex gap-2'>
              <input value={'Topwear'} type='checkbox' className='w-3' onChange={toggleSubCategory} />Topwear
            </p>
            <p className='flex gap-2'>
              <input value={'Bottomwear'} type='checkbox' className='w-3' onChange={toggleSubCategory} />Bottomwear
            </p>
            <p className='flex gap-2'>
              <input value={'Winterwear'} type='checkbox' className='w-3' onChange={toggleSubCategory} />Winterwear
            </p>
          </div>
        </div>
      </div>
      {/* Right side */}
      <div className=" flex-1">
          <div className="flex  justify-between text-base sm:text-2xl mb-4">
              <Title text1={'All'} text2={'COLLECTION'} />
              {/* Products sort */}
              <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
                <option value="relavent">Sort by:  relavent</option>
                <option value="low-high">Sort by:  Low To High</option>
                <option value="high-low">Sort by:  High To Low</option>
              </select>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-py-6 ">
    
    {filterProducts.length > 0 ? (
        filterProducts.map((item) => (
            <ProductItem key={item._id} id={item._id} name={item.name} image={item.image} price={item.price} />
        ))
    ) : (
        <p className="text-center text-gray-500 col-span-full">No best-selling products available.</p>
    )}
            </div>
      </div>
    </div>
  )
}

export default Collection