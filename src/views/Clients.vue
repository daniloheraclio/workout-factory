<template>
  <div class="flex flex-col min-h-90% px-2 md:px-4">
    <h1 class="text-2xl text-gray-700 font-semibold mb-4">Clients</h1>
    <section v-for="client in clients" :key="client.id" class="flex flex-col mb-2 hover:cursor-pointer">
      <div
        @click="getClient(client.id)"
        class="flex flex-row justify-between items-center p-2 bg-white rounded-md shadow-sm hover:bg-purple-100"
      >
        <div class="flex flex-col w-2/6">
          <p class="text-sm mb-1 text-gray-800">{{ client.name }}</p>
          <p class="text-2xs text-gray-500">{{ client.email }}</p>
        </div>
        <div class="flex flex-row items-center justify-center w-2/6">
          <IconCake class="mr-2 w-6 h-6 text-gray-500" />
          <div class="flex flex-col">
            <p class="text-xs text-gray-700 mb-1">{{ client.birthdate }}</p>
            <p class="text-xs text-gray-700">23 years</p>
          </div>
        </div>

        <div class="flex flex-col w-1/5 md:flex-row md:items-center md:w-2/5">
          <p
            class="text-2xs m-auto py-0.5 px-3 rounded-xl mb-1 md:mb-0 md:mr-4 capitalize"
            :class="[getGenderColor(client.gender)]"
          >
            {{ client.gender }}
          </p>
          <Status :is-active="client.isActive" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import IconCake from '../components/IconCake.vue';
import Status from '../components/Status.vue';
import { mapState } from 'vuex';

export default {
  components: { IconCake, Status },
  computed: {
    ...mapState(['clients']),
  },
  methods: {
    getGenderColor(gender) {
      return gender === 'male' ? 'bg-blue-200 text-blue-800' : 'bg-pink-200 text-pink-800';
    },
    getClient(id) {
      this.$router.push({ path: `client/${id}` });
    },
  },
};
</script>
