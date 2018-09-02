import * as React from "react";
import { Link } from "react-router-dom";
// import Home from "./Home";
// import About from "./About";

const Navigation = () => {
  return (
    <nav className={"deep-purple darken-1"}>
      <div className="header">
        <Link to={"/"}>
          <a className={"white-text"}>
            <img src="https://www.tedu.edu.tr/sites/default/files/logo_tr_1.png" />
          </a>
        </Link>
        <div className="header-right">
          <Link to={"/"}>
            <a className={"white-text"}>Home</a>
          </Link>
          <Link to={"/about"}>
            <a className={"white-text"}>About</a>
          </Link>
        </div>
      </div>
    </nav>
  );
};
export default Navigation;
