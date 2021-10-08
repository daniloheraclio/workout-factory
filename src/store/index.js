import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
    userProfile: {},
  },
  mutations: {
    SET_IS_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
    SET_USER_PROFILE(state, user) {
      state.userProfile = user;
    },
  },
  actions: {},
  modules: {},
});
