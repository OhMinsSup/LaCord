import axios from "axios";

export const check = () => axios.get("/auth/check");
export const logout = () => axios.post("/auth/logout");
