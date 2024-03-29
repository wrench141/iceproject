import "../../style/cart.css";
import Navbar from "../components/navbar";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import img from "../../assets/ice.png"
import Tdata from "../components/tdata";
import HOST_URI from "../components/url";


export default function Cart() {
  const [items, setItems] = useState();

  useEffect(() => {
    const getCartItems = async() => {
      const resp = await axios.get(HOST_URI + `/cart/getCartItems`, {
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });
      setItems(resp.data.msg);
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
            <p className="ctitle">Cart Items</p>
            <table className="litem">
              <tr className="tr">
                <th className="head">Product Name</th>
                <th className="head">Type</th>
                <th className="head">Quantity</th>
                <th className="head">Discount</th>
                <th className="head">Price</th>
                <th className="head" style={{ background: "transparent" }}></th>
              </tr>
              {items != undefined
                ? items.map((item, i) => <Tdata item={item} i={i} />)
                : null}
            </table>
          </div>
          <div className="sec2">
            {items != undefined ? (
              <div className="summ">
                <p className="ctitle">Order Summary</p>
                <div className="ordSum">
                  <div className="rw">
                    <p className="cat-title">Total Items</p>
                    <p className="cat">{items.length}</p>
                  </div>
                  <div className="rw">
                    <p className="cat-title">Delivery Charges</p>
                    <p className="cat">200</p>
                  </div>
                  <div className="rw">
                    <p className="cat-title">Cart Total</p>
                    <p className="cat">{
                      (() => {
                        const prc = document.querySelectorAll(".prc");
                        let p = 0;
                        prc.forEach(pr => {
                          p = parseInt(p) + parseInt(pr.textContent);
                        });
                        return (p)
                      })()
                    }</p>
                  </div>
                </div>
                <div className="ordSum" style={{ marginTop: "20px" }}>
                  <div className="rw bld">
                    <p className="cat-title bld">Total Amount</p>
                    <p className="cat bld">23443</p>
                  </div>
                </div>
              </div>
            ) : null}
            <button className="sbt">
              CHECKOUT
              <div className="arrow"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
