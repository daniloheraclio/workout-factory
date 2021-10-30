<template>
  <div v-if="!client">Loading...</div>
  <div v-else class="flex flex-col min-h-90% px-2 md:px-4">
    <div class="flex flex-row justify-between">
      <h1 class="text-2xl text-gray-700 font-semibold mb-4">{{ client.name }}</h1>
      <div class="flex items-center">
        <Button :is-link="true" label="Edit" @on-click="handleOpenModalEditClient" class="mr-2" />
        <Button label="Delete" @on-click="handleDeleteClient" />
      </div>
    </div>
    <h1 class="text-2xl text-gray-700 font-semibold mb-4">{{ age }}</h1>
    <Modal v-if="isModalOpen">
      <template slot="content">
        <ClientForm
          ref="clientForm"
          client-action="edit"
          :handle-save="saveClient"
          :current-client="client"
          @on-cancel="handleModalClose"
        />
      </template>
    </Modal>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import { getAge } from './../helpers/helper-string.js';
import Button from '../components/Button.vue';
import Modal from '@/components/Modal.vue';
import ClientForm from '@/components/ClientForm.vue';

export default {
  components: { Button, Modal, ClientForm },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isModalOpen: false,
      client: null,
    };
  },
  async mounted() {
    this.findClient();

    // if (!this.currentClient || !this.client) {
    //   await this.fetchCurrentClient(this.id);
    // }
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
    ...mapActions(['fetchCurrentClient', 'deleteClient', 'editClient']),
    findClient() {
      const hasClient = this.clients.some((client) => client.id === this.id);

      if (!hasClient) this.$router.push({ path: '/clients' });

      this.client = this.clientsFomatted.find((client) => client.id === this.id);
    },
    handleOpenModalEditClient() {
      this.isModalOpen = true;
    },
    handleModalClose() {
      this.isModalOpen = false;
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
    saveClient(client) {
      this.SET_IS_LOADING(true);
      try {
        this.editClient(client);
      } catch (error) {
        console.log(error);
      } finally {
        this.SET_IS_LOADING(false);
        // mudar pra voltar pro current client
        this.$router.push({ path: `/clients` });
      }
    },
  },
};
</script>
