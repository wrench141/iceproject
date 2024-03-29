import '../../style/verifyEmail.css';
import axios from "axios"
import { useRef, useState } from 'react';
import Navbar from '../components/navbar';

function SetPassword() {
  
  const [pass, setPass] = useState();
  const [repass, setRePass] = useState();
  const contRef = useRef()
  const passNt = useRef();
  const mail = window.localStorage.getItem("mail")
  const submitHandler = (e) => {
    e.preventDefault()
    if(pass === repass){
      axios
        .post("http://localhost:4000/auth/register", {
          email: mail,
          password: pass
        })
        .then((res) => {
          passNt.current.textContent = res.data.msg;
          if (res.status == 200) {
            window.localStorage.setItem("mail", mail);
            setTimeout(() => {
              window.localStorage.setItem("token", res.data.token);
              window.location.href = "/";
            }, 1500);
          }
        })
        .catch((e) => {
          console.log(e.message);
        });
    }else{
      passNt.current.textContent = "*Password Missmatch"
    }
  }

  return (
    <>
      <Navbar />
      <div className="container" ref={contRef}>
        <div className="frm c">
          <div className="wrap c">
            <form onSubmit={(e) => submitHandler(e)} className="midcont">
              <h2>Set Password</h2>
              <p className="nm">
                Please set a strong password for your account.{" "}
                <span style={{ color: "#bfcfff" }}>
                  {window.localStorage.getItem("mail").split("@")[0]}!
                </span>
              </p>
              <div className="codeWrap c">
                <input
                  type="password"
                  className="inp"
                  placeholder="Enter new password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />
                <input
                  type="password"
                  className="inp"
                  placeholder="Re-Enter password"
                  value={repass}
                  onChange={(e) => setRePass(e.target.value)}
                />
              </div>
              <p
                className="nm"
                style={{
                  width: "100%",
                  height: "max-content",
                  marginTop: "10px",
                  marginBottom: 0,
                  gap: "5px",
                }}
                ref={passNt}
              ></p>
              <button className="btn">Save Password</button>
            </form>
            <div
              className="nm"
              style={{
                width: "100%",
                height: "max-content",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "20px",
                gap: "5px",
              }}
            >
              <p className="sml">©2023 All copyrights reserved.</p>
              <p className="sml">@FrostyCreations</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SetPassword;
