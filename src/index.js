import React from "react";
import ReactDOM from "react-dom";
import "./assets/css/index.css";
import AppRouter from "./AppRouter";
import store from "./store/index";
// import { Provider } from "./redux-react";
import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById("root")
);
