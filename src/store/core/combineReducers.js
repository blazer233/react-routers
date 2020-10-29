export default reducers => (state = {}, action) =>
  Object.keys(reducers).reduce((nextState, key) => {
    nextState[key] = reducers[key](state[key], action);
    return nextState;
  }, {});

// export default reducers => {
//   var reducerKeys = Object.keys(reducers);
//   var finalReducers = {};

//   for (var i = 0; i < reducerKeys.length; i++) {
//     var key = reducerKeys[i];
//     if (typeof reducers[key] === "function") {
//       finalReducers[key] = reducers[key];
//     }
//   }

//   var finalReducerKeys = Object.keys(finalReducers);

//   // 返回合成后的 reducer
//   return function combination(state = {}, action) {
//     var hasChanged = false;
//     var nextState = {};
//     for (var i = 0; i < finalReducerKeys.length; i++) {
//       var key = finalReducerKeys[i];
//       var reducer = finalReducers[key];
//       var previousStateForKey = state[key]; // 获取当前子 state
//       var nextStateForKey = reducer(previousStateForKey, action); // 执行各子 reducer 中获取子 nextState
//       nextState[key] = nextStateForKey; // 将子 nextState 挂载到对应的键名
//       hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
//     }
//     return hasChanged ? nextState : state;
//   };
// };
