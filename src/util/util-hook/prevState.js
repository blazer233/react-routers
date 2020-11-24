import { useRef, useEffect, useState } from "react";

/**
 * usePrevState: 获取上一次state
 * @param state 
 * @example 
 * const [scrollTop, setScrollTop] = useState(0);
  const prevScrollTop = usePrevState(scrollTop);
 */
export default state => {
  const [State, setNewState] = useState(state);
  const Refs = useRef();
  useEffect(() => {
    Refs.current = State;
    setNewState(state);
  }, [state]);
  return Refs.current;
};
