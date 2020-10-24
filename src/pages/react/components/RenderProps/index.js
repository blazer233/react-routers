import React from "react";
const Shows = mouse => {
  //被渲染输出的组件
  let { x, y } = mouse;
  return <div style={{ position: "absolute", left: x, top: y }}>hello</div>;
};
class RendeComponent extends React.Component {
  //提供参数和方法，外层的组件
  state = { x: 0, y: 0 };
  handleMouseMove = event => {
    this.setState({
      x: event.clientX,
      y: event.clientY,
    });
  };
  render() {
    return (
      <div
        style={{ backgroundColor: "salmon" }}
        onMouseMove={this.handleMouseMove}
      >
        {/* 将当前 state 作为 props ，传递给 render （render 是一个函数组件） */}
        {this.props.renderthisComponent({ ...this.state, ...this.props })}
      </div>
    );
  }
}

const RenderProps = props => {
  return (
    <div>
      <RendeComponent
        renderthisComponent={
          /* render 是一个函数组件 */
          props => (
            <h1>
              {props.alt} {props.title} {props.x}, {props.y}
              {props.x && <Shows x={props.x} y={props.y} />}
            </h1>
          )
        }
        title="The mouse position is"
        alt="render prop 进行参数参数与视图的抽离"
      />
    </div>
  );
};

export default RenderProps;
