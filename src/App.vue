<template>
  <LoaderSpinner v-if="isLoading" />
  <div v-else class="container mx-auto antialiased font-poppins bg-purple-50 flex min-h-screen">
    <!-- Mobile -->
    <NavMobile v-if="isSidebarOpen" :menu-items="menuItems" @close="handleCloseMenu" />
    <!-- Desktop -->
    <NavDesktop v-if="hasUser" :menu-items="menuItems" @close="handleCloseMenu" />

    <!-- Main content -->
    <div class="flex-1">
      <!-- Top header -->
      <TopHeader v-if="hasUser" :user-profile="userProfile" @open="isSidebarOpen = true" />

      <!-- Content -->
      <router-view />
    </div>
  </div>
</template>
<script>
import * as fb from './firebase';
import { mapState } from 'vuex';

import NavMobile from '@/components/NavMobile.vue';
import NavDesktop from '@/components/NavDesktop.vue';
import TopHeader from '@/components/TopHeader.vue';
import LoaderSpinner from '@/components/LoaderSpinner.vue';

export default {
  components: {
    NavMobile,
    NavDesktop,
    TopHeader,
    LoaderSpinner,
  },
  data() {
    return {
      hasUser: false,
      isSidebarOpen: false,
      menuItems: [
        { label: 'Dashboard', icon: 'ChartSquareBar', url: '/' },
        { label: 'About', icon: 'IconSupport', url: '/about' },
      ],
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
  computed: {
    ...mapState(['isLoading']),
    userProfile() {
      return this.$store.state.userProfile || '';
    },
  },
  methods: {
    handleCloseMenu() {
      this.isSidebarOpen = false;
    },
  },
};
</script>
