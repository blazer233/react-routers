import React, { useState } from "react";
const Example2 = () => {
  const [age, setAge] = useState(18);
  const [sex, setSex] = useState("男");
  const [work, setWork] = useState("前端程序员");
  const [text, setText] = useState("jspang");
  //setState 只在合成事件和钩子函数中是“异步”的，在原生事件和 setTimeout 中都是同步的。
  //useState 异步
  /**
   * 相当于
   * let _useState=useState(0)
   * let count = _useState[0]
   * let setCount=_useState[1]
   */
  /**UseState
   * 返回一个 state，以及更新 state 的函数。
   * 在初始渲染期间，返回的状态 (state) 与传入的第一个参数 (initialState) 值相同。
   * setState 函数用于更新 state。它接收一个新的 state 值并将组件的一次重新渲染加入队列。
   * UseState 可以接受函数入参，这样保存的值是前一次render之后的的参数（如UseState1）
   */
  return (
    <div>
      <p>JSPang 今年:{age}岁</p>
      <p>性别:{sex}</p>
      <p>工作是:{work}</p>
      <button
        onClick={() => {
          setAge(20);
        }}
      >
        改变年龄
      </button>
      <button
        onClick={() => {
          setSex("女");
        }}
      >
        改变性别
      </button>
      <button
        onClick={() => {
          setWork("后端");
        }}
      >
        改变职业
      </button>

      <input
        value={text}
        onChange={e => {
          setText(e.target.value);
        }}
      />
    </div>
  );
};
export default Example2;
