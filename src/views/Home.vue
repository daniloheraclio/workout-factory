<template>
  <div class="flex flex-col min-h-90% px-2 md:px-4">
    <h1 class="text-2xl text-gray-700 font-semibold mb-4">Dashboard</h1>
    <section class="grid grid-cols-2 gap-4">
      <div
        class="
          flex flex-col
          justify-between
          bg-white
          rounded-lg
          p-3
          h-32
          md:p-4
        "
      >
        <div class="flex flex-row justify-between items-center mb-3">
          <div class="bg-purple-100 h-8 w-8 p-1 rounded-md">
            <IconUsers class="text-purple-500" />
          </div>
          <div
            @click="handleModalOpen"
            class="
              cursor-pointer
              flex
              justify-start
              items-center
              h-9
              py-1
              px-3
              rounded-md
              hover:bg-purple-200
            "
          >
            <IconPlus class="w-3 h-3 text-purple-500" />
            <p class="text-sm text-purple-500 font-semibold">Add</p>
          </div>
        </div>
        <h3
          class="uppercase text-md text-purple-700 font-semibold tracking-wide"
        >
          7 Clients
        </h3>
      </div>

      <div
        class="
          flex flex-col
          justify-between
          bg-white
          rounded-lg
          p-3
          h-32
          md:p-4
        "
      >
        <div class="flex flex-row justify-between items-center mb-3">
          <div class="bg-purple-100 h-8 w-8 p-1 rounded-md">
            <IconUsers class="text-purple-500" />
          </div>
          <div
            class="
              cursor-pointer
              flex
              justify-start
              items-center
              h-9
              py-1
              px-3
              rounded-md
              hover:bg-purple-200
            "
          >
            <IconPlus class="w-3 h-3 text-purple-500" />
            <p class="text-sm text-purple-500 font-semibold">Add</p>
          </div>
        </div>
        <h3
          class="uppercase text-md text-purple-700 font-semibold tracking-wide"
        >
          7 Clients
        </h3>
      </div>
    </section>
    <Modal v-if="isModalOpen">
      <template slot="content">
        <ClientForm
          ref="clientForm"
          client-action="add"
          :handle-save="saveClient"
          @on-cancel="handleModalClose"
        />
      </template>
    </Modal>
  </div>
</template>

<script>
// @ is an alias to /src
import IconUsers from '@/components/IconUsers.vue';
import IconPlus from '@/components/IconPlus.vue';
import Modal from '@/components/Modal.vue';
import ClientForm from '@/components/ClientForm.vue';
import { mapState, mapActions } from 'vuex';

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
    ...mapState(['currentClient']),
  },
  methods: {
    ...mapActions(['addClient']),
    handleModalOpen() {
      this.isModalOpen = true;
    },
    handleModalClose() {
      this.isModalOpen = false;
    },
    async saveClient(client) {
      if (!this.$refs.clientForm.$v.$invalid) {
        console.log('ta tudo valido', client);
        // await this.addClient(client);
        this.handleModalClose();
      } else {
        console.log('invalido');
      }
    },
  },
};
</script>
