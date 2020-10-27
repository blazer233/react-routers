import React, { useState, useRef } from "react";
import useCounter from "../../../util/util-hook/setInterval";
import useWinSize from "../../../util/util-hook/winSize";
import useWatch from "../../../util/util-hook/prevState";
import useThrottle from "../../../util/util-hook/throttle";
import useDebounce from "../../../util/util-hook/debounce";

export default () => {
  const infsT = useRef();
  const infsD = useRef();
  const [count, setCount] = useState(0);
  const prevCount = useWatch(count);
  const number = useCounter();
  const size = useWinSize();
  const aThrottle = useThrottle(() => console.log(infsT.current.value), 1000);
  const aDebounce = useDebounce(() => console.log(infsD.current.value), 1000);
  return (
    <div>
      <div>
        页面Size:{size.width}x{size.height}
        时间：{number}
      </div>
      <hr />
      <div>
        <p> 当前的count是{count}</p>
        <p> 前一次的count是{prevCount}</p>
        <p>
          <button onClick={() => setCount(count + 1)}>count++</button>
          &emsp;
          <button onClick={() => setCount(count - 1)}>count--</button>
        </p>
      </div>
      <hr />
      <div>
        <span>节流自定义hook</span>
        <input type="text" ref={infsT} onChange={aThrottle} />
      </div>
      <div>
        <span>防抖自定义hook</span>
        <input type="text" ref={infsD} onChange={aDebounce} />
      </div>
    </div>
  );
};
