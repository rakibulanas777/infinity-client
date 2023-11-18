import React, { useState } from "react";
import {
  Button,
  Col,
  DatePicker,
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
import moment from "moment/moment";


function Addproducts() {
  const navigate = useNavigate();
  const { user } = useUserContext();
  console.log(user.user.role)
  const handleFinish = async (values) => {
    try {
      const end = new Date(values.endTime).getTime();
      console.log(end)
      if (user.user.role === 'vendor') {
        const res = await axios.post(
          "https://infinity-site.onrender.com/api/v1/user/addProducts",
          {
            ...values,
            vendor: user.user._id,

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
      } else {
        message.error("You are not vendor");
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
            Add Products
          </div>
          <Row gutter={20}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Title"
                name="title"
                required
                rules={[{ required: true }]}
              >
                <Input
                  type="text"
                  placeholder="Enter product title"
                  className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Company" name="company">
                <Input
                  type="text"
                  placeholder="company ..."
                  className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </Form.Item>
            </Col>
            <Col xs={8}>
              <Form.Item
                label="Start Price"
                name="startPrice"
                required
                rules={[{ required: true }]}
              >
                <Input
                  type="text"
                  placeholder="startPrice"
                  className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </Form.Item>
            </Col>
            <Col xs={8}>
              <Form.Item
                label="Selling price"
                name="sellingPrice"
                required
                rules={[{ required: true }]}
              >
                <Input
                  type="text"
                  placeholder="Selling price"
                  className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </Form.Item>
            </Col>
            <Col xs={8}>
              <Form.Item
                label="End Time"
                name="endTime"
                required
                rules={[{ required: true }]}
              >

                <DatePicker showTime={{
                  format: 'HH:mm',
                }} format="YYYY-MM-DD HH:mm" />


              </Form.Item>
            </Col>
            <Col xs={24} md={24}>
              <Form.Item
                label="Picture"
                name="image"
                rules={[{ required: true }]}
              >
                <Input
                  type="text"
                  placeholder="image url"
                  className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </Form.Item>
            </Col>
            <Col xs={8} md={8}>
              <Form.Item
                label="texture"
                name="texture"
                rules={[{ required: true }]}
              >
                <Input
                  type="texture"
                  placeholder="image url"
                  className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </Form.Item>
            </Col>
            <Col xs={8} md={8}>
              <Form.Item
                label="weight"
                name="weight"
                rules={[{ required: true }]}
              >
                <Input
                  type="weight"
                  placeholder="weight"
                  className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </Form.Item>
            </Col>
            <Col xs={8} md={8}>
              <Form.Item
                label="size"
                name="size"
                rules={[{ required: true }]}
              >
                <Input
                  type="text"
                  placeholder="size"
                  className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </Form.Item>
            </Col>
            <Col xs={8} md={8}>
              <Form.Item
                label="Catagory"
                name="catagory"
                rules={[{ required: true }]}
              >
                <Select placeholder="catagory">
                  <Select.Option value="chair">
                    chair
                  </Select.Option>
                  <Select.Option value="kitchen">
                    kitchen
                  </Select.Option>
                  <Select.Option value="lamp">
                    lamp
                  </Select.Option>
                  <Select.Option value="furniture">
                    furniture
                  </Select.Option>
                  <Select.Option value="skin-care">
                    skin-care
                  </Select.Option>
                  <Select.Option value="audio">Audio</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={8} md={8}>
              <Form.Item
                label="Location"
                name="location"
                required
                rules={[{ required: true }]}
              >
                <Input
                  type="text"
                  placeholder="your clinic address"
                  className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={24}>
              <Form.Item
                label="Product description"
                name="description"
                required
                rules={[{ required: true }]}
              >
                <TextArea
                  type="text"
                  placeholder="Product description"
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

export default Addproducts;

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
