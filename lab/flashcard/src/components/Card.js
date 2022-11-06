import Button from "./Button";
export default function Card( {
    id,
    handleStarClick,
    word,
    part_of_speech,
    definition,
    handleExampleClick,
    Example,
}) {
    return (
        <>
          <div className="vocabulary">
            {/* star button here */}
            {/* <Button className={"example-button"}>
              <FaStar
                icon = "fa-star"
                className = "fa-star"
                id = {`star-${id}`}
                onClick = {handleStarClick}
              />

            </Button> */}
          
            <h2 className = "word">{word}</h2>
            <h4>{part_of_speech}</h4>
          </div>
          <h3 className="definition">{definition}</h3>
          {/* example button here         */}
          <Button 
          className={"example-button"} 
          text = {"Example"} 
          onClick = {handleExampleClick}
          /> 
          <h5>{Example}</h5>            
       {/*handleExampleClick 寫在flashcard裡面*/}
        </>
    );
}


//照影片做的
// import React, {useState} from "react";

// //props.frontSide
// export default function Card({frontSide,backSide}){
//     //const[text,setText]= useState(frontSide)
//     //= useState(true) means frontside
//     const [isFront,changeFace] = useState(true);
//     function handleClick (){
//         changeFace(oldState => !oldState);
//         //if oldState is true it is gonna be false vice versa


//         //寫了isFront changeFace後再修改一次
//         // setText (function(oldState) {
//         //     if (oldState === frontSide){
//         //         return backSide;
//         //     } else {
//         //         return frontSide;
//         //     }
//         // });
//         //arrow function
//         // setText (oldState => {
//         //     if (oldState === frontSide){
//         //         return backSide;
//         //     } else {
//         //         return frontSide;
//         //     }
//         // });
//         //backSide
//         //update the state of the function 
//     }
//     //if isFront is true : fronSide otherwise backSide
//     const text = isFront ? frontSide : backSide ;
//     const sideClass = isFront ? "front" : "back" ;
//     const classList = `flash-card $ {sideClass}`;
//     // flash-card is the 1st class 
//     //細節可以看 string and templates
//     return (
//         <div className={classList} onClick = {handleClick}>
//             {text} 
//         </div>
//         //className="flash-card" onClick = {handleClick}>
//         //{text} 
//     )
// }

// export default function Card() {}
