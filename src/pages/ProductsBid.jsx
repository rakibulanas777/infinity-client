import React, { useEffect, useState } from 'react'

import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Space, Table, message } from 'antd';
import { useUserContext } from '../context/userContext';

const ProductBids = ({ vendor, id, setBidID }) => {
    const [bid, setBids] = useState(null);
    const { user, setUser } = useUserContext();


    const getBids = async () => {
        try {
            const res = await axios.get(
                `https://infinity-site.onrender.com/api/v1/bids/product/${id}/bid`,

                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (res.data.success) {
                setBids(res.data?.bids);
            }
        } catch (error) {
            console.log(error);
        }
    };


    //get user



    useEffect(() => {
        getBids();
    }, [bid]);

    console.log(bid)
    // for (let i = 0; i < bid?.length; i++) {
    //     data.push({
    //         key: `${bid[i]._id}`,
    //         name: `${bid[i].user?.name}`,
    //         amount: `${bid[i].amount}`,

    //     });
    // }

    // const columns = [
    //     {
    //         title: 'Name',
    //         dataIndex: 'name',

    //     },
    //     {
    //         title: 'Amount',
    //         dataIndex: 'amount',

    //     },


    // ];

    const handleApproved = async (bidId) => {
        try {
            setBidID(bidId)
            const res = await axios.put(
                `https://infinity-site.onrender.com/api/v1/bids/${bidId}/approve`,

                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (res.data.success) {
                message.success(res.data.message)
                location.reload()
            }
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <div>
            <div className="w-full mx-auto">
                <div className="overflow-x-auto">
                    <table className="table text-xl text-black font-medium">
                        {/* head */}
                        <thead>
                            <tr className='text-xl text-black font-medium'>

                                <th>Name</th>
                                <th>Amount</th>
                                {
                                    user?.user?._id === vendor && <th>Action</th>
                                }

                            </tr>
                        </thead>
                        <tbody className=' items-center'>
                            {
                                bid?.map(b =>
                                    <tr>

                                        <td>{b?.user.name}</td>
                                        <td>${b?.amount}</td>
                                        {
                                            user?.user?._id === vendor && <button className="mt-3 text-white btn btn-success btn-sm" onClick={() => handleApproved(b._id)}>Accept</button>
                                        }
                                    </tr>)
                            }


                            {/* row 3 */}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ProductBids