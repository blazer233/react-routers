import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import { reactRoutes, reactLinks } from "../../config";
export default () => {
  return (
    <div>
      <div>
        <div className="topNav">
          {reactLinks.map((i, index) => (
            <Link
              {...i}
              key={index}
              style={{ marginLeft: "10px", fontSize: "20px " }}
            >
              {i.title}
            </Link>
          ))}
        </div>
        <hr />
        <div className="videoContent">
          <h3>React</h3>
          <Switch>
            {reactRoutes.map(item => (
              <Route key={item.path} {...item}></Route>
            ))}
          </Switch>
        </div>
      </div>
    </div>
  );
};
