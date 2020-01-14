import axios from "axios";
import { ApiV1 } from "../helpers/Api";

const resource = "/users";

export default {
  login({ email, password }) {
    let body = JSON.stringify({ email, password });
    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    return axios.post(`${process.env.VUE_APP_API_URL_PROD}/users/login`, body, {
      headers
    });
  },
  register(user) {
    const body = JSON.stringify(user);
    return ApiV1.post(`${resource}/signup`, body);
  },
  update(payload, id) {
    const body = JSON.stringify(payload);
    return ApiV1.patch(`${resource}/${id}`, body);
  },
  fetchOne(id) {
    return ApiV1.get(`${resource}/${id}`);
  },
  changePassword({ payload, userId }) {
    const body = JSON.stringify(payload);
    return ApiV1.post(`${resource}/${userId}/change-password`, body);
  },
  sendResetMail(email) {
    return ApiV1.post(`/auth/reset/${email}`);
  },
  resetPassword({ token, userID, password }) {
    const body = JSON.stringify({ password });
    return ApiV1.post(
      `${resource}/update_new_password/${userID}/${token}`,
      body
    );
  }
};
