/* eslint-disable no-unused-vars */
import React, { useContext, useState, useRef, useEffect } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { NavLink, Link } from "react-router";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [Visible, setVisible] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const profileRef = useRef(null);

  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    navigate("/");
  };

  // يقفل المنيو لو ضغط برة
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setOpenProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center justify-between py-5 font-medium relative">
      {/* Logo */}
      <Link to="/">
        <img src={assets.logo} alt="logo" className="w-36" />
      </Link>

      {/* Links */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      {/* Right icons */}
      <div className="flex items-center gap-6">
        {/* Search */}
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt="search"
        />

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <img
            onClick={() => (token ? setOpenProfile(!openProfile) : navigate("/login"))}
            src={assets.profile_icon}
            className="w-5 cursor-pointer"
            alt="profile"
          />

          {/* Dropdown */}
          {token && openProfile && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md z-50">
              <p
                onClick={() => {
                  setOpenProfile(false);
                  navigate("/profile");
                }}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              >
                My Profile
              </p>
              <p
                onClick={() => {
                  setOpenProfile(false);
                  navigate("/orders");
                }}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              >
                Orders
              </p>
              <p
                onClick={() => {
                  setOpenProfile(false);
                  logout();
                }}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-red-600"
              >
                Logout
              </p>
            </div>
          )}
        </div>

        {/* Cart */}
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 cursor-pointer" alt="cart" />
          <p className="absolute right-[-4px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[9px]">
            {getCartCount()}
          </p>
        </Link>

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt="menu"
        />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full z-50 bg-white shadow-lg transition-all duration-300 ease-in-out ${
          Visible ? "w-64" : "w-0"
        } overflow-hidden`}
      >
        <div className="flex flex-col h-full text-gray-700">
          {/* Header - Close */}
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer border-b"
          >
            <img
              src={assets.dropdown_icon}
              className="h-5 rotate-180"
              alt="Back"
            />
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
  );
};

export default Navbar;
