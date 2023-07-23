import React, { useEffect, useState } from "react";
import { useUserContext } from "../../context/userContext";
import axios from "axios";

const Myproducts = () => {
  const [myProduct, setmyProduct] = useState([]);
  const { user } = useUserContext();
  console.log(user?.user._id);
  //get user
  const getProducts = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/product",
        { userId: user?.user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        setmyProduct(res.data.data);
      } else {
        <Navigate to="/login" />;
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProducts();
  }, [myProduct]);
  console.log(myProduct);
  return <div>Myproducts</div>;
};

export default Myproducts;
