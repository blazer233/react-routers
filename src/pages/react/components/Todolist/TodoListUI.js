import React, { Component, useState, useEffect } from "react";
import PropTypes from "prop-types"; //类型检查、类型赋值
import "antd/dist/antd.css";
import { Input, Button, List, Spin } from "antd";
/*******
 * 高级函数对传入属性进行劫持，判断是否进行渲染
 */
const withLoading = WrappedComponent => {
  return class extends WrappedComponent {
    render() {
      while (!this.props.list.length) {
        return (
          <div style={{ textAlign: "center" }}>
            <Spin />
          </div>
        );
      }
      return super.render();
    }
  };
};

//函数式组件
const Header = () => {
  return <div style={{ textAlign: "center" }}>TodoList小应用</div>;
};
React.memo(Header);

const Foot = prop => {
  const [init, setInit] = useState(0);
  useEffect(() => {
    console.log(init, "点击触发");
    return console.log(init, "点击后触发");
  }, [init]);
  return (
    <span onClick={() => setInit(init => init + 1)}>
      共有{prop.len}条--{init}
    </span>
  );
};
// class Foot extends Component {
//   //类组件 演示 shouldComponentUpdate
//   render() {
//     return <span> 共有{this.props.len}条 </span>;
//   }
//   shouldComponentUpdate(nextProps, nextState) {
//     return !is(nextProps, nextState);
//   }
// }

class TodoListUI extends Component {
  render() {
    console.log(this.props.child, this.props, `11111111111111`);
    return (
      <React.Fragment>
        <div style={{ textAlign: "center" }}>
          <div>
            <Input
              ref={this.props.nameInputRef}
              placeholder={this.props.placeholder_}
              onChange={e => this.props.onInputEvent(e.target.value)}
              value={this.props.value}
              style={{ width: "300px", margin: "10px" }}
            />
            <Button onClick={() => this.props.onClickEvent()}>add</Button>
          </div>
          <div>
            <List
              header={this.props.list.length && <Header />}
              footer={
                this.props.list.length ? (
                  <Foot len={this.props.list.length} />
                ) : (
                  ""
                )
              }
              dataSource={this.props.list}
              renderItem={(item, index) => (
                <List.Item
                  onClick={() => this.props.onClickDelete(index)}
                  style={{ width: "800px", margin: "0 auto" }}
                >
                  {item}
                </List.Item>
              )}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
TodoListUI.propTypes = {
  placeholder_: PropTypes.string, //默认字符串
  value: PropTypes.any.isRequired, //任何类型的值 必要
  list: PropTypes.arrayOf(PropTypes.string), //以字符串组成的数组
};
TodoListUI.defaultProps = {
  placeholder_: "inner key",
  value: "",
  list: [],
};
//高阶函数控制渲染
export default withLoading(TodoListUI);
