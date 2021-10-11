<template>
  <div class="container mx-auto w-screen md:h-screen lg:min-h-screen flex">
    <div class="flex lg:max-h-90% w-screen my-14 rounded-2xl bg-white round">
      <Nav v-if="hasUser" @sign-out="signOut" />
      <div
        class="w-full flex bg-gray-50 rounded-2xl"
        :class="{ 'rounded-l-none': hasUser }"
      >
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
import * as fb from './firebase';
import Nav from './components/Nav.vue';

export default {
  components: { Nav },
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
