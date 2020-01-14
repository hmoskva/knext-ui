import jwtDecode from "jwt-decode";
import router from "@/router";
import { ServiceFactory } from "@/services";

const UserService = ServiceFactory.get("users");

const state = {
  token: localStorage.getItem("token") || "",
  lastLogin: 0,
  user: {}
};

const getters = {
  isAuthenticated: state => !!state.token,
  profile: state => state.user
};

const actions = {
  async register({ commit, dispatch }, payload) {
    try {
      commit("setProcessing", "register");
      const resp = await UserService.register(payload);
      const { token } = resp.data.data;
      const decodedJwt = jwtDecode(token);
      localStorage.setItem("token", token);
      await dispatch("fetchProfile", { id: decodedJwt._id, token });
    } catch (error) {
      throw error;
    }
  },
  async login({ commit, dispatch }, { email, password }) {
    try {
      commit("setProcessing", "login");
      const resp = await UserService.login({ email, password });
      const { token } = resp.data.data;
      localStorage.setItem("token", token);
      const { _id: id } = jwtDecode(token);
      await dispatch("fetchProfile", { id, token });
    } catch (error) {
      throw error;
    }
  },
  async fetchProfile({ commit }, { id, token }) {
    try {
      commit("setProcessing", "fetchProfile");
      const resp = await UserService.fetchOne(id);
      commit("authSuccess", { token, user: resp.data.data });
    } catch (error) {
      throw error;
    }
  },
  async updateProfile({ commit, getters }, payload) {
    try {
      commit("setProcessing", "updateProfile");
      const resp = await UserService.update(payload, getters.profile._id);
      commit("updateUser", {
        ...resp.data.data,
        organization: getters.profile.organization
      });
    } catch (error) {
      throw error;
    }
  },
  async changePassword({ commit, getters }, payload) {
    try {
      commit("setProcessing", "changePassword");
      const resp = await UserService.changePassword({
        payload,
        userId: getters.profile._id
      });
      return resp.data.data;
    } catch (error) {
      throw error;
    }
  },
  logout({ commit }) {
    localStorage.removeItem("token");
    commit("authLogout");
    router.push({ name: "login" });
  }
};

const mutations = {
  authSuccess(state, { token, user = {} }) {
    state.token = token;
    state.user = user;
    state.lastLogin = Date.now();
  },
  authLogout(state) {
    state.token = "";
    state.user = {};
  },
  updateUser(state, newProfile) {
    state.user = newProfile;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
