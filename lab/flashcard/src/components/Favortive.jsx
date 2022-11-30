import React from "react";
import Content from "./Content";
export default function Favorite(props) {
  const { fav, setFav, handleExampleClick } = props;
  return (
    <aside className="block col-1">
      <h2>Favorite</h2>
      <div>
        {fav.length === 0 ? (
          <div>Empty</div>
        ) : (
          <Content
            vocabularies={fav}
            //handleStarClick={handleStarClick}
            handleExampleClick={handleExampleClick}
            fav={fav}
            setFav={setFav}
            initialColor={true}

            //要把這個傳content
          />
        )}
      </div>
    </aside>
  );
}
