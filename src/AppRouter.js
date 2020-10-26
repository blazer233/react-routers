import React, { Suspense } from "react";
import { mainRoutes } from "./config";
import { connect } from "react-redux";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link,
} from "react-router-dom";
const App = ({ HeadTitle }) => {
  return (
    <Router>
      <div className="mainDiv">
        <div className="leftNav">
          <h1 style={{ fontSize: "25px" }}>{HeadTitle}</h1>
          <ul>
            <li>
              <Link to="/react" style={{ fontSize: "22px" }}>
                react
              </Link>
            </li>
            <li>
              <Link to="/react-hook" style={{ fontSize: "22px" }}>
                reactHook 学习
              </Link>
            </li>
          </ul>
        </div>
        <div className="rightMain">
          <Suspense fallback={null} className="big">
            <Switch>
              <Route
                exact
                path="/"
                component={() => <Redirect to="/react" />}
              />
              {mainRoutes.map(item => (
                <Route key={item.path} {...item}></Route>
              ))}
            </Switch>
          </Suspense>
        </div>
      </div>
    </Router>
  );
};

export default connect(store => store, {})(App);
