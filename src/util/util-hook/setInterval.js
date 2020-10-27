import { useState, useEffect } from "react";

function timestampToTime() {
  var date = new Date(parseInt(new Date().getTime() / 1000) * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + "-";
  var M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  var D = date.getDate() + " ";
  var h = date.getHours() + ":";
  var m = date.getMinutes() + ":";
  var s = date.getSeconds();
  return Y + M + D + h + m + s;
}
export default () => {
  const [newState, setNewState] = useState("");
  useEffect(() => {
    let k = setInterval(() => {
      setNewState(timestampToTime());
    }, 1000);
    return () => {
      clearInterval(k);
    };
  }, [newState]);
  return newState;
};
