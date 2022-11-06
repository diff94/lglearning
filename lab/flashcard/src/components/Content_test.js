import Card from "./Card";

export default function Content({vocabularies}) {
    return(
        <div className="content">
            <Card
              word = {vocabularies[0].word}
              part_of_speech = {vocabularies[0].part_of_speech}
              definition = {vocabularies[0].part_of_speech}
            />
            <Card 
              word = {vocabularies[1].word}
              part_of_speech = {vocabularies[1].part_of_speech}
              definition = {vocabularies[1].part_of_speech}
            />
            {
                /*
                .
                .
                .
                */
            }
        </div>
    );
}
