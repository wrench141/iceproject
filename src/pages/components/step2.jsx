import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./card";
import HOST_URI from "../components/url";


export default function Step2({ back }) {
  const [recipes, setRecipes] = useState([]);
  const [mocktail, setRMocktails] = useState([]);

  useEffect(() => {
    const getRecipes = async () => {
      const resp = await axios.post(
        HOST_URI + `/recipes/getRecipes`,
        {
          ingredients: JSON.parse(window.localStorage.getItem("shelf")),
        },
        {
          headers: {
            token: window.localStorage.getItem("token"),
          },
        }
      );
      resp.data.msg?.map((item) => {
        if(item.type.toLowerCase() == "mocktail"){
          setRMocktails([...mocktail, item])
        }else{
          setRecipes([...recipes, item])
        }
      })
    };
    getRecipes();
  }, []);

  

  return (
    <div className="cols">
      <div className="row-wrap">
        <div className="label">Cocktail Recipes</div>
      </div>
      <div className="wrapper">
        <div className="ingr-row cards">
          {recipes != undefined
            ? recipes.map((recipe, i) => <Card recipe={recipe} i={i} />)
            : null}
        </div>
        <div className="row-wrap">
          <div className="label">Mocktail Recipes</div>
        </div>
        <div className="ingr-row cards">
          {mocktail != undefined
            ? mocktail.map((recipe, i) => <Card recipe={recipe} i={i} />)
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
