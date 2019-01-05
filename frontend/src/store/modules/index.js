import { combineReducers } from "redux";
import { penderReducer } from "redux-pender";
import file from "./file";

export default combineReducers({
  file,
  pender: penderReducer
});
