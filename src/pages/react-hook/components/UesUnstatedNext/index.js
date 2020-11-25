import React from "react";
import CounterPage from "./pages/counter";
import TodoListPage from "./pages/todolist_page";
import CounterContainer from "./state/CounterContainer";
import TodoListContainer from "./state/TodoListContainer";

// const compose = (...containers) => props =>
//   containers.reduceRight(
//     (children, Container) => (
//       <Container.Provider>{children}</Container.Provider>
//     ),
//     props.children
//   );
function compose(...containers) {
  return function Component(props) {
    console.log(props);
    return containers.reduceRight((children, Container) => {
      console.log(children, Container, props.children);
      return <Container.Provider>{children}</Container.Provider>;
    }, props.children);
  };
}

let Provider = compose(CounterContainer, TodoListContainer);
/**
 * 相当于：
 * <CounterContainer.Provider>
 *  <TodoListContainer.Provider>
     <xxx.Provider>
         MyApp
     </xxx.Provider>
 *  </TodoListContainer.Provider>
 * </CounterContainer.Provider>
 */

// 放在顶层
// export default () => {
//   return (
//     <Provider>
//       <CounterPage />
//       <TodoListPage />
//     </Provider>
//   );
// };
//嵌套数据多层应用
export default () => {
  return (
    <div>
      <CounterContainer.Provider init={10}>
        <CounterPage />
        <TodoListContainer.Provider init={[{ id: -1, title: "init" }]}>
          <TodoListPage />
        </TodoListContainer.Provider>
      </CounterContainer.Provider>
    </div>
  );
};
