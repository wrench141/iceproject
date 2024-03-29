import '../../style/verifyEmail.css';
import axios from "axios"
import { useRef, useState } from 'react';

function BussinessAccount() {
  
  const [name, setName] = useState();
  const [desc, setDesc] = useState();
  const [keys, setKeys] = useState();
  const contRef = useRef()

  const submitHandler = (e) => {
    e.preventDefault()
    axios
      .post("http://localhost:4000/shop/createshop", {
        shopname: name, desc: desc, keywords: keys
      }, {
        headers: {
          token: window.localStorage.getItem("token")
        }
      })
      .then((res) => {
        const msg = document.createElement("div");
        msg.classList.add("msg");
        msg.textContent = res.data.msg;
        contRef.current.appendChild(msg);
        setTimeout(() => {
          contRef.current.removeChild(msg)
        }, 1000);
        if (res.status == 200) {
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        }else{
          console.log(res.data.msg)
        }
      })
      .catch((e) => {
        const msg = document.createElement("div");
        msg.classList.add("msg");
        msg.textContent = e.response.data.msg;
        contRef.current.appendChild(msg);
        setTimeout(() => {
          contRef.current.removeChild(msg);
        }, 2000);
      });
  }

  return (
    <div className="container" ref={contRef}>
      <div className="wrap">
        <form onSubmit={(e) => submitHandler(e)} className="midcont">
          <h2>Create Bussiness Account</h2>
          <p className="nm">
            Hi{" "}
            <span style={{ color: "#b241ff" }}>
              {" "}
              @{window.localStorage.getItem("mail") || "User"}!
            </span>{" "}
            <br /> Last and final step before selling your products online.
          </p>
          <input
            type="text"
            className="inp"
            placeholder="Company Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            type="text"
            className="inp"
            style={{
              fontSize: "13px",
              padding: "15px",
              height: "100px",
            }}
            placeholder="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <input
            type="text"
            className="inp"
            placeholder="Relatable Words (furniture, food)"
            value={keys}
            onChange={(e) => setKeys(e.target.value)}
          />
          <p className="srt" style={{ color: "#8f8f8f" }}>
            Enter any 5 keywords related to your Bussiness or company. separate
            them by comas.
          </p>
          <button className="btn">Create Account</button>
        </form>
        <div className="nv bg">
          <p className="sml">@LiveCommerce</p>
          <p className="sml">©2023 All copyrights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default BussinessAccount
