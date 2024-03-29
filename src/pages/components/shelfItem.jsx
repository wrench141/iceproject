import { useState } from "react";

export default function ShelfItem({ ingredient }) {
  const [add, setAdd] = useState(false);
  const addToShelf = () => {
    const currentShelf = JSON.parse(localStorage.getItem("shelf")) || [];
    const newShelf = currentShelf.filter((item) => item !== ingredient);
    localStorage.setItem("shelf", JSON.stringify(newShelf));
  };

  const removeFromShelf = () => {
    const currentShelf = JSON.parse(localStorage.getItem("shelf")) || [];
    const newShelf = [...currentShelf, ingredient];
    localStorage.setItem("shelf", JSON.stringify(newShelf));
  };
  return (
    <div className="ingr-row">
      <p className="igr">{ingredient}</p>
      {add ? (
        <button
          className="btn del"
          onClick={() => {
            setAdd(false);
            addToShelf();
          }}
        >
          REMOVE ITEM
        </button>
      ) : (
        <button
          className="btn"
          onClick={() => {
            setAdd(true);
            removeFromShelf();
          }}
        >
          ADD TO SHELF
        </button>
      )}
    </div>
  );
}