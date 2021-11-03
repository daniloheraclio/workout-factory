<template>
  <div class="relative">
    <div
      v-click-outside="hide"
      class="cursor-pointer relative p-0.5 bg-gradient-to-t from-purple-600 to-yellow-500 rounded-full md:mr-2"
      @click="toggleOpen"
    >
      <img class="w-7 h-7 md:w-8 md:h-8 rounded-full md:ml-auto" :src="userProfile.photoURL" />
    </div>

    <div v-if="isOpen" class="absolute z-10 top-9 md:top-11 right-0 py-2 w-36 bg-white shadow-lg rounded-md">
      <ul v-for="item in items" :key="item.value">
        <li @click="hide">
          <router-link
            :to="item.url"
            class="flex justify-start items-center cursor-pointer p-2 mb-2 transition duration-300 hover:bg-gray-100"
          >
            <component :is="item.icon" class="w-5 h-5 text-gray-500 mr-2" />
            <p class="text-sm text-gray-500">{{ item.label }}</p>
          </router-link>
        </li>
      </ul>
      <a
        class="flex justify-start items-center cursor-pointer w-full p-2 transition duration-300 hover:bg-gray-100"
        @click="signOut"
      >
        <IconLogout class="w-5 h-5 text-gray-500 mr-2" />
        <p class="text-sm text-gray-500">Sign out</p>
      </a>
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside';
import * as fb from '../firebase';
import IconLogout from '@/components/IconLogout.vue';
import IconSettings from '@/components/IconSettings.vue';

export default {
  components: { IconLogout, IconSettings },
  directives: {
    ClickOutside,
  },
  props: {
    userProfile: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      isOpen: false,
      selectedvalue: null,
      items: [
        {
          label: 'Settings',
          url: '/settings',
          icon: 'IconSettings',
        },
      ],
    };
  },
  mounted() {
    // prevent click outside event with popupItem.
    this.popupItem = this.$el;
  },
  methods: {
    toggleOpen() {
      this.isOpen = !this.isOpen;
    },
    hide() {
      this.isOpen = false;
    },
    async signOut() {
      await fb.auth.signOut();
      this.$store.commit('SET_USER_PROFILE', {});
      this.$store.commit('SET_CLIENTS', {});
    },
  },
};
</script>
