const createThunkMiddleware = extraArgument => middlewareAPI => {
  let dispatch = middlewareAPI.dispatch;
  let getState = middlewareAPI.getState;
  return next => action => {
    return typeof action === "function"
      ? action(dispatch, getState, extraArgument)
      : next(action);
  };
};

var thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

console.log(thunk);
/**
 * thunk:
 * 执行一层脱掉一层 =>
 * 
 * middlewareAPI => {
        let dispatch = middlewareAPI.dispatch;
        let getState = middlewareAPI.getState;
        return next => action => {
            return typeof action === "function"
            ? action(dispatch, getState, extraArgument)
            : next(action);
        };
    };
 */
export default thunk;
