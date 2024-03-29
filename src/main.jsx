import React from 'react'
import ReactDOM from 'react-dom/client'
import EmailVerification from "./pages/auth/emailVerify.jsx";
import './index.css'
import {createBrowserRouter, Router, RouterProvider} from "react-router-dom"
import CodeVerification from './pages/auth/verifyCode.jsx';
import SetPassword from './pages/auth/setpassword.jsx';
import Dashboard from './pages/admin/dashboard.jsx';
import Login from './pages/auth/login.jsx';
import Home from './pages/home/home.jsx';
import Products from './pages/home/products.jsx';
import Learn from './pages/home/learn.jsx';
import Product from './pages/home/productInfo.jsx';
import Cart from './pages/home/cart.jsx';
import Checkout from './pages/home/checkout.jsx';
import Order from './pages/home/order.jsx';
import Orders from './pages/home/orders.jsx';

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/orders",
    element: <Orders />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/order/:id",
    element: <Order />,
  },
  {
    path: "/product/:id",
    element: <Product />,
  },
  {
    path: "/learnings",
    element: <Learn />,
  },
  {
    path: "/verifyEmail",
    element: <EmailVerification />,
  },
  {
    path: "/verifyCode",
    element: <CodeVerification />,
  },
  {
    path: "/setpassword",
    element: <SetPassword />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={routes}/>
  </React.StrictMode>,
)
