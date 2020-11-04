import React from "react";
import { Route, Switch, Link } from "react-router-dom";
// import { connect } from "../../redux-react";
import { connect } from "react-redux";
import { reactRoutes, reactLinks } from "../../config";
import { setHeadTitle } from "../../store/actionCreators";
const main = ({ setHeadTitle }) => {
  return (
    <div>
      <div>
        <div className="topNav">
          {reactLinks.map((i, index) => (
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
        <h3>react学习</h3>
        <div className="videoContent">
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
// const dispatchProps = dispatch => ({
//   setHeadTitle: i => {
//     dispatch(setHeadTitle(i));
//   },
// });
// export default connect(store => store, dispatchProps)(main);
export default connect(store => store, { setHeadTitle })(main);
