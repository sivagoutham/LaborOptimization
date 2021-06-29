import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./containers/login";
import Feedback from "./containers/feedback";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
ReactDOM.render(
  <React.StrictMode>
    {/* <Feedback /> */}
    {/* <Login /> */}
    <Router>
      <Switch>
        {/* <Route exact path="/" component={Login}/> */}
        <Route path="/" component={Feedback}/>
      </Switch>
  </Router>

  </React.StrictMode>,
  document.getElementById("root")
);
