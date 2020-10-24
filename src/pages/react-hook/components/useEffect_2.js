//实现componentWillUnmount 销毁定时器 、状态、解绑
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const abortController = new AbortController();
/**
 * 如果使用userEffect不使用第二个参数
 * 每次状态发生变化，useEffect都进行了解绑，
 * （页面发生任何事件都会进行解绑）,但是当传空数组[]时，
 * 就是当组件将被销毁时才进行解绑
 */
const Index = () => {
  useEffect(() => {
    console.log(`这里是主页`);
    return () => {
      console.log("离开主页");
    };
  }, []);
  return <h1>主页</h1>;
};

const List = () => {
  const [arrData, setDate] = useState([]);
  const fetchData = async () => {
    const result = await axios.get(`http://localhost:3456/Todolist`);
    setDate(result.data.list);
  };
  useEffect(() => {
    fetchData();
    console.log(`这里是列表页`);
    return () => {
      abortController.abort();
      console.log("离开列表页");
    };
  }, [JSON.stringify(arrData)]);
  return (
    <div>
      {arrData.map((item, index) => (
        <h2 key={index} onClick={() => console.log(1)}>
          {item}
        </h2>
      ))}
    </div>
  );
};
/**
 *
 *
 */
const Example3 = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log(`useEffect=>You clicked ${count} times`);
    return () => {
      console.log("====================");
    };
  }, [count]);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        click me
      </button>

      <Router>
        <ul>
          <li>
            <Link to="/">首页</Link>
          </li>
          <li>
            <Link to="/list/">列表</Link>
          </li>
        </ul>
        <Route path="/" exact component={Index} />
        <Route path="/list/" exact component={List} />
      </Router>
    </div>
  );
};

export default Example3;
