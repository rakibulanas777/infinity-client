import axios from "axios";
import React, { useEffect, useState } from "react";
import { useProductContext } from "../context/productContext";

import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import Banner1 from "../img/banner/banner1.jpg";
import Banner2 from "../img/banner/banner2.jpg";
import CountdownTimer from "./Seller/CountdownTimer";
import Hero from "../component/Hero";
import BannerReverse from "../component/BannerReverse";
import Banner from "../component/Banner";
const Home = () => {
  // const [product, setProduct] = useState(null);
  //get user
  const { product, setProduct } = useProductContext();
  const [newProduct, setNewProduct] = useState([])
  const [endProduct, setEndProduct] = useState([])
  const getNewProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/product/products/new");

      if (res.data.success) {
        setNewProduct(res.data.data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getEndProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/product/products/ending-soon");

      if (res.data.success) {
        setEndProduct(res.data.data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNewProducts();
    getEndProducts()
  }, [newProduct]);

  return (
    <div>
      <Hero />
      <div className="container py-8 mx-auto">
        <div className="bg-gray-100 p-5 mb-14">
          <div className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-black py-6">Product That closing soon</div>
          <div className="grid 2xl:grid-cols-6 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 ">
            {endProduct?.map((curElem) => (
              <Product curElem={curElem} />
            ))}
          </div>
        </div>
        <Banner
          title="Creative harmonious living"
          text=" RAOUF Products are all made to standard sizes so that you can mix and match them freely."
          img={Banner1}
        />
        <div className="bg-gray-100 p-5 mb-14">
          <div className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-black py-6">New arrivals products</div>
          <div className="grid 2xl:grid-cols-6 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 ">
            {newProduct?.map((curElem) => (
              <Product curElem={curElem} />
            ))}
          </div>
        </div>
        <BannerReverse
          title="Comfortable & Elegante Living"
          text=" RAOUF Products are all made to standard sizes so that you can mix and match them freely."
          img={Banner2}
        />
      </div>

    </div>
  );
};

export default Home;

const Product = ({ curElem }) => {


  return (
    <div className="card h-full bg-white w-full shadow-sm rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg  border p-3">
      {/* <div className="flex space-x-2 cursor-pointer items-center mb-3">
        {user ? (
          <div className="text-white rounded-full text-2xl w-8 h-8 bg-red-500 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              {user.name.charAt(0)}
            </div>
          </div>
        ) : (
          <div className="avatar">
            <div className="w-6 rounded-xl">
              <img src="/next.svg" />
            </div>
          </div>
        )}

        <div className="text-xl font-semibold text-blue-900">@{user.name}</div>
      </div> */}
      <div className="relative mb-3">
        <Link to={`/${curElem._id}`}>

          <img src={curElem.image} alt={curElem.title} />

        </Link>
        <div className="absolute top-2 right-2">
          <div className="shadow-sm text-white bg-red-500 hover:bg-red-700  cursor-pointer p-5  rounded-full  relative">
            <AiOutlinePlus className="absolute text-xl font-medium top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 " />
          </div>
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
        {/* <div className="flex items-center text-black justify-between ">
          <div className="">Selling price </div>
          <div className="font-medium text-red-500 cursor-pointer">${curElem.sellingPrice}</div>
        </div> */}
      </div>
    </div>
  );
};

