import { createStore } from "./redux";
import reduce from "./themeReducer";
const store = createStore(reduce);
export default store;


