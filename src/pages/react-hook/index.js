import React from "react";
// import { connect } from "../../redux-react";
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
        <h3>react-hooks学习</h3>
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

// const dispatchProps = dispatch => ({
//   setHeadTitle: () => {
//     dispatch(setHeadTitle);
//   },
// });
// export default connect(store => store, dispatchProps)(main);
export default connect(store => store, { setHeadTitle })(main);
/**
 * useMemo和useCallback都会在组件第一次渲染的时候执行，之后会在其依赖的变量发生改变时再次执行；
 * 并且这两个hooks都返回缓存的值，useMemo返回缓存的变量，useCallback返回缓存的函数。
 */
