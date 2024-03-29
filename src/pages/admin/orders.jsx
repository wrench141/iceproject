import React, { useState } from "react";
import axios from "axios";
import { useRef } from "react";
import { useEffect } from "react";
import HOST_URI from "../components/url";


const Orders = () => {

  const formRef = useRef();
  const secRef = useRef();
  const [products, setProducts] = useState([]);
  const [state, setState] = useState("create");
  const [prodId, setprodId] = useState();

  const showMsg = (msg) => {
    const mesg = document.createElement("p");
    mesg.classList.add("msg");
    mesg.textContent = msg;
    secRef.current.appendChild(mesg)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      prodname: formRef.current["prodname"].value,
      description: formRef.current["description"].value,
      category: formRef.current["category"].value,
      keywords: formRef.current["keywords"].value,
      price: formRef.current["price"].value,
      stock: formRef.current["stock"].value,
      discount: formRef.current["discount"].value,
    };
    console.log(data)
    try {
      const resp = await axios.post(
        HOST_URI + "/products/createProduct",
        data,
        {
          headers: {
            token: window.localStorage.getItem("token"),
          },
        }
      );
      showMsg(resp.data.msg);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const getProds = async() => {
      const resp = await axios.get(HOST_URI + "/products/getProducts");
      setProducts(resp.data.msg);
    };
    getProds()
  }, [])

  const formFiller = (i, id) => {
    setprodId(id);
    const row = document.getElementById(i);
    const dataElems = row.getElementsByClassName("prd");
    formRef.current["prodname"].value = dataElems[0].textContent;
    formRef.current["description"].value = dataElems[1].textContent;
    formRef.current["category"].value = dataElems[2].textContent;
    formRef.current["keywords"].value = dataElems[3].textContent;
    formRef.current["price"].value = dataElems[4].textContent;
    formRef.current["stock"].value = dataElems[5].textContent;
    formRef.current["discount"].value = dataElems[6].textContent;
  }

  const updateHandler = async() => {
    const data = {
      prodname: formRef.current["prodname"].value,
      description: formRef.current["description"].value,
      category: formRef.current["category"].value,
      keywords: formRef.current["keywords"].value,
      price: formRef.current["price"].value,
      stock: formRef.current["stock"].value,
      discount: formRef.current["discount"].value,
    };
    try {
      const resp = await axios.patch(
        HOST_URI + `/products/updateProduct/${prodId}`,
        data,
        {
          headers: {
            token: window.localStorage.getItem("token"),
          },
        }
      );
      showMsg(resp.data.msg);
      setTimeout(()=>{window.location.reload();}, 2000);
    } catch (err) {
      console.error(err);
    }
  }

  const deleteHandler = async(id) => {
    try {
      const resp = await axios.delete(
        HOST_URI + `/products/deleteProduct/${id}`,
        {
          headers: {
            token: window.localStorage.getItem("token"),
          },
        }
      );
      showMsg(resp.data.msg);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  }

  const imageUploader = async (e, id) => {
    let file = new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
    let body = {
      file: await file,
    };
    try {
      const resp = await axios.patch(
        HOST_URI +
          `/products/uploadProductImage/${id}`,
        body,
        {
          headers: {
            token: window.localStorage.getItem("token"),
          },
        }
      );
      showMsg(resp.data.msg);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };

  console.log(products);

  return (
    <div className="sideSection" ref={secRef}>
      <div className="topbar">
        <div className="title">Dashboard</div>
        <button className="btn">
          <ion-icon name="notifications-outline"></ion-icon>
        </button>
      </div>
      <div className="sections">
        <div className="sec1">
          <div className="title">Your Products</div>
          <table className="tab">
            <tr className="tr">
              <th className="head">Product Name</th>
              <th className="head">Images</th>
              <th className="head">Description</th>
              <th className="head">Category</th>
              <th className="head">Keywords</th>
              <th className="head">Price</th>
              <th className="head">Stock</th>
              <th className="head">Discount (%)</th>
              <th className="head">Action</th>
            </tr>
            {products.length > 0
              ? products.map((product, i) => (
                  <tr className="tr" id={i} key={i}>
                    <div className="backwrap" id={"p" + i}>
                      <div className="popup">
                        <p className="title">Upload Images</p>
                        <input
                          type="file"
                          name="file"
                          onChange={(e) => imageUploader(e, product._id)}
                          id={"id" + i}
                          hidden
                        />
                        <div className="imgs">
                          {product.prodimages.length > 0
                            ? product.prodimages.map((img) => (
                                <img src={img} alt="" className="pimg" />
                              ))
                            : null}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                          }}
                        >
                          <button
                            onClick={() => {
                              document.getElementById("p" + i).style.display =
                                "none";
                            }}
                            className="pbtn del"
                          >
                            Close
                          </button>
                          <button
                            onClick={() => {
                              document.getElementById("id" + i).click();
                            }}
                            className="pbtn"
                          >
                            Upload Image
                          </button>
                        </div>
                      </div>
                    </div>
                    <td className="bdy prd">{product.prodname}</td>
                    <td className="bdy prd">
                      <button
                        className="upd"
                        onClick={() => {
                          document.getElementById("p" + i).style.display =
                            "flex";
                        }}
                      >
                        Upload
                      </button>
                    </td>
                    <td className="bdy prd">{product.description}</td>
                    <td className="bdy prd">{product.category}</td>
                    <td className="bdy prd">{product.keywords}</td>
                    <td className="bdy prd">{product.price}</td>
                    <td className="bdy prd">{product.stock}</td>
                    <td className="bdy prd">{product.discount}</td>
                    <td className="bdy">
                      <div className="btnsWrap">
                        <button
                          className="upd"
                          onClick={() => {
                            formFiller(i, product._id);
                            setState("update");
                          }}
                        >
                          Update
                        </button>
                        <button
                          className="upd del"
                          onClick={() => {
                            deleteHandler(product._id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              : null}
          </table>
        </div>
        <div className="new">
          <div className="title">Add New</div>
          <form ref={formRef} className="form">
            <div className="wrap">
              <label htmlFor="" className="lab">
                Product Name
              </label>
              <input type="text" name="prodname" className="inp" />
            </div>
            <div className="wrap">
              <label htmlFor="" className="lab">
                Description
              </label>
              <textarea
                type="text"
                name="description"
                className="inp"
                style={{ height: "70px", paddingTop: "10px" }}
              />
            </div>
            <div className="wrap">
              <label htmlFor="" className="lab">
                Category
              </label>
              <input type="text" name="category" className="inp" />
            </div>
            <div className="wrap">
              <label htmlFor="" className="lab">
                Keywords
              </label>
              <input type="text" name="keywords" className="inp" />
            </div>
            <div className="wrap">
              <label htmlFor="" className="lab">
                Price
              </label>
              <input type="text" name="price" className="inp" />
            </div>
            <div className="wrap">
              <label htmlFor="" className="lab">
                Stock
              </label>
              <input type="text" name="stock" className="inp" />
            </div>
            <div className="wrap">
              <label htmlFor="" className="lab">
                Discount
              </label>
              <input type="text" name="discount" className="inp" />
            </div>
            {state == "create" ? (
              <button type="button" onClick={handleSubmit} className="sbtn">
                Create Product
              </button>
            ) : (
              <button
                type="button"
                onClick={() => updateHandler()}
                className="sbtn"
              >
                Update Product
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Orders;
