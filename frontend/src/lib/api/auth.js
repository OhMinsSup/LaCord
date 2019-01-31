import axios from "axios";

export const checkExists = ({ key, value }) =>
  axios.get(`/auth/exists/${key}/${value}`);
export const register = ({ username, email, password }) =>
  axios.post("/auth/register/local", {
    username,
    email,
    password
  });
export const login = ({ email, password }) =>
  axios.post("/auth/login/local", { email, password });
