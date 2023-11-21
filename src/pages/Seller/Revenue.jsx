import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom';
import { useUserContext } from '../../context/userContext';
import { message } from 'antd';

const Revenue = () => {
    const [myProduct, setmyProduct] = useState([]);
    const [active, setActive] = useState(1)

    const buttonData = [
        {
            id: 1,
            name: 'Pending',
            value: false
        },
        {
            id: 2,
            name: 'Delivered',
            value: true
        }
    ]
    const [value, setValue] = useState({
        id: 1,
        name: 'Pending',
        value: false
    })
    const handleBtnValue = (elm) => {
        setValue(elm)
        setActive(elm.id)
    }
    const params = useParams();
    const getProducts = async () => {
        try {
            const res = await axios.get(
                `     https://infinity-site.onrender.com/api/v1/product/vendor/${params.vendorId}/paid?delivered=${value.value}`,
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

    const [revenue, getRevenue] = useState()


    const getRevenueFunc = async () => {
        try {
            const res = await axios.get(
                `https://infinity-site.onrender.com/api/v1/product/vendor/${params.vendorId}/total-paid-products-and-winning-amount`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (res.data.success) {
                getRevenue(res.data.data)
            } else {
                <Navigate to="/login" />;
            }
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        getProducts();
        getRevenueFunc()
    }, [value]);

    const { user } = useUserContext();
    const handleDeleverd = async (id) => {
        try {

            const response = await axios.patch(`https://infinity-site.onrender.com/api/v1/product/${id}/complete`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (response.status === 200) {
                message.success('Delivered sucessfully');
                // Update UI or perform any necessary actions
            }

        } catch (error) {
            console.error('Error selecting winner:', error);
        }
    }
    return (
        <div>
            <div className="container py-8 pt-[15vh] mx-auto">
                <div className="bg-gray-100 p-5">
                    <div className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-black py-6">My Revenue</div>
                    <div className="grid  pb-14 md:grid-cols-2 grid-cols-2 gap-8">
                        <div className="bg-gray-500 py-4 cursor-default text-center text-white font-medium px-6 text-xl">
                            Total Sales : {revenue?.totalPaidProducts}
                        </div>
                        <div className="bg-gray-500 py-4 cursor-pointer text-center text-white font-medium px-6 text-xl">
                            Earning: ${revenue?.totalWinningAmount}
                        </div>

                    </div>
                    <div className="flex gap-8 items-center mb-8">

                        {buttonData?.map((curElem) => (
                            <button className={active === curElem.id ? "text-xl px-4 py-3 text-white bg-black border-black border-2 rounded-sm  justify-center" : "text-xl px-4 py-3 text-black border-black border-2 rounded-sm  justify-center"} onClick={() => handleBtnValue(curElem)}>{curElem.name}</button>
                        ))}
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table text-xl text-black font-medium">
                            {/* head */}
                            <thead>
                                <tr className='text-xl text-black font-medium'>

                                    <th>Name</th>
                                    <th>Amount</th>
                                    {
                                        user?.user?._id === params.vendorId && <th>Action</th>
                                    }

                                </tr>
                            </thead>
                            <tbody className=' items-center'>
                                {
                                    myProduct?.map(b =>
                                        <tr>

                                            <td>{b?.title}</td>
                                            <td>${b?.winningBidAmount}</td>

                                            {
                                                user?.user?._id === params.vendorId && <button className="mt-3 text-white btn btn-success btn-sm" onClick={() => handleDeleverd(b._id)}>delivered</button>
                                            }
                                        </tr>)
                                }

                            </tbody>
                        </table>
                    </div>
                    {/* <div className="grid 2xl:grid-cols-6 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 ">
                        {myProduct?.map((curElem) => (
                            <Product curElem={curElem} />
                        ))}
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Revenue