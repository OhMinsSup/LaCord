import axios from "axios";

export const check = () => axios.get("/auth/check");
export const logout = () => axios.post("/auth/logout");
export const generateUnregisterToken = () =>
  axios.get("/user/unregister-token");
export const unregister = unregister_token =>
  axios.post("/user/unregister", { unregister_token });
export const getUserInfo = () => axios.get("/user/info");
