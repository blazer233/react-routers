import * as type from "./actionTypes";
import { combineReducers } from "redux";

import { fromJS } from "immutable";
const defaultDate = {
  placeholder_: "inner key",
  list: [],
  value: "",
};
let res;

const initTitle = "React";
const HeadTitle = (state = initTitle, action) => {
  switch (action.type) {
    case type.SET_HEAD_TITLE:
      document.title = action.data;
      return action.data;
    default:
      return state;
  }
};

//判断state指向的是否是同一个内存地址就知道state是否发生了变化，以此来决定是否进行render重新渲染,如果不是拷贝而是复制
//内存地址就没有发生变化
const Todolist = (state = defaultDate, action) => {
  switch (action.type) {
    case type.GET_ALL:
      return { ...state, list: action.list };
    case type.CHANGE_INPUT:
      return { ...state, value: action.value };
    case type.ADD_ITEM:
      res = fromJS(state).toJS();
      if (!res.value) return res;
      res.list.unshift(res.value);
      res.value = "";
      return res;
    case type.DELETE_ITEM:
      res = fromJS(state).toJS();
      res.list.splice(action.index, 1);
      return res;
    default:
      return state;
  }
};
export default combineReducers({
  HeadTitle,
  Todolist,
});
