import { useState, useCallback } from "react";
import createContainer from "../core";

function useCounter(initialState = 0) {
  let [count, setCount] = useState(initialState);

  let decrement = useCallback(() => setCount(count => count - 1), []);
  let increment = useCallback(() => setCount(count => count + 1), []);

  return { count, decrement, increment };
}

export default createContainer(useCounter);
