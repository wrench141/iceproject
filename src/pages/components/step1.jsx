import { useEffect } from "react";
import { useState } from "react";
import ShelfItem from "./shelfItem";
import axios from "axios"
import HOST_URI from "../components/url";

export default function Step1({ next }) {
  const [ingredients, setIngredients] = useState();

  useEffect(() => {
    const fetchIngr = async () => {
      window.localStorage.removeItem("shelf")
      const resp = await axios.get(
        HOST_URI + `/recipes/getShelfItems`,
        {
          headers: {
            token: window.localStorage.getItem("token"),
          },
        }
      );
      setIngredients(resp.data.ingredients);
    }
    fetchIngr()
  }, [])

  return (
    <div className="cols">
      <div className="row-wrap">
        <div className="label">Select Ingredients</div>
      </div>
      <div className="wrapper">
        {ingredients != null
          ? ingredients.map((ingredient) => <ShelfItem ingredient={ingredient}/>)
          : null}
        <div className="ingr-row">
          <p className="igr"></p>
          <button className="pbtn" onClick={() => next()}>
            PROCEED TO RECIPES
            <ion-icon
              style={{ fontSize: "15px" }}
              name="chevron-forward-outline"
            ></ion-icon>
          </button>
        </div>
      </div>
    </div>
  );
}