import * as type from "./actionTypes";
import axios from "axios";
export const getTodoList = arg => async (dispatch, getState, extraArgument) => {
  setTimeout(async () => {
    console.log(getState(), "返回redux中的数据");
    let res = await axios.get(`http://localhost:3456/${arg}`);
    const data = res.data;
    const action = onGetList(data.list);
    dispatch(action);
  }, 500);
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
