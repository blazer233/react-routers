import React, { useState, useMemo } from "react";

const ChildComponent = ({ children, name }) => {
  const changeA = name => {
    console.log("她来了，她来了。小A向我们走来了");
    return name;
  };

  //   const changeAction = changeA(name);
  const changeAction = useMemo(() => changeA(name), [name]);

  return (
    <>
      <div>{changeAction}</div>
      <div>{children}</div>
    </>
  );
};

const Example7 = () => {
  const [A_, Astatus] = useState("A的状态");
  const [B_, Bstatus] = useState("B的状态");
  return (
    <div>
      <button
        onClick={() => {
          Astatus(+new Date() + ",A的状态");
        }}
      >
        A
      </button>
      <button
        onClick={() => {
          Bstatus(+new Date() + ",B的状态");
        }}
      >
        B
      </button>
      <ChildComponent name={A_}>{B_}</ChildComponent>
    </div>
  );
};
export default Example7;
