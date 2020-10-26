import { lazy } from "react";
export const mainRoutes = [
  { path: "/react", component: lazy(() => import("./pages/react")) },
  { path: "/react-hook", component: lazy(() => import("./pages/react-hook")) },
];
export const reactLinks = [
  {
    to: "/react/Todolist",
    title: "Todolist",
  },
  {
    to: "/react/Inheritance",
    title: "反向继承_1",
  },
  {
    to: "/react/Inheritance2",
    title: "反向继承_2",
  },
  {
    to: "/react/PropsProxy",
    title: "属性代理",
  },
  {
    to: "/react/RenderProps",
    title: "RenderProps",
  },
  {
    to: "/react/event",
    title: "react事件",
  },
];
export const reactRoutes = [
  {
    path: "/react/Todolist",
    component: lazy(() => import("./pages/react/components/Todolist/TodoList")),
    exact: true,
  },
  {
    path: "/react/Inheritance",
    component: lazy(() =>
      import("./pages/react/components/EnhancedComponent/Inheritance")
    ),
    exact: true,
  },
  {
    path: "/react/Inheritance2",
    component: lazy(() =>
      import("./pages/react/components/EnhancedComponent/Inheritance2.js")
    ),
    exact: true,
  },
  {
    path: "/react/PropsProxy",
    component: lazy(() =>
      import("./pages/react/components/EnhancedComponent/PropsProxy")
    ),
    exact: true,
  },
  {
    path: "/react/RenderProps",
    component: lazy(() => import("./pages/react/components/RenderProps")),
    exact: true,
  },
  {
    path: "/react/event",
    component: lazy(() => import("./pages/react/components/Event")),
    exact: true,
  },
];
export const reactHookLinks = [
  {
    to: "/react-hook/useState",
    title: "useState应用",
  },
  {
    to: "/react-hook/useRef",
    title: "useRef应用",
  },
  {
    to: "/react-hook/useReducer",
    title: "useReducer应用",
  },
  {
    to: "/react-hook/useMemo",
    title: "useMemo应用",
  },
  {
    to: "/react-hook/useEffect_1",
    title: "useEffect_1应用",
  },
  {
    to: "/react-hook/useEffect_2",
    title: "useEffect_2应用",
  },
  {
    to: "/react-hook/useContext",
    title: "useContext应用",
  },
  {
    to: "/react-hook/useCallback",
    title: "useCallback应用",
  },
  {
    to: "/react-hook/UseReducer_try",
    title: "UseReducer_try应用",
  },
];
export const reactHookRoutes = [
  {
    path: "/react-hook/useState",
    component: lazy(() => import("./pages/react-hook/components/useState")),
    exact: true,
  },
  {
    path: "/react-hook/useRef",
    component: lazy(() => import("./pages/react-hook/components/useRef")),
    exact: true,
  },
  {
    path: "/react-hook/useReducer",
    component: lazy(() => import("./pages/react-hook/components/useReducer")),
    exact: true,
  },
  {
    path: "/react-hook/useMemo",
    component: lazy(() => import("./pages/react-hook/components/useMemo")),
    exact: true,
  },
  {
    path: "/react-hook/useEffect_1",
    component: lazy(() => import("./pages/react-hook/components/useEffect_1")),
    exact: true,
  },
  {
    path: "/react-hook/useEffect_2",
    component: lazy(() => import("./pages/react-hook/components/useEffect_2")),
    exact: true,
  },
  {
    path: "/react-hook/useContext",
    component: lazy(() => import("./pages/react-hook/components/useContext")),
    exact: true,
  },
  {
    path: "/react-hook/useCallback",
    component: lazy(() => import("./pages/react-hook/components/useCallback")),
    exact: true,
  },
  {
    path: "/react-hook/UseReducer_try",
    component: lazy(() =>
      import("./pages/react-hook/components/UseReducer_try")
    ),
    exact: true,
  },
];
