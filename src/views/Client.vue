<template>
  <div v-if="!client">Loading...</div>
  <div v-else class="flex flex-col min-h-90% px-2 md:px-4">
    <div class="flex flex-row justify-between">
      <h1 class="text-2xl text-gray-700 font-semibold mb-4">{{ client.name }}</h1>
      <div class="flex items-center">
        <Button :is-link="true" label="Edit" @on-click="editClient" />
        <Button label="Delete" @on-click="handleDeleteClient" />
      </div>
    </div>
    <h1 class="text-2xl text-gray-700 font-semibold mb-4">{{ age }}</h1>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import { getAge } from './../helpers/helper-string.js';
import Button from '../components/Button.vue';

export default {
  components: { Button },
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
    ...mapState(['clients', 'userProfile']),
    ...mapGetters(['clientsFomatted']),
    age() {
      return getAge(this.client.birthdate);
    },
  },
  methods: {
    ...mapMutations(['SET_IS_LOADING']),
    ...mapActions(['deleteClient']),
    findClient() {
      const hasClient = this.clients.some((client) => client.id === this.id);

      if (!hasClient) this.$router.push({ path: '/clients' });

      this.client = this.clientsFomatted.find((client) => client.id === this.id);
    },
    editClient() {
      console.log(this.client);
    },
    handleDeleteClient() {
      this.SET_IS_LOADING(true);
      try {
        this.deleteClient(this.client.id);
      } catch (error) {
        console.log(error);
      } finally {
        this.SET_IS_LOADING(false);
        this.$router.push({ path: '/clients' });
      }
    },
  },
};
</script>
