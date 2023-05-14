import axios from "axios";
import { Navigate } from "react-router-dom";
// Alter defaults after instance has been created
const authAxios = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
});

// Add a request interceptor
authAxios.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("eventi") !== undefined &&
      localStorage.getItem("eventi") !== null
        ? localStorage.getItem("eventi")
        : "";
    if (token) {
      config.headers["Authorization"] = token;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

//Add a response interceptor

authAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      localStorage.removeItem("eventi");
      localStorage.removeItem("user");
      <Navigate exact to="/login" />
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);
export default authAxios;
