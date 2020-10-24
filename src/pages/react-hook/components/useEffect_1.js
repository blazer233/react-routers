import React, { useEffect, useState } from "react";
const Counter = () => {
  const [count, setCount] = useState(0);
  //每一次函数组件被渲染，都是一个全新的开始
  useEffect(
    () => {
      const id = setInterval(() => {
        setCount(count + 1);
      }, 1000);
      return () => clearInterval(id);
    },
    []
    /**
     * 定时器只加一次的原因在于虽然setInterval函数里面的函数每秒都会执行一次，
     * 但是count值始终是初始的0，因为这个函数绑定了第一轮render之后的count值，
     * 解决办法：
     */
    // 一、setCount返回函数执行 此时setCount里面的函数的入参是前一次render之后的count值，所以这样的情况下计时器可以work

    //   const id = setInterval(() => {
    //     setCount(count => count + 1);
    //   }, 1000);
    //   return () => clearInterval(id);
    // }, []
    // 二、在第二个参数中加入count,如果count有变化，useEffect则会执行，没有变化不执行，所以这样的情况下计时器可以work

    //   const id = setInterval(() => {
    //     setCount(count + 1);
    //   }, 1000);
    //   return () => clearInterval(id);
    // },
    // [count]
  );
  return <h1>{count}</h1>;
};
export default Counter;
/**UseEffect2
 * 1、React首次渲染和之后的每次渲染都会调用一遍useEffect函数，
 * 而之前我们要用两个生命周期函数分别表示首次渲染(componentDidMonut)
 * 和更新导致的重新渲染(componentDidUpdate)。
 *
 * 2、useEffect中定义的函数的执行不会阻碍浏览器更新视图，
 * 也就是说这些函数时异步执行的，而componentDidMonut和
 * componentDidUpdate中的代码都是同步执行的。个人认为这
 * 个有好处也有坏处吧，比如我们要根据页面的大小，然后绘制
 * 当前弹出窗口的大小，如果时异步的就不好操作了。
 *
 * 3、useEffect在每次被调用的时候，都会“记住”这个数组参数，
 * 当下一次被调用的时候，会逐个比较数组中的元素，看是否和
 * 上一次调用的数组元素一模一样，如果一模一样，第一个参数
 * （那个函数参数）也就不用被调用了，如果不一样，就调用那个第一个参数。
 * 如果想useEffect仅仅作为初始加载一次，传空数组，但是如果作为监听使用
 * 则将监听值传入来判断是否有更新，有则出发，没有则不触发
 *
 */
