import { combineReducers } from "redux";
import { penderReducer } from "redux-pender";
import file from "./file";
import base from "./base";
import search from "./search";
import youtube from "./youtube";
import auth from "./auth";
import user from "./user";

export default combineReducers({
  file,
  base,
  search,
  youtube,
  auth,
  user,
  pender: penderReducer
});
