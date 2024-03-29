import { useState } from "react";

export default function Card({recipe, i}){
  const [open, setOpen] = useState(false);

  return (
    <div className="card" key={i}>
      {open ? (
        <div className="popup">
          <div className="center">
            <p className="title">{recipe.name}</p>
            <p className="type">
              <span>Type: </span>
              {recipe.type}
            </p>
            <p className="type">
              <span>Ingredients: </span>
              {recipe.ingredients}
            </p>
            <p className="type r">
              <span>Missing Ingredients: </span>
              {recipe.missingIngredients}
            </p>
            <p className="type">
              <span>Instructions: </span>
              {recipe.instructions}
            </p>
          </div>
          <p className="ccont">
            <button className="cls" onClick={() => setOpen(!open)}>
              Close
            </button>
          </p>
        </div>
      ) : null}
      <p className="title">{recipe.name}</p>
      <p className="type">
        <span>Type: </span>
        {recipe.type}
      </p>
      <p className="type">
        <span>Ingredients: </span>
        {recipe.ingredients}
      </p>
      <p className="type r">
        <span>Missing Ingredients: </span>
        {recipe.missingIngredients}
      </p>
      <div className="view">
        <button className="btn" onClick={() => setOpen(!open)}>
          {open ? "Close Recipe" : "View Recipe"}
        </button>
      </div>
    </div>
  );
}