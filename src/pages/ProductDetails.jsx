import React, { useEffect, useState } from "react";
import PageNavigation from "../component/PageNavigation";
import { useProductContext } from "../context/productContext";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { AiFillClockCircle, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useCartContext } from "../context/cart_context";
import { message } from "antd";
import { useUserContext } from "../context/userContext";
import axios from "axios";
import CountdownTimer from "./Seller/CountdownTimer";
import Product from "../component/Product";

const ProductDetails = () => {
  const [productDetails, setProductDetails] = useState(null);
  const { user, setUser } = useUserContext();
  const params = useParams();

  console.log(user)
  const [catagoryProduct, setCatagoryProduct] = useState([])
  const getProductsDetails = async () => {
    try {
      const res = await axios.get(`https://infinity-site.onrender.com/api/v1/product/${params.id}`);

      if (res.data.success) {
        setProductDetails(res.data.data.product);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCatagoryProducts = async () => {
    try {
      const res = await axios.get(`https://infinity-site.onrender.com/api/v1/product/products/category?category=${productDetails?.catagory}`);

      if (res.data.success) {
        setCatagoryProduct(res.data.data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getProductsDetails();
    getCatagoryProducts()
  }, []);

  const navigate = useNavigate();
  const handleOnBids = async (e) => {
    try {

      e.preventDefault();

      if (user === null) {
        return navigate("/login");
      }
      if (!user.user.bankAccount) {
        message.error('Please provide your bank account information.');
        return <Navigate to="/complete-profile" />;
      }
      const res = await axios.post(
        `https://infinity-site.onrender.com/api/v1/bids/${params.id}`,
        {
          vendor: productDetails.vendor,
          userId: user.user._id,
          amount: e.target.amount.value,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      message.success(res.data.message);

    } catch (error) {

      console.log(error);
    }
  };

  const [winnerSelected, setWinnerSelected] = useState(false);

  const handleCountdownComplete = async () => {
    try {
      if (!winnerSelected) {
        const response = await axios.patch(`https://infinity-site.onrender.com/api/v1/product/${params.id}/select-winner`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.status === 200) {
          message.success('Winner selected successfully');
          setWinnerSelected(true);
          // Update UI or perform any necessary actions
        }
      }
    } catch (error) {
      console.error('Error selecting winner:', error);
    }
  };


  const { cartItems, removeItem, addToCart } = useCartContext();
  console.log(productDetails)
  const addFovorite = () => {
    addToCart(productDetails)
  }
  return (
    <div>
      <div className="container mx-auto py-4 px-8 bg-white pt-[15vh]">
        <PageNavigation title={productDetails?.title} />

        <div className="grid grid-cols-1 md:grid-cols-2 pb-14 gap-8  ">
          {/* product Images  */}
          <div>
            <div className="product_images bg-gray-50/[.04] border rounded mb-5 p-4">
              <img src={productDetails?.image} className="w-full h-[28rem]" />
            </div>

          </div>


          <div className="product-data border  rounded p-4 text-black mb-5">
            <div className="text-2xl mb-2 font-semibold text-red-900">
              {productDetails?.title}
            </div>

            <div className="text-xl mb-2 font-semibold ">
              Start Price : <b className="text-red-900">${productDetails?.startPrice}</b>
            </div>
            <div className="text-xl mb-2 font-semibold ">
              Selling Price : <b className="text-red-900">${productDetails?.sellingPrice}</b>
            </div>
            {productDetails?.status === 'active' ? (
              <p className="text-xl">
                Auction Ends in:{' '}
                <CountdownTimer endTime={productDetails?.endTime} onCountdownComplete={handleCountdownComplete} />
              </p>
            ) : (
              <p className="text-xl">Winner: {productDetails?.winner?.name}</p>
            )}
            <p className="font-medium text-xl flex items-center gap-2 pb-3">
              <AiFillClockCircle />
              <span>{productDetails?.createdAt}</span>
            </p>
            <hr />
            <p className="text-xl mb-2">starting bid</p>
            {/* <p className="font-semibold  mb-2">${price}</p> */}
            {
              productDetails?.status === 'ended' ? (<><p className=" font-semibold text-xl text-red-800">This is closed</p></>) : (<><form className="border-b-2 border-gray-100 pb-4" onSubmit={handleOnBids}>
                {/* <label
                  htmlFor="offer"
                  type="button"
                  className="py-2 text-center cursor-pointer px-4 mt-4 rounded bg-red-500 text-white font-medium !w-full"
                >
                  offer
                </label> */}
                <input
                  type="text"
                  name="amount"
                  className="input active:outline-none input-bordered bg-transparent w-full"
                />

                <button
                  type="submit"
                  className="py-3 text-xl active:scale-90 transition duration-150 transform shadow-md  text-center cursor-pointer px-4 mt-4 rounded bg-red-500 text-white font-medium !w-full"
                >
                  offer
                </button>
              </form>
                <button className="py-3 px-4 mt-4 active:scale-90 transition duration-150 transform rounded border border-red-500 font-medium text-xl w-full" onClick={addFovorite}>
                  favorite
                </button></>)
            }
          </div>



        </div>
        <div className="bg-gray-50/[.04] border rounded p-5 mb-10">
          <div className="text-2xl font-medium text-black cursor-pointer mb-3">
            Product description
          </div>
          <div className="text-xl text-black">
            {productDetails?.description}
          </div></div>
        <div className="grid lg:grid-cols-4 pb-14 md:grid-cols-2 grid-cols-2 gap-8">
          <div className="bg-gray-500 py-4 cursor-default text-center text-white font-medium px-6 text-xl">
            Catagory : {
              productDetails?.catagory
            }
          </div>
          <div className="bg-gray-500 py-4 cursor-pointer text-center text-white font-medium px-6 text-xl">
            Size: {
              productDetails?.size
            }
          </div>
          <div className="bg-gray-500 py-4 cursor-pointer text-center text-white font-medium px-6 text-xl">
            Weight : {
              productDetails?.weight
            }
          </div>
          <div className="bg-gray-500 py-4 text-center cursor-pointer text-white font-medium px-6 text-xl">
            Texture : {
              productDetails?.texture
            }
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;
