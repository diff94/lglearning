import React from "react";
import Card from "./components/Card";
import './style.css';
// function Card(props){
//     const [text,setText] = React.useState(props.frontSide);
//     function handleClick (){
//         setText (props.backSide);
//     }
//     return (
//         <div className="flash-card" onClick = {handleClick}>
//             {text} 
//         </div>
//     )
// }

export default function App(){
    return(
        <div className = "App">
        <h1>Flash Cards</h1>
        <h2>Click it!</h2>
        <Card frontSide = "9*6" backSide = "54" />
        <Card frontSide = "9*6" backSide = "54" />
        <Card frontSide = "9*6" backSide = "54" />
        </div>
    )
}

// function App(){
//     const[cards,setCards]=useState(SAMPLE_CARDS)
//     return(
//         <FlashcardList flashcards = {cards} />
//     );
// }

// const SAMPLE_CARDS = [
//     {
//       id: 1,
//       question: 'What is 3 + 3 ?',
//       answer: '4',
//       options: ['2', '3', '5', '4']
//     },
//     {
//       id: 2,
//       question: 'What is four + four ?',
//       answer: '8',
//       options: ['2', '3', '8', '4']
//     },
//     {
//       id: 1,
//       question: 'What is six * six ?',
//       answer: '36',
//       options: ['2', '36', '5', '4']
//     }
//   ]

//   export default App;
