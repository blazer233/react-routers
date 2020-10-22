import React, { Component } from "react";

export default class List extends Component {
  constructor(props) {
    super(props);
    console.log(props.match.params); // 接收传递参数
  }

  render() {
    return (
      <div>
        <h3>page-List{this.props.match.params.cid}</h3>
      </div>
    );
  }
}
