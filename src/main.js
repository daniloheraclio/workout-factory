import Vue from 'vue';
import Vuelidate from 'vuelidate';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/css/style.css';
import { auth } from './firebase';

Vue.use(Vuelidate);
Vue.config.productionTip = false;

let app;
auth.onAuthStateChanged((user) => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');
  }

  if (!user) {
    router.push({ path: '/login' }).catch(() => {});
  }
});
