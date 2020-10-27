import { useCallback } from "react";

/**
 * 函数节流
 * @param callback {*} 回调函数
 * @param delay {*} 延迟 ms
 */

export default (callback, delay = 500) => {
  let immediate = +new Date(),
    clear;
  return useCallback((...arg) => {
    let b = +new Date() - immediate;
    if (b > delay) {
      clear = setTimeout(() => {
        callback(arg);
        clear = "";
      }, delay);
      immediate = +new Date();
    }
  }, []);
};
