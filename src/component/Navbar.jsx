// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Form, Link, NavLink, useNavigate } from "react-router-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { HiMenu } from "react-icons/hi";
import { Switch, message } from "antd";
import {
  MdBackpack,
  MdLabel,
  MdMap,
  MdMenu,
  MdOutlineFavorite,
  MdArrowDropDown,
  MdLocationOn,
} from "react-icons/md";
import { useUserContext } from "../context/userContext";
import axios from "axios";
const Navbar = () => {
  const [active, setActive] = useState(0);

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
  ];
  const navItemAdmin = [
    {
      name: "Home",
      id: 0,
      path: "/",
    },
    {
      name: "Doctor",
      id: 4,
      path: "/admin/doctors",
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
          `    https://infinity-site.onrender.com/api/v1/user/switch-to-user/${user?.user._id}`,
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
          `    https://infinity-site.onrender.com/api/v1/user/switch-to-vendor/${user?.user._id}`,
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
    <div className="nav fixed top-0 left-0 w-full z-10 ease-in duration-300 shadow-sm backdrop-blur-md bg-white/80">
      <div className="container mx-auto py-6 px-10 sm:px-8 md:px-6 lg:px-10">
        <div className="flex justify-between items-center">
          {/* <NavLink to="/">
            <img
              src={logo}
              alt=""
              className="logo cursor-pointer hidden sm:inline-block"
            />
            <img
              src={logo2}
              alt=""
              className="logo cursor-pointer sm:hidden "
            />
          </NavLink> */}
          <div>
            <div className="flex items-center">
              <MdMenu
                className="text-black mr-3 text-2xl cursor-pointer"
                onClick={() => showToggle(!toggle)}
              />
              <Link
                className="text-2xl text-black font-bold cursor-pointer hover:text-indigo-900"
                to="/"
              >
                infinity24
              </Link>
            </div>
          </div>

          <div className="flex">
            <div className="form-control">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Search…"
                  className="input input-bordered bg-white"
                />
                <button className="btn btn-square bg-red-400 border-0 text-white font-semibold hover:bg-red-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className=" lg:items-center lg:space-x-8 hidden lg:flex">
            {user ? (
              <>
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full bg-blue-500 relative">
                      <div className="text-xl font-semibold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
                        {user?.user.name.charAt(0)}
                      </div>
                    </div>
                  </label>
                  <ul
                    tabIndex={0}
                    className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-white rounded-box w-52"
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
                                  ? "cursor-pointer duration-1000 p-2 ease-out text-sm lg:text-base xl:text-base font-medium text-primary"
                                  : "cursor-pointer duration-1000 p-2 ease-out text-sm lg:text-base xl:text-base font-medium text-neutral hover:text-primary"
                              }
                            >
                              {item.name}
                            </NavLink>
                          </li>
                        ))}
                        <li className="flex gap-5 flex-row items-center">
                          <a className="cursor-pointer duration-1000 ease-out text-sm lg:text-base xl:text-base font-medium text-neutral hover:text-primary">
                            Switch Vendor
                          </a>
                          <Switch
                            onChange={onChange}
                            className="w-4 bg-red-400 active:bg-red-700"
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
                                  ? "cursor-pointer duration-1000 ease-out text-sm lg:text-base xl:text-base font-medium text-primary"
                                  : "cursor-pointer duration-1000 ease-out text-sm lg:text-base xl:text-base font-medium text-neutral hover:text-primary"
                              }
                            >
                              {item.name}
                            </NavLink>
                          </li>
                        ))}
                        <li className="flex gap-5 flex-row items-center">
                          <a className="cursor-pointer duration-1000 ease-out text-sm lg:text-base xl:text-base font-medium text-neutral hover:text-primary">
                            Switch seller
                          </a>
                          <Switch
                            defaultChecked
                            onChange={onChange}
                            className="w-4 bg-red-400 active:bg-red-700"
                          />
                        </li>
                      </>
                    )}

                    <li>
                      <a
                        className="cursor-pointer duration-1000 ease-out text-sm lg:text-base xl:text-base font-medium text-neutral hover:text-primary"
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
              <div className="flex space-x-4">
                <NavLink to="/login">
                  <button className="border-red-400 border-2 bg-white mb-3 text-red-400 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    login
                  </button>
                </NavLink>
                <NavLink to="/register">
                  <button className="bg-red-500  hover:bg-red-700 mb-3 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Register
                  </button>
                </NavLink>
              </div>
            )}
          </div>

          {/* Mobile Button */}
          <div onClick={handleNav} className="block lg:hidden z-10">
            {nav ? (
              <AiOutlineCloseCircle
                className="text-primary cursor-pointer"
                size={26}
              />
            ) : (
              <HiMenu size={26} className="text-primary cursor-pointer" />
            )}
          </div>

          <div
            className={`lg:hidden  absolute w-1/2 sm:w-2/5 h-screen px-4 py-2 text-xl font-bold ease-in  shadow-sm backdrop-blur-md bg-white/80 top-0 duration-500
      ${nav ? "right-0" : "right-[-100%]"} pt-16 `}
          >
            <div className="flex flex-col space-y-8">
              {user ? (
                <>
                  {navItemAdmin.map((item) => (
                    <NavLink
                      key={item.id}
                      to={item.path}
                      onClick={() => setActive(item.id)}
                      className={
                        active === item.id
                          ? "cursor-pointer duration-1000 ease-out text-sm lg:text-base xl:text-base font-medium text-primary"
                          : "cursor-pointer duration-1000 ease-out text-sm lg:text-base xl:text-base font-medium text-neutral hover:text-primary"
                      }
                    >
                      {item.name}
                    </NavLink>
                  ))}

                  <NavLink to="/profile">
                    <div className="cursor-pointer duration-1000 ease-out text-sm lg:text-base xl:text-base font-medium text-neutral">
                      {user?.user.name}
                    </div>
                  </NavLink>

                  <NavLink to="/notification">
                    <div className="cursor-pointer duration-1000 ease-out text-sm lg:text-base xl:text-base font-medium text-neutral">
                      notification
                    </div>
                  </NavLink>

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
              ) : (
                <div className="flex space-x-4">
                  <NavLink to="/login">
                    <button>login</button>
                  </NavLink>
                  <NavLink to="/register">
                    <button className="bg-red-500  hover:bg-red-700 mb-3 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                      Register
                    </button>
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="py-2 border-t-2 border-gray-300/60 bg-gray-100 text-black lg:block hidden">
        <div className="container mx-auto  lg:w-11/12 gap-10  flex items-center ">
          <div
            className="flex items-center cursor-pointer mr-3"
            type="button"
            data-drawer-target="drawer-navigation"
            data-drawer-show="drawer-navigation"
            aria-controls="drawer-navigation"
          >
            <MdMap className=" mr-3 text-2xl" />
            <div className="text-md font-semibold ">All Categories</div>
          </div>
          <div className="flex items-center cursor-pointer mr-3">
            <MdLabel className=" mr-3 text-2xl" />
            <div className="text-md font-semibold ">Top products</div>
          </div>
          <div className="flex items-center cursor-pointer mr-3">
            <MdMap className=" mr-3 text-2xl" />
            <div className="text-md font-semibold ">New products</div>
          </div>
          <div className="flex items-center cursor-pointer mr-3">
            <MdLocationOn className=" mr-3 text-2xl" />
            <div className="text-md font-semibold ">Close to me</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
