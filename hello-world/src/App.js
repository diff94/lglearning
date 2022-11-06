// import logo from './logo.svg';
import './App.css';
import { useState } from "react";


// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <counter/>
//   </React.StrictMode>
//   );

function Counter () {
  const [count, setCount] = useState(5);
  return (
      <div className ="counter">
          <h1 className = "counter-display">{count}</h1>
          <span className="counter-controls">
              <button onClick ={()=> setCount(count + 1)}>+</button>
              <button  onClick ={()=> setCount(count - 1)}>-</button>
              <button  onClick ={()=> setCount(0)}>reset</button>
              <button  onClick ={()=> setCount(count + 1)}>+2</button>
          </span>
      </div>
      );
  }
export default Counter;

// function Counter () {
//   return (
//       <div className ="counter">
//           <h1 className = "counter-display">5</h1>
//           <span className="counter-controls">
//               <button>+</button>
//               <button>-</button>
//           </span>
//       </div>
//       );
//   }
// export default Counter;

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
