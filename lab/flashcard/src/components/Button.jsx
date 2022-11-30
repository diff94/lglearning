export default function Button(props) {
  return (
    <button className={props.className} onClick={props.onClick}>
      {props.text}
      {props.children}
    </button>
  );
}

//https://blog.logrocket.com/react-onclick-event-handlers-guide/
// export default function Button(props) {
//     return(

//         <button className={props.className} onClick = {props.onClick}>
//             {props.text}
//             {props.children}
//         </button>

//     );
// }
//若把function card 寫在跟app同一個介面
//app 裡面 Cardtest frontSide = "9*6" backSide = "54" /
//這類的東西是props
// export default function App(){
//     return(
//         <div className = "App">
//         <h1>Flash Cards</h1>
//         <h2>Click it!</h2>
//         <Cardtest frontSide = "9*6" backSide = "54" />
//         <Cardtest frontSide = "9*6" backSide = "54" />
//         <Cardtest frontSide = "rabbit*8" backSide = "rabbyte" />
//         </div>
//     )
// }
// 所以透過props 在function Card中呼叫內容
//front side 是props的 property
// 因為props 中有設定 frontSide =
//backSide =
// function Card (props){
//     const[text,setText]= React.useState(props.frontSide);
//     function handleClick (){
//         setText(props.backSide);

//     }
//     // return <div className="flsh-card">{text}</div>
//     //在return裡面召喚handleClick
//     return (
//     <div className="flsh-card" onClick = {handleClick}>
//       {text}
//     </div>
//     )
// }
