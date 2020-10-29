export const createStore = (reducer, defaultstate, enhancer) => {
  // 是否传了state初始值的判断
  if (typeof defaultstate === "function" && typeof enhancer === "undefined") {
    enhancer = defaultstate;
    defaultstate = undefined;
  }

  if (typeof enhancer !== "undefined") {
    return enhancer(createStore)(reducer, defaultstate);
  }
  /**
   * 返回 state
   */
  const getState = () => defaultstate;
  const Listeners = [];
  /**
   * 负责注册回调函数的老司机
   *
   * 这里需要注意的就是，回调函数中如果需要获取 state
   * 那每次获取都请使用 getState()，而不是开头用一个变量缓存住它
   * 因为回调函数执行期间，有可能有连续几个 dispatch 让 state 改得物是人非
   * 而且别忘了，dispatch 之后，整个 state 是被完全替换掉的
   * 你缓存的 state 指向的可能已经是老掉牙的 state 了！！！
   *
   * @param  {函数} 想要订阅的回调函数
   * @return {函数} 取消订阅的函数
   */
  const subscribe = listener => {
    var isSubscribed = true;
    Listeners.push(listener);
    return unsubscribe => {
      if (!isSubscribed) return;
      Listeners.splice(Listeners.indexOf(listener), 1);
    };
  };
  /**
   * 改变应用状态 state 的不二法门：dispatch 一个 action
   * 内部的实现是：往 reducer 中传入 defaultstate 以及 action
   * 用其返回值替换 currentState，最后逐个触发回调函数
   *
   * 如果 dispatch 的不是一个对象类型的 action（同步的），而是 Promise / thunk（异步的）
   * 则需引入 redux-thunk 等中间件来反转控制权【悬念2：什么是反转控制权？】
   *
   * @param & @return {对象} action
   */
  const dispatch = action => {
    defaultstate = reducer(defaultstate, action);
    Listeners.forEach(listener => listener()); // 逐个触发回调函数
    return action; // 为了方便链式调用，dispatch 执行完毕后，返回 action（下文会提到的，稍微记住就好了）
  };

  /**
   * 替换当前 reducer 的老司机
   * 主要用于代码分离按需加载、热替换等情况
   *
   * @param {函数} nextReducer
   */
  function replaceReducer(nextReducer) {
    reducer = nextReducer; // 就是这么简单粗暴！
    dispatch({}); // 触发生成新的 state 树
  }

  // 这里 dispatch 只是为了生成 应用初始状态
  dispatch({});

  return {
    dispatch,
    subscribe,
    getState,
    replaceReducer,
  };
};

export const compose = (...funcs) => {
  if (funcs.length === 0) return arg => arg;
  if (funcs.length === 1) return funcs[0];
  return funcs.reduceRight((a, b) => (...args) => a(b(...args)));
};

export const applyMiddleware = (...middlewares) =>
  /* 返回一个函数签名跟 createStore 一模一样的函数，亦即返回的是一个增强版的 createStore */
  createStore => (reducer, preloadedState, enhancer) => {
    // 用原 createStore 先生成一个 store，其包含 getState / dispatch / subscribe / replaceReducer 四个 API
    var store = createStore(reducer, preloadedState, enhancer);
    var dispatch = store.dispatch; // 指向原 dispatch
    var chain = []; // 存储中间件的数组
    // 提供给中间件的 API（其实都是 store 的 API）
    var middlewareAPI = {
      getState: store.getState,
      dispatch: action => dispatch(action), //在createStore中dispatch执行之后会返回action作为链式调用
    };
    //给每个中间件“装上” API
    chain = middlewares.map(middleware => {
      //在中间件中会分别接受getState、dispatch，返回新的二层函数
      return middleware(middlewareAPI);
    });

    // 串联所有中间件
    // 例如，chain 为 [M3, M2, M1]，而 compose 是从右到左进行“包裹”的
    // 最后，我们得到串联后的中间件链：M3(M2(M1(store.dispatch)))
    dispatch = compose(...chain)(store.dispatch);
    return {
      ...store, // store 的 API 中保留 getState / subsribe / replaceReducer
      dispatch, // 新 dispatch 覆盖原 dispatch，往后调用 dispatch 就会触发 chain 内的中间件链式串联执行
    };
  };
