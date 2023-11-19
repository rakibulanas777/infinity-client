import React, { useEffect, useState } from 'react'
import { useProductContext } from '../context/productContext';
import axios from 'axios';
import Product from '../component/Product';

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
    const getProducts = async () => {
        try {
            const res = await axios.get(`  https://infinity-site.onrender.com/api/v1/product/products/category?category=${value}`);

            if (res.data.success) {
                setProduct(res.data.data.products);
            }
        } catch (error) {
            console.log(error);
        }
    };
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
                            <button className={active === btn.id ? "text-xl px-4 py-3 text-white bg-black border-black border-2 rounded-sm  justify-center" : "text-xl px-4 py-3 text-black border-black border-2 rounded-sm  justify-center"} onClick={() => handleButton(btn)}>{btn.name}</button>
                        ))}
                    </div>
                    <div className="grid 2xl:grid-cols-6 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1  gap-4 ">
                        {product?.map((curElem) => (
                            <Product curElem={curElem} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductPage