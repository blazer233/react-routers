import React, { createContext, useReducer } from "react";
//useReducer接收纯函数和一个默认值
//通过创建的createContext将默认值和改变方法扩散出去
export const ColorContext = createContext();
export const UPDATE_COLOR = "UPDATE_COLOR";

const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_COLOR:
      return action.color;
    default:
      return state;
  }
};
console.log(ColorContext);
export const Color = ({ children }) => {
  const [color, dispatch] = useReducer(reducer, "blue");
  return (
    //将颜色和触发器暴露出去
    //Color组件在主组件中为最外层组件
    //props.children为所包含的所有组件
    <ColorContext.Provider value={{ color, dispatch }}>
      {children}
    </ColorContext.Provider>
  );
};

/**
 * hook组件createContext执行之后返回一个react组件对象，可组成<ColorContext.Provider />包裹在
 * 最外层并携带value={xxx}进行传参，在接受组件可以用hook组件中useContext执行并传递ColorContext
 * 拿到所传参数const xxx = useContext(ColorContext),在与hook组件useReducer共同使用时，可将初始值和触发器
 * 同时暴露出去，在各个组件可以共享状态
 *
 */
