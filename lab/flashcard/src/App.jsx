import { Routes, Route } from "react-router-dom";
import Flashcard from "./containers/Flashcard";
import About from "./containers/About";
import Home from "./containers/Home";
import Translate from "./containers/Translate";
import Layout from "./components/Layout";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/flashcard" element={<Flashcard />} />
        <Route path="/translate" element={<Translate />} />
      </Route>
    </Routes>
  );
}
