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
    <!--  Desktop -->
    <NavDesktop @close="handleCloseMenu" :menu-items="menuItems" />
    <div class="flex-1">
      <div
        class="
          flex
          justify-between
          items-center
          h-12
          px-2
          md:justify-end md:mb-2
        "
      >
        <IconMenu
          @click.native="isSidebarOpen = true"
          class="w-5 h-5 text-gray-500 md:hidden"
        />
        <div
          class="
            p-0.5
            bg-gradient-to-t
            from-purple-600
            to-yellow-500
            rounded-full
          "
        >
          <img
            class="w-10 h-auto rounded-full md:ml-auto"
            :src="userProfile.photoURL"
            alt="user profile photo"
          />
        </div>
      </div>

      <main><router-view /></main>
    </div>
  </div>
</template>
<script>
import * as fb from './firebase';
import IconMenu from '@/components/IconMenu.vue';
import NavMobile from '@/components/NavMobile.vue';
import NavDesktop from '@/components/NavDesktop.vue';

export default {
  components: {
    IconMenu,
    NavMobile,
    NavDesktop,
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
    async signOut() {
      await fb.auth.signOut();
      this.$store.commit('SET_USER_PROFILE', {});
    },
    handleCloseMenu() {
      this.isSidebarOpen = false;
    },
  },
};
</script>
