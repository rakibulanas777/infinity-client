import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../context/userContext";

export default function ProtectedRoute({ children }) {
  const { user, setUser } = useUserContext();
  console.log(user)
  //get user
  const getUser = async () => {
    try {
      const res = await axios.post(
        "    https://infinity-site.onrender.com/api/v1/user/getUserData",
        { token: localStorage.getItem("token") },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        setUser(res.data.data);
      } else {
        <Navigate to="/home" />;
        localStorage.clear();
      }
    } catch (error) {
      // localStorage.clear();
      console.log(error);
    }
  };
  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user]);
  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to="/home" />;
  }
}
