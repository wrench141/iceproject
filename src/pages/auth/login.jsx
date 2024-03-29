import '../../style/verifyEmail.css';
import axios from "axios"
import { useRef, useState } from 'react';
import Navbar from '../components/navbar';

function Login() {
  
  const [pass, setPass] = useState();
  const mesg = useRef();

  const mail = window.localStorage.getItem("mail");
  if(mail == null || mail == undefined){
    window.location.href = "/verifyEmail";
  }
  const submitHandler = (e) => {
    e.preventDefault()
    axios
      .post("http://localhost:4000/auth/login", {
        email: mail,
        password: pass
      })
      .then((res) => {
        mesg.current.textContent = res.data.msg;
        if (res.status == 200) {
          window.localStorage.setItem("mail", mail);
          window.localStorage.setItem("token", res.data.token);
          setTimeout(() => {
            window.location.href = "/";
          }, 1500);
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
              Welcome back! please enter your password to proceed.
            </div>
            <form onSubmit={(e) => submitHandler(e)} className="subwrap">
              <input
                type="text"
                id="lab"
                name="lab"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                className="inp"
                placeholder="Password"
              />
              <div className="msg" ref={mesg}></div>
              <button className="btn">Sign in</button>
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

export default Login;
