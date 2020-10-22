import React, { lazy, Suspense } from "react";
import { Route, Switch, Redirect, Link } from "react-router-dom";
const routes = [
  {
    path: "/workplaces",
    exact: true,
    component: lazy(() => import("./workplaces/Money")),
  },
  {
    path: "/workplaces/money",
    component: lazy(() => import("./workplaces/Money")),
  },
  {
    path: "/workplaces/wakeUp",
    exact: true,
    component: lazy(() => import("./workplaces/WakeUp")),
  },
];
const Videos = () => {
  return (
    <div>
      <div className="topNav">
        <ul>
          <li>
            <Link to="/workplaces/money">Money教程</Link>
          </li>
          <li>
            <Link to="/workplaces/wakeUp/asas">WakeUp教程</Link>
          </li>
        </ul>
      </div>
      <hr />
      <div className="videoContent">
        <h3>视频教程</h3>
        <Suspense fallback={null}>
          <Switch>
            {routes.map((item, index) => (
              <Route key={index} {...item}></Route>
            ))}
            <Redirect to="/deep"></Redirect>
          </Switch>
        </Suspense>
      </div>
    </div>
  );
};

export default Videos;
