import { combineReducers } from "redux";
import { penderReducer } from "redux-pender";
import file from "./file";
import base from "./base";
import search from "./search";
import youtube from "./youtube";

export default combineReducers({
  file,
  base,
  search,
  youtube,
  pender: penderReducer
});
