import React from "react";
import "antd/dist/antd.css";
import { Button, Card } from "antd";
class EventTest extends React.Component {
  state = {
    count: 1,
  };
  componentDidMount() {
    document.addEventListener("click", () => this.bodyClickHandler());
  }
  componentWillUnmount() {
    // 及时销毁自定义 DOM 事件
    document.body.removeEventListener("click", () => this.bodyClickHandler());
    // clearTimeout
  }
  bodyClickHandler() {
    this.setState({
      count: this.state.count + 1000,
    });
    console.log("页面点击", this.state.count);
  }
  clickHandler(e) {
    e.preventDefault(); // 阻止默认行为
    e.stopPropagation(); // 阻止冒泡
    console.log("e.target 指向当前元素，即当前元素触发", e.target);
    console.log("e.currentTarget  指向当前元素，假象!", e.currentTarget);

    console.error(
      "注意，event 其实是 React 封装的,可以看 __proto__.constructor 是 SyntheticEvent 组合事件"
    );
    console.log("e  不是原生的 e ，原生的 MouseEvent", e);
    console.log("e.__proto__.constructor", e.__proto__.constructor);

    console.error("原生 e 如下。其 __proto__.constructor 是 MouseEvent");
    console.log("e.nativeEvent", e.nativeEvent);

    console.log(
      "e.nativeEvent.target  指向当前元素，即当前元素触发",
      e.nativeEvent.target
    );
    console.log(
      " e.nativeEvent.currentTarget 指向 document !",
      e.nativeEvent.currentTarget
    );

    // 1. e 是 SyntheticEvent ，模拟出来 DOM 事件所有能力
    // 2. e.nativeEvent 是原生事件对象
    // 3. 所有的事件，都被挂载到 document 上
    // 4. 和 DOM 事件不一样，和 Vue 事件也不一样

    this.setState((state, prams) => ({
      count: state.count + 1,
    }));
    this.setState((state, prams) => ({
      count: state.count + 1,
    }));
    this.setState((state, prams) => ({
      count: state.count + 1,
    }));
    setTimeout(() => {
      this.setState({
        count: this.state.count - 1,
      });
      console.log("count in setTimeout", this.state.count);
    }, 1000);
  }
  render() {
    return (
      <React.Fragment>
        <Button onClick={e => this.clickHandler(e)}> 测试click事件 </Button>
        <Card title="Default size card" style={{ width: 300 }}>
          <p>{this.state.count}</p>
        </Card>
      </React.Fragment>
    );
  }
}
export default EventTest;
