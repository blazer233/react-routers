export const createStore = (reducer, defaultstate, enhancer) => {
  // 是否传了state初始值的判断
  if (typeof defaultstate === "function" && typeof enhancer === "undefined") {
    enhancer = defaultstate;
    defaultstate = undefined;
  }
  //如果有中间件，则直接走中间件路线
  if (typeof enhancer !== "undefined") {
    return enhancer(createStore)(reducer, defaultstate);
  }
  const Listeners = [];
  const getState = () => defaultstate;
  const subscribe = listener => Listeners.push(listener);
  const dispatch = action => {
    defaultstate = reducer(defaultstate, action);
    Listeners.forEach(listener => listener()); // 逐个触发回调函数
    return action; // 为了方便链式调用，dispatch 执行完毕后，返回 action (对象)
  };
  dispatch({});
  return {
    dispatch,
    subscribe,
    getState,
  };
};

export const compose = (...funcs) => {
  if (funcs.length === 0) return arg => arg;
  if (funcs.length === 1) return funcs[0];
  return funcs.reduceRight((a, b) => (...args) => a(b(...args)));
};
/**
 * 同步串行化compose
 */

export const compose = (...args) => arg =>
  args.reduce((composed, f) => f(composed), arg);

export const applyMiddleware = (...middlewares) =>
  /* 返回的是一个增强版的 createStore */
  createStore => (...args) => {
    //reducer, preloadedState, enhancer
    // 用原 createStore 先生成一个 store，其包含 getState / dispatch / subscribe / replaceReducer 四个 API
    var store = createStore(...args);
    var dispatch = store.dispatch; // 指向原 dispatch
    var chain = []; // 存储中间件的数组
    var middlewareAPI = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args),
      //在createStore中dispatch执行之后会返回action作为链式调用action => dispatch(action)
    };
    // 应用中间件的第一层参数, 为了给中间件暴露store的getState和dispatch方法
    chain = middlewares.map(middleware => middleware(middlewareAPI));
    // 串联所有中间件
    // 例如，chain 为 [M3, M2, M1]，而 compose 是从右到左进行“包裹”的
    // 最后，我们得到串联后的中间件链：M3(M2(M1(store.dispatch)))
    // compose 带来的就是剥洋葱似的函数调用 compose(f, g, h) => (...args) => f(g(h(...args)))
    // redux 中间件的核心就是复写 dispatch
    // 把 store.dispatch 传递给第一个中间件
    // 每一个中间件都会返回一个新的 dispatch 传递给下一个中间件 即next
    //store.dispatch作为永远向下传递的值去接受action
    dispatch = compose(...chain)(store.dispatch);
    return {
      //返回新的store
      ...store, // store 的 API 中保留 getState / subsribe / replaceReducer
      dispatch, // 新 dispatch 覆盖原 dispatch，往后调用 dispatch 就会触发 chain 内的中间件链式串联执行
    };
  };
