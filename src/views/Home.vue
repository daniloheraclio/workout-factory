<template>
  <div class="flex flex-col w-full lg:p-6 sm:p-2">
    <div class="w-full flex items-center justify-between mb-6">
      <p class="text-2xl text-purple-800 font-semibold">Dashboard</p>
      <div
        class="
          flex
          items-center
          w-78
          pr-4
          py-1
          pl-2
          bg-white
          rounded-lg
          cursor-pointer
        "
      >
        <img
          :src="userProfile.photoURL"
          alt="user photo"
          class="rounded-lg w-8 h-8 mr-2"
        />
        <p class="text-sm font-bold text-purple-900">{{ userProfile.name }}</p>
      </div>
    </div>
    <div class="grid lg:grid-cols-3 grid-cols-1 gap-x-4 h-screen">
      <div class="flex lg:col-span-2 flex-col">
        <div class="flex justify-between mb-6">
          <div class="text-lg text-purple-300 font-normal">Stats</div>
          <div
            class="
              subpixel-antialiased
              py-2
              px-3
              rounded-lg
              text-sm text-white
              font-light
              bg-purple-800
              cursor-pointer
              hover:bg-purple-600
            "
          >
            + Add Client
          </div>
        </div>
        <div
          class="grid grid-cols-2 gap-2 mb-4 md:grid-cols-4 md:gap-4 md:mb-6"
        >
          <div class="bg-white h-36 rounded-xl flex flex-col shadow-sm">
            <div>Icone</div>
            <div>Title</div>
            <div>Progress Bar</div>
          </div>
          <div class="bg-white h-36 rounded-xl shadow-sm">2</div>
          <div class="bg-white h-36 rounded-xl shadow-sm">3</div>
          <div class="bg-white h-36 rounded-xl shadow-sm">4</div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 md:gap-4">
          <div class="bg-white rounded-xl h-96">Left</div>
          <div class="bg-white rounded-xl h-96">Right</div>
        </div>
      </div>

      <div class="bg-purple-50 rounded-xl shadow-sm">Side pane Right</div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {},
  computed: {
    userProfile() {
      return this.$store.state.userProfile || '';
    },
  },
};
</script>
