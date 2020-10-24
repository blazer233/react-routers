import React from "react";
/*
高阶组件
接收组件返回带参数的组件，添加参数
属性代理
*/
export const MouseMove = Component => {
  class withMouseComponent extends React.Component {
    state = { x: 0, y: 0 };
    handleMouseMove = event => {
      this.setState({
        x: event.clientX,
        y: event.clientY,
      });
    };
    render() {
      let props = {
        ...this.props,
        ...this.state,
        title: "通过属性代理实现 The move position is",
      };
      return (
        <div onMouseMove={this.handleMouseMove}>
          {/* 1. 透传所有 props 2. 增加 move 属性 */}
          <Component {...props} />
        </div>
      );
    }
  }
  return withMouseComponent;
};
