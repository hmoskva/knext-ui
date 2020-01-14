import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import modules from "./modules";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { processing: "" },
  mutations: {
    setProcessing(state, value) {
      state.processing = value;
    }
  },
  modules,
  plugins: [createPersistedState()]
});
