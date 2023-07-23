import React, { useState } from "react";
import { Col, Form, Input, message, Row } from "antd";
import { Link, Navigate, useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const handleOnSubmit = (values) => {
    const userData = { ...values };

    fetch("http://localhost:8000/api/v1/user/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem("token", data.data.token);
          message.success(data.message);
          navigate("/");
        } else {
          message.error(data.message);
        }
      });
  };
  return (
    <div className="w-full h-screen mx-auto py-8 pt-[30vh]">
      <Form
        layout="vertical"
        onFinish={handleOnSubmit}
        className="ease-in duration-300 bg-gray-100  pt-6 pb-8 mb-4 w-[80%] sm:w-[60%]  shadow-sm backdrop-blur-md  lg:w-[40%] mx-auto rounded-md px-8 py-5"
      >
        <div className="text-xl text-center font-semibold text-gray-700 mb-3">
          Login
        </div>
        <Row gutter={10}>
          <Col xs={24}>
            <Form.Item
              label="email"
              name="email"
              required
              rules={[{ required: true }]}
            >
              <Input
                type="email"
                placeholder="enter your email"
                className="shadow-sm appearance-none border bg-white rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
              />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              label="password"
              name="password"
              required
              rules={[{ required: true }]}
            >
              <Input.Password
                placeholder="enter your password"
                className="shadow-sm appearance-none border bg-white rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={24}>
            <button
              className="bg-red-500 w-full hover:bg-red-700 mb-3 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
          </Col>
        </Row>
        <Link
          to="/register"
          className="text-red-500 text-center font-semibold w-full  mb-3  py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          Don't have account
        </Link>
      </Form>
    </div>
  );
};

export default Login;
