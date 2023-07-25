import React, { useState } from "react";
import {
  Button,
  Col,
  Dropdown,
  Form,
  Input,
  Row,
  Select,
  Space,
  TimePicker,
  Upload,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
import { useUserContext } from "../../context/userContext";
import TextArea from "antd/es/input/TextArea";
import { useProductContext } from "../../context/productContext";

function Editproducts() {
  const navigate = useNavigate();
  const { productDetails } = useProductContext();
  console.log(productDetails);
  const handleFinish = async (values) => {
    try {
      const res = await axios.put(
        `http://localhost:8000/api/v1/product/${productDetails._id}`,
        {
          ...values,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        message.success(res.data.message);
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Somthing Went Wrrong ");
    }
  };

  return (
    <div className="addproducts">
      <div className="w-full mx-auto pt-[30vh]">
        <Form
          layout="vertical"
          onFinish={handleFinish}
          className="ease-in duration-300 bg-gray-100  pt-6 pb-8 mb-4 w-[80%] sm:w-[60%]  shadow-sm backdrop-blur-md  lg:w-[40%] mx-auto rounded-md px-8 py-5"
        >
          <div className="text-xl text-center font-semibold text-gray-700 mb-3">
            Update products
          </div>
          <Row gutter={20}>
            <Col xs={24} md={12}>
              <Form.Item label="Title" name="title">
                <Input
                  type="text"
                  initialValues={productDetails?.title}
                  placeholder={productDetails?.title}
                  className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Company" name="company">
                <Input
                  type="text"
                  initialValues={productDetails?.company}
                  placeholder={productDetails?.company}
                  className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </Form.Item>
            </Col>
            <Col xs={8}>
              <Form.Item label="Total price" name="totalPrice">
                <Input
                  type="total price"
                  initialValues={productDetails?.totalPrice}
                  placeholder={productDetails?.totalPrice}
                  className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </Form.Item>
            </Col>
            <Col xs={8}>
              <Form.Item label="Selling price" name="sellingPrice">
                <Input
                  type="Selling price"
                  initialValues={productDetails?.sellingPrice}
                  placeholder={productDetails?.sellingPrice}
                  className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </Form.Item>
            </Col>
            <Col xs={8}>
              <Form.Item label="Minimum Bidding" name="minPrice">
                <Input
                  type="Selling price"
                  initialValues={productDetails?.minPrice}
                  placeholder={productDetails?.minPrice}
                  className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </Form.Item>
            </Col>
            <Col xs={8} md={8}>
              <Form.Item label="Picture" name="image">
                <Input
                  type="text"
                  initialValues={productDetails?.image}
                  placeholder="image url"
                  className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </Form.Item>
            </Col>
            <Col xs={8} md={8}>
              <Form.Item label="Catagory" name="catagory">
                <Select placeholder="catagory">
                  <Select.Option value="antiquitäten">
                    Antiquitäten
                  </Select.Option>
                  <Select.Option value="audio">Audio</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={8} md={8}>
              <Form.Item label="Location" name="location">
                <Input
                  type="text"
                  initialValues={productDetails?.location}
                  placeholder={productDetails?.location}
                  className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={24}>
              <Form.Item label="Product description" name="description">
                <TextArea
                  type="text"
                  initialValues={productDetails?.description}
                  placeholder={productDetails?.description}
                  className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={24}>
              <button
                className="bg-red-500 w-full hover:bg-red-700 mb-3 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                add product
              </button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}

export default Editproducts;
