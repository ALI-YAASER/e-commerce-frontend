
import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import { useLocation } from 'react-router';

const SearchBar = () => {
    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
    const location = useLocation();

    return showSearch ? (
        <div className="bg-white border-y py-8 shadow-md flex justify-center items-center flex-col relative z-50">
            <div className="w-full max-w-xl flex items-center bg-gray-100 border border-gray-300 rounded-full px-4 py-2 shadow-inner focus-within:ring-2 focus-within:ring-blue-400 transition">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    placeholder="Search for products..."
                    className="flex-1 bg-transparent text-gray-700 text-sm sm:text-base px-2 py-1 outline-none"
                />
                <img
                    src={assets.search_icon}
                    alt="search"
                    className="w-5 h-5 opacity-70"
                />
            </div>

            <button
                onClick={() => setShowSearch(false)}
                className="mt-4 text-sm text-gray-500 hover:text-red-500 transition flex items-center gap-1"
            >
                <img src={assets.cross_icon} alt="close" className="w-4 h-4" />
                Close Search
            </button>
        </div>
    ) : null;
};

export default SearchBar;
