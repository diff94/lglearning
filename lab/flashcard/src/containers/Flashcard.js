import React from "react";
import Header from "../components/Header";
import Content from "../components/Content";
//import component function from the file
import "../styles.css"; //import "../../public/styles.css";
// 叫兩層上去
//Flashcard就是我們app.js
//所以不用再創app了唷
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
//這裡是把function寫在flashcard (app)
//也可以學影片把function 寫成另個component
//參考Cardtest那樣
function Flashcard() {
  const [toggleText, setToggleText] = React.useState(false);
  const Example = vocabularies.map((i) => i.example);
  //Example = vocabularies.example
  //definition = vocabularies.definition
  const definition = vocabularies.map((i) => i.definition);
  const oldhandleExampleClick = () => {
    setToggleText((prev) => !prev);
  };
  // return (
  //   <>
  //     <button onClick={handleExampleClick}>
  //       click
  //       <h5 id="Example">{text ? Example : definition}</h5>
  //     </button>
  //   </>
  // );

  // //如果用state但似乎還是會不讀到example
  // const[text,setText]= React.useState(false);
  // const handleExampleclick = (vocabularies) => {
  //   let Example = vocabularies.map(i=>i.example);
  //   console.log(Example);
  //   setText(!text);
  //        if (text){
  //       return <h5>{vocabularies.definition}</h5>;
  //     }else{
  //       return <h5>{Example}</h5>;
  //     }

  // };
  // const old_handleExampleclick = (e) => {
  //   e.currentTarget.style.visibility = 'hidden';
  //   console.log(e.currentTarget);

  // };
  const handleExampleClick = (event) => {
    //event.currentTarget.parentNode 是 card 從 dev tool 查看的
    const card = event.currentTarget.parentNode;
    const children = card.childNodes;
    const example = children[children.length - 1];
    //example 是 h5 是 children最一個
    const visibility = example.style.visibility;
    if (visibility === "hidden") {
      example.style.visibility = "";
    } else if (visibility === "") {
      example.style.visibility = "hidden";
    }
    //visibility =
    //event.currentTarget.style.visibility;
    //console.log(event.currentTarget.parentNode, visibility);
    // console.log(card)
    // console.log 是print 功能
    // card 就是
    // document.querySelector("#root > div > div > div:nth-child(1)")
    //event.currentTarget 是 <button class="example-button">Example</button>
    // event.currentTarget.parentNode
    //去browser 的 dev tool 可以看到 event.currentTarget.parentNode
    //<h5 class="Example">It was a very knotty problem.</h5>
    // event.preventDefault();
    //  = 'hidden';
  };
  //不使用state
  // const old_handleExampleclick = (oldState => {
  //   if (oldState === vocabularies.definition){
  //     return vocabularies.Example;
  //   } else {
  //     return vocabularies.definition;
  //   }
  // });

  // const handleExampleclick = (oldState => {
  //   if (oldState === vocabularies.definition){
  //     return vocabularies.Example;
  //   } else {
  //     return vocabularies.definition;
  //   }
  // });
  // const handleExampleclick = (oldState => {
  //   if (oldState === vocabularies.definition){
  //     return vocabularies.Example;
  //   } else {
  //     return vocabularies.definition;
  //   }
  // });
  // const handleStarClick = (event) => {
  //   //一定要用arrow function
  // };
  // 改class tag or assign color
  const handleStarClick = (event) => {
    //event.currentTarget.parentNode 是 card 從 dev tool 查看的
    //console.log(event.currentTarget)
    const star = event.currentTarget;
    const className = star.className.baseVal;
    // const example = children[children.length - 1];
    // //example 是 h5 是 children最一個
    // const visibility = example.style.visibility;
    if (className === "fa-star") {
      star.className.baseVal = "fa-star-yellow";
    } else if (className === "fa-star-yellow") {
      star.className.baseVal = "fa-star";
    }
    // const handleExampleclick = (event) => {
  };

  return (
    <div>
      <Header title={"My Flash Card"} />
      <Content
        vocabularies={vocabularies}
        handleStarClick={handleStarClick}
        handleExampleClick={handleExampleClick}
        //要把這個傳content
      />
    </div>
  );
  //   // console.log(vocabularies);
  //   // 查一下console.log的意思
}

export default Flashcard;
