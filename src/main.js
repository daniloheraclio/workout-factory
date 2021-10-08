import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/css/style.css';
import firebase from 'firebase/app';
import './firebaseInit';

let app;

firebase.auth().onAuthStateChanged((user) => {
  console.log('user from main.js', user);
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');
  }
});

Vue.config.productionTip = false;
