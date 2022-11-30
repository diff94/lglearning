import React from "react";
import Header from "../components/Header";
import Content from "../components/Content";
import Favorite from "../components/Favortive";
import { useState } from "react";
//import component function from the file
import "../styles.css";

const vocabularies = [
  {
    word: "knotty",
    part_of_speech: "Adjective",
    definition:
      "(of a problem or difficulty) complicated and difficult to solve.",
    example: "It was a very knotty problem.",
  },
  {
    word: "cantrip",
    part_of_speech: "Noun",
    definition: "a magic spell; trick by sorcery.",
    example:
      "And that old witch, Eliza—I little guessed she’d play this cantrip on me: But what a jest—Jerusalem, what a jest!",
  },
  {
    word: "traverse",
    part_of_speech: "Verb",
    definition: "to pass or move over, along, or through.",
    example: "Stanley traversed the continent from west to east.",
  },
  {
    word: "peculiar",
    part_of_speech: "Adjective",
    definition: "different to what is normal or expected; strange.",
    example: "He gave her some very peculiar looks.",
  },
];

function Flashcard() {
  const [fav, setFav] = useState([]);

  return (
    <div>
      <Header title={"My Flash Card"} />

      <div>
        {/* The Content component is responsible to render the vocabularies
        so we need to pass the vocabularies to the Content component. */}
        <Content
          vocabularies={vocabularies}
          //handleStarClick={handleStarClick}
          //handleExampleClick={handleExampleClick}
          setFav={setFav}
          fav={fav}
          initialColor={false}

          //要把這個傳content
        />
        <Favorite fav={fav} setFav={setFav} />
      </div>
    </div>
  );
}

export default Flashcard;
