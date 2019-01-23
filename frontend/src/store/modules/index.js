import { combineReducers } from "redux";
import { penderReducer } from "redux-pender";
import file from "./file";
import base from "./base";
import search from "./search";

export default combineReducers({
  file,
  base,
  search,
  pender: penderReducer
});
