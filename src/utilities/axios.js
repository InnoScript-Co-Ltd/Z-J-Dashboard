import axios from "axios";
import { baseURL } from "../constants/endpoints";
import { keys } from "../constants/settings";

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

const http = axios.create({
  baseURL: `${baseURL}/api/v1/admin`,
});

http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(keys.API_TOKEN) ? localStorage.getItem(keys.API_TOKEN) : null;

    if (token) {
      config.headers = {
        ...config.headers,
        authorization: `Bearer ${token}`,
        Accept: "Application/json",
      };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;