<template>
  <div class="relative">
    <div
      v-click-outside="hide"
      @click="toggleOpen"
      class="
        cursor-pointer
        relative
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

    <div
      v-if="isOpen"
      class="absolute top-12 right-0 p-2 w-36 bg-white border-2 rounded-md"
    >
      <ul v-for="item in items" :key="item.value">
        <li
          class="
            flex
            justify-start
            items-center
            cursor-pointer
            p-2
            mb-2
            rounded
            transition
            duration-300
            hover:bg-gray-100
          "
          @click="getValue(item)"
        >
          <component :is="item.icon" class="w-5 h-5 text-gray-500 mr-2" />
          <p class="text-sm text-gray-500">{{ item.label }}</p>
        </li>
      </ul>
      <a
        @click="signOut"
        class="
          flex
          justify-start
          items-center
          cursor-pointer
          rounded
          w-full
          p-2
          transition
          duration-300
          hover:bg-gray-100
        "
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
          value: 'settings',
          icon: 'IconSettings',
        },
      ],
    };
  },
  mounted() {
    // prevent click outside event with popupItem.
    this.popupItem = this.$el;
  },
  directives: {
    ClickOutside,
  },
  methods: {
    toggleOpen() {
      this.isOpen = !this.isOpen;
    },
    hide() {
      this.isOpen = false;
    },
    getValue(value) {
      this.selectedvalue = value;
      this.hide();
      console.log(this.selectedvalue);
    },
    async signOut() {
      await fb.auth.signOut();
      this.$store.commit('SET_USER_PROFILE', {});
    },
  },
};
</script>
