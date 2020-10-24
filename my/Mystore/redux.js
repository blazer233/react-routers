export const createStore = reducer => {
  const state = null,
    listeners = [],
    subscribe = listener => listeners.push(listener),
    /**
     * 当调用 subscribe，传入一个函数作为参数时，就会给 listeners 列表 push 这个函数。
     * 同时调用 subscribe 函数会返回一个 unsubscribe 函数，用来解绑当前传入的函数，
     * 同时在 subscribe 函数定义了一个 isSubscribed 标志变量来判断当前的订阅是否已经被解绑，
     * 解绑的操作就是从 nextListeners 列表中删除当前的监听函数。
     */
    getState = () => state,
    dispatch = action => {
      state = reducer(state, action);
      listeners.forEach(listener => listener());
    };
  dispatch({}); // 初始化 state
  return { getState, dispatch, subscribe };
};
