import React from 'react'
import { Link } from 'react-router-dom'
import { FaUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";


const NavBar2 = () => {
    return (
        <div className='nav fixed top-0 left-0 w-full z-10 ease-in duration-300 shadow-sm backdrop-blur-md bg-white/80'>
            <div className="container mx-auto py-6 px-10 sm:px-8 md:px-6 lg:px-10">
                <div className="flex justify-between items-center">
                    <Link
                        className="text-2xl text-black font-bold cursor-pointer hover:text-indigo-900"
                        to="/"
                    >
                        infinity24
                    </Link>

                    <div className="flex items-center gap-5">
                        <Link to="" className=" text-[#191919] text-xl font-medium">Home</Link>
                        <Link to="" className=" text-[#191919] text-xl font-medium">Shop</Link>
                        <Link to="" className=" text-[#191919] text-xl font-medium">Product</Link>
                        <Link to="" className=" text-[#191919] text-xl font-medium">Contact Us</Link>
                    </div>
                    <div className="flex items-center gap-5">
                        <FaUserCircle size={25} className='text-[#191919] cursor-pointer ' />
                        <FaShoppingCart size={25} className='text-[#191919] cursor-pointer ' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBar2