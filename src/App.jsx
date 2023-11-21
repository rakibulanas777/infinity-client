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
import Newsletter from "./component/Newsletter";
import Favorite from "./pages/Favorite";
import ProductPage from "./pages/ProductPage";
import { useState } from "react";
import MyBids from "./pages/user/MyBids";
import StripeCheckoutButton from "./pages/user/StripeCheckoutButton";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Revenue from "./pages/Seller/Revenue";

function App() {
  const [value, setValue] = useState('all')
  const [active, setActive] = useState(1);
  const [productDetails, setProductDetails] = useState(null);
  const stripePromise = loadStripe('pk_test_51LM2J1SIiDyURhxDNv1N4eG5FI9FdphG6ukPj3hrrSo6UWrgbl6o0nJqOwemWcbqjlKNBR8nqhl6rnfzz8VK2Sjx00y47ErW1D');
  return (
    <>
      <NavBar2 />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home setValue={setValue} value={value} active={active} setActive={setActive} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home"
          element={
            <Home setValue={setValue} value={value} active={active} setActive={setActive} />
          }
        />
        <Route
          path="/payment"
          element={
            <Elements stripe={stripePromise}>
              <StripeCheckoutButton bidId={productDetails?.winningBid} />
            </Elements>
          }
        />
        <Route
          path="/product"
          element={
            <ProductPage setValue={setValue} value={value} active={active} setActive={setActive} />
          }
        />
        <Route
          path="/favorite"
          element={
            <Favorite />
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
          path="/mybids"
          element={
            <ProtectedRoute>
              <MyBids />
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
            // <PublicRoute>
            <Elements stripe={stripePromise}>
              <ProductDetails setProductDetails={setProductDetails} productDetails={productDetails} />
            </Elements>
            // </PublicRoute>
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
        <Route
          path="/revenue/:vendorId"
          element={
            <ProtectedRoute>
              <Revenue />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Newsletter />
      <Footer />
    </>
  );
}

export default App;
