import "../../style/cart.css";
import Navbar from "../components/navbar";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import img from "../../assets/ice.png"
import Tdata from "../components/tdata";
import HOST_URI from "../components/url";


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
                    <div className="env">
                      <div className="card" key={i}>
                        <div className="dates">
                          <p className="date">
                            {item.order.date.split("T")[0]}
                          </p>
                          <p className="date">
                            {item.order.expDate.split("T")[0]}
                          </p>
                        </div>
                        <div className="row">
                          <img
                            src={item.product.prodimages[0]}
                            alt=""
                            className="img"
                          />
                          <div className="data">
                            <p className="title">{item.product.prodname}</p>
                            <p className="sub">
                              Track Id:{" "}
                              <span style={{ fontWeight: "bolder" }}>
                                {item.order.trackingid ||
                                  "Still order is in pending state"}
                              </span>
                            </p>
                            <p className="sub">
                              Amount:{" "}
                              <span style={{ fontWeight: "bolder" }}>
                                {item.order.price}
                              </span>
                            </p>
                            <p className="sub">
                              Quantity:{" "}
                              <span style={{ fontWeight: "bolder" }}>
                                {item.order.quantity}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="row o">
                          <p className="title o">Selected Address</p>
                          <p className="sub o">{item.order.pickupLoc}</p>
                          <p className="sub o">{item.order.phone}</p>
                        </div>
                      </div>
                      <div className="card">
                        <p className="cst">{item.order.status}</p>
                      </div>
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
