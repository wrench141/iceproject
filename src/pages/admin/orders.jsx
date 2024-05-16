import React, { useState } from "react";
import axios from "axios";
import { useRef } from "react";
import { useEffect } from "react";
import HOST_URI from "../components/url";

const Orders = () => {
  const formRef = useRef();
  const secRef = useRef();
  const [products, setProducts] = useState([]);
  const [state, setState] = useState("create");
  const [prodId, setprodId] = useState();
  const [show, setShow] = useState(false);

  const [order, setOrder] = useState({})

  const showMsg = (msg) => {
    const mesg = document.createElement("p");
    mesg.classList.add("msg");
    mesg.textContent = msg;
    secRef.current.appendChild(mesg);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      status: formRef.current['status'].value
    };
    console.log(data);
    try {
      const resp = await axios.patch(
        HOST_URI + "/orders/updateOrder/" + order.order._id,
        data,
        {
          headers: {
            token: window.localStorage.getItem("token"),
          },
        }
      );
      showMsg(resp.data.msg);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const getProds = async () => {
      const resp = await axios.get(HOST_URI + "/orders/getAllOrders", {
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });
      setProducts(resp.data.msg);
      console.log(resp.data.msg);
    };
    getProds();
  }, []);

  const formFiller = (i, id) => {
    setprodId(id);
    const row = document.getElementById(i);
    const dataElems = row.getElementsByClassName("prd");
    formRef.current["prodname"].value = dataElems[0].textContent;
    formRef.current["description"].value = dataElems[1].textContent;
    formRef.current["category"].value = dataElems[2].textContent;
    formRef.current["keywords"].value = dataElems[3].textContent;
    formRef.current["price"].value = dataElems[4].textContent;
    formRef.current["stock"].value = dataElems[5].textContent;
    formRef.current["discount"].value = dataElems[6].textContent;
  };

  const updateHandler = async () => {
    const data = {
      prodname: formRef.current["prodname"].value,
      description: formRef.current["description"].value,
      category: formRef.current["category"].value,
      keywords: formRef.current["keywords"].value,
      price: formRef.current["price"].value,
      stock: formRef.current["stock"].value,
      discount: formRef.current["discount"].value,
    };
    try {
      const resp = await axios.patch(
        HOST_URI + `/products/updateProduct/${prodId}`,
        data,
        {
          headers: {
            token: window.localStorage.getItem("token"),
          },
        }
      );
      showMsg(resp.data.msg);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteHandler = async (id) => {
    try {
      const resp = await axios.delete(
        HOST_URI + `/products/deleteProduct/${id}`,
        {
          headers: {
            token: window.localStorage.getItem("token"),
          },
        }
      );
      showMsg(resp.data.msg);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const getProdDetails = async (id, i) => {
    const resp = await axios.get(HOST_URI + "/orders/getOrderDetails/" + id, {
      headers: {
        token: window.localStorage.getItem("token"),
      },
    });
    console.log(resp.data.data)
    resp.data.data.order.trId = i;
    // const data = resp.data.data;
    setOrder(resp.data.data)
    setShow(true);
  };

  console.log(products);

  return (
    <div className="sideSection" ref={secRef}>
      <div className="topbar">
        <div className="title">Dashboard</div>
        <button className="btn">
          <ion-icon name="notifications-outline"></ion-icon>
        </button>
      </div>
      <div
        className="sections"
        style={
          show
            ? {
                width: "100%",
                height: "max-content",
                gridTemplateColumns: "70% 30%",
              }
            : { gridTemplateColumns: "100%" }
        }
      >
        <div
          className="sec1"
          style={{ overflowX: "scroll", height: "max-content" }}
        >
          <div className="title">Your Orders</div>
          <table className="tab">
            <tr className="tr">
              <th className="head">Product Id</th>
              <th className="head">Phone</th>
              <th className="head">Address</th>
              <th className="head">Booking Date</th>
              <th className="head">Expiration</th>
              <th className="head">Price</th>
              <th className="head">Quantity</th>
              <th className="head">Delivery Charges</th>
              <th className="head">Status</th>
              <th className="head">Action</th>
            </tr>
            {products.length > 0
              ? products.map((product, i) => (
                  <tr className="tr" id={i} key={i}>
                    <td className="bdy prd">PID-{Math.round(3000 + i)}</td>
                    <td className="bdy prd">{product.phone}</td>
                    <td className="bdy prd">{product.pickupLoc}</td>
                    <td className="bdy prd">
                      {product.date
                        .split("T")[0]
                        .split("-")
                        .reverse()
                        .join("-")}
                    </td>
                    <td className="bdy prd">
                      {product.expDate
                        .split("T")[0]
                        .split("-")
                        .reverse()
                        .join("-")}
                    </td>
                    <td className="bdy prd">{product.price}/-</td>
                    <td className="bdy prd">{product.quantity}kgs</td>
                    <td className="bdy prd">{product.deliveryCharges}</td>
                    <td className="bdy prd">{product.status}</td>
                    <td className="bdy">
                      <div className="btnsWrap">
                        <button
                          className="upd"
                          onClick={() => {
                            getProdDetails(product._id, i);
                          }}
                        >
                          Change Status
                        </button>
                        <button
                          className="upd del"
                          onClick={() => {
                            deleteHandler(product._id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              : null}
          </table>
        </div>
        {show && order != undefined ? (
          <div className="new">
            <div
              className="title"
              style={{ display: "flex", alignItems: "center", gap: "5px" }}
              onClick={() => setShow(false)}
            >
              <ion-icon name="arrow-back-outline"></ion-icon>
              Change Order Details
            </div>
            <form ref={formRef} className="form">
              <div className="wrap">
                <label htmlFor="" className="lab">
                  Product Name
                </label>
                <input
                  type="text"
                  name="prodname"
                  value={order.product.prodname}
                  className="inp"
                  disabled
                />
              </div>
              <div className="wrap">
                <label htmlFor="" className="lab">
                  Order Id
                </label>
                <input
                  type="text"
                  name="prodname"
                  value={"PID-" + Math.floor(3000 + parseInt(order.order.trId))}
                  className="inp"
                  disabled
                />
              </div>
              <div className="wrap">
                <label htmlFor="" className="lab">
                  Change Status
                </label>
                <select name="status" className="inp">
                  <option value="pending" className="opt">
                    Pending
                  </option>
                  <option value="accepted" className="opt">
                    Accepted
                  </option>
                  <option value="rejected" className="opt">
                    Rejected
                  </option>
                  <option value="shipped" className="opt">
                    Packed
                  </option>
                  <option value="delivered" className="opt">
                    Delivered
                  </option>
                </select>
              </div>

              {state == "create" ? (
                <button type="button" onClick={handleSubmit} className="sbtn">
                  Change Status
                </button>
              ) : (
                <button type="button" className="sbtn">
                  Update Product
                </button>
              )}
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Orders;
