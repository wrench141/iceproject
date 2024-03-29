import "../../style/home.css";
import img from "../../assets/wine.jpg";
import subimg from "../../assets/Dusse ice bucket.jpeg";
import Navbar from "../components/navbar";
import img2 from "../../assets/ice.png"
import dry from "../../assets/dry.jpg";
import sphere from "../../assets/sphere.jpg";

export default function Home(){
    return (
      <>
        <div className="hcontainer">
          <Navbar />

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
                <button className="btn">
                  Products
                  <div className="arrow"></div>
                </button>
              </div>
            </div>
          </div>
          <div className="strip">
            <p className="scroll">
              ✦ Customized Ice cubes ✦ Top recipies ✦ Luxurious Bar-Resto
              Equipments ✦ Customized Ice cubes ✦ Top recipies ✦ Luxurious
              Bar-Resto Equipments ✦ Customized Ice cubes ✦ Top recipies ✦
              Luxurious Bar-Resto Equipments ✦ Customized Ice cubes ✦ Top
              recipies ✦ Luxurious Bar-Resto Equipments ✦
            </p>
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
                <button className="btn">
                  Our Products
                  <div className="arrow"></div>
                </button>
              </div>
            </div>
          </div>
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
                  Spherical Ice ✦{" "}
                  <span style={{ color: "var(--main-col)" }}> 1000/- </span>
                </div>
                <div className="desc">
                  The distinctive spherical shape not only looks striking in the
                  glass, but also melts slower than traditional ice cubes. This
                  means your drinks stay properly chilled for longer without
                  becoming overly diluted.
                </div>
                <button className="btn">
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
          <div className="incont cont">
            <div className="btns">
              <p className="title">Contact us</p>
            </div>
            <div className="innersec">
              <div className="wrap">
                <p className="em">Info@gmail.com ✦ 9876543211</p>
                <div className="row">
                  <div className="card">
                    <div className="title">Customer support</div>
                    <div className="sub">
                      Our support team is available around the clock to address
                      any concerns or queries.
                    </div>
                  </div>
                  <div className="card">
                    <div className="title">Feedback/Suggestions</div>
                    <div className="sub">
                      Our support team is available around the clock to address
                      any concerns or queries.
                    </div>
                  </div>
                </div>
              </div>
              <div className="wrap">
                <div className="inps">
                  <input type="text" className="inp" placeholder="Your email" />
                  <input
                    type="text"
                    className="inp"
                    placeholder="Phone Number"
                  />
                </div>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  className="inp ara"
                ></textarea>
                <button className="btn">Contact Us</button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}