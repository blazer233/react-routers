import React, {
  useEffect,
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";

const Child = (props, ref) => {
  useImperativeHandle(ref, () => ({
    test: () => {
      console.log("i am child's test method");
    },
  }));

  return <div> i am test's child </div>;
};

export default () => {
  const ref = useRef();
  const FChild = forwardRef(Child);

  const clickBtn = () => ref.current.test();

  return (
    <div>
      <button onClick={clickBtn}> click me </button>
      <FChild ref={ref}></FChild>
    </div>
  );
};
