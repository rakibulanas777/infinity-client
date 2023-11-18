import axios from "axios";
import React, { useEffect, useState } from "react";
import { useProductContext } from "../context/productContext";
import Banner1 from "../img/banner/banner1.jpg";
import Banner2 from "../img/banner/banner2.jpg";

import Hero from "../component/Hero";
import BannerReverse from "../component/BannerReverse";
import Banner from "../component/Banner";
import Product from "../component/Product";
const Home = ({ value, setValue, active, setActive }) => {

  const [newProduct, setNewProduct] = useState([])
  const [endProduct, setEndProduct] = useState([])
  const [mostBidProduct, setMostBidProduct] = useState([])
  const getNewProducts = async () => {
    try {
      const res = await axios.get("https://infinity-site.onrender.com/api/v1/product/products/new");

      if (res.data.success) {
        setNewProduct(res.data.data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getEndProducts = async () => {
    try {
      const res = await axios.get("https://infinity-site.onrender.com/api/v1/product/products/ending-soon");

      if (res.data.success) {
        setEndProduct(res.data.data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getmostBidsProducts = async () => {
    try {
      const res = await axios.get("https://infinity-site.onrender.com/api/v1/product/products/most-bids");

      if (res.data.success) {
        setMostBidProduct(res.data.data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNewProducts();
    getEndProducts()
    getmostBidsProducts()
  }, [newProduct]);

  return (
    <div>
      <Hero setValue={setValue} value={value} active={active} setActive={setActive} />
      <div className="container py-8 mx-auto">
        <div className="bg-gray-100 p-5 mb-14">
          <div className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-black py-6">Most bidding products</div>
          <div className="grid 2xl:grid-cols-6 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1  gap-4 ">
            {mostBidProduct?.map((curElem) => (
              <Product curElem={curElem} />
            ))}
          </div>
        </div>
        <div className="bg-gray-100 p-5 mb-14">
          <div className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-black py-6">Product That closing soon</div>
          <div className="grid 2xl:grid-cols-6 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1  gap-4 ">
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
          <div className="grid 2xl:grid-cols-6 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-4 ">
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



