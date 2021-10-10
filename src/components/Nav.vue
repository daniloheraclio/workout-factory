<template>
  <nav
    class="
      flex flex-col
      justify-between
      items-center
      bg-white
      text-gray-600
      w-56
      p-4
      antialiased
      font-semibold
      rounded-l-2xl
    "
  >
    <div class="flex flex-col w-full">
      <div class="w-full h-32 mb-3 rounded-t flex justify-center items-center">
        <span class="uppercase border-t-4">WorkoutFactory</span>
      </div>
      <router-link to="/" class="mb-2 p-2 hover:bg-indigo-50 rounded"
        >Dashboard</router-link
      >
      <router-link to="/about" class="mb-2 p-2 hover:bg-indigo-50 rounded"
        >About</router-link
      >
    </div>
    <a
      @click="$emit('sign-out')"
      class="
        flex
        items-center
        cursor-pointer
        rounded
        w-full
        p-2
        hover:bg-gray-100
      "
    >
      <IconLogout class="mr-2" fill="#6B7280" />
      <p class="text-lg text-gray-500 font-semibold">Sign out</p>
    </a>
  </nav>
</template>

<script>
import IconLogout from '@/components/IconLogout.vue';

export default {
  components: { IconLogout },
};
</script>

<style></style>
