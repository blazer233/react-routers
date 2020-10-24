import { applyMiddleware, createStore, compose } from "redux";
import reducer from "./reducer";
import thunk from "redux-thunk";
import logger from "redux-logger";
/**
 * thunk:
 * 它的核心代码其实只有两行，
 * 就是判断每个经过它的action：如果是function类型，就调用这个function
 * （并传入 dispatch 和 getState 及 extraArgument 为参数），
 * 而不是任由让它到达 reducer，因为 reducer 是个纯函数，
 * Redux 规定到达 reducer 的 action 必须是一个 plain object 类型。
 *
 */

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk, logger))
);
/**
 * store方法： 
    dispatch: ƒ dispatch(action)
    getState: ƒ getState()
    replaceReducer: ƒ replaceReducer(nextReducer)
    subscribe: ƒ subscribe(listener)
    Symbol(observable): ƒ observable() 
 */
export default store; //暴露出去
