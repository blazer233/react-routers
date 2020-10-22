// 啥玩意是嵌套路由
import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link,
  // Prompt,
} from "react-router-dom";
import "./assets/css/AppRouter2.css";

const routes = [
  { path: "/deep", component: lazy(() => import("./pages/Deep")) },
  { path: "/videos", component: lazy(() => import("./pages/Videos")) },
  { path: "/workplaces", component: lazy(() => import("./pages/Workplaces")) },
];

function AppRouter2() {
  return (
    <Router>
      <div className="mainDiv">
        <div className="leftNav">
          <h1>一级导航</h1>
          <ul>
            <li>
              <Link to="/deep">博客首页</Link>
            </li>
            <li>
              <Link to="/videos">视频教程</Link>
            </li>
            <li>
              <Link to="/workplaces">职场技能</Link>
            </li>
          </ul>
        </div>
        <div className="rightMain">
          <Suspense fallback={null} className="big">
            <Switch>
              {/* <Prompt message="Are you sure you want to leave?" /> */}
              <Route exact path="/" component={() => <Redirect to="/deep" />} />
              {routes.map(item => (
                <Route key={item.path} {...item}></Route>
              ))}
              <Route component={() => <Redirect to="/" />}></Route>
            </Switch>
          </Suspense>
        </div>
      </div>
    </Router>
  );
}

export default AppRouter2;
