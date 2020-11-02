//实现componentWillUnmount 销毁定时器 、状态、解绑
import React, { useEffect, useState } from "react";
function Child() {
  useEffect(() => {
    console.log("child");
  }, []);

  return (
    <p>
      hello,
      <a
        href="https://mp.weixin.qq.com/s/MhZGp9KOnZa6zECmgb6u3g"
        target="_blank"
      >
        详细内容
      </a>
    </p>
  );
}

function Parent() {
  useEffect(() => {
    console.log("parent");
  }, []);

  return <Child />;
}

export default () => {
  useEffect(() => {
    console.log("app");
  }, []);

  return <Parent />;
};
