import { useEffect, useState } from "react";
import "../../style/order.css";
import Navbar from "../components/navbar";
import img from "../../assets/wine.jpg";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useRef } from "react";
import HOST_URI from "../components/url";


export default function Order(){
    const [ci, setCi] = useState(false);
    const [sA, setSa] = useState(false);
    const cont = useRef()

    const id = useParams().id;

    const[info, setContact] = useState({
        contact: "",
        email: ""
    });

    const[addre, setAddr] = useState({
        addr:"",
        pincode: "",
        city: ""
    }) 

    const [product, setProduct] = useState();
    useEffect(() => {
        const getProduct = async () => {
            const resp = await axios.get(
              HOST_URI + `/products/getProduct/${id}`
            );
            setProduct(resp.data.msg);
            console.log(resp.data.msg)
        };
        getProduct();
    }, []);

    console.log(window.localStorage.getItem("quantity"));
    
    const order = async() => {
        const resp = await axios.post(
          HOST_URI + `/orders/createOrder/${product._id}`,
          {
            loc: addre.addr + "," + addre.pincode + "," + addre.city,
            phone: info.contact,
            quantity: window.localStorage.getItem("quantity") || 1,
          },
          {
            headers: {
              token: window.localStorage.getItem("token"),
            },
          }
        );
        const msgCont = document.getElementById("hmsg");
        msgCont.style.display = "flex";
        msgCont.getElementsByClassName("txt")[0].textContent = resp.data.msg
    }


    return (
      <div className="prods">
        <Navbar />
        <div className="container" ref={cont}>
          <div className="inwrap">
            <div className="hmsg" id="hmsg">
              <ion-icon name="checkmark-circle"></ion-icon>
              <p className="txt" style={{ fontSize: "30px" }} id="txt"></p>
              <button
                onClick={() => (window.location.href = "/orders")}
                className="mbtn"
              >
                Go to Orders
              </button>
            </div>
            <div className="options">
              <p className="title">Checkout</p>
              <div
                className="collapsableCont"
                style={
                  ci
                    ? { animation: "open 0.3s ease forwards" }
                    : { animation: "close 0.3s ease forwards" }
                }
              >
                <div
                  className="row"
                  onClick={() => {
                    setCi(!ci);
                  }}
                >
                  <p className="title">Contact Information</p>
                  <ion-icon name="chevron-down-outline"></ion-icon>
                </div>
                <div className="row con">
                  <div className="wrap">
                    <label htmlFor="">Contact Number</label>
                    <input
                      type="phone"
                      className="inp"
                      value={info.contact}
                      onChange={(e) => {
                        setContact((info) => ({
                          ...info,
                          contact: e.target.value,
                        }));
                      }}
                      placeholder="9876543216"
                    />
                  </div>
                  <div className="wrap">
                    <label htmlFor="">Email</label>
                    <input
                      type="email"
                      className="inp"
                      value={info.email}
                      onChange={(e) => {
                        setContact((info) => ({
                          ...info,
                          email: e.target.value,
                        }));
                      }}
                      placeholder="Your Email id"
                    />
                  </div>
                </div>
              </div>
              <div
                className="collapsableCont"
                style={
                  sA
                    ? { animation: "open 0.3s ease forwards" }
                    : { animation: "close 0.3s ease forwards" }
                }
              >
                <div
                  className="row"
                  onClick={() => {
                    setSa(!sA);
                  }}
                >
                  <p className="title">Shipping Address</p>
                  <ion-icon name="chevron-down-outline"></ion-icon>
                </div>
                <div className="row con">
                  <div className="wrap" style={{ width: "100%" }}>
                    <label htmlFor="">Complete Address</label>
                    <textarea
                      type="text"
                      className="inp"
                      value={addre.addr}
                      onChange={(e) => {
                        setAddr((info) => ({
                          ...info,
                          addr: e.target.value,
                        }));
                      }}
                      style={{
                        width: "100%",
                        height: "100px",
                        fontFamily: "Montserrat",
                        padding: "15px",
                        fontSize: "13px",
                      }}
                      placeholder=""
                    />
                  </div>
                </div>
                <div className="row con">
                  <div className="wrap">
                    <label htmlFor="">Pincode</label>
                    <input
                      type="text"
                      value={addre.pincode}
                      onChange={(e) => {
                        setAddr((info) => ({
                          ...info,
                          pincode: e.target.value,
                        }));
                      }}
                      className="inp"
                      placeholder=""
                    />
                  </div>
                  <div className="wrap">
                    <label htmlFor="">City</label>
                    <input
                      type="text"
                      value={addre.city}
                      onChange={(e) => {
                        setAddr((info) => ({
                          ...info,
                          city: e.target.value,
                        }));
                      }}
                      className="inp"
                      placeholder=""
                    />
                  </div>
                </div>
              </div>
            </div>
            {product != undefined ? (
              <div className="sum">
                <p className="title">Order Summary</p>
                <div className="pwrap">
                  <img src={product.prodimages[0]} alt="" className="img" />
                  <div className="dat">
                    <div className="txt">
                      <p className="title">{product.prodname}</p>
                      <p className="sub">
                        <span>Quantity: </span>
                        <span>
                          {window.localStorage.getItem("quantity") || 1}
                        </span>
                      </p>
                      <p className="sub">
                        <span>Category: </span>
                        <span>{product.category}</span>
                      </p>
                    </div>
                    <p className="txt">₹ {product.price}</p>
                  </div>
                </div>
                <div className="subtlt">
                  <div className="row">
                    <p className="sub">SubTotal</p>
                    <p className="sub">₹ {parseInt(product.price) * parseInt(window.localStorage.getItem("quantity") || 1)}</p>
                  </div>
                  <div className="row">
                    <p className="sub">Delivery Charges</p>
                    <p className="sub">₹ 200</p>
                  </div>
                  <div className="row">
                    <p className="sub">Discount</p>
                    <p className="sub">₹{parseInt(product.discount)}</p>
                  </div>
                </div>
                <div className="subtlt">
                  <div className="row">
                    <p
                      className="sub"
                      style={{ fontWeight: "bolder", fontSize: "14px" }}
                    >
                      Estimated Total
                    </p>
                    <p
                      className="sub"
                      style={{ fontWeight: "bolder", fontSize: "14px" }}
                    >
                      ₹{parseInt(product.discount) > 0 ? (((parseInt(product.price) * (parseInt(window.localStorage.getItem("quantity") || 1))) + 200) * product.discount)/100 : (parseInt(product.price) * (parseInt(window.localStorage.getItem("quantity") || 1))) + 200}
                    </p>
                  </div>
                </div>
                <div className="subtlt">
                  <button className="snd" onClick={() => order()}>
                    Order
                    <div className="arrow"></div>
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
}