<template>
  <nav
    class="
      flex flex-col
      justify-between
      items-center
      bg-red-500
      text-gray-600
      w-64
      p-4
      h-full
      antialiased
      font-semibold
      rounded-l-2xl
    "
    @click="$emit('on-click', true)"
  >
    <div class="flex flex-col w-full">
      <div
        class="
          w-full
          h-auto
          md:h-16
          mb-3
          rounded-t
          flex
          justify-center
          items-center
        "
      >
        <span class="uppercase border-t-4 hidden">WorkoutFactory</span>
        <span class="uppercase mt-2 border-t-4 md:hidden">WF</span>
      </div>
      <router-link
        to="/"
        class="mb-2 p-2 justify-center m-auto hover:bg-indigo-50 rounded"
      >
        Dashboard
      </router-link>
      <router-link
        to="/about"
        class="mb-2 p-2 justify-center m-auto hover:bg-indigo-50 rounded"
      >
        About
      </router-link>
    </div>
    <a
      @click="$emit('sign-out')"
      class="
        flex
        justify-center
        items-center
        cursor-pointer
        rounded
        w-full
        p-2
        hover:bg-gray-100
      "
    >
      <IconLogout class="mr-1" fill="#6B7280" />
      <p class="text-base text-gray-500 font-semibold">Sign out</p>
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
