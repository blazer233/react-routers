import * as type from "./actionTypes";
import axios from "axios";

export const getTodoList = arg => async (dispatch, getState) => {
  console.log(getState(), "返回redux中的数据");
  setTimeout(async () => {
    let res = await axios.get(`http://localhost:3456/${arg}`);
    const data = res.data;
    const action = onGetList(data.list);
    dispatch(action);
  }, 1000);
};

export const onInputEventAction = value => ({
  type: type.CHANGE_INPUT,
  value,
});
export const onClickEventAction = () => ({
  type: type.ADD_ITEM,
});
export const onClickDeleteAction = index => ({
  type: type.DELETE_ITEM,
  index,
});
export const onGetList = list => ({
  type: type.GET_ALL,
  list,
});
export const setHeadTitle = data => ({
  type: type.SET_HEAD_TITLE,
  data,
});
