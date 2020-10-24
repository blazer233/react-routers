import React from "react";

// 添加displayName，方便后续定位和调试
const getDisplayName = WarpedComponent =>
  WarpedComponent.displayName || WarpedComponent.name || "Component";

/**
 * react反向继承的渲染劫持实例
 */
const MyContainer = WarpedComponent =>
  class extends WarpedComponent {
    static displayName = `HOC${getDisplayName(WarpedComponent)}`;
    render() {
      const tree = super.render();
      const props = {
        // 设置传递的props属性 原props + 新设置的style属性
        ...tree.props,
        style: {
          // 设置style参数 原style参数 + 新设置的style参数
          ...tree.props.style,
          fontSize: "30px",
        },
      };
      console.log(props);
      const element = React.cloneElement(tree, props, tree.props.children);
      return element;
    }
  };

class MyComponent extends React.Component {
  render() {
    return (
      <div
        style={{
          backgroundColor: "peru",
          textAlign: "center",
        }}
        className="big"
      >
        通过反向继承，添加了字体大小
      </div>
    );
  }
}
export default MyContainer(MyComponent);
