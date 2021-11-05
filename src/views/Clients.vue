<template>
  <div class="flex flex-col min-h-90% px-2 md:px-4">
    <div class="flex flex-row justify-between items-center mb-4">
      <h1 class="text-2xl text-gray-700 font-semibold">Clients</h1>
      <Button label="Add" @on-click="handleModalOpen" />
    </div>
    <section v-for="client in clientsFomatted" :key="client.id" class="flex flex-col mb-2 hover:cursor-pointer">
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
            <p class="text-xs text-gray-700">{{ client.age }} years</p>
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

    <Modal v-if="isModalOpen">
      <template slot="content">
        <ClientForm ref="clientForm" client-action="add" :handle-save="saveClient" @on-cancel="handleModalClose" />
      </template>
    </Modal>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import IconCake from '../components/IconCake.vue';
import Status from '../components/Status.vue';
import Button from '../components/Button.vue';
import Modal from '@/components/Modal.vue';
import ClientForm from '@/components/ClientForm.vue';

export default {
  components: { IconCake, Status, Button, Modal, ClientForm },
  data() {
    return {
      isModalOpen: false,
    };
  },
  computed: {
    ...mapGetters(['clientsFomatted']),
  },
  methods: {
    ...mapActions(['addClient']),
    ...mapMutations(['SET_IS_LOADING']),
    getGenderColor(gender) {
      return gender === 'male' ? 'bg-blue-200 text-blue-800' : 'bg-pink-200 text-pink-800';
    },
    getClient(id) {
      this.$router.push({ path: `client/${id}` });
    },
    handleModalOpen() {
      this.isModalOpen = true;
    },
    handleModalClose() {
      this.isModalOpen = false;
    },
    async saveClient(client) {
      if (!this.$refs.clientForm.$v.$invalid) {
        this.SET_IS_LOADING(true);
        try {
          await this.addClient(client);
        } catch (error) {
          this.$toast('Something went wrong', {
            timeout: 2500,
          });
        } finally {
          this.$toast('Client successfully updated', {
            timeout: 2500,
          });
          this.handleModalClose();
          this.SET_IS_LOADING(false);
        }
      }
    },
  },
};
</script>
