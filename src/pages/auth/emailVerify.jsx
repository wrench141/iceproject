import '../../style/verifyEmail.css';
import axios from "axios"
import { useRef, useState } from 'react';
import img from "../../assets/bg.jpeg"
import Navbar from '../components/navbar';
import HOST_URI from "../components/url";
import { useEffect } from 'react';


function EmailVerification() {
  
  const [mail, setMail] = useState();
  const [brands, setBrands] = useState([]);
  const [defMail, setDefMail] = useState();
  const mesg = useRef();
  const [loading, setLoading] = useState(false)

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true)
    axios
      .post(HOST_URI + "/auth/verifyemail", {
        email: mail || defMail,
      })
      .then((res) => {
        setLoading(false)
        console.log(res.status);
        mesg.current.textContent = res.data.msg;
        if (res.status == 200) {
          if (mail == undefined) {
            window.localStorage.setItem("mail", defMail);
          } else {
            window.localStorage.setItem("mail", mail);
          }
          setTimeout(() => {
            window.location.href = "/verifyCode";
          }, 1000);
        }
      })
      .catch((e) => {
        console.log(e.message);
      });
    
    setTimeout(() => {
      setLoading(false)
      mesg.current.textContent = "Network Issue: Something went wrong"
    }, 10000)
  }

  useEffect(() => {
    const getBrands = async() => {
      const resp = await axios.get(HOST_URI + "/shops/getBrands");
      setBrands(resp.data.msg)
      setDefMail(resp.data.msg[0]);
    }
    getBrands()
  }, [])

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="frm">
          <div className="wrap">
            <div className="title">
              <span style={{ color: "#babaff" }}> Liquido</span>
            </div>
            <div className="sub">
              Styled ice is a custom ice carving company. Inorder to book your
              customized ice, first verify your email.
            </div>
            <form onSubmit={(e) => submitHandler(e)} className="subwrap">
              <input
                type="email"
                id="lab"
                name="lab"
                value={mail}
                style={{fontSize: "13px"}}
                onChange={(e) => setMail(e.target.value)}
                className="inp"
                placeholder="Enter your email"
              />
              <p className="sub" style={{margin: "10px 0", fontSize: "12px", marginTop: "20px", paddingLeft: "5px"}}>Or Select your restaurent from below id's</p>
              <select
                value={defMail}
                style={{fontSize: "13px"}}
                onChange={(e) => setDefMail(e.target.value)}
                className="inp">
                {
                  brands != undefined ? (
                    brands.map((brand, i) => {
                      if(i==0){
                        return <option className="opt" selected>{brand}</option>;
                      }else{
                        return <option className="opt">{brand}</option>;
                      }
                    })
                  ) : null
                }
              </select>
              <div className="msg" ref={mesg}>
                Please login/register first.
              </div>

              {loading ? (
                <button className="btn disabled" disabled>
                  <div className="dots">
                    <ion-icon name="snow-outline"></ion-icon>
                  </div>
                </button>
              ) : (
                <button className="btn">Send Code</button>
              )}
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
