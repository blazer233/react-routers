import { useCallback } from "react";
/**
 * 函数防抖
 * @param callback {*} 回调函数
 * @param delay {*} 延迟 ms
 */
export default (callback, delay = 1000) => {
  let _ = "";
  return useCallback((...arg) => {
    clearTimeout(_);
    _ = setTimeout(() => {
      callback.apply(this, arg);
    }, delay);
  }, []);
};
