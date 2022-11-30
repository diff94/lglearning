import { FaStar } from "react-icons/fa";
import Button from "./Button";
import "../styles.css";
import { useState } from "react";
export default function Card({
  fav,
  setFav,
  initialColor,
  id,
  word,
  part_of_speech,
  definition,
  handleExampleClick,
  example,
}) {
  const [color, setColor] = useState(initialColor); //起始值
  const [show, setShow] = useState(false); //起始值
  //console.log (color)
  const handleStarClick = () => {
    if (color) {
      setColor(false);
      const newFav = fav.filter((element) => element.word !== word);
      setFav(newFav);
    } else {
      setColor(true);
      const newFav = [...fav, { word, part_of_speech, definition, example }];
      setFav(newFav);
    }
  };
  return (
    <>
      <div className="vocabulary">
        {/* star button here */}
        {/* <Button className={"example-button"}> */}
        <FaStar
          icon="fa-star"
          className={color ? "fa-star-yellow" : "fa-star"} //color T/F決定
          id={`star-${id}`}
          onClick={handleStarClick} //{() => handleStarClick(v)}
        />
        {/* </Button> */}

        <h2 className="word">{word}</h2>
        <h4>{part_of_speech}</h4>
      </div>
      <h3 className="definition">{definition}</h3>
      {/* example button here         */}

      <Button
        className={"example-button"}
        text={"Example"}
        onClick={() => {
          setShow((prev) => !prev);
        }}
      />
      {show && <h5 className="Example">{example}</h5>}
      {/*text ? Example:definition*/}
    </>
  );
}
