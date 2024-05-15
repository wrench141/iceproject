import { useState } from "react";

const OrderCard = ({ item }) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <div
        className="popcard"
        style={show ? { display: "block" } : { display: "none" }}
      >
        <div className="pcd">
          <p
            className="title"
            onClick={() => {
              setShow(false);
              console.log(show);
            }}
          >
            <ion-icon
              style={{ fontSize: "14px" }}
              name="chevron-back-outline"
            ></ion-icon>
            Order Details
          </p>
          <div className="order-progress">
            <div className="step completed">
              <div
                className={
                  item.order.status == "pending"
                    ? "step-icon selc"
                    : "step-icon"
                }
              >
                <div className="selected"></div>
              </div>
              <span className="step-name">Pending</span>
            </div>
            <div className="dline">
              <div className="line sel"></div>
            </div>
            <div className="step">
              <div
                className={
                  item.order.status == "pickedup"
                    ? "step-icon selc"
                    : "step-icon"
                }
              >
                <div className="selected"></div>
              </div>
              <span className="step-name">Pickedup</span>
            </div>
            <div className="dline">
              <div className="line"></div>
            </div>
            <div className="step">
              <div
                className={
                  item.order.status == "shipping"
                    ? "step-icon selc"
                    : "step-icon"
                }
              ></div>
              <span className="step-name">Shipping</span>
            </div>
            <div className="dline">
              <div className="line"></div>
            </div>
            <div className="step">
              <div
                className={
                  item.order.status == "delivered"
                    ? "step-icon selc"
                    : "step-icon"
                }
              ></div>
              <span className="step-name">Delivered</span>
            </div>
          </div>
          <div className="subCont">
            <p className="tg">
              <p className="gre">Order Id</p>
              <p>MT-{item.order._id}</p>
            </p>
            <p className="tg">
              <p className="gre">Order Status</p>
              <p>{item.order.status.toUpperCase()}</p>
            </p>
            <p className="tg">
              <p className="gre">Date</p>
              <p>
                {item.order.date.split("T")[0].split("-").reverse().join("/")}
              </p>
            </p>
            <p className="tg">
              <p className="gre">Expiration date</p>
              <p>
                {item.order.expDate
                  .split("T")[0]
                  .split("-")
                  .reverse()
                  .join("/")}
              </p>
            </p>
            <p className="tg">
              <p className="gre">Address</p>
              <p>{item.order.pickupLoc.split(",").splice(0, 2).join(",")}</p>
            </p>
          </div>
          <p
            style={{
              marginTop: "30px",
              fontSize: "14px",
              color: "#f0f0f4",
            }}
          >
            Order summary
          </p>
          <div className="subCont" style={{ marginTop: "10px" }}>
            <p className="tg">
              <p className="gre">Sub-Total</p>
              <p>{item.product.price}/-</p>
            </p>
            <p className="tg">
              <p className="gre">Quantity</p>
              <p>{item.order.quantity}Kgs</p>
            </p>
            <p className="tg">
              <p className="gre">Discount</p>
              <p>{item.product.discount}/-</p>
            </p>
            <p className="tg">
              <p className="gre">Delivery Charges</p>
              <p>{item.order.deliveryCharges}/-</p>
            </p>
            <p
              className="tg"
              style={{
                fontWeight: "700",
                fontSize: "14px",
                borderTop: "1.4px dashed var(--for)",
                paddingTop: "10px",
              }}
            >
              <p>Grand Total</p>
              <p>{item.order.price}/-</p>
            </p>
          </div>
        </div>
      </div>
      <div className="card" onClick={() => setShow(true)}>
        <div
          className="img"
          style={{
            backgroundImage: `url(${item.product.prodimages[0]})`,
            height: "100px",
            width: "80px",
            backgroundSize: "cover",
            borderRadius: "10px",
          }}
        ></div>
        <div className="details">
          <p className="title">{item.product.prodname}</p>
          <p className="csub">
            <p>#MT-223S3A3CCD • {item.order.date.split("T")[0]}</p>
            <span style={{ display: "flex", gap: "10px" }}>
              <p className="tg">{item.order.status}</p>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
