import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./card";

export default function Step2({ back }) {
  const [recipes, setRecipes] = useState();

  useEffect(() => {
    const getRecipes = async () => {
      const resp = await axios.post(
        `http://localhost:4000/recipes/getRecipes`,
        {
          ingredients: JSON.parse(window.localStorage.getItem("shelf")),
        },
        {
          headers: {
            token: window.localStorage.getItem("token"),
          },
        }
      );
      setRecipes(resp.data.msg);
      console.log(resp.data.msg)
    };
    getRecipes();
  }, []);

  

  return (
    <div className="cols">
      <div className="row-wrap">
        <div className="label">Step-2: View Recipes</div>
      </div>
      <div className="wrapper">
        <div className="ingr-row cards">
          {recipes != undefined
            ? recipes.map((recipe, i) => (
                <Card recipe={recipe} i={i}/>
              ))
            : null}
        </div>
        <div className="ingr-row">
          <button
            className="btn"
            onClick={() => {
              back();
            }}
            style={{ marginTop: "20px" }}
          >
            <ion-icon
              style={{ fontSize: "15px" }}
              name="chevron-back-outline"
            ></ion-icon>
            BACK
          </button>
        </div>
      </div>
    </div>
  );
}
