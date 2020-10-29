import React, { useState, useCallback, useEffect } from "react";
const Child = ({ callback }) => {
  const [count, setCount] = useState(() => callback());
  useEffect(() => {
    console.log(111);
    setCount(callback());
  }, [callback]);
  return <div>{count}</div>;
};
export default () => {
  const [count, setCount] = useState(1);
  const [val, setVal] = useState("");
  const callback_ = useCallback(() => count, [count]);
  return (
    <div>
      <h4>{count}</h4>
      <Child callback={callback_} />
      <div>
        <button onClick={() => setCount(count + 1)}>+</button>
        <input value={val} onChange={event => setVal(event.target.value)} />
        父组件更新但子组件不会重复渲染
      </div>
      <hr />
      <p>
        useCallback，返回一个memoized函数，第二个参数类似useEffect，只有参数变化时才会更改。
      </p>
      <p>useCallback(fn，inputs) 等效 useMemo(() =>fn，inputs)。</p>
    </div>
  );
};
