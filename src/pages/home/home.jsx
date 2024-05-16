import "../../style/home.css";
import img from "../../assets/wine.jpg";
import subimg from "../../assets/Dusse ice bucket.jpeg";
import Navbar from "../components/navbar";
import img2 from "../../assets/ice.png"
import dry from "../../assets/dry.jpg";
import sphere from "../../assets/bullet.jpg";
import { useState } from "react";
import axios from "axios";
import HOST_URI from "../components/url";

// google.com, pub-6479435131928727, DIRECT, f08c47fec0942fa0

export default function Home(){

    const [data, setData] = useState({ email: "", phone: "", desc: "" });
    const submitHandler = async() => {
      const resp = await axios.post(HOST_URI + `/contact/saveInfo`, {
       email: data.email,
       phone: data.phone, 
       desc: data.desc 
      });
      document.getElementById("msg").textContent = resp.data.msg;
      document.getElementById("msg").style.display = "flex"
    };

    const handleChange = (e) => {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
    };
    return (
      <>
        <div className="hcontainer">
          <Navbar />
          <div className="msg" id="msg"></div>
          <div className="incont">
            <div className="sec">
              <div className="heroSec">
                <div className="title">
                  Elevate your beverage experience with Artisanal Ice
                </div>
                <p className="sub">
                  Explore our range of bar and restaurant products to find
                  everything you need for a top-notch beverage service.
                </p>
              </div>
            </div>
            <div className="midVid">
              <img src={img} alt="" className="midimg" />
            </div>
            <div className="sec">
              <div className="mid">
                <img src={subimg} alt="" className="img" />
                <div className="subtitle">
                  Welcome to Ice Aesthetics, the premier destination for bar and
                  restaurant essentials. Crafted from pure, filtered water, our
                  ice cubes ensure a slow melt and minimal dilution.
                </div>
                <button
                  onClick={() => (window.location.href = "/products")}
                  className="btn"
                >
                  Products
                  <div className="arrow"></div>
                </button>
              </div>
            </div>
          </div>
          {/* <div className="strip">
            <p className="scroll">
              ✦ Customized Ice cubes ✦ Top recipies ✦ Luxurious Bar-Resto
              Equipments ✦ Customized Ice cubes ✦ Top recipies ✦ Luxurious
              Bar-Resto Equipments ✦ Customized Ice cubes ✦ Top recipies ✦
              Luxurious Bar-Resto Equipments ✦ Customized Ice cubes ✦ Top
              recipies ✦ Luxurious Bar-Resto Equipments ✦
            </p>
          </div> */}
          <div className="incont prods">
            <div className="btns">
              <button className="btn">
                <div className="arrow"></div>
              </button>
              <button className="btn">
                <div className="arrow rev"></div>
              </button>
              <p className="title">Products</p>
            </div>
            <div className="prodSec">
              <div className="primWrap">
                <div className="mtit">
                  Bullet Ice ✦{" "}
                  <span style={{ color: "var(--main-col)" }}> 40/- </span>
                </div>
                <div className="desc">
                  Witness nature's rare frozen spectacle - bullet ice for just
                  ₹40/kg! These elongated icy spindles, formed in extreme cold
                  and wind, lend a mesmerizing touch. Transparent, opaque or
                  milky, bullet ice elevates any display at an unbeatable price.
                  Grab this exclusive marvel before stocks run out!
                </div>
                <button
                  className="btn"
                  onClick={() => (window.location.href = "/products")}
                >
                  View More
                  <div className="arrow"></div>
                </button>
              </div>
              <div className="secScroller">
                <div className="scroller">
                  <div className="selImg">
                    <img src={sphere} alt="" className="img" />
                  </div>
                  <div className="other">
                    <img src={dry} alt="" className="img" />
                  </div>
                  <div className="other">
                    <img src={img2} alt="" className="img" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="incont prods">
            <div className="btns">
              <p className="title">Promotions</p>
            </div>
            <div className="prodSec">
              <div className="primWrap">
                <img src={img2} alt="" className="ads" />
              </div>
            </div>
          </div>
          <div className="incont sec">
            <div className="midwrap">
              <img src={subimg} className="img" />
              <div className="txt">
                <div className="title">
                  Discover Frosty Creations, your one-stop shop for bar and
                  restaurant supplies.
                </div>
                <p className="subtxt">
                  We offer an exquisite selection of bespoke ice cubes, tailored
                  to suit the unique preferences of our discerning clientele.
                  Each monthly subscription is a gateway to a world of elegance,
                  featuring not only artisanal ice but also a curated collection
                  of premium bar and restaurant equipment, sourced from the
                  finest international purveyors. Experience the pinnacle of
                  luxury with our unparalleled offerings.
                </p>
                <div className="triGrid">
                  <div className="col">
                    <p className="cnt">0+</p>
                    <p className="desc">Orders</p>
                  </div>
                  <div className="col">
                    <p className="cnt">0+</p>
                    <p className="desc">Active Users</p>
                  </div>
                  <div className="col">
                    <p className="cnt">0+</p>
                    <p className="desc">Kitchen Tieups</p>
                  </div>
                  <div className="col">
                    <p className="cnt">0+</p>
                    <p className="desc">Restaurent Tieups</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="incont footer cont">
            <div className="btns">
              <p className="title">Liquido</p>
              <p className="sub">Precision-Carved Ice for Exquisite Sips</p>
            </div>
            <div className="innersec">
              <div className="wrap">
                <div className="row">
                  <div className="card">
                    <div className="title">Pages</div>
                    <a className="sub">Home</a>
                    <a className="sub">Products</a>
                    <a className="sub">Recipies</a>
                    <a className="sub">Orders</a>
                  </div>
                  <div className="card">
                    <div className="title">Need Help?</div>
                    <a className="sub">Contact Us</a>
                    <a className="sub">Testimonials</a>
                  </div>
                  <div className="card">
                    <div className="title">Company</div>
                    <a className="sub">About Us</a>
                    <a className="sub">Coverage</a>
                  </div>
                  <div className="card">
                    <div className="title">Social Media</div>
                    <a className="sub">
                      <div className="tg">
                        <ion-icon name="logo-whatsapp"></ion-icon>
                      </div>
                      <div className="tg">
                        <ion-icon name="logo-facebook"></ion-icon>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div className="wrap">
                <div className="inps">
                  <input
                    type="text"
                    className="inp"
                    value={data.email}
                    onChange={handleChange}
                    placeholder="Your email"
                    name="email"
                  />
                  <input
                    type="text"
                    className="inp"
                    placeholder="Phone Number"
                    value={data.phone}
                    onChange={handleChange}
                    name="phone"
                  />
                </div>
                <textarea
                  name="desc"
                  id=""
                  cols="30"
                  rows="10"
                  className="inp ara"
                  value={data.desc}
                  onChange={handleChange}
                ></textarea>
                <button className="btn" onClick={() => submitHandler()}>
                  Contact Us
                </button>
              </div>
            </div>
          </div>
          {/* <div className="incont footer">
            <div className="btns">
              <p className="title">Liquido</p>
              <p className="sub">Precision-Carved Ice for Exquisite Sips</p>
            </div>
            <div className="innersec">
              <div className="wrap"></div>
            </div>
          </div> */}
        </div>
      </>
    );
}