<template>
  <div
    class="
      container
      mx-auto
      antialiased
      font-poppins
      bg-purple-50
      flex
      min-h-screen
    "
  >
    <!-- Mobile -->
    <NavMobile
      v-if="isSidebarOpen"
      @close="handleCloseMenu"
      :menu-items="menuItems"
    />
    <!-- Desktop -->
    <NavDesktop
      v-if="hasUser"
      @close="handleCloseMenu"
      :menu-items="menuItems"
    />

    <!-- Main content -->
    <div class="flex-1">
      <!-- Top header -->
      <TopHeader
        v-if="hasUser"
        @open="isSidebarOpen = true"
        :user-profile="userProfile"
      />

      <!-- Content -->
      <router-view />
    </div>
  </div>
</template>
<script>
import * as fb from './firebase';

import NavMobile from '@/components/NavMobile.vue';
import NavDesktop from '@/components/NavDesktop.vue';
import TopHeader from '@/components/TopHeader.vue';

export default {
  components: {
    NavMobile,
    NavDesktop,
    TopHeader,
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
