import { Col, Form, Input, Row, message } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React from 'react'
import { useUserContext } from '../context/userContext';
import axios from 'axios';

const CompleteProfile = () => {
    const { user, setUser } = useUserContext();
    const handleFinish = async (values) => {
        try {


            const res = await axios.put(
                "     https://infinity-site.onrender.com/api/v1/user/complete-profile",
                {
                    ...values,
                    userId: user.user._id,
                    bankAccount: {
                        accountNumber: values.accountNumber,
                        bankName: values.bankName,
                        iban: values.iban
                    },
                    address: {
                        street: values.street,
                        city: values.city,
                        state: values.state,
                        zipCode: values.zipCode,
                        country: values.country
                    }

                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (res.data.success) {
                message.success(res.data.message);
                location.reload();
            } else {
                message.error(res.data.message);
            }

        } catch (error) {
            console.log(error);
            message.error("Somthing Went Wrrong ");
        }
    };

    return (
        <div>
            <div className="w-full mx-auto pt-[30vh]">
                <Form
                    layout="vertical"
                    onFinish={handleFinish}
                    className="ease-in duration-300 bg-gray-100  pt-6 pb-8 mb-4 w-[80%] sm:w-[60%]  shadow-sm backdrop-blur-md  lg:w-[40%] mx-auto rounded-md px-8 py-5"
                >
                    <div className="text-xl text-center font-semibold text-gray-700 mb-3">
                        Add Products
                    </div>
                    <Row gutter={10}>
                        <Col xs={12}>
                            <Form.Item
                                label="Name"
                                name="name"

                            >
                                <Input
                                    type="text"
                                    placeholder={user?.user.name}
                                    className="shadow-sm appearance-none border bg-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={12}>
                            <Form.Item
                                label="email"
                                name="email"
                            >
                                <Input
                                    type="email"
                                    placeholder={user?.user.email}
                                    disabled
                                    className="shadow-sm appearance-none border bg-white rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={8}>
                            <Form.Item
                                label="Account Number"
                                name="accountNumber"

                            >
                                <Input
                                    type="text"
                                    placeholder={user?.user?.accountNumber ? user.user?.accountNumber : "Account Number"}
                                    className="shadow-sm appearance-none border bg-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={8}>
                            <Form.Item
                                label="Bank Name"
                                name="bankName"

                            >
                                <Input
                                    type="text"
                                    placeholder={user?.user?.bankName ? user.user?.bankName : "Bank Name"}
                                    className="shadow-sm appearance-none border bg-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={8}>
                            <Form.Item
                                label="iban"
                                name="iban"

                            >
                                <Input
                                    type="text"
                                    placeholder={user?.user?.iban ? user.user?.iban : "iban"}
                                    className="shadow-sm appearance-none border bg-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={8}>
                            <Form.Item
                                label="street"
                                name="street"

                            >
                                <Input
                                    type="street"
                                    placeholder={user?.user?.street ? user.user?.street : "street"}
                                    className="shadow-sm appearance-none border bg-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={8}>
                            <Form.Item
                                label="city"
                                name="city"

                            >
                                <Input
                                    type="text"
                                    placeholder={user?.user?.city ? user.user?.city : "city"}
                                    className="shadow-sm appearance-none border bg-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={8}>
                            <Form.Item
                                label="state"
                                name="state"

                            >
                                <Input
                                    type="text"
                                    placeholder={user?.user?.state ? user.user?.state : "state"}
                                    className="shadow-sm appearance-none border bg-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={12}>
                            <Form.Item
                                label="Zip Code"
                                name="zipCode"

                            >
                                <Input
                                    type="text"
                                    placeholder={user?.user?.zipCode ? user.user?.zipCode : "Zip Code"}
                                    className="shadow-sm appearance-none border bg-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={12}>
                            <Form.Item
                                label="country"
                                name="country"

                            >
                                <Input
                                    type="text"
                                    placeholder={user?.user?.country ? user.user?.country : " country"}
                                    className="shadow-sm appearance-none border bg-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24}>
                            <button
                                className="bg-red-500 w-full hover:bg-red-700 mb-3 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Complete profile
                            </button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    )
}

export default CompleteProfile