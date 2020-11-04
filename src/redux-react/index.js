import React, {
  useContext,
  useRef,
  useLayoutEffect,
  useReducer,
  useMemo,
  useEffect,
} from "react";
import shallowEqual from "./shallowEqual";
import Subscription from "./Subscription";
const ReactReduxContext = React.createContext();

export const Provider = ({ store, children }) => {
  // 这是要传递的context
  // 里面放入store和subscription实例
  const contextValue = useMemo(() => {
    const subscription = new Subscription(store); //发布订阅
    // 注册回调为通知子组件，这样就可以开始层级通知了,便利执行
    subscription.onStateChange = subscription.notifyNestedSubs;
    return {
      store,
      subscription,
    };
  }, [store]);
  // 拿到之前的state值
  const previousState = useMemo(() => store.getState(), [store]);
  // 每次contextValue或者previousState变化的时候
  // 用notifyNestedSubs通知子组件
  useEffect(() => {
    const { subscription } = contextValue;
    // 注册回调的函数
    subscription.trySubscribe();
    // state有变动，便利执行
    if (previousState !== store.getState()) subscription.notifyNestedSubs();
  }, [contextValue, previousState]); //监视store变化

  // 返回ReactReduxContext包裹的组件，传入contextValue
  // 里面的内容就直接是children，我们不动他
  return (
    <ReactReduxContext.Provider value={contextValue}>
      {children}
    </ReactReduxContext.Provider>
  );
};

// 第一层函数接收mapStateToProps和mapDispatchToProps
export const connect = (
  mapStateToProps = () => {},
  mapDispatchToProps = () => {}
) =>
  // 第二层函数是个高阶组件，里面获取context
  // 然后执行mapStateToProps和mapDispatchToProps
  // 再将这个结果组合用户的参数作为最终参数渲染WrappedComponent
  // WrappedComponent就是我们使用connext包裹的自己的组件
  WrappedComponent => props => {
    // 复制一份props到wrapperProps
    const { ...wrapperProps } = props;

    // 获取context的值
    const contextValue = useContext(ReactReduxContext);

    const { store, subscription: parentSub } = contextValue; // 解构出store和parentSub
    const state = store.getState(); // 拿到state

    // 组装最终的props
    const actualChildProps = {
      ...mapStateToProps(state),
      ...mapDispatchToProps(store.dispatch),
      ...wrapperProps,
    };

    // 记录上次渲染参数
    const lastChildProps = useRef();
    // 使用useLayoutEffect保证同步执行
    useLayoutEffect(() => {
      lastChildProps.current = actualChildProps;
    }, [actualChildProps]);

    // 使用useReducer触发强制更新
    const [, forceComponentUpdateDispatch] = useReducer(count => count + 1, 0);

    // 新建一个subscription实例
    const subscription = new Subscription(store, parentSub);

    // state回调抽出来成为一个方法
    const checkForUpdates = () => {
      const newChildProps = {
        ...mapStateToProps(state),
        ...mapDispatchToProps(store.dispatch),
        ...wrapperProps,
      };
      // 如果参数变了，记录新的值到lastChildProps上
      // 并且强制更新当前组件
      if (!shallowEqual(newChildProps, lastChildProps.current)) {
        lastChildProps.current = newChildProps;

        // 需要一个API来强制更新当前组件
        forceComponentUpdateDispatch();

        // 然后通知子级更新
        subscription.notifyNestedSubs();
      }
    };

    // 使用subscription注册回调
    subscription.onStateChange = checkForUpdates;
    subscription.trySubscribe();

    // 修改传给子级的context
    // 将subscription替换为自己的
    const overriddenContextValue = {
      ...contextValue,
      subscription,
    };

    // 渲染WrappedComponent
    // 再次使用ReactReduxContext包裹，传入修改过的context
    return (
      <ReactReduxContext.Provider value={overriddenContextValue}>
        <WrappedComponent {...actualChildProps} />
      </ReactReduxContext.Provider>
    );
  };
