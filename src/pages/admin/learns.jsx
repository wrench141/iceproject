import React, { useState } from "react";
import axios from "axios";
import { useRef } from "react";
import { useEffect } from "react";

const Learnings = () => {

  const formRef = useRef();
  const secRef = useRef();
  const [recipes, setRecipes] = useState([]);
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
      name: formRef.current["name"].value,
      instructions: formRef.current["instructions"].value,
      type: formRef.current["type"].value,
      ingredients: formRef.current["ingredients"].value.split(","),
    };
    console.log(data)
    try {
      const resp = await axios.post(
        "http://localhost:4000/recipes/createRecipe",
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
      const resp = await axios.get("http://localhost:4000/recipes/getAllRecipes");
      setRecipes(resp.data.msg);
    };
    getProds()
  }, [])

  const formFiller = (i, id) => {
    setprodId(id);
    const row = document.getElementById(i);
    const dataElems = row.getElementsByClassName("prd");
    formRef.current["name"].value = dataElems[0].textContent;
    formRef.current["instructions"].value = dataElems[3].textContent;
    formRef.current["type"].value = dataElems[1].textContent;
    formRef.current["ingredients"].value = dataElems[2].textContent;
  }

  const updateHandler = async() => {
    const data = {
      name: formRef.current["name"].value,
      instructions: formRef.current["instructions"].value,
      type: formRef.current["type"].value,
      ingredients: formRef.current["ingredients"].value.split(","),
    };
    try {
      const resp = await axios.patch(
        `http://localhost:4000/recipes/updateRecipe/${prodId}`,
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
        `http://localhost:4000/recipes/removeRecipe/${id}`,
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
        `http://localhost:4000/products/uploadProductImage/${id}`,
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


  return (
    <div className="sideSection" ref={secRef}>
      <div className="topbar">
        <div className="title">Dashboard</div>
        <button className="btn">
          <ion-icon name="notifications-outline"></ion-icon>
        </button>
      </div>
      <div className="sections" style={{ gridTemplateColumns: "1fr 0.4fr" }}>
        <div className="sec1">
          <div className="title">Your Recipes</div>
          <table className="tab">
            <tr className="tr">
              <th className="head">Recipe Name</th>
              <th className="head">Type</th>
              <th className="head">Ingredients</th>
              <th className="head">Instructions</th>
              <th className="head">Action</th>
            </tr>
            {recipes.length > 0
              ? recipes.map((recipe, i) => (
                  <tr className="tr" id={i} key={i}>
                    <div className="backwrap" id={"p" + i}>
                      <div className="popup">
                        <p className="title">Upload Images</p>
                        <input
                          type="file"
                          name="file"
                          onChange={(e) => imageUploader(e, recipe._id)}
                          id={"id" + i}
                          hidden
                        />
                        <div className="imgs">
                          {/* {product.prodimages.length > 0
                            ? product.prodimages.map((img) => (
                                <img src={img} alt="" className="pimg" />
                              ))
                            : null} */}
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
                    <td className="bdy prd">{recipe.name}</td>
                    <td className="bdy prd">{recipe.type}</td>
                    <td className="bdy prd">{recipe.ingredients.toString()}</td>
                    <td className="bdy prd">{recipe.instructions}</td>
                    <td className="bdy">
                      <div
                        className="btnsWrap"
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        <button
                          className="upd"
                          onClick={() => {
                            formFiller(i, recipe._id);
                            setState("update");
                          }}
                        >
                          Update
                        </button>
                        <button
                          className="upd del"
                          onClick={() => {
                            deleteHandler(recipe._id);
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
                Recipe Name
              </label>
              <input type="text" name="name" className="inp" />
            </div>
            <div className="wrap">
              <label htmlFor="" className="lab">
                Instructions
              </label>
              <textarea
                type="text"
                name="instructions"
                className="inp"
                style={{ height: "70px", padding: "10px" }}
              />
            </div>
            <div className="wrap">
              <label htmlFor="" className="lab">
                Type
              </label>
              <input type="text" name="type" className="inp" />
            </div>
            <div className="wrap">
              <label htmlFor="" className="lab">
                Ingredients
              </label>
              <input type="text" name="ingredients" className="inp" />
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

export default Learnings;
