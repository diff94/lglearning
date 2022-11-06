import Header from "../components/Header";
import Content from "../components/Content";
//import component function from the file
import '../../public/styles.css';
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
  //如果用state但似乎還是會不讀到example
  //const[text,setText]= React.useState(false);
  // const handleExampleclick = (e) => {
  //   e.currentTarget.style.visibility = 'hidden';
  //   console.log(e.currentTarget);
    
  // };
  //不使用state
  const handleExampleclick = (oldState => {
    if (oldState === vocabularies.definition){
      return vocabularies.Example;
    } else {
      return vocabularies.definition;
    }
  });
  // const handleExampleclick = (oldState => {
  //   if (oldState === vocabularies.definition){
  //     return vocabularies.Example;
  //   } else {
  //     return vocabularies.definition;
  //   }
  // });
  const handleStarClick = (event) => {
    //一定要用arrow function 

  };
  // const handleExampleclick = (event) => {

  // };
  
  return (
    <div>
      <Header title = {"My Flash Card"} />
      <Content 
        vocabularies = {vocabularies}
        handleStarClick= {handleStarClick}
        handleExampleclick= {handleExampleclick}
        
       />
    </div>

  );
  // console.log(vocabularies);
  // 查一下console.log的意思
}

export default Flashcard;
