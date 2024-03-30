import { useRef } from "react";
import { useState } from "react";
import "../../style/nav.css"


export default function Navbar(){

    const [open, setOpen] = useState(false)
    const token = window.localStorage.getItem("token")

    return (
      <div className="nav">
        <p className="title">✦ Liquido</p>
        <div className="icon" onClick={() => setOpen(!open)}>
          <ion-icon name="menu-outline"></ion-icon>
        </div>
        <div
          className="sidebar"
          style={
            open
              ? { animation: "openNav 0.5s ease forwards" }
              : { animation: "closeNav 0.5s ease forwards" }
          }
        >
          <div className="nrow">
            <p className="n title">✦ Liquido</p>
            <div className="icon close" onClick={() => setOpen(!open)}>
              <ion-icon name="close-outline"></ion-icon>
            </div>
          </div>
          <div className="nrow" style={{ flexDirection: "row" }}>
            <div className="links">
              <a href="/" className="link sel">
                ✦ Home
                <ion-icon name="chevron-forward-outline"></ion-icon>
              </a>
              <a href="/products" className="link sel">
                ✦ Products
                <ion-icon name="chevron-forward-outline"></ion-icon>
              </a>
              <a href="/learnings" className="link sel">
                ✦ Learn
                <ion-icon name="chevron-forward-outline"></ion-icon>
              </a>
              <a href="/orders" className="link sel">
                ✦ Orders
                <ion-icon name="chevron-forward-outline"></ion-icon>
              </a>
              <div className="btns">
                {/* <a href="/cart" className="link">
                  <button className="bdr">Cart</button>
                </a> */}
                {token ? (
                  <button
                    className="bdr f"
                    onClick={() => {
                      window.localStorage.removeItem("token");
                      window.location.href = "/verifyEmail"
                    }}
                  >
                    Logout
                  </button>
                ) : (
                  <button
                    className="bdr f"
                    onClick={() => {
                      window.location.href = "/verifyEmail";
                    }}
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="subwrap">
          <a href="/" className="link sel">
            Home
          </a>
          <a href="/products" className="link sel">
            Products
          </a>
          <a href="/learnings" className="link sel">
            Learn
          </a>
        </div>
        <div>
          <a href="/orders" className="link sel">
            Orders
          </a>
          {/* <a href="/cart" className="link cart sel">
            <ion-icon name="cart-outline"></ion-icon>
          </a> */}
        </div>
      </div>
    );
}