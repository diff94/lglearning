//照影片做的
import React, {useState} from "react";

//props.frontSide
export default function Cardtest({frontSide,backSide}){
    //const[text,setText]= useState(frontSide) 
    
    //= useState(true) means frontside
    const [isFront,changeFace] = useState(true);
    function handleClick (){
        changeFace(oldState => !oldState);
        //if oldState is true it is gonna be false vice versa


        //寫了isFront changeFace後再修改一次
        // setText (function(oldState) {
        //     if (oldState === frontSide){
        //         return backSide;
        //     } else {
        //         return frontSide;
        //     }
        // });
        //arrow function
        // setText (oldState => {
        //     if (oldState === frontSide){
        //         return backSide;
        //     } else {
        //         return frontSide;
        //     }
        // });
        //backSide
        //update the state of the function 
    }
    //if isFront is true : fronSide otherwise backSide
    const text = isFront ? frontSide : backSide ;
    const sideClass = isFront ? "front" : "back" ;
    const classList = `flash-card $ {sideClass}`;
    // flash-card is the 1st class 
    //細節可以看 string and templates
    return (
        <div className={classList} onClick = {handleClick}>
            {text} 
        </div>
        //className="flash-card" onClick = {handleClick}>
        //{text} 
    )
}

// export default function Cardtest() {}

//以下是把function card 寫在跟app同一個介面:
// function Card (){
//     const[text,setText]= React.useState("Front Side");
//     //every text has a state : front or back
//     // the React.useState returns structure that can be described as text and setText
//     // [ ] to symbolize the return structure is a list
//     // text: return the current value of the state
//     //setText : change the text 
//     // 因為text 反應 current state 
//     // 在 useState 中的current state 是 "Front Side"
//     // 所以可以將 下面的 front side 改成 text 
//     //    return <div className="flsh-card">Front side</div>
//     return <div className="flsh-card">{text}</div>
// }

// //接下來要處理click了
// function Card (){
//     const[text,setText]= React.useState("Front Side");
//     function handleClick (){
//         setText("Back Side");

//     }
//     // return <div className="flsh-card">{text}</div>
//     //在return裡面召喚handleClick
//     return (
//     <div className="flsh-card" onClick = {handleClick}>
//       {text}
//     </div>
//     )
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


//將function card 移動成一個單獨的component 
//不用import css 因為在app已經import
//記得要加上export default
// DRY: don't repeat urself
// WET: we enjoy typing 
// 所以善用 java script destructuring 
// const {frontSide,backSide} = props
// we can dig inside the props and just take out the front and back side
//所以將props 取代為 {frontSide,backSide}
// 寫在function card ()裡面
//代表他是 java script object
//跟{text}不一樣
//同樣的
//import React, {useState} from "react";
//{ }也是在告知
//give me useState property of react
//這樣寫了後就不用React.useState
export default function Card ({frontSide,backSide}){
        const[text,setText]= useState(frontSide);
        function handleClick (){
            setText(backSide);
    
        }
        // return <div className="flsh-card">{text}</div>
        //在return裡面召喚handleClick
        return (
        <div className="flsh-card" onClick = {handleClick}>
          {text}
        </div>
        )
}

    