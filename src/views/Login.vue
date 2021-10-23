<template>
  <div class="min-h-screen flex justify-center items-center px-4 mx-auto lg:px-2 lg:w-80">
    <div class="flex flex-col bg-white p-8 rounded-lg shadow-lg">
      <h3 class="text-gray-600 text-2xl mb-2">Welcome</h3>
      <p class="mb-10">Ready to create an awesome workout?</p>
      <div
        class="flex justify-center items-center w-full border border-grey-100 rounded py-1 cursor-pointer"
        @click="signIn"
      >
        <IconGoogle class="mr-1" />
        <p class="text-sm text-gray-500">Log in with Google</p>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/compat/app';
import * as fb from '../firebase';
import IconGoogle from '@/components/IconGoogle.vue';

export default {
  components: {
    IconGoogle,
  },
  methods: {
    async signIn() {
      this.$store.commit('SET_IS_LOADING', true);
      try {
        //fb.auth.signInWithPopup(googleAuthProvider);
        const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
        googleAuthProvider.setCustomParameters({
          prompt: 'select_account',
        });
        const { user } = await fb.auth.signInWithRedirect(googleAuthProvider);
        this.$store.commit('SET_USER_PROFILE', {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        });
      } catch (error) {
        console.error(error);
      } finally {
        this.$store.commit('SET_IS_LOADING', false);
        this.$router.push({ path: '/' }).catch(() => {});
      }
    },
  },
};
</script>
