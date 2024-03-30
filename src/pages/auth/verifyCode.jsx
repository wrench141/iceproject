import "../../style/verifyEmail.css";
import axios from "axios";
import { useRef, useState, useEffect } from "react";
import Navbar from "../components/navbar";
import HOST_URI from "../components/url";

function CodeVerification() {
  const msg = useRef();
  const [code, setCode] = useState(["", "", "", "", ""]);
  const inputRefs = useRef([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  const handleInputChange = (index, value, nextIndex) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && nextIndex < inputRefs.current.length) {
      inputRefs.current[nextIndex].focus();
    } else if (!value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    const result = code.join("");

    axios
      .post(HOST_URI + "/auth/verifycode", {
        email: window.localStorage.getItem("mail"),
        code: result,
      })
      .then((res) => {
        setLoading(false)
        msg.current.textContent = res.data.msg;
        if (res.status === 200) {
          window.localStorage.setItem("token", res.data.token);
          setTimeout(() => {
            window.location.href = "/"
          }, 1000);
        }

        console.log(res.data);
      })
      .catch((e) => {
        console.log(e.message);
      });

    setTimeout(() => {
      setLoading(false);
      msg.current.textContent = "Network Issue: Something went wrong";
  }, 10000);                                                                                                                                          
  };

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
                {code.map((digit, index) => (
                  <input
                    key={index}
                    className="inp bx"
                    maxLength={1}
                    value={digit}
                    onChange={(e) =>
                      handleInputChange(index, e.target.value, index + 1)
                    }
                    ref={(ref) => (inputRefs.current[index] = ref)}
                  />
                ))}
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
              {loading ? (
                <button className="btn disabled" disabled>
                  <div className="dots">
                    <ion-icon name="snow-outline"></ion-icon>
                  </div>
                </button>
              ) : (
                <button className="btn">Verify Code</button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CodeVerification;
