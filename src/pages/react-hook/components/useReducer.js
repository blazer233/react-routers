import React, { useEffect, useReducer } from "react";
const reducer = (state, action) => {
  const { count, Num } = state;
  switch (action.type) {
    case "Add":
      return { Num, count: count + Num };
    case "Num":
      return { count, Num: action.Num };
    default:
      return state;
  }
};
const ReducerDemo = () => {
  const [state, dispatch] = useReducer(reducer, {
    count: 0,
    Num: 1,
  });
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "Add" });
    }, 1000);
    return () => clearInterval(id);
  }, []);
  // 现在useEffect不依赖count，依赖的是dispatch，而dispatch在每次render之后都是不变的，
  // 所以就不会每次render之后都清除计时器再重新设置计时器
  return (
    <>
      <h1>{state.count}</h1>
      <input
        value={state.Num}
        onChange={e => {
          let Num =
            String(Number(e.target.value)) === "NaN"
              ? 0
              : Number(e.target.value);
          dispatch({
            type: "Num",
            Num,
          });
        }}
      />
    </>
  );
};

export default ReducerDemo;
