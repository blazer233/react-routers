import React from "react";
import ShowArea from "./showArea";
import Buttons from "./showButton";
import { Color } from "./color"; //引入Color组件

export default () => {
  return (
    <div>
      <Color>
        <ShowArea />
        <Buttons />
      </Color>
    </div>
  );
};
/**
 * hook组件createContext执行之后返回一个react组件对象，可组成<ColorContext.Provider />包裹在
 * 最外层并携带value={xxx}进行传参，在接受组件可以用hook组件中useContext执行并传递ColorContext
 * 拿到所传参数const xxx = useContext(ColorContext),在与hook组件useReducer共同使用时，可将初始值和触发器
 * 同时暴露出去，在各个组件可以共享状态
 */
