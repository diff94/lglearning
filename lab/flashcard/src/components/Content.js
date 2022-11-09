import Card from "./Card";

export default function Content({vocabularies}) {
    return(
        <div className="content">
          {vocabularies.map((v,i)=>(
            <div className="card" key={i}>
              <Card
                word = {v.word}
                part_of_speech = {v.part_of_speech}
                definition = {v.definition}
                Example = {v.example}
                handleExampleClick={handleExampleClick}
                
              />
            </div>

          ))}
           
        </div>
    );
}

//像content_test那樣太辛苦惹~所以來點map
