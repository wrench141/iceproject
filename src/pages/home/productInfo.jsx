import "../../style/prod.css";
import Navbar from "../components/navbar";
import ice from "../../assets/ice.png"
import DescriptionPreview from "../components/minimizeContext";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import axios from  "axios"
import { useParams } from "react-router-dom";
import HOST_URI from "../components/url";


export default function Product(){
    const id = useParams().id;
    const token = window.localStorage.getItem("token");
    if(!token){
      window.location.href = "/verifyEmail"
    }
    const [product, setProduct] = useState();
    const [quantity, setQuantity] = useState(1);
    const [selectedImg, setSelectedImg] = useState();
    const [btxt, setBtxt] = useState("Add to Cart")
    useEffect(() => {
      const getProduct = async() => {
        const resp = await axios.get(
          HOST_URI + `/products/getProduct/${id}`
        );
        setProduct(resp.data.msg)
        setSelectedImg(resp.data.msg.prodimages[0])
      }
      getProduct()
    }, [])

    const addtocart = async(id) => {
      const resp = await axios.post(
        HOST_URI + `/cart/addToCart/${id}`,
        {
          quantity,
        },
        {
          headers: {
            token: window.localStorage.getItem("token"),
          },
        }
      );
      setBtxt(resp.data.msg + "!!");
      setTimeout(() => {
        setBtxt("Add to Cart")
      }, 3000);
    }

    const order = async(id) => {
    }

    return (
      <div className="prods">
        <Navbar />
        <div className="container">
          <div className="wrapper">
            <div className="products-set">
              <div
                className="title prods"
                onClick={() => {
                  history.back();
                }}
              >
                <button className={"btn"} style={{ width: "40px" }}>
                  <div className="arrow rev" />
                </button>
                Product Details
              </div>
              {product != null ? (
                <div className="prodct">
                  <div className="imgsArr" style={{flexDirection: "row"}}>
                    {product.prodimages.map((img) => (
                      <img
                        src={img}
                        alt=""
                        onClick={() => setSelectedImg(img)}
                        className="img"
                      />
                    ))}
                  </div>
                  <img src={selectedImg} alt="" className="img" />
                  <div
                    className="pdata"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div>
                      <div className="title" style={{ margin: 0, textTransform: "uppercase", fontWeight: 600 }}>
                        {product.prodname}
                      </div>
                      <div className="wrap">
                        <div className="tag">
                          {product.stock > 0 ? "In Stock" : "Out of Stock"}
                        </div>
                        <div className="tag ot">{product.category}</div>
                      </div>
                      <p className="sub">{product.description}</p>
                      <div className="wrap">
                        {product.keywords.split(",").map((key) => (
                          <div className="tag pt">
                            <ion-icon name="snow"></ion-icon>
                            {key}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div
                      className="wrap wdt">
                      <div className="col">
                        <label htmlFor="" className="lab">
                          Price
                        </label>
                        <p className="price">{product.price}</p>
                      </div>
                      <div className="col">
                        <label htmlFor="" className="lab">
                          Quantity
                        </label>
                        <div className="quan">
                          <button
                            className="qbtn"
                            onClick={() => {
                              if (quantity <= 1) {
                                setQuantity(1);
                              } else {
                                setQuantity(quantity - 1);
                              }
                            }}
                          >
                            <ion-icon name="remove"></ion-icon>
                          </button>
                          <p className="cnt">{quantity}</p>
                          <button
                            className="qbtn"
                            onClick={() => {
                              setQuantity(quantity + 1);
                            }}
                          >
                            <ion-icon name="add"></ion-icon>
                          </button>
                        </div>
                      </div>
                      <div className="col">
                        <label
                          htmlFor=""
                          style={{ color: "transparent" }}
                          className="lab n"
                        >
                          Add to cart
                        </label>
                        <button
                          onClick={() => addtocart(product._id)}
                          className="pbtn bdr"
                        >
                          {btxt}
                        </button>
                      </div>
                      <div className="col">
                        <label
                          htmlFor=""
                          style={{ color: "transparent" }}
                          className="lab n"
                        >
                          Add to cart
                        </label>
                        <a href={"/order/"+product._id}>
                          <button className="pbtn">Order Now</button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
}