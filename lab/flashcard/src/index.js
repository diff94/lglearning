import React from "react";
import ReactDOM from "react-dom/client";
import Flashcard from "./containers/Flashcard";
// import Card from "./components/Card";
import './public/style.css';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Flashcard />
  </React.StrictMode>
);
