const state = {
  pageLoadingState: false
};

const getters = {};

const actions = {};

const mutations = {
  currentlyLoading(state) {
    state.pageLoadingState = true;
  },
  doneLoadingPage(state) {
    state.pageLoadingState = false;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
