import { combineReducers } from "redux";
import modelReducer from "./modelReducer";

export default combineReducers({
  model: modelReducer,
});
