import "../../style/cart.css";
import Navbar from "../components/navbar";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import img from "../../assets/ice.png"
import Tdata from "../components/tdata";
import HOST_URI from "../components/url";
import OrderCard from "../components/orderCard";


export default function Orders() {
  const [items, setItems] = useState();

  useEffect(() => {
    const getCartItems = async() => {
      const resp = await axios.get(HOST_URI + `/orders/getOrders`, {
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });
      setItems(resp.data.msg);
      console.log(resp.data.msg);
    }
    getCartItems();
  }, [])

  return (
    <div className="prods">
      <Navbar />
      <div
        className="container"
        style={{ height: "100vh", padding: 0, paddingTop: "70px" }}
      >
        <div className="cart-sections">
          <div className="list">
            <p className="ctitle">Your Orders</p>
            <div className="cards">
              {items != null
                ? items.map((item, i) => (
                  <OrderCard item={item} />
                ))
                : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
