<template>
  <div class="flex justify-between items-center h-12 p-2 md:justify-end md:mb-2">
    <IconMenu class="w-5 h-5 text-gray-500 cursor-pointer md:hidden" @click.native="$emit('open')" />

    <ProfileButton :user-profile="userProfile"></ProfileButton>
  </div>
</template>

<script>
import IconMenu from '@/components/IconMenu.vue';
import ProfileButton from '@/components/ProfileButton.vue';

export default {
  components: {
    IconMenu,
    ProfileButton,
  },
  props: {
    userProfile: {
      type: Object,
      require: true,
    },
  },
};
</script>
