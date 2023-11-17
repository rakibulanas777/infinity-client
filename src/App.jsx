import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./component/ProtectedRoute";
import Home from "./pages/Home";
import PublicRoute from "./component/PublicRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./component/Navbar";
import Addproducts from "./pages/Seller/Addproducts";
import Myproducts from "./pages/Seller/Myproducts";
import Footer from "./component/Footer";
import Editproducts from "./pages/Seller/Editproducts";
import ProductDetails from "./pages/ProductDetails";
import AllBids from "./pages/Seller/AllBids";
import CompleteProfile from "./pages/CompleteProfile";
import Notification from "./pages/Seller/Notification";
import NavBar2 from "./component/NavBar2";
import './App.css'

function App() {
  return (
    <>
      <NavBar2 />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/addproducts"
          element={
            <ProtectedRoute>
              <Addproducts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notification"
          element={
            <ProtectedRoute>
              <Notification />
            </ProtectedRoute>
          }
        />
        <Route
          path="/complete-profile"
          element={
            <ProtectedRoute>
              <CompleteProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editproduct"
          element={
            <ProtectedRoute>
              <Editproducts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/allbids/:productId"
          element={
            <ProtectedRoute>
              <AllBids />
            </ProtectedRoute>
          }
        />
        <Route
          path="/:id"
          element={
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/myproducts/:vendorId"
          element={
            <ProtectedRoute>
              <Myproducts />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
