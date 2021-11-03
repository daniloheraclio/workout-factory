<template>
  <div class="relative">
    <div
      v-click-outside="hide"
      class="cursor-pointer relative p-0.5 rounded-full hover:bg-gray-200"
      @click="toggleOpen"
    >
      <IconDotsVertical class="text-gray-500 w-7 h-7 md:w-8 md:h-8 rounded-full md:ml-auto" />
    </div>

    <div v-if="isOpen" class="absolute z-10 top-9 md:top-11 right-0 py-2 w-36 bg-white shadow-lg rounded-md">
      <ul v-for="item in items" :key="item.value">
        <li @click="action(item)">
          <div
            class="flex justify-start items-center cursor-pointer p-2 mb-2 transition duration-300 hover:bg-gray-100"
          >
            <p class="text-sm text-gray-500">{{ item.label }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside';
import IconDotsVertical from '@/components/IconDotsVertical.vue';

export default {
  components: { IconDotsVertical },
  directives: {
    ClickOutside,
  },
  data() {
    return {
      isOpen: false,
      items: [
        {
          label: 'Edit',
          action: 'handleEditModal',
          type: 'edit',
        },
        {
          label: 'Delete',
          action: 'handleDeleteModal',
          type: 'delete',
        },
      ],
    };
  },
  mounted() {
    // prevent click outside event with popupItem.
    this.popupItem = this.$el;
  },
  methods: {
    toggleOpen() {
      this.isOpen = !this.isOpen;
    },
    hide() {
      this.isOpen = false;
    },
    action(item) {
      if (item.type === 'edit') {
        this.$emit('on-edit');
      }
      if (item.type === 'delete') {
        this.$emit('on-delete');
      }
      this.hide();
    },
  },
};
</script>
