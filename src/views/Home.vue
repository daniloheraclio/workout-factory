<template>
  <div class="flex flex-col w-full p-6">
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
    <div class="flex h-screen">
      <div class="flex flex-col w-3/4 mr-3">
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
        <div class="grid grid-cols-4 gap-4 mb-6">
          <div class="bg-white h-36 rounded-xl flex flex-col">
            <div>Icone</div>
            <div>Title</div>
            <div>Progress Bar</div>
          </div>
          <div class="bg-white h-36 rounded-xl">2</div>
          <div class="bg-white h-36 rounded-xl">3</div>
          <div class="bg-white h-36 rounded-xl">4</div>
        </div>
        <div class="flex">
          <div class="w-1/2 bg-white mr-3 rounded-xl h-96">Left</div>
          <div class="w-1/2 bg-white ml-3 rounded-xl h-96">Right</div>
        </div>
      </div>

      <div class="bg-purple-50 w-1/4 ml-3 rounded-xl">Side pane Right</div>
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
