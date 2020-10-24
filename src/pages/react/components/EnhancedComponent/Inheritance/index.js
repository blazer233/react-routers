import React from "react";
import { Button } from "antd";
//可以从构造函数的render()中拿到组件实例对象
class Button1 extends React.Component {
  componentDidMount() {
    console.log("Button1 高阶函数参数中的componentDidMount");
  }
  render() {
    const fatherMathods = () => {};
    console.log("Button1 高阶函数参数中的render");
    return <Button onClick={() => fatherMathods()} type="dashed" />;
  }
}

const Hoc = Component => {
  return class extends Component {
    state = {
      num: 0,
    };
    handleClick = () => {
      this.setState({
        num: this.state.num + 1,
      });
    };
    render() {
      console.log("Hoc 高阶函数中的render");
      // 核心代码
      let renderTree = super.render();
      console.log(
        renderTree,
        "super代表父组件，super.render()即打印父组件实例对象"
      );
      console.log(
        renderTree.props,
        "传入的参数及为父组件，打印父组件实例对象方法"
      );
      let newProps = {
        onClick: this.handleClick,
      };

      return React.cloneElement(renderTree, newProps, this.state.num);
    }
  };
};
export default Hoc(Button1);
