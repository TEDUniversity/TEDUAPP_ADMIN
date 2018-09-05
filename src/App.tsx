import * as React from "react";
import { Route } from "react-router-dom";

import Home from "./Pages/Home";
import Navigation from "./Components/Navigation";
import Login from "./Pages/Login";
import * as firebase from "firebase";
import AddNews from "./Pages/AddNews";
import NewsDetail from "./Pages/NewsDetail";
import AddNotification from "./Pages/AddNotification";

class App extends React.Component {
  constructor(prop: any) {
    super(prop);
    var config = {
      databaseURL: "https://teduapp-210c9.firebaseio.com",
      projectId: "teduapp-210c9"
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
  }
  render() {
    return (
      <div>
        <Navigation />
        {/**
         *  route to diffrent component
         */}
        <Route
          exact={true}
          path={"/notifications"}
          component={AddNotification}
        />
        <Route exact={true} path={"/detailNews"} component={NewsDetail} />
        <Route exact={true} path={"/login"} component={Login} />
        <Route exact={true} path={"/"} component={Home} />
        <Route exact={true} path={"/addnews"} component={AddNews} />
      </div>
    );
  }
}

export default App;
