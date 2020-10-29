export const createStore = (reducer, defaultstate, enhancer) => {
  if (typeof defaultstate === "function" && typeof enhancer === "undefined") {
    enhancer = defaultstate;
    defaultstate = undefined;
  }
  if (enhancer) return enhancer(createStore)(reducer, defaultstate);
  const Listeners = [];
  const getState = () => defaultstate;
  const subscribe = listener => Listeners.push(listener);
  const dispatch = action => {
    defaultstate = reducer(defaultstate, action);
    Listeners.forEach(listener => listener());
    return action;
  };
  dispatch({});
  return {
    dispatch,
    subscribe,
    getState,
  };
};
// function compose(...funcs) {
//   return arg => funcs.reduceRight((composed, f) => f(composed), arg);
// }
export const compose = (...funcs) => {
  if (funcs.length === 0) return arg => arg;
  if (funcs.length === 1) return funcs[0];
  return funcs.reduceRight((a, b) => (...args) => a(b(...args)));
};

export const applyMiddleware = (...middlewares) => createStore => (...args) => {
  var store = createStore(...args);
  var dispatch = store.dispatch;
  var chain = [];
  var middlewareAPI = {
    getState: store.getState,
    dispatch: (...args) => dispatch(...args),
  };
  chain = middlewares.map(middleware => middleware(middlewareAPI));
  dispatch = compose(...chain)(store.dispatch);
  return {
    ...store,
    dispatch,
  };
};
