import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store";

import { BrowserRouter as Router } from "react-router-dom";
// import Home from "./Component/Home";
// import About from "./Component/About";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
