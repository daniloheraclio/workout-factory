<template>
  <div id="app" class="container mx-auto">
    <nav
      v-if="hasUser"
      class="
        flex
        justify-between
        items-center
        h-16
        px-4
        bg-indigo-400
        text-indigo-100
        antialiased
        font-semibold
      "
    >
      <div>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </div>
      <a
        @click="signOut"
        class="
          text-sm text-gray-700
          cursor-pointer
          rounded
          py-2
          px-3
          bg-indigo-200
          font-semibold
          hover:bg-indigo-100
        "
        >Sign out</a
      >
    </nav>
    <router-view />
  </div>
</template>
<script>
import * as fb from './firebase';

export default {
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
