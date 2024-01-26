import React, { useEffect, useState } from "react";
import PageNavigation from "../component/PageNavigation";
import { useProductContext } from "../context/productContext";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import {
  AiFillClockCircle,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";
import { useCartContext } from "../context/cart_context";
import { message } from "antd";
import { useUserContext } from "../context/userContext";
import axios from "axios";
import CountdownTimer from "./Seller/CountdownTimer";
import Product from "../component/Product";
import AllBids from "./Seller/AllBids";
import ProductBids from "./ProductsBid";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

const ProductDetails = ({ productDetails, setProductDetails }) => {
  const { user, setUser } = useUserContext();
  const params = useParams();

  const [catagoryProduct, setCatagoryProduct] = useState([]);
  const getProductsDetails = async () => {
    try {
      const res = await axios.get(
        `     https://infinity-site.onrender.com/api/v1/product/${params.id}`
      );

      if (res.data.success) {
        setProductDetails(res.data.data.product);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCatagoryProducts = async () => {
    try {
      const res = await axios.get(
        `     https://infinity-site.onrender.com/api/v1/product/products/category?category=${productDetails?.catagory}`
      );

      if (res.data.success) {
        setCatagoryProduct(res.data.data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductsDetails();
    getCatagoryProducts();
  }, []);


  const navigate = useNavigate();
  const handleOnBids = async (e) => {
    try {
      e.preventDefault();

      if (user === null) {
        return navigate("/login");
      }
      if (!user.user.bankAccount) {
        message.error("Please provide your bank account information.");
        return navigate("/complete-profile");
      }
      const res = await axios.post(
        `     https://infinity-site.onrender.com/api/v1/bids/${params.id}`,
        {
          vendor: productDetails.vendor,
          userId: user.user._id,
          amount: amount,
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
        const response = await axios.patch(
          `https://infinity-site.onrender.com/api/v1/product/${params.id}/select-winner`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.status === 200) {
          message.success("Winner selected successfully");
          setWinnerSelected(true);
          // Update UI or perform any necessary actions
        }
      }
    } catch (error) {
      console.error("Error selecting winner:", error);
    }
  };

  const { cartItems, removeItem, addToCart } = useCartContext();

  const addFovorite = () => {
    addToCart(productDetails);
  };

  const [bidID, setBidID] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(
      `https://infinity-site.onrender.com/api/v1/bids/${productDetails?.winningBid}/win-and-pay`,
      {
        method: "POST",
      }
    );
    const session = await response.json();

    // Redirect to Checkout page
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error(result.error.message);
    }
  };

  const handlePayment = async () => {
    try {
      const response = await fetch(
        `https://infinity-site.onrender.com/api/v1/bids/${productDetails?.winningBid}/win-and-pay`,
        {
          method: "POST",
        }
      );
      const session = await response.json();
      console.log(session);
      // Redirect to Checkout page
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };


  const initialAmount = productDetails && productDetails.startPrice ? productDetails.startPrice : 0;


  const [amount, setAmount] = useState(initialAmount);

  console.log(amount);

  const handleDecrease = (p) => {
    console.log(p);
    if (amount > p) {
      setAmount(amount - 1);
    } else {
      setAmount(amount);
    }
  };

  const handleIncrease = (p) => {
    setAmount(amount + 1);
  };

  console.log(amount);


  return (
    <div className="container mx-auto py-4 px-8 bg-white pt-[20vh]">
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
            Start Price :{" "}
            <b className="text-red-900">${productDetails?.startPrice}</b>
          </div>
          <div className="text-xl mb-2 font-semibold ">
            Selling Price :{" "}
            <b className="text-red-900">${productDetails?.sellingPrice}</b>
          </div>
          {productDetails?.status === "active" ? (
            <p className="text-xl">
              Auction Ends in:{" "}
              <CountdownTimer
                endTime={productDetails?.endTime}
                onCountdownComplete={handleCountdownComplete}
              />
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
            productDetails?.status === "ended" ? (<><p className=" font-semibold text-xl text-red-800">
              This is closed
            </p></>) : (user ? (user?.user?._id === productDetails?.winner?._id ? (
              <div className="flex flex-col space-y-4">
                {/* <Link to="/payment"> */}

                <button
                  onClick={handlePayment}
                  className="py-3 text-xl active:scale-90 transition duration-150 transform shadow-md  text-center cursor-pointer px-4 mt-4 rounded bg-red-500 text-white font-medium !w-full"
                >
                  pay ${productDetails?.winningBidAmount}
                </button>

                {/* </Link> */}
                <button
                  className="py-3 px-4 mt-4 active:scale-90 transition duration-150 transform rounded border border-red-500 font-medium text-xl w-full"
                  onClick={addFovorite}
                >
                  favorite
                </button>
              </div>
            ) : (
              <>
                <span className="flex justify-center items-center space-x-4">
                  <button className="bg-red-500 relative p-4 cursor-pointer rounded-full text-white" onClick={() => handleDecrease(productDetails?.startPrice)}>
                    <AiOutlineMinus className=' font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' size={20} />
                  </button>
                  <span className="text-red-500 px-8 py-2 bg-slate-50 text-lg font-medium">
                    ${amount || productDetails?.startPrice}
                  </span>
                  <button className="bg-red-500 relative p-4 cursor-pointer rounded-full text-white" onClick={() => handleIncrease(productDetails?.startPrice)} >
                    <AiOutlinePlus className=' font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' size={20} />
                  </button>
                </span>
                <form
                  className="border-b-2 border-gray-100 pb-4"
                  onSubmit={handleOnBids}
                >
                  {/* <label
                  htmlFor="offer"
                  type="button"
                  className="py-2 text-center cursor-pointer px-4 mt-4 rounded bg-red-500 text-white font-medium !w-full"
                >
                  offer
                </label> */}


                  <button
                    type="submit"
                    className="py-3 text-xl active:scale-90 transition duration-150 transform shadow-md  text-center cursor-pointer px-4 mt-4 rounded bg-red-500 text-white font-medium !w-full"
                  >
                    offer
                  </button>
                </form>
                <button
                  className="py-3 px-4 mt-4 active:scale-90 transition duration-150 transform rounded border border-red-500 font-medium text-xl w-full"
                  onClick={addFovorite}
                >
                  favorite
                </button>
              </>
            )) : (
              <>
                <form
                  className="border-b-2 border-gray-100 pb-4"
                  onSubmit={handleOnBids}
                >
                  <span className="flex justify-center items-center space-x-4">
                    <button className="bg-red-500 relative p-4 cursor-pointer rounded-full text-white" onChange={() => handleDecrease(productDetails?.startPrice)}>
                      <AiOutlineMinus className=' font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' size={20} />
                    </button>
                    <span className="text-red-500 px-8 py-2 bg-slate-50 text-lg font-medium">
                      ${amount || productDetails?.startPrice}
                    </span>
                    <button className="bg-red-500 relative p-4 cursor-pointer rounded-full text-white" onChange={() => handleIncrease(productDetails?.startPrice)} >
                      <AiOutlinePlus className=' font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' size={20} />
                    </button>
                  </span>

                  <button
                    type="submit"
                    className="py-3 text-xl active:scale-90 transition duration-150 transform shadow-md  text-center cursor-pointer px-4 mt-4 rounded bg-red-500 text-white font-medium !w-full"
                  >
                    offer
                  </button>
                </form>
                <button
                  className="py-3 px-4 mt-4 active:scale-90 transition duration-150 transform rounded border border-red-500 font-medium text-xl w-full"
                  onClick={addFovorite}
                >
                  favorite
                </button>
              </>
            ))

          }

        </div>
      </div>
      <div className="bg-gray-50/[.04] border rounded p-5 mb-10">
        <div className="text-2xl font-medium text-black cursor-pointer mb-3">
          Product description
        </div>
        <div className="text-xl text-black">{productDetails?.description}</div>
      </div>
      <div className="grid lg:grid-cols-4 pb-14 md:grid-cols-2 grid-cols-2 gap-8">
        <div className="bg-gray-500 py-4 cursor-default text-center text-white font-medium px-6 text-xl">
          Catagory : {productDetails?.catagory}
        </div>
        <div className="bg-gray-500 py-4 cursor-pointer text-center text-white font-medium px-6 text-xl">
          Size: {productDetails?.size}
        </div>
        <div className="bg-gray-500 py-4 cursor-pointer text-center text-white font-medium px-6 text-xl">
          Weight : {productDetails?.weight}
        </div>
        <div className="bg-gray-500 py-4 text-center cursor-pointer text-white font-medium px-6 text-xl">
          Texture : {productDetails?.texture}
        </div>
      </div>
      <div className="bg-gray-100 p-5 mb-14">
        <div className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-black py-6">
          Bids in this product
        </div>
        <ProductBids
          vendor={productDetails?.vendor}
          setBidID={setBidID}
          id={params.id}
        />
      </div>
    </div>
  );
};

export default ProductDetails;
