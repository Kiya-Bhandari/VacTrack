import React from "react";
import ReactDOM from "react-dom";
import Routes from "./route/Routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style/app.css";
import { store } from "./helpers";
import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById("root")
);
