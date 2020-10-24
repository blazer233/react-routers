import React, { Component } from "react";
export const connect = (
  mapStateToProps = {},
  mapDispatchToProps = {}
) => WrappedComponent => {
  class Connect extends Component {
    state = {
      allProps: {},
    };

    componentWillMount() {
      const { store } = this.context;
      this._updateProps();
      store.subscribe(() => this._updateProps());
    }

    _updateProps() {
      const { store } = this.context;
      let stateProps = mapStateToProps(store.getState(), this.props);
      let dispatchProps = mapDispatchToProps(store.dispatch, this.props);
      this.setState({
        allProps: {
          ...stateProps,
          ...dispatchProps,
          ...this.props,
        },
      });
    }

    render() {
      return <WrappedComponent {...this.state.allProps} />;
    }
  }
  return Connect;
};
//全局注入store
export class Provider extends Component {
  getChildContext() {
    return {
      store: this.props.store,
    };
  }
  //返回所有子组件
  render() {
    return <div>{this.props.children}</div>;
  }
}
