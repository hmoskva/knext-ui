import axios from "axios";
import store from "../store";
import errorHandler from "./error";
import constants from "./constants";

const axiosOptions = {
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: {
      toString() {
        return `Bearer ${localStorage.getItem("token")}`;
      }
    }
  },
  timeout: 25000
};
export const ApiV1 = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? constants.DEV_API_URL
      : constants.PROD_API_URL,
  ...axiosOptions
});

ApiV1.interceptors.response.use(function(response) {
  store.commit("setProcessing", "");
  return response;
}, errorHandler);
