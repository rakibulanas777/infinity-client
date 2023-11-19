import React, { useEffect, useState } from "react";
import { useUserContext } from "../../context/userContext";
import axios from "axios";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";
import { message } from "antd";
import { useProductContext } from "../../context/productContext";

const Myproducts = () => {
  const [myProduct, setmyProduct] = useState([]);
  const { user } = useUserContext();
  //get user
  const { product, setProduct } = useProductContext();
  const params = useParams();
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
      id: 2,
      name: 'Paused',
      value: 'paused'
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

  const getProducts = async () => {
    try {
      const res = await axios.get(
        `    https://infinity-site.onrender.com/api/v1/product/vendor/${params.vendorId}?status=${value.value}`,
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
          <div className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-black py-6">My products</div>
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

export default Myproducts;

const Product = ({ curElem }) => {
  console.log(curElem);
  const { getProductDetails } = useProductContext();
  const handleDelete = (id) => {
    alert("are you sure procesd");
    fetch(`    https://infinity-site.onrender.com/api/v1/product/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json()) // or res.json()
      .then((data) => {
        message.error(data.message);
        location.reload();
      });
  };
  const navigate = useNavigate();
  const handleEdit = (id) => {
    fetch(`    https://infinity-site.onrender.com/api/v1/product/${id}`)
      .then((res) => res.json()) // or res.json()
      .then((data) => {
        getProductDetails(data.data.product);
        navigate("/editproduct");
      });
  };
  const handlePause = async (id) => {
    try {
      const res = await axios.put(
        `    https://infinity-site.onrender.com/api/v1/product/pause/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Somthing Went Wrrong ");
    }
  };
  const handleActive = async (id) => {
    try {
      const res = await axios.put(
        `    https://infinity-site.onrender.com/api/v1/product/active/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Somthing Went Wrrong ");
    }
  };
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


        <img src={curElem.image} alt={curElem.title} />


        <div className="absolute top-0 left-2">
          <details className="dropdown z-10">
            <summary className="m-1 text-white">
              <div className="shadow-sm   text-white bg-red-500 hover:bg-red-700  cursor-pointer p-5  rounded-full  relative">
                <BsThreeDotsVertical className="absolute text-xl font-medium top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 " />
              </div>
            </summary>

            <ul className="p-2 shadow menu dropdown-content z-10 bg-white rounded-box w-52">
              <li>
                <a className="text-xl text-black" onClick={() => handleEdit(curElem._id)}>edit</a>
              </li>
              <li>
                <a className="text-xl text-black" onClick={() => handleDelete(curElem._id)}>delete</a>
              </li>
              {
                curElem?.status === 'active' ? (<li>
                  <a className="text-xl text-black" onClick={() => handlePause(curElem._id)}>pause</a>
                </li>) : (<li>
                  <a className="text-xl text-black" onClick={() => handleActive(curElem._id)}>active</a>
                </li>)
              }

            </ul>
          </details>
        </div>

      </div>
      <div className="card-data text-black text-xl">
        <p className=" font-semibold text-black">{curElem?.title}</p>

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

