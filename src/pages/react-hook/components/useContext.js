import React, { useState, createContext, useContext } from "react";

// createContext创建需要传递的值
// useContext子组件中拿到父组件传的值

/**UseContext1
 * 接收一个 context 对象（React.createContext 的返回值）并返回该 context 的当前值。
 * 当前的 context 值由上层组件中距离当前组件最近的 <MyContext.Provider> 的 value prop 决定。
 * 当组件上层最近的 <MyContext.Provider> 更新时，该 Hook 会触发重渲染，并使用最新传递给 MyContext provider 的 context value 值。
 */
const CountContext = createContext();

const Example4 = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times （父组件）</p>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        click me
      </button>
      value中是被传值
      <CountContext.Provider value={count}>
        <Counter />
      </CountContext.Provider>
      // useContext，和 React.createConext() 配合使用。 父组件使用
      Context.Provider 生产数据，子组件使用 useContext() 获取数据。
    </div>
  );
};
const Counter = () => {
  const count = useContext(CountContext); //一句话就可以得到count
  return <h2>子组件 {count} times</h2>;
};
export default Example4;
