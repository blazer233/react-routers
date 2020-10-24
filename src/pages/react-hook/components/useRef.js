import React, { useRef, useEffect,useState } from "react";
// const Example8 = () => {
//   const inputEl = useRef();
//   const onButtonClick = () => {
//     inputEl.current.value = "Hello ,JSPang";
//     console.log(inputEl); //输出获取到的DOM节点
//   };
//   useEffect(() => {
//     console.log(inputEl);
//   });
//   return (
//     <>
//       {/*保存input的ref到inputEl */}
//       <input ref={inputEl} type="text" />
//       <button onClick={onButtonClick}>在input上展示文字</button>
//     </>
//   );
// };
function Example8() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      console.log(`You clicked ${count} times`);
    }, 3000);
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
export default Example8;
