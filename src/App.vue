<template>
  <div>
    <router-view />
  </div>
</template>
<script>
import * as fb from './firebase';
// import Nav from './components/Nav.vue';

export default {
  // components: { Nav },
  data() {
    return {
      hasUser: false,
    };
  },
  created() {
    fb.auth.onAuthStateChanged((user) => {
      this.hasUser = user ? true : false;

      if (user) {
        this.$store.commit('SET_USER_PROFILE', {
          name: user?.displayName,
          email: user?.email,
          photoURL: user?.photoURL,
          uid: user?.uid,
        });
      }
    });
  },
  methods: {
    async signOut() {
      await fb.auth.signOut();
      this.$store.commit('SET_USER_PROFILE', {});
    },
  },
};
</script>
<style>
html {
  background-color: #e8e9f0;
}
</style>
