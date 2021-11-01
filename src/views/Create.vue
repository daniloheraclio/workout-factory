<template>
  <div class="flex flex-col min-h-90% px-2 md:px-4">
    <h1 class="text-2xl text-gray-700 font-semibold mb-4">Create</h1>
    <p v-if="!clients.length || !hasClient">
      <LoaderSpinner />
    </p>
    <p v-else>{{ client.name }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import LoaderSpinner from '@/components/LoaderSpinner.vue';

export default {
  components: { LoaderSpinner },
  props: {
    id: {
      type: String,
      require: true,
    },
  },
  computed: {
    ...mapState(['clients']),
    hasClient() {
      return this.clients.some((client) => client.id === this.id);
    },
  },
  methods: {
    findClient() {
      if (!this.hasClient) this.$router.push({ path: `/clients` });

      this.client = this.clients.find((client) => client.id === this.id);
    },
  },
  watch: {
    clients: {
      immediate: true,
      handler(c) {
        if (c.length) this.findClient();
      },
    },
  },
};
</script>
