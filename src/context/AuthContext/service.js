import axios from "../../utils/axios";

export const login = (data) => {
  return axios.post(`/api/account/login`, data);
};

export const signUp = (data) => {
  return axios.post("/api/account", data);
};
 