import React from "react";
import { connect } from "react-redux";

import { Route, Switch, Link } from "react-router-dom";
import { reactHookLinks, reactHookRoutes } from "../../config";
import { setHeadTitle } from "../../store/actionCreators";

const main = ({ setHeadTitle }) => {
  return (
    <div>
      <div>
        <div className="topNav">
          {reactHookLinks.map((i, index) => (
            <Link
              {...i}
              key={index}
              onClick={() => setHeadTitle(i.title)}
              style={{ marginLeft: "10px", fontSize: "20px " }}
            >
              {i.title}
            </Link>
          ))}
        </div>
        <hr />
        <div className="videoContent">
          <Switch>
            {reactHookRoutes.map(item => (
              <Route key={item.path} {...item}></Route>
            ))}
          </Switch>
        </div>
      </div>
    </div>
  );
};
export default connect(store => store, { setHeadTitle })(main);
