import React, {Suspense, lazy, useEffect} from "react";
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./components/Header/Header"
import Loader from "./components/Loader/Loader";
import { useStateValue } from "./StateProvider";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";

const Electronics = lazy(() => import("./components/Electronics/Electronics"))
const Jewelery = lazy(() => import("./components/Jewelery/Jewelery"))
const MensClothing = lazy(() => import("./components/MensClothing/MensClothing"))
const WomensClothing = lazy(() => import("./components/WomensClothing/WomensClothing"))
const Home = lazy(() => import("./components/Home/Home"))
const Checkout = lazy(() => import("./components/Checkout/Checkout"))
const Login = lazy(() => import("./components/Login/Login"))
const Payment = lazy(() => import("./components/Payment/Payment"))
const Orders = lazy(() => import("./components/Orders/Orders"))
const Register = lazy(() => import("./components/Register/Register"))

const stripeKey = process.env.REACT_APP_STRIPE_KEY
const promise = loadStripe(stripeKey);

function App() {

  const [{cart, user}, dispatch] = useStateValue();
  const userToken = localStorage.getItem('token');

  useEffect(() => {
      const loggedInUser = localStorage.getItem('user');
      if (loggedInUser) {
        const foundUser = JSON.parse(loggedInUser);
        dispatch({
          type: 'SET_USER',
          user: foundUser.userName
        })
      }

  }, [])

  return (
    <div className="App">
      <Router>
        <Suspense fallback={<Loader />}>
          <Header />
          <Routes>

            <Route path="/orders" element={<Orders />} />
            <Route path="/payment" element={<Elements stripe={promise}>
              <Payment />
              </Elements>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/electronics" element={<Electronics />} />
            <Route path="/jewelery" element={<Jewelery />} />
            <Route path="/men's clothing" element={<MensClothing />} />
            <Route path="/women's clothing" element={<WomensClothing />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/" element={<Home />} />

          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
