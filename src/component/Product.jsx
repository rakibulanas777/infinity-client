/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { useCartContext } from "../context/cart_context";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import CountdownTimer from "../pages/Seller/CountdownTimer";
import { motion } from "framer-motion"


const Product = ({ curElem }) => {
  const { cartItems, removeItem, addToCart } = useCartContext();
  return (
    <div className="card h-full bg-white w-full shadow-sm rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg  border p-3">
      <div className="relative mb-3">
        <Link to={`/${curElem._id}`} onClick={() => window.scrollTo(0, 0)}>
          <motion.img whileHover={{ scale: 1.1 }} src={curElem.image} alt={curElem.title} />
        </Link>
        <div className="absolute top-2 right-2">
          <button className="shadow-sm text-white bg-red-500 hover:bg-red-700  cursor-pointer p-5  rounded-full  relative" onClick={() => addToCart(curElem)}>
            <FaHeart className="absolute text-xl font-medium top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 " />
          </button>
        </div>
      </div>
      <div className="card-data text-black text-xl">
        <p className=" font-semibold text-black">{curElem?.title}</p>

        <CountdownTimer endTime={curElem?.endTime} />
        <div className="flex items-center text-black justify-between">
          <div className="">Starting bid</div>
          <div className="font-medium text-red-500 cursor-pointer">${curElem.startPrice}</div>
        </div>
        <div className="flex items-center  justify-between mt-2">
          <div className="font-medium">Total bids</div>
          <Link to={`/allbids/${curElem._id}`}>
            <div className="font-medium">{curElem.bidCount} bids</div>
          </Link>
        </div>

      </div>
    </div >
  );
};
export default Product;
