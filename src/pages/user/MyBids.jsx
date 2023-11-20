import React, { useEffect, useState } from "react";

import axios from "axios";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { message } from "antd";
import { useUserContext } from "../../context/userContext";
import { useProductContext } from "../../context/productContext";
import CountdownTimer from "../Seller/CountdownTimer";
import { FaHeart } from "react-icons/fa";
import { useCartContext } from "../../context/cart_context";

const MyBids = () => {
    const [myProduct, setmyProduct] = useState([]);
    const { user } = useUserContext();


    const [value, setValue] = useState({
        id: 1,
        name: 'Active',
        value: 'active'
    })
    const buttonData = [
        {
            id: 1,
            name: 'Active',
            value: 'active'
        },

        {
            id: 3,
            name: 'Closed',
            value: 'ended'
        }
    ]
    const handleBtnValue = (elm) => {
        setValue(elm)
        setActive(elm.id)
    }
    console.log(user)
    const getProducts = async () => {
        try {
            const res = await axios.get(
                `https://infinity-site.onrender.com/api/v1/product/bids/products/${user?.user?._id}?status=${value.value}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (res.data.success) {
                setmyProduct(res.data.data.products)
            } else {
                <Navigate to="/login" />;
            }
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        getProducts();
    }, [value]);
    const [active, setActive] = useState(1);

    return (
        <div>
            <div className="container py-8 pt-[15vh] mx-auto">
                <div className="bg-gray-100 p-5">
                    <div className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-black py-6">My Bidding Products</div>
                    <div className="flex gap-8 items-center mb-8">

                        {buttonData?.map((curElem) => (
                            <button className={active === curElem.id ? "text-xl px-4 py-3 text-white bg-black border-black border-2 rounded-sm  justify-center" : "text-xl px-4 py-3 text-black border-black border-2 rounded-sm  justify-center"} onClick={() => handleBtnValue(curElem)}>{curElem.name}</button>
                        ))}
                    </div>
                    <div className="grid 2xl:grid-cols-6 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 ">
                        {myProduct?.map((curElem) => (
                            <Product curElem={curElem} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyBids;

const Product = ({ curElem }) => {
    console.log(curElem);
    const { getProductDetails } = useProductContext();
    const { cartItems, removeItem, addToCart } = useCartContext();

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
                {/* <div className="flex items-center text-black justify-between ">
          <div className="">Selling price </div>
          <div className="font-medium text-red-500 cursor-pointer">${curElem.sellingPrice}</div>
        </div> */}
            </div>
        </div>
    );
};

