import Vue from 'vue';
import Vuex from 'vuex';
import * as fb from '../firebase';

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
    SET_CURRENT_CLIENT(state, client) {
      state.currentClient = client;
    },
    SET_CLIENTS(state, clients) {
      state.clients = clients;
    },
  },
  actions: {
    async fetchCurrentClient({ commit }, id) {
      // console.log('uid', store.state.userProfile.uid);
      const { uid } = fb.auth.currentUser;

      const currentClient = await fb.usersCollection.doc(uid).collection('clients').doc(id).get();

      commit('SET_CURRENT_CLIENT', currentClient.data());
    },

    async addClient({ dispatch }, client) {
      const { uid } = fb.auth.currentUser;

      const newClient = await fb.usersCollection.doc(uid).collection('clients').add(client);

      // set new client as currentClient
      await dispatch('fetchCurrentClient', newClient.id);
    },
  },
  modules: {},
});
