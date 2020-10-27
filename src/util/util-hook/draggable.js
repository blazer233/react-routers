import { useState, useEffect, useRef, useCallback } from "react";
/**
 * 使组件可实时拖动，通过计算鼠标位移，使用transform实现
 * @param onStop returns `false` to cancel
 * @returns `[x, y, dragging, handleMouseDown]`
 * @example <Component style={{transform: `translate(${x}px,${y}px)`}} onMouseDown={handleMouseDown} />
 */
export default ({ x, y, onStop, disabled, scale }) => {
  const [[dx, dy], setPos] = useState([x, y]);
  const [dragging, setDragging] = useState(false);
  const startPos = useRef([0, 0]);

  useEffect(() => setPos([x, y]), [x, y]);

  /**
   * 计算拖动后点的坐标
   */
  const calcPos = useCallback(
    e => {
      const [startX, startY] = startPos.current;
      /**
       * 此处scale为整体的缩放倍数，例如整个画面被放大了2倍，鼠标位移同样距离，实际移动距离应为 距离/2.
       * scale值可为空，默认为1
       */
      const realMultiple = scale ? parseFloat((1 / scale).toFixed(4)) : 1;
      return [
        Math.floor((e.pageX - startX) * realMultiple + dx),
        Math.floor((e.pageY - startY) * realMultiple + dy),
      ];
    },
    [startPos.current, scale, dx, dy]
  );

  useEffect(() => {
    if (dragging) {
      const handleMouseMove = e => {
        setPos(calcPos(e));
        // prevent the event propagate to it's parents
        e.stopPropagation();
      };
      const handleMouseUp = e => {
        setDragging(false);
        // 若onStop返回false则拖动无效，设回初始值
        onStop(calcPos(e)) === false && setPos([x, y]);
        e.stopPropagation();
      };
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp, { once: true });
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
    return undefined;
  }, [dragging]);

  const handleMouseDown = e => {
    startPos.current = [e.pageX, e.pageY];
    setDragging(true);
    e.stopPropagation();
  };

  return [dx, dy, dragging, disabled ? null : handleMouseDown];
};
/**
 * 
```jsx
import useDraggable from '../useDraggable';

const Demo = () => {
    ......
    // 组件坐标状态值
    const [position , setPosition] = useState({ x:0 , y:0 });
    const [x, y, dragging, handleMouseDown] = useDraggable({
        x : position.x,
        y : position.y,
        onStop : (x,y)=>{
            // return false; 若拖动不符合要求，return false 后将复位到初始值
            console.log(`拖动后的坐标为 x:${x} y:${y}`);
            setPosition({ x , y }); //更新本组件中维护的状态值
        },
        disabled : false,
        scale : 1,
    });
    ......

    return (
        <div>
            <Component style={{transform: `translate(${x}px,${y}px)`}} onMouseDown={handleMouseDown} />
            <div>正在拖拽：{dragging?"是":"否"}</div>
        </div>
    );
};
```
 */
