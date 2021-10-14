<template>
  <div class="flex min-h-screen">
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
      <div class="flex justify-between items-center">
        <IconMenu
          @click.native="isSidebarOpen = true"
          class="w-5 h-5 text-gray-500 md:hidden"
        />
        <img
          class="w-10 h-auto rounded-lg md:ml-auto"
          :src="userProfile.photoURL"
          alt="user profile photo"
        />
      </div>

      <main>Main Content</main>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import IconMenu from '@/components/IconMenu.vue';
import ChartSquareBar from '@/components/ChartSquareBar.vue';
import IconSupport from '@/components/IconSupport.vue';
import IconX from '@/components/IconX.vue';

export default {
  name: 'Home',
  components: { IconMenu, ChartSquareBar, IconSupport, IconX },
  data() {
    return {
      isSidebarOpen: true,
      menuItems: [
        { label: 'Dashboard', icon: 'ChartSquareBar', url: '/' },
        { label: 'About', icon: 'IconSupport', url: '/about' },
      ],
    };
  },
  computed: {
    userProfile() {
      return this.$store.state.userProfile || '';
    },
  },
};
</script>
