import '../../style/verifyEmail.css';
import axios from "axios"
import { useRef, useState } from 'react';
import img from "../../assets/bg.jpeg"
import Navbar from '../components/navbar';
import HOST_URI from "../components/url";


function EmailVerification() {
  
  const [mail, setMail] = useState();
  const mesg = useRef();

  const submitHandler = (e) => {
    e.preventDefault()
    axios
      .post(HOST_URI + "/auth/verifyemail", {
        email: mail,
      })
      .then((res) => {
        mesg.current.textContent = res.data.msg;
        if (res.status == 200) {
          window.localStorage.setItem("mail", mail);
          setTimeout(() => {
            window.location.href = "/verifyCode";
          }, 1000);
        }
      })
      .catch((e) => {
        console.log(e.message);
      });
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="frm">
          <div className="wrap">
            <div className="title">
              Frosty<span style={{ color: "#babaff" }}> Creations</span>
            </div>
            <div className="sub">
              Styled ice is a custom ice carving company. Inorder to book your
              customized ice, first verify your email.
            </div>
            <form onSubmit={(e) => submitHandler(e)} className="subwrap">
              <input
                type="text"
                id="lab"
                name="lab"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                className="inp"
                placeholder="Enter your email"
              />
              <div className="msg" ref={mesg}></div>

              <button className="btn">Send Code</button>
            </form>
          </div>
          <div className="wrap">
            <div className="img"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EmailVerification
