import Card from "./Card";

export default function Content({
  vocabularies,
  handleExampleClick,
  fav,
  setFav,
  initialColor,
}) {
  return (
    <div className="content">
      {vocabularies.map((v, i) => (
        <div className="card" key={`${v.word}-${i}`}>
          <Card
            word={v.word}
            part_of_speech={v.part_of_speech}
            definition={v.definition}
            example={v.example}
            handleExampleClick={handleExampleClick} //一路餵食下來
            fav={fav}
            setFav={setFav}
            initialColor={initialColor}
            // handleStarClick={handleStarClick}
            id={i}
            // color = {color}
          />
        </div>
      ))}
    </div>
  );
}
