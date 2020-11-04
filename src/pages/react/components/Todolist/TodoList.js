import React, { useRef, useEffect } from "react";
// import { connect } from "../../../../redux-react";
import { connect } from "react-redux";
import {
  onInputEventAction,
  onClickEventAction,
  onClickDeleteAction,
  getTodoList,
} from "../../../../store/actionCreators";
const TodoListUI = React.lazy(() => import("./TodoListUI")); //异步加载组件
const TodoList = ({
  list,
  placeholder_,
  value,
  onInputEventAction,
  onClickEventAction,
  onClickDeleteAction,
  getTodoList,
}) => {
  const nameInputRef = useRef();
  useEffect(() => {
    getTodoList("Todolist");
  }, []);
  return (
    <React.Suspense
      fallback={<div style={{ textAlign: "center" }}>异步加载进行中...</div>}
    >
      <TodoListUI
        placeholder_={placeholder_}
        value={value}
        list={list}
        nameInputRef={nameInputRef}
        onInputEvent={onInputEventAction}
        onClickEvent={onClickEventAction}
        onClickDelete={onClickDeleteAction}
      />
    </React.Suspense>
  );
};
/*
 *两种异步加载方法，一个是React.Suspense自带的属性进行异步记载的回调函数
 *一种是利用高级函数拿到传入的参数进行判断，请求是否成功，来进行动态渲染组件
 * */

// 将store里面的state映射给当前组件，成为组件的props
// 只要 Redux store 发生改变，mapStateToProps 函数就会被调用。该
// 回调函数必须返回一个纯对象，这个对象会与组件的 props 合并
// const mapDispatchToPropsThemeSwitch = dispatch => ({
//   getTodoList() {
//     dispatch(getTodoList);
//   },
//   onInputEventAction() {
//     dispatch(onInputEventAction);
//   },
//   onClickEventAction() {
//     dispatch(onClickEventAction);
//   },
//   onClickDeleteAction() {
//     dispatch(onClickDeleteAction);
//   },
// });
// export default connect(
//   store => store.Todolist,
//   mapDispatchToPropsThemeSwitch
// )(TodoList);
export default connect(store => store.Todolist, {
  getTodoList,
  onInputEventAction,
  onClickEventAction,
  onClickDeleteAction,
})(TodoList);
