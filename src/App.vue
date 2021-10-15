<template>
  <div class="antialiased font-poppins bg-purple-50 flex min-h-screen">
    <!-- Mobile -->
    <div v-if="isSidebarOpen" class="fixed inset-0 z-40 md:hidden">
      <div
        class="
          flex flex-col
          md:hidden
          relative
          z-10
          h-full
          w-72
          bg-gray-50
          border-r border-gray-400
        "
      >
        <button
          @click="isSidebarOpen = false"
          class="absolute top-2 right-2 focus:text-gray-800 focus:outline-none"
        >
          <IconX class="w-5 h-5 text-gray-500" />
        </button>
        <div class="pt-12 pb-6 px-6">
          <a href="#" class="text-xl text-purple-700 font-bold"
            >WORKOUTFACTORY</a
          >
        </div>
        <div class="overflow-y-auto flex-1">
          <div class="mb-5 px-6">
            <router-link
              v-for="(item, index) in menuItems"
              :key="index"
              :to="item.url"
              @click.native="isSidebarOpen = false"
              class="flex items-center mb-5"
            >
              <component :is="item.icon" class="w-5 h-5 text-gray-500 mr-2" />
              <h3 class="text-sm text-gray-500 uppercase tracking-widest">
                {{ item.label }}
              </h3>
            </router-link>
          </div>
        </div>
      </div>
      <div class="fixed inset-0 bg-gray-600 bg-opacity-50"></div>
    </div>

    <!--  Desktop -->
    <div class="hidden md:block w-64 bg-gray-50 border-r border-gray-200">
      <div class="py-4 px-6">
        <a href="#" class="text-xl text-purple-700 font-bold">WORKOUTFACTORY</a>
      </div>
      <div class="mb-5 px-6">
        <router-link
          v-for="(item, index) in menuItems"
          :key="index"
          :to="item.url"
          class="flex items-center mb-5"
        >
          <component :is="item.icon" class="w-5 h-5 text-gray-500 mr-2" />
          <h3 class="text-sm text-gray-500 uppercase tracking-widest">
            {{ item.label }}
          </h3>
        </router-link>
      </div>
    </div>
    <div class="flex-1">
      <div class="flex justify-between items-center h-12 px-2 md:justify-end">
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
import ChartSquareBar from '@/components/ChartSquareBar.vue';
import IconSupport from '@/components/IconSupport.vue';
import IconX from '@/components/IconX.vue';

export default {
  components: { IconMenu, ChartSquareBar, IconSupport, IconX },
  data() {
    return {
      hasUser: false,
      isSidebarOpen: true,
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
  },
};
</script>
