import axios from "axios";

export const check = () => axios.get("/auth/check");
