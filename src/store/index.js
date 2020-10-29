import { applyMiddleware, compose, createStore } from "./core/redux";
import reducer from "./reducer";
import thunk from "./core/redux-thunk";
import logger from "redux-logger";
/**
 * applyMiddleware 即saction和store之间。即dispatch的封装和升级。
 */
/**
 * Redux 引入中间件机制，其实就是为了在 dispatch 前后，统一事件
  诸如统一的日志记录、引入 thunk 统一处理异步 Action Creator 等都属于中间件
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
console.log(createStore);
let res = applyMiddleware(thunk, logger);
console.log(res); //返回第一层 createStore => (reducer, preloadedState, enhancer) => {}
const store = createStore(reducer, compose(res));
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
