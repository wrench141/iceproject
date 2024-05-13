import { useState } from "react";
import "../../style/learn.css";
import Navbar from "../components/navbar";
import Step1 from "../components/step1";
import Step2 from "../components/step2";


export default function Learn(){
  const [count, setCount] = useState(0);
  function next() {
    setCount(count + 1);
  }
  function back() {
    setCount(count - 1);
  }
  return (
    <>
      <Navbar />
      <div className="learn-sec">
        <div className="inwraps">
          <p className="title" style={{fontWeight: 500}}>Cocktail & Mocktail Mix</p>
          <p className="sub" style={{
            fontFamily: "Public Sans",
            fontSize: "15px"
          }}>Custom Cocktails & Mocktails at Your Fingertips</p>
          <div className="search">
            <input
              type="text"
              className="inp"
              placeholder="Search recipies..."
            />
          </div>
          <div className="row">
            <div className="tag">Virgin Mary</div>
            <div className="tag">Blueberry Ginger Cooler</div>
            <div className="tag">Citrus Smash</div>
            <div className="tag">Pomegranate Spritzer</div>
          </div>
          {count == 0 ? <Step1 next={next} /> : <Step2 back={back} />}
        </div>
      </div>
    </>
  );
}