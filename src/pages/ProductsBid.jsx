import React, { useEffect, useState } from 'react'

import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Space, Table, message } from 'antd';

const ProductBids = ({ id }) => {
    const [bid, setBids] = useState(null);



    const getBids = async () => {
        try {
            const res = await axios.get(
                `     https://infinity-site.onrender.com/api/v1/bids/product/${id}/bid`,

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
    }, [bid]);






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


    ];




    return (
        <div>
            <div className="w-full mx-auto">
                <Table dataSource={data} columns={columns} />;
            </div>
        </div>
    )
}

export default ProductBids