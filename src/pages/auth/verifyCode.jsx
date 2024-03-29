import '../../style/verifyEmail.css';
import axios from "axios"
import { useRef, useState } from 'react';
import Navbar from '../components/navbar';
import HOST_URI from "../components/url";


function CodeVerification() {
  
  
  const msg = useRef();
  const [code, setCodes] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCodes({ ...code, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    var result = "";

    for (const key in code) {
      if (code.hasOwnProperty(key)) {
        let word = "";
        for (let i = 0; i < code[key].length; i++) {
          word += code[key][i];
          if (word.match(/(\s|$)/)) {
            result += word;
            word = "";
          }
        }
      }
    }
    axios
      .post(HOST_URI + "/auth/verifycode", {
        email: window.localStorage.getItem("mail"),
        code: result,
      })
      .then((res) => {
        msg.current.textContent = res.data.msg;
        if (res.status == 200) {
          if (res.data.status === "register") {
            window.location.href = "/setpassword";
          } else {
            window.location.href = "/login";
          }
        }
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="frm c">
          <div className="wrap c">
            <form onSubmit={(e) => submitHandler(e)} className="midcont">
              <h2>VERIFY CODE</h2>
              <p className="nm">
                We have sent a verification code to your mail{" "}
                <span style={{ color: "#bfcfff" }}>
                  {window.localStorage.getItem("mail").split("@")[0]}!
                </span>
              </p>
              <div className="codeWrap">
                <input
                  className="inp bx"
                  name="i1"
                  maxLength={1}
                  value={code.i1 || ""}
                  onChange={handleInputChange}
                />
                <input
                  className="inp bx"
                  name="i2"
                  value={code.i2 || ""}
                  onChange={handleInputChange}
                  maxLength={1}
                />
                <input
                  className="inp bx"
                  name="i3"
                  value={code.i3 || ""}
                  onChange={handleInputChange}
                  maxLength={1}
                />
                <input
                  className="inp bx"
                  name="i4"
                  value={code.i4 || ""}
                  onChange={handleInputChange}
                  maxLength={1}
                />
                <input
                  className="inp bx"
                  name="i5"
                  value={code.i5 || ""}
                  onChange={handleInputChange}
                  maxLength={1}
                />
              </div>
              <p
                className="nm"
                style={{
                  marginBottom: 0,
                  marginTop: "10px",
                  fontSize: "12px",
                }}
                ref={msg}
              ></p>
              <p
                className="nm"
                style={{
                  marginBottom: 0,
                  marginTop: "10px",
                  fontSize: "12px",
                }}
              >
                Didn't recive any code?{" "}
                <span style={{ color: "#bfcfff", textDecoration: "underline" }}>
                  Click to Resend
                </span>
              </p>
              <button className="btn">Verify Code</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CodeVerification;
