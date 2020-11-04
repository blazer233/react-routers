import { applyMiddleware, compose, createStore } from "./core/redux";
import thunk from "./core/redux-thunk";
import reducer from "./reducer";
import logger from "redux-logger";
let TestApplyMiddleware = [
  store => next => action => {
    console.log("打点 >>>");
    next(action);
    console.log("打点 <<<");
  },
  store => next => action => {
    console.log("日志 >>>");
    next(action);
    console.log("日志 <<<");
  },
  ({ getState }) => next => action => {
    console.group(action.type);
    console.info("dispatching", action);
    console.info("next state", getState());
    console.groupEnd();
    return next(action);
  },
];
/**
 * applyMiddleware 即saction和store之间。即dispatch的封装和升级。
 */
/**
 * redux-logger在最后原因在于其原因是害怕最右边的中间件『捣乱』，
 * 不执行 next(action) , 那 logger 再执行 next(action) 也无法真正触发 dispatch .
 * 例如 thunk 处理异步时
 */
/**
 * redux-thunk:
 * 它的核心代码其实只有两行，
 * 就是判断每个经过它的action：如果是function类型，就调用这个function
 * （并传入 dispatch 和 getState 及 extraArgument 为参数），
 * 而不是任由让它到达 reducer，因为 reducer 是个纯函数，
 * Redux 规定到达 reducer 的 action 必须是一个 plain object 类型。
 *
 */
const store = createStore(
  reducer,
  compose(applyMiddleware(thunk, ...TestApplyMiddleware,logger))
);
/**
 * Redux 有五个 API，分别是：
    createStore(reducer, [initialState])
    combineReducers(reducers)
    applyMiddleware(...middlewares)
    bindActionCreators(actionCreators, dispatch)
    compose(...functions)
 * createStore 生成的 store 有四个 API： 
    dispatch: ƒ dispatch(action)
    getState: ƒ getState()
    replaceReducer: ƒ replaceReducer(nextReducer)
    subscribe: ƒ subscribe(listener)
 */
export default store; //暴露出去
