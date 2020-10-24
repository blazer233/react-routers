import React, { useContext } from "react";
import { ColorContext } from "./color";

const ShowArea = () => {
  console.log(
    useContext(ColorContext),
    `   ColorContext从./color中加载，被本组件的useContext所解析`
  );
  const { color } = useContext(ColorContext);
  return <div style={{ color }}>字体颜色为{color}</div>;
};

export default ShowArea;
