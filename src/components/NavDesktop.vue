<template>
  <div class="hidden md:block w-64 bg-gray-50 border-r border-gray-200">
    <div class="flex items-center pt-12 px-6 pb-4">
      <Logo class="mr-2" />
      <p class="text-base text-purple-500 font-bold">
        WORKOUT<span class="text-purple-800">FACTORY</span>
      </p>
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
</template>

<script>
import ChartSquareBar from '@/components/ChartSquareBar.vue';
import IconSupport from '@/components/IconSupport.vue';
import IconX from '@/components/IconX.vue';
import Logo from '@/components/Logo.vue';
export default {
  components: { ChartSquareBar, IconSupport, IconX, Logo },
  props: {
    menuItems: {
      type: Array,
      require: true,
    },
  },
  methods: {
    handleCloseMenu() {
      this.$emit('close');
    },
  },
};
</script>
