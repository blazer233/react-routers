import React, { useContext } from "react";
import { ColorContext, UPDATE_COLOR } from "./color";

const Buttons = () => {
  const { dispatch } = useContext(ColorContext); //从传过来的参数中拿到触发器(接受对象类型)
  return (
    <div>
      <button
        onClick={() => {
          dispatch({ type: UPDATE_COLOR, color: "red" });
        }}
      >
        红色
      </button>
      <button
        onClick={() => {
          dispatch({ type: UPDATE_COLOR, color: "yellow" });
        }}
      >
        黄色
      </button>
      <button
        onClick={() => {
          dispatch({ type: UPDATE_COLOR, color: "green" });
        }}
      >
        绿色
      </button>
    </div>
  );
};

export default Buttons;
