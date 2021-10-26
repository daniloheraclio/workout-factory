<template>
  <div class="flex flex-row items-center">
    <IconCheck v-if="isActive" class="w-4 h-4 text-green-500 mr-1" />
    <IconXCircle v-if="!isActive" class="w-4 h-4 text-red-500 mr-1" />
    <p class="text-2xs uppercase text-gray-700">{{ label }}</p>
  </div>
</template>

<script>
import IconCheck from './IconCheck.vue';
import IconXCircle from './IconXCircle.vue';

export default {
  components: { IconCheck, IconXCircle },
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    label() {
      return this.isActive ? 'active' : 'inactive';
    },
  },
};
</script>
