import "../../style/prod.css";
import Navbar from "../components/navbar";
import ice from "../../assets/ice.png"
import DescriptionPreview from "../components/minimizeContext";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import axios from  "axios"

export default function Products(){
    const rowRef = useRef();
    const [products, setProducts] = useState([]);

    let img, title, price, id;
    const next = () => {
      const products = document.querySelectorAll(".product");
      for (let i = 0; i < products.length; i++) {
        if(i == 0){
          img = products[0].getElementsByTagName("img")[0].src;
          title = products[0].getElementsByClassName("ptitle")[0]
              .textContent;
          price = products[0].getElementsByClassName("price")[0]
              .textContent;
          id = "123";
          products[i].getElementsByTagName("img")[0].src =
            products[i+1].getElementsByTagName("img")[0].src;

          products[i].getElementsByClassName("ptitle")[0].textContent =
            products[i+1].getElementsByClassName("ptitle")[0].textContent;

          products[i].getElementsByClassName("price")[0].textContent =
            products[i+1].getElementsByClassName("price")[0].textContent;
          id = "123";
        }else if(i == products.length-1){
          products[products.length - 1].getElementsByTagName("img")[0].src =
            img;
          products[products.length - 1].getElementsByClassName(
            "ptitle"
          )[0].textContent = title;
          products[products.length - 1].getElementsByClassName(
            "price"
          )[0].textContent = price;
          id = "123";
        }else{
          products[i].getElementsByTagName("img")[0].src =
            products[i + 1].getElementsByTagName("img")[0].src;

          products[i].getElementsByClassName("ptitle")[0].textContent =
            products[i + 1].getElementsByClassName("ptitle")[0].textContent;

          products[i].getElementsByClassName("price")[0].textContent =
            products[i + 1].getElementsByClassName("price")[0].textContent;
          id = "123";
        }
      }
    };


    const prev = () => {
      const products = document.querySelectorAll(".product");
      let img, title, price, id;

      for (let i = products.length - 1; i >= 0; i--) {
        if (i == products.length - 1) {
          img = products[i].getElementsByTagName("img")[0].src;
          title = products[i].getElementsByClassName("ptitle")[0].textContent;
          price = products[i].getElementsByClassName("price")[0].textContent;
          id = "123";
        } else {
          products[i + 1].getElementsByTagName("img")[0].src =
            products[i].getElementsByTagName("img")[0].src;
          products[i + 1].getElementsByClassName("ptitle")[0].textContent =
            products[i].getElementsByClassName("ptitle")[0].textContent;
          products[i + 1].getElementsByClassName("price")[0].textContent =
            products[i].getElementsByClassName("price")[0].textContent;
          id = "123";
        }

        if (i == 0) {
          products[0].getElementsByTagName("img")[0].src = img;
          products[0].getElementsByClassName("ptitle")[0].textContent = title;
          products[0].getElementsByClassName("price")[0].textContent = price;
          id = "123";
        }
      }
    };

    useEffect(() => {
      const getProds = async() => {
        const resp = await axios.get(
          "http://localhost:4000/products/getProducts"
        );
        setProducts(resp.data.msg)
      }
      getProds()
    },[])

    return (
      <div className="prods">
        <Navbar />
        <div className="container">
          <div className="wrapper">
            <div className="products-set">
              <div className="title">Customized ✦ Ice</div>
              <div className="set" ref={rowRef}>
                {products.map((product, i) => {
                  let mid = Math.ceil(products.length / 2) - 1;
                  console.log(mid)
                  return mid == i ? (
                    <div className="product sel">
                      <img src={product.prodimages[0]} alt="" className="img" />
                      <div className="rw">
                        <p className="ptitle">{product.prodname}</p>
                        <p className="ptitle price">₹{product.price}</p>
                      </div>
                      <a
                        style={{
                          width: "50%",
                          height: "max-content",
                          textDecoration: "none",
                        }}
                        href={"/product/" + product._id}
                      >
                        <button className="pbtn">View More</button>
                      </a>
                    </div>
                  ) : (
                    <div className="product sm">
                      <img src={product.prodimages[0]} alt="" className="img" />
                      <div className="rw">
                        <p className="ptitle">{product.prodname}</p>
                        <p className="ptitle price">₹{product.price}</p>
                      </div>
                      <a
                        style={{
                          width: "50%",
                          height: "max-content",
                          textDecoration: "none",
                        }}
                        href={"/product/" + product._id}
                      >
                        <button className="pbtn">View More</button>
                      </a>
                    </div>
                  );
                })}
              </div>
              <button onClick={() => prev()} id="prev">
                <div className="arrow rev" />
              </button>
              <button id="nxt" onClick={() => next()}>
                <div className="arrow" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}