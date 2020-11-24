import React, { useState, useMemo } from "react";
//useMemo返回缓存的变量
export default () => {
  const [count, setCount] = useState(1);
  const [val, setValue] = useState("");
  const expensive = useMemo(() => {
    console.log("compute");
    let sum = 100;
    return sum * count;
  }, [count]);

  return (
    <div>
      <h4>
        {count}-{expensive}
      </h4>
      {val}
      <div>
        <button onClick={() => setCount(count + 1)}>+</button>
        <input value={val} onChange={event => setValue(event.target.value)} />
      </div>
      <hr />与 vue 的 computed 类似
      useMemo，返回一个memoized值，只有第二个参数发生变化时才会重新计算。类似
      useCallback。
    </div>
  );
};
