<template>
  <div class="flex flex-col min-h-90% px-2 md:px-4">
    <h1 class="text-2xl text-gray-700 font-semibold mb-4">Clients</h1>
    <section class="flex flex-col gap-y-2">
      <div class="flex flex-row justify-between items-center p-2 bg-white rounded-md shadow-sm">
        <div class="flex flex-col">
          <p class="text-sm mb-1 text-gray-800">Paulo Lucas</p>
          <p class="text-2xs text-gray-500">emailucas@email.com</p>
        </div>
        <div class="flex flex-row items-center">
          <IconCake class="mr-2 w-6 h-6 text-gray-500" />
          <div class="flex flex-col">
            <p class="text-xs text-gray-700">2021-22-03</p>
            <p class="text-xs text-gray-700">23 years</p>
          </div>
        </div>

        <div class="flex flex-col md:flex-row md:items-center">
          <p class="text-xs m-auto py-0.5 px-4 rounded-xl mb-1 md:mb-0 md:mr-4" :class="[getGenderColor('male')]">
            Male
          </p>
          <Status :is-active="true" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import IconCake from '../components/IconCake.vue';
import Status from '../components/Status.vue';

export default {
  components: { IconCake, Status },
  methods: {
    getGenderColor(gender) {
      return gender === 'male' ? 'bg-blue-200' : 'bg-pink-200';
    },
  },
};
</script>
