<template>
  <div
    class="hidden md:relative md:flex flex-col w-64 bg-gray-50 border-r border-gray-200 transition"
    :class="{ 'w-16': !isOpen }"
  >
    <div @click="toggleMenu">
      <IconDoubleArrowLeft
        class="
          absolute
          z-10
          top-2
          -right-3
          w-6
          h-6
          text-gray-500
          rounded-full
          bg-white
          p-1
          cursor-pointer
          hover:text-purple-500 hover:border-purple-500
          transition
        "
        :class="{ 'transform rotate-180': !isOpen }"
      />
    </div>
    <div class="flex justify-center items-center pt-12 px-2 pb-4" :class="{ 'px-6': isOpen }">
      <Logo class="w-8 h-8" :class="{ 'mr-2': isOpen }" />

      <p v-if="isOpen" class="text-base text-purple-500 font-bold">
        WORKOUT<span class="text-purple-800">FACTORY</span>
      </p>
    </div>
    <div class="flex flex-col items-start justify-center mb-5 px-6" :class="{ 'px-2 items-center': !isOpen }">
      <router-link
        v-for="(item, index) in menuItems"
        :key="index"
        :to="item.url"
        class="flex justify-center items-center mb-5"
        active-class="active"
      >
        <component :is="item.icon" class="w-5 h-5 text-gray-500 mr-2" :class="{ 'mr-0': !isOpen }" />
        <h3 v-if="isOpen" class="text-sm text-gray-500 uppercase tracking-widest">
          {{ item.label }}
        </h3>
      </router-link>
    </div>
  </div>
</template>

<script>
import ChartSquareBar from '@/components/ChartSquareBar.vue';
import IconSupport from '@/components/IconSupport.vue';
import IconClients from '@/components/IconClients.vue';
import IconDoubleArrowLeft from '@/components/IconDoubleArrowLeft.vue';
import IconX from '@/components/IconX.vue';
import Logo from '@/components/Logo.vue';
export default {
  components: { ChartSquareBar, IconSupport, IconClients, IconX, IconDoubleArrowLeft, Logo },
  props: {
    menuItems: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      isOpen: true,
    };
  },
  methods: {
    handleCloseMenu() {
      this.$emit('close');
    },
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>
<style scoped>
.router-link-exact-active.active {
  font-weight: 800;
}
</style>
