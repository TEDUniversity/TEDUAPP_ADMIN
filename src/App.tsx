import * as React from "react";
import { Route } from "react-router-dom";

import Home from "./Pages/Home";
import About from "./Pages/About";
import Navigation from "./Components/Navigation";

class App extends React.Component {
  render() {
    return (
      <div>
        <Navigation />
        {/**
         *  route to diffrent component
         */}
        <Route exact={true} path={"/"} component={Home} />
        <Route exact={true} path={"/about"} component={About} />
      </div>
    );
  }
}

export default App;
