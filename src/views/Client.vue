<template>
  <LoaderSpinner v-if="!clients.length || !hasClient" />
  <div v-else class="flex flex-col min-h-90% px-2 md:px-4">
    <div class="flex flex-row justify-between items-center mb-4">
      <h1 class="text-2xl text-gray-700 font-semibold">Client profile</h1>
      <MenuButton class="text-gray-500" @on-edit="handleOpenModalEditClient" @on-delete="handleOpenModalDeleteClient" />
      <div v-if="false" class="flex items-center">
        <Button :is-link="true" label="Edit" @on-click="handleOpenModalEditClient" class="mr-2" />
        <Button label="Delete" @on-click="handleOpenModalDeleteClient" />
      </div>
    </div>
    <section class="flex">
      <p>{{ client.name }}</p>
    </section>
    <h1 class="text-2xl text-gray-700 font-semibold mb-4">{{ age }}</h1>
    <h1 class="text-2xl text-gray-700 font-semibold mb-4">{{ client.gender }}</h1>
    <h1 class="text-2xl text-gray-700 font-semibold mb-4">{{ client.isActive }}</h1>

    <!-- Section add new workout -->
    <div class="flex flex-row gap-x-2">
      <div
        @click="$router.push({ path: `${id}/create` })"
        class="
          flex
          justify-center
          items-center
          w-1/2
          h-36
          rounded-md
          bg-gray-50
          border-2 border-dashed border-gray-200
          text-gray-300
          uppercase
          cursor-pointer
          hover:text-gray-400
          transition-colors
          md:h-48
        "
      >
        <p class="text-sm md:text-base">Create new workout</p>
      </div>
      <div class="flex justify-center items-center w-1/2 bg-purple-500 text-purple-200 uppercase rounded-md">
        <p class="text-sm md:text-base">Workouts</p>
      </div>
    </div>

    <Modal v-if="isDeleteModalOpen">
      <template slot="content">
        <div class="flex items-center justify-between border-b-2 border-gray-100 pb-3 md:hidden">
          <button
            class="mr-2 py-2 px-2 border border-transparent rounded-md hover:bg-purple-100"
            @click="handleDeleteModalClose"
          >
            <IconChevronLeft class="text-purple-700" />
          </button>
          <Button label="Confirm" @on-click="handleDeleteClient" />
        </div>
        <div class="flex flex-col items-center justify-center m-auto h-5/6 md:block">
          <h2 class="text-red-500 text-lg mb-3">Warning</h2>
          <p class="text-gray-700 text-sm">Are you sure you want to delete this client?</p>
          <p class="text-gray-700 text-sm mb-5">This action cannot be undone</p>
          <div class="hidden md:flex justify-end items-center gap-x-2">
            <Button :is-link="true" label="Cancel" @on-click="handleDeleteModalClose" />
            <Button label="Confirm" @on-click="handleDeleteClient" />
          </div>
        </div>
      </template>
    </Modal>

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
import IconChevronLeft from '@/components/IconChevronLeft.vue';
import MenuButton from '@/components/MenuButton.vue';
import Button from '../components/Button.vue';
import Modal from '@/components/Modal.vue';
import ClientForm from '@/components/ClientForm.vue';
import LoaderSpinner from '@/components/LoaderSpinner.vue';

export default {
  components: { Button, Modal, ClientForm, LoaderSpinner, IconChevronLeft, MenuButton },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isModalOpen: false,
      isDeleteModalOpen: false,
      client: null,
    };
  },
  computed: {
    ...mapState(['clients', 'userProfile']),
    ...mapGetters(['clientsFomatted']),
    age() {
      return getAge(this.client.birthdate);
    },
    hasClient() {
      return this.clients.some((client) => client.id === this.id);
    },
  },
  methods: {
    ...mapMutations(['SET_IS_LOADING']),
    ...mapActions(['fetchCurrentClient', 'deleteClient', 'editClient']),
    findClient() {
      if (!this.hasClient) this.$router.push({ path: '/clients' });

      this.client = this.clientsFomatted.find((client) => client.id === this.id);
    },
    handleOpenModalEditClient() {
      this.isModalOpen = true;
    },
    handleOpenModalDeleteClient() {
      this.isDeleteModalOpen = true;
    },
    handleModalClose() {
      this.isModalOpen = false;
    },
    handleDeleteModalClose() {
      this.isDeleteModalOpen = false;
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
      if (!this.$refs.clientForm.$v.$invalid) {
        this.SET_IS_LOADING(true);
        try {
          this.editClient(client);
        } catch (error) {
          console.log(error);
        } finally {
          this.SET_IS_LOADING(false);
          this.handleModalClose();
        }
      }
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
