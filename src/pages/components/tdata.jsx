import axios from "axios";
import { useEffect, useState } from "react";
import HOST_URI from "../components/url";


export default function Tdata({item, i}){
    const [quantity, setQuantity] = useState(0);
    useEffect(() => {
        setQuantity(item.quantity);
    }, []);

    const removeItem = async() => {
        const id = item.cartId;
        const resp = await axios.delete(
          HOST_URI + `/cart/deleteCartItem/${id}`,
          {
            headers: {
              token: window.localStorage.getItem("token"),
            },
          }
        );
        setTimeout(() => {
            window.location.reload()
        }, 1500);
    }
    return (
      <tr className="tr" key={i}>
        <td className="bdy">{item.product.prodname}</td>
        <td className="bdy">{item.product.category}</td>
        <td className="bdy">
          <div className="quan">
            <button
              className="qbtn"
              onClick={() => {
                if (quantity <= 1) {
                  setQuantity(1);
                } else {
                  setQuantity(quantity - 1);
                }
              }}
            >
              <ion-icon name="remove"></ion-icon>
            </button>
            <p className="cnt">{quantity}</p>
            <button
              className="qbtn"
              onClick={() => {
                setQuantity(quantity + 1);
              }}
            >
              <ion-icon name="add"></ion-icon>
            </button>
          </div>
        </td>
        <td className="bdy">{item.product.discount} (%)</td>
        <td className="bdy prc">{item.product.price}</td>
        <td className="bdy">
          <button className="del" onClick={() => removeItem()}>
            Remove
          </button>
        </td>
      </tr>
    );
}