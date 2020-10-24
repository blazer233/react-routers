import React from "react";
import { MouseMove } from "./SimpleCom";
const App = props => {
  const { x, y, title } = props; // 接收 move 属性
  console.log(props, "props");
  return (
    <div
      style={{ height: "100px", backgroundColor: "plum", textAlign: "center" }}
    >
      <h1>
        {title} ({x}, {y})
      </h1>
    </div>
  );
};
export default MouseMove(App); // 返回高阶函数
