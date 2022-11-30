import { BrowserRouter } from "react-router-dom";
import { Link, Switch, Route, Outlet } from "react-router-dom";
export default function Layout() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/flashcard">Flashcard</Link>
          </li>
          <li>
            <Link to="/translate">Translate</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
