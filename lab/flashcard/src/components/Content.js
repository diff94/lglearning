import Card from "./Card";

export default function Content({
  //這裡要提下面會用到function 的 parameters 
  // props 可以是 parameters or arguments 
  vocabularies,
  handleExampleClick,
  handleStarClick,
}) {
  return (
    <div className="content">
      {vocabularies.map((v, i) => (
        <div className="card" key={i}>
          <Card
            word={v.word}
            part_of_speech={v.part_of_speech}
            definition={v.definition}
            Example={v.example}
            handleExampleClick={handleExampleClick} //一路餵食下來
            handleStarClick={handleStarClick}
            id={i}
          />
        </div>
      ))}
    </div>
  );
}

//像content_test那樣太辛苦惹~所以來點map
