<template>
  <div v-if="!client">Loading...</div>
  <div v-else class="flex flex-col min-h-90% px-2 md:px-4">
    <h1 class="text-2xl text-gray-700 font-semibold mb-4">{{ client.name }}</h1>
    <h1 class="text-2xl text-gray-700 font-semibold mb-4">{{ age }}</h1>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { getAge } from './../helpers/helper-string.js';

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      client: null,
    };
  },
  created() {
    this.findClient();
  },
  computed: {
    ...mapState(['clients']),
    age() {
      return getAge(this.client.birthdate);
    },
  },
  methods: {
    findClient() {
      const hasClient = this.clients.some((client) => client.id === this.id);

      if (!hasClient) this.$router.push({ path: '/clients' });

      this.client = this.clients.find((client) => client.id === this.id);
    },
  },
};
</script>
