import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./containers/login";
import Feedback from "./containers/feedback";

ReactDOM.render(
  <React.StrictMode>
    {/* <Feedback /> */}
    <Login />
  </React.StrictMode>,
  document.getElementById("root")
);
