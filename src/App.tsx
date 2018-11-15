import * as React from "react";
import { Route } from "react-router-dom";

import Home from "./Pages/Home";
import Navigation from "./Components/Navigation";
import Login from "./Pages/Login";
import * as firebase from "firebase";
import AddNews from "./Pages/AddNews";
import NewsDetail from "./Pages/NewsDetail";
import AddNotification from "./Pages/AddNotification";
import AddSurvey from "./Pages/AddSurvey";
import SurveyDetail from "./Pages/SurveyDetail";
import Logout from "./Components/Logout";

class App extends React.Component {
  constructor(prop: any) {
    super(prop);
    var config = {
      databaseURL: "https://teduapp-210c9.firebaseio.com",
      projectId: "teduapp-210c9",
      apikey: "AIzaSyA1mZtQ1X-R-ftJKSHPoHXydyzetDkfnow",
      storageBucket: "teduapp-210c9.appspot.com"
    };
    firebase.initializeApp(config);
    // if (!firebase.apps.length) {
    // }
  }
  render() {
    return (
      <div>
        <Navigation />
        {/**
         *  route to diffrent component
         */}
        <Route exact={true} path={"/surveys"} component={AddSurvey} />
        <Route
          exact={true}
          path={"/notifications"}
          component={AddNotification}
        />
        <Route exact={true} path={"/detailNews"} component={NewsDetail} />
        <Route exact={true} path={"/detailSurvey"} component={SurveyDetail} />
        <Route exact={true} path={"/login"} component={Login} />
        <Route exact={true} path={"/"} component={Home} />
        <Route exact={true} path={"/addnews"} component={AddNews} />
        <Route exact={true} path={"/logout"} component={Logout} />
      </div>
    );
  }
}

export default App;
