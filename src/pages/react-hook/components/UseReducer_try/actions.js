import { UPDATE_COLOR } from "./color";

export const changeColor = value => {
  return {
    type: UPDATE_COLOR,
    value,
  };
};
