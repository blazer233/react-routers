export const createStore = reducer => {
  const state = null,
    listeners = [],
    subscribe = listener => listeners.push(listener),
    getState = () => state,
    dispatch = action => {
      state = reducer(state, action);
      listeners.forEach(listener => listener());
    };
  dispatch({}); // 初始化 state
  return { getState, dispatch, subscribe };
};
