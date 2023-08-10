import React, { useEffect, useState } from 'react'
import { useProductContext } from '../../context/productContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Space, Table, message } from 'antd';

const AllBids = () => {
    const [bid, setBids] = useState(null);
    const params = useParams();
    //get user
    const { product } = useProductContext();


    const getBids = async () => {
        try {
            const res = await axios.get(
                `http://localhost:8000/api/v1/bids/product/${params.productId}/bids`,

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
    useEffect(() => {
        getBids();
    }, []);

    console.log(bid)

    const handleApproved = async (id) => {
        try {
            const res = await axios.put(
                `http://localhost:8000/api/v1/bids/${id}/approve`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            message(res.data.message)
        } catch (error) {
            console.log(error);
        }
    }



    const data = [];
    for (let i = 0; i < bid?.length; i++) {
        data.push({
            key: `${bid[i]._id}`,
            name: `${bid[i].user?.name}`,
            amount: `${bid[i].amount}`,

        });
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',

        },
        {
            title: 'Amount',
            dataIndex: 'amount',

        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <button
                        className="bg-green-500 w-full hover:bg-green-700 mb-3 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => handleApproved(record.key)}
                        type="submit"
                    >
                        Approved
                    </button>
                </Space>
            ),
        },

    ];




    return (
        <div><div className="container mx-auto  px-10 sm:px-8 md:px-6 lg:px-10">
            <div className="w-full mx-auto pt-[20vh]">
                <h1>ALl bids</h1>
                <Table dataSource={data} columns={columns} />;
            </div>
        </div></div>
    )
}

export default AllBids