<template>
  <div
    class="
      antialiased
      container
      mx-auto
      w-screen
      md:h-screen
      lg:min-h-screen
      flex
    "
  >
    <div
      @click="toggleOpen"
      class="relative z-0 w-screen md:my-14 rounded-2xl round"
    >
      <div
        class="absolute inset-0 z-10"
        :class="{
          'transform -translate-x-0': isOpen,
          'transform -translate-x-full': !isOpen,
        }"
      >
        <Nav v-if="true" @on-click="toggleOpen" @sign-out="signOut" />
      </div>
      <div class="w-full flex bg-gray-50 rounded-2xl">
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
      isOpen: false,
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
    toggleOpen(ev) {
      console.log(ev, this.isOpen);
      this.isOpen = !this.isOpen;
    },
  },
};
</script>
<style>
html {
  background-color: #e8e9f0;
}
</style>
