import React, { useState } from 'react'
import { Form, Link, NavLink, useNavigate } from "react-router-dom"
import { FaUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Switch, message } from 'antd';
import { AiOutlineCloseCircle } from "react-icons/ai";
import { HiMenu } from "react-icons/hi";
import { FaHeart } from "react-icons/fa";
import axios from 'axios';
import { useUserContext } from '../context/userContext';
import { useCartContext } from '../context/cart_context';


const NavBar2 = () => {
    const [active, setActive] = useState(0);

    const { cartItems, removeItem, addToCart } = useCartContext();
    console.log(cartItems)
    const [nav, setNav] = useState(false);
    const handleNav = () => {
        setNav(!nav);
    };

    const { user, setUser } = useUserContext();
    console.log(user?.user._id)
    const navigate = useNavigate();
    const navItem = [
        {
            name: "Profile",
            id: 0,
            path: "/complete-profile",
        },
        {
            name: "Notification",
            id: 1,
            path: "/notification",
        },
        {
            name: "My Bids",
            id: 2,
            path: "/mybids",
        },
        {
            name: "Inbox",
            id: 3,
            path: "/inbox",
        },

    ];
    const navItemSeller = [
        {
            name: "Profile",
            id: 0,
            path: "/complete-profile",
        },
        {
            name: "Notification",
            id: 1,
            path: "/notification",
        },
        {
            name: "Myproducts",
            id: 2,
            path: `/myproducts/${user?.user._id}`,
        },
        {
            name: "Add products",
            id: 3,
            path: "/addproducts",
        },
        {
            name: "Revenue",
            id: 4,
            path: "/revenue",
        },
        {
            name: "Inbox",
            id: 5,
            path: "/inbox",
        },
    ];
    const navItemAdmin = [
        {
            name: "Home",
            id: 0,
            path: "/",
        },

        {
            name: "Users",
            id: 2,
            path: "/admin/users",
        },
    ];
    const onChange = async (checked) => {
        console.log(`switch to ${checked}`);

        try {
            if (checked) {
                const res = await axios.put(
                    `     https://infinity-site.onrender.com/api/v1/user/switch-to-user/${user?.user._id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
                if (res.data.success) {
                    message.success(res.data.message);
                    setUser(res.data.data);
                    navigate("/");
                } else {
                    message.error(res.data.message);
                }
            } else {
                const res = await axios.put(
                    `     https://infinity-site.onrender.com/api/v1/user/switch-to-vendor/${user?.user._id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
                if (res.data.success) {
                    message.success(res.data.message);
                    setUser(res.data.data);
                    navigate("/");
                } else {
                    message.error(res.data.message);
                }
            }



        } catch (error) {
            console.log(error);
            message.error("Somthing Went Wrrong ");
        }
    };




    return (
        <div className='nav fixed top-0 left-0 w-full z-10 ease-in duration-300 shadow-sm backdrop-blur-md bg-white/80'>
            <div className="container mx-auto py-6 px-10 sm:px-8 md:px-6 lg:px-10">
                <div className="flex justify-between items-center">
                    <Link
                        className="text-2xl text-black font-bold cursor-pointer hover:text-red-700"
                        to="/"
                    >
                        infinity24
                    </Link>

                    <div className="items-center hidden lg:flex gap-5">
                        <Link to="" className=" text-[#191919] text-xl font-medium">Home</Link>
                        <Link to="" className=" text-[#191919] text-xl font-medium">Shop</Link>
                        <Link to="/product" className=" text-[#191919] text-xl font-medium">Product</Link>
                        <Link to="" className=" text-[#191919] text-xl font-medium">Contact Us</Link>
                    </div>
                    <div className="flex items-center gap-5">
                        <Link to='/favorite'>
                            <div className="indicator">
                                <FaHeart size={25} className='text-[#191919] cursor-pointer ' />
                                <span className="badge badge-sm indicator-item bg-red-500 text-white rounded-full border-none">{cartItems.length}</span>
                            </div>
                        </Link>

                        {user ? (
                            <>
                                <div className="dropdown dropdown-end">
                                    <label
                                        tabIndex={0}
                                        className="btn btn-ghost btn-circle avatar"
                                    >
                                        <div className="w-10 rounded-full bg-red-500 relative">
                                            <div className="text-xl font-semibold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
                                                {user?.user.name.charAt(0)}
                                            </div>
                                        </div>
                                    </label>
                                    <ul
                                        tabIndex={0}
                                        className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-white rounded-box w-56"
                                    >
                                        {user?.user.role === 'vendor' ? (
                                            <>
                                                {navItemSeller.map((item) => (
                                                    <li>
                                                        <NavLink
                                                            key={item.id}
                                                            to={item.path}
                                                            onClick={() => setActive(item.id)}
                                                            className={
                                                                active === item.id
                                                                    ? "cursor-pointer duration-1000 p-2 ease-out text-sm lg:text-base xl:text-base font-medium text-red-700"
                                                                    : "cursor-pointer duration-1000 p-2 ease-out text-sm lg:text-base xl:text-base font-medium text-neutral hover:text-red-700"
                                                            }
                                                        >
                                                            {item.name}
                                                        </NavLink>
                                                    </li>
                                                ))}
                                                <li className="flex gap-5 flex-row items-center">
                                                    <button className="cursor-pointer duration-1000 ease-out text-sm lg:text-base xl:text-base font-medium text-neutral hover:text-red-700">
                                                        Switch vendor
                                                    </button>
                                                    <Switch
                                                        onChange={onChange}
                                                        className="w-4 !bg-red-400 active:bg-red-700"
                                                    />
                                                </li>
                                            </>
                                        ) : (
                                            <>
                                                {navItem.map((item) => (
                                                    <li>
                                                        <NavLink
                                                            key={item.id}
                                                            to={item.path}
                                                            onClick={() => setActive(item.id)}
                                                            className={
                                                                active === item.id
                                                                    ? "cursor-pointer duration-1000 ease-out text-sm lg:text-base xl:text-base font-medium text-red-700"
                                                                    : "cursor-pointer duration-1000 ease-out text-sm lg:text-base xl:text-base font-medium text-neutral hover:text-red-700"
                                                            }
                                                        >
                                                            {item.name}
                                                        </NavLink>
                                                    </li>
                                                ))}
                                                <li className="flex gap-5 flex-row items-center">
                                                    <a className="cursor-pointer duration-1000 ease-out text-sm lg:text-base xl:text-base font-medium text-neutral hover:text-red-700">
                                                        Switch seller
                                                    </a>
                                                    <Switch
                                                        defaultChecked
                                                        onChange={onChange}
                                                        className="w-4 !bg-red-400 active:bg-red-700"
                                                    />
                                                </li>
                                            </>
                                        )}

                                        <li>
                                            <a
                                                className="cursor-pointer duration-1000 ease-out text-sm lg:text-base xl:text-base font-medium text-neutral hover:text-red-700"
                                                onClick={() => {
                                                    message.success("Logout Successfully");
                                                    localStorage.clear();
                                                    location.reload();
                                                    navigate("/");
                                                }}
                                            >
                                                Logout
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </>
                        ) : (
                            <Link to='/login'>
                                <FaUserCircle size={25} className='text-[#191919] cursor-pointer ' />
                            </Link>
                        )}

                    </div>
                    <div onClick={handleNav} className="block lg:hidden z-10">
                        {nav ? (
                            <AiOutlineCloseCircle
                                className="text-red-500 cursor-pointer"
                                size={26}
                            />
                        ) : (
                            <HiMenu size={26} className="text-red-500 cursor-pointer" />
                        )}
                    </div>

                    <div
                        className={`lg:hidden  absolute w-1/2 sm:w-2/5 h-screen px-8 py-2 text-xl font-bold ease-in  shadow-sm backdrop-blur-md bg-white/80 top-0 duration-500
      ${nav ? "right-0" : "right-[-100%]"} pt-16 `}
                    >
                        <div className="flex flex-col space-y-8">

                            <>
                                {navItemAdmin.map((item) => (
                                    <NavLink
                                        key={item.id}
                                        to={item.path}
                                        onClick={() => setActive(item.id)}
                                        className={
                                            active === item.id
                                                ? "cursor-pointer duration-1000 ease-out text-sm lg:text-base xl:text-base font-medium text-red-700"
                                                : "cursor-pointer duration-1000 ease-out text-sm lg:text-base xl:text-base font-medium text-neutral hover:text-red-700"
                                        }
                                    >
                                        {item.name}
                                    </NavLink>
                                ))}





                                <div>
                                    <a
                                        className="cursor-pointer duration-1000 ease-out text-sm lg:text-base xl:text-base font-medium text-neutral"
                                        onClick={() => {
                                            message.success("Logout Successfully");
                                            localStorage.clear();
                                            navigate("/");
                                            location.reload();
                                        }}
                                    >
                                        Logout
                                    </a>
                                </div>
                            </>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBar2