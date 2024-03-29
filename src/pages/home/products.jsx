import "../../style/prod.css";
import Navbar from "../components/navbar";
import ice from "../../assets/ice.png"
import DescriptionPreview from "../components/minimizeContext";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import axios from  "axios";
import HOST_URI from "../components/url"
import banner from "../../assets/banner.jpg";


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
          HOST_URI + `/products/getProducts`
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
              <div className="title">
                Discover Glacial Perfection's Finest Crystalline Clarity
                Revealed
              </div>
              <div className="imgsec">
                <div className="section1">
                  <img src={banner} alt="" className="banner" />
                  <p className="sub">
                    We have multi-shaped ice cubes being provided as monthly
                    subcriptions all over india.
                  </p>
                </div>
                <div className="set" ref={rowRef}>
                  {products.map((product, i) => (
                    <a className="a" style={{textDecoration: "none", color: "white"}} href={"/product/" + product._id}>
                      <div className="product sel" key={i}>
                        <img
                          src={product.prodimages[0]}
                          alt=""
                          className="img"
                        />
                        <div className="rw">
                          <p className="ptitle">{product.prodname}</p>
                          <p className="ptitle price">₹{product.price}</p>
                        </div>
                        <button className="pbtn">View More</button>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}