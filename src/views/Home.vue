<template>
  <div class="flex flex-col min-h-90% px-2 md:px-4">
    <h1 class="text-2xl text-gray-700 font-semibold mb-4">Dashboard</h1>
    <section class="grid grid-cols-2 gap-4">
      <div class="flex flex-col justify-between bg-white rounded-lg p-3 h-32 md:p-4">
        <div class="flex flex-row justify-between items-center mb-3">
          <div class="bg-purple-100 h-8 w-8 p-1 rounded-md">
            <IconUsers class="text-purple-500" />
          </div>
          <div
            class="cursor-pointer flex justify-start items-center h-9 py-1 px-3 rounded-md hover:bg-purple-200"
            @click="handleModalOpen"
          >
            <IconPlus class="w-3 h-3 text-purple-500" />
            <p class="text-sm text-purple-500 font-semibold">Add</p>
          </div>
        </div>
        <h3 @click="goToClients" class="uppercase text-md text-purple-700 font-semibold tracking-wide cursor-pointer">
          {{ clients.length }} Clients
        </h3>
      </div>

      <div class="flex flex-col justify-between bg-white rounded-lg p-3 h-32 md:p-4">
        <div class="flex flex-row justify-between items-center mb-3">
          <div class="bg-purple-100 h-8 w-8 p-1 rounded-md">
            <IconUsers class="text-purple-500" />
          </div>
          <div class="cursor-pointer flex justify-start items-center h-9 py-1 px-3 rounded-md hover:bg-purple-200">
            <IconPlus class="w-3 h-3 text-purple-500" />
            <p class="text-sm text-purple-500 font-semibold">Add</p>
          </div>
        </div>
        <h3 class="uppercase text-md text-purple-700 font-semibold tracking-wide">{{ clients.length }} Clients</h3>
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
import { mapState, mapActions, mapMutations } from 'vuex';
import IconUsers from '@/components/IconUsers.vue';
import IconPlus from '@/components/IconPlus.vue';
import Modal from '@/components/Modal.vue';
import ClientForm from '@/components/ClientForm.vue';

export default {
  name: 'Home',
  components: { IconUsers, IconPlus, Modal, ClientForm },
  data() {
    return {
      isModalOpen: false,
      client: {
        name: '',
        email: '',
        birthdate: '',
        gender: '',
        isActive: false,
      },
    };
  },
  computed: {
    ...mapState(['clients']),
  },
  methods: {
    ...mapMutations(['SET_IS_LOADING']),
    ...mapActions(['addClient']),
    handleModalOpen() {
      this.isModalOpen = true;
    },
    handleModalClose() {
      this.isModalOpen = false;
    },
    goToClients() {
      this.$router.push({ path: '/clients' });
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
          this.$router.push({ path: 'clients' });
        }
      }
    },
  },
};
</script>
