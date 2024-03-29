import React, { useEffect, useState } from 'react'
import { useProductContext } from '../context/productContext';
import axios from 'axios';
import Product from '../component/Product';
import { motion, AnimatePresence } from "framer-motion";

import { InfinitySpin } from 'react-loader-spinner'
const ProductPage = ({ value, setValue, active, setActive }) => {

    const { product, setProduct } = useProductContext();

    const catagory = [
        {
            id: 1,
            name: 'All',
            value: "all"
        },
        {
            id: 2,
            name: 'Furnitures',
            value: "furniture"
        },
        {
            id: 3,
            name: 'Electronics',
            value: "electronic"
        },
        {
            id: 4,
            name: 'Lamps',
            value: "lamp"
        },
        {
            id: 5,
            name: 'Kitchen',
            value: "kitchen"
        },
        {
            id: 6,
            name: 'Chairs',
            value: "chair"
        },
        {
            id: 7,
            name: 'Skin care',
            value: "skin-care"
        },
    ]
    const [loading, setLoading] = useState(true)

    const getProducts = async () => {
        try {
            const res = await axios.get(`https://infinity-site.onrender.com/api/v1/product/products/category?category=${value}`);

            if (res.data.success) {
                setLoading(false)
                setProduct(res.data.data.products);
            }
        } catch (error) {
            console.log(error);
        }
    };
    console.log(loading)
    const handleButton = (btn) => {
        setValue(btn.value);
        setActive(btn.id)
    }

    useEffect(() => {
        getProducts();
    }, [value]);
    return (
        <div className='pt-[15vh]'>
            <div className="container py-8 mx-auto">
                <div className=" p-5 mb-14">
                    <div className="flex flex-wrap justify-center mb-8 gap-5">
                        {catagory?.map((btn) => (
                            <motion.button whileHover={{ scale: 1.07 }}
                                whileTap={{ scale: 0.9 }} transition={{ duration: 0.2 }} className={active === btn.id ? "text-xl px-4 py-3 text-white bg-black border-black border-2 rounded-sm  justify-center" : "text-xl px-4 py-3 text-black border-black border-2 rounded-sm  justify-center"} onClick={() => handleButton(btn)}>{btn.name}</motion.button>
                        ))}
                    </div>
                    {
                        loading ? (<div className="text-center mx-auto w-32">

                            < InfinitySpin
                                visible={true}
                                width="200"
                                className="text-center mx-auto"
                                color="red"
                                ariaLabel="infinity-spin-loading"
                            />

                        </div>) : (<div className="grid 2xl:grid-cols-6 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1  gap-4 ">
                            {product?.map((curElem) => (
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        initial={{ y: 10, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -10, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Product curElem={curElem} />
                                    </motion.div>
                                </AnimatePresence>
                            ))}
                        </div>)
                    }

                </div>
            </div>
        </div>
    )
}

export default ProductPage