import { combineReducers } from "redux";
import { penderReducer } from "redux-pender";
import file from "./file";
import base from "./base";

export default combineReducers({
  file,
  base,
  pender: penderReducer
});
