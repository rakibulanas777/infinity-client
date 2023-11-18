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
  console.log(params.vendorId)
  const getProducts = async () => {
    try {
      const res = await axios.get(
        `https://infinity-site.onrender.com/api/v1/product/vendor/${params.vendorId}`,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setmyProduct(res.data.products)
      if (res.data.success) {

      } else {
        <Navigate to="/login" />;
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);


  return (
    <div>
      <Wrapper>
        <div className="container py-8 pt-[30vh] mx-auto">
          <div className="bg-gray-100 p-5">
            <div className="grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 ">
              {myProduct?.map((curElem) => (
                <Product curElem={curElem} />
              ))}
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Myproducts;

const Product = ({ curElem }) => {
  console.log(curElem);
  const { getProductDetails } = useProductContext();
  const handleDelete = (id) => {
    alert("are you sure procesd");
    fetch(`https://infinity-site.onrender.com/api/v1/product/${id}`, {
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
    fetch(`https://infinity-site.onrender.com/api/v1/product/${id}`)
      .then((res) => res.json()) // or res.json()
      .then((data) => {
        getProductDetails(data.data.product);
        navigate("/editproduct");
      });
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
      <div className="relative">
        <Link to={`/${curElem._id}`}>
          <figure>
            <img src={curElem.image} alt={curElem.title} />
          </figure>
        </Link>
        <div className="absolute top-0 right-2">
          <details className="dropdown">
            <summary className="m-1">
              <div className="shadow-sm   text-white bg-red-500 hover:bg-red-700  cursor-pointer p-5  rounded-full  relative">
                <BsThreeDotsVertical className="absolute text-xl font-medium top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 " />
              </div>
            </summary>
            <ul className="p-2 shadow menu dropdown-content z-10 bg-white rounded-box w-52">
              <li>
                <a onClick={() => handleEdit(curElem._id)}>edit</a>
              </li>
              <li>
                <a onClick={() => handleDelete(curElem._id)}>delete</a>
              </li>
            </ul>
          </details>
        </div>
      </div>
      <div className="card-data">
        <div className="flex items-center text-black justify-between mt-3">
          <div className="font-medium">Timberland</div>
          <div className="font-medium">{curElem.bidCount}  bids</div>
        </div>
        <div className="flex items-center text-black justify-between">
          <div className="">0 Gebote</div>
          <div className="font-medium text-red-500 cursor-pointer">Fr. 15</div>
        </div>
        <div className="flex items-center text-black justify-between ">
          <div className="">Softart </div>
          <div className="font-medium text-red-500 cursor-pointer">Fr. 5</div>
        </div>
      </div>
    </div>
  );
};

const Wrapper = styled.section`
  figure {
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    transition: all 0.5s linear;
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 0%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      transition: all 0.2s linear;
      cursor: pointer;
    }
    &:hover::after {
      width: 100%;
    }
    &:hover img {
      transform: scale(1.3);
    }
    img {
      height: 10rem;

      transition: all 0.2s linear;
    }
  }
`;
