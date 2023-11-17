/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import styled from "styled-components";
import { useProductContext } from "../context/productContext";

const Products = ({ product }) => {
  return (
    <div className="feature-product">
      <Wrapper>
        <div className="container py-8 mx-auto">
          <div className="bg-gray-100 p-5">
            <div className="grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 ">
              {/* {p.map((curElem) => {
                return <Product key={curElem.id} curElem={curElem} />;
              })} */}
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Products;

const Product = ({ curElem }) => {
  console.log(curElem);

  return (
    <div className="card h-full bg-white w-full shadow-sm rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg  border p-3"></div>
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
