import Vue from 'vue';
import Vuex from 'vuex';
import * as fb from '../firebase';
import { getAge } from '../helpers/helper-string';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
    userProfile: {},
    clients: [],
  },
  mutations: {
    SET_IS_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
    SET_USER_PROFILE(state, user) {
      state.userProfile = user;
    },
    // SET_CURRENT_CLIENT(state, client) {
    //   state.currentClient = client;
    // },
    SET_CLIENTS(state, clients) {
      state.clients = clients;
    },
  },
  actions: {
    async fetchCurrentClient(context, id) {
      const { uid } = fb.auth.currentUser;

      const currentClient = await fb.usersCollection.doc(uid).collection('clients').doc(id).get();
      console.log(currentClient.data());
      // commit('SET_CURRENT_CLIENT', { id, ...currentClient.data() });
    },

    async addClient(context, client) {
      const { uid } = fb.auth.currentUser;

      await fb.usersCollection.doc(uid).collection('clients').add(client);
      // const newClient = await fb.usersCollection.doc(uid).collection('clients').add(client);

      // set new client as currentClient
      // await dispatch('fetchCurrentClient', newClient.id);
    },

    async editClient({ dispatch }, client) {
      const { uid } = fb.auth.currentUser;

      await fb.usersCollection.doc(uid).collection('clients').doc(client.id).update(client);

      // set new client as currentClient
      await dispatch('getClients', uid);
    },

    getClients: ({ commit }, uid) => {
      commit('SET_IS_LOADING', true);
      let clientsData = [];
      fb.usersCollection
        .doc(uid)
        .collection('clients')
        .onSnapshot((res) => {
          const changes = res.docChanges();

          changes.forEach((change) => {
            if (change.type === 'added') {
              clientsData.push({
                ...change.doc.data(),
                id: change.doc.id,
              });
            }
          });
          commit('SET_CLIENTS', clientsData);
        });
      commit('SET_IS_LOADING', false);
    },
    deleteClient: async ({ dispatch }, id) => {
      const { uid } = fb.auth.currentUser;

      await fb.usersCollection.doc(uid).collection('clients').doc(id).delete();

      await dispatch('getClients', uid);
    },
  },
  getters: {
    clientsFomatted: (state) => {
      return state.clients.map((client) => {
        return {
          ...client,
          age: getAge(client.birthdate),
        };
      });
    },
  },
  modules: {},
});
