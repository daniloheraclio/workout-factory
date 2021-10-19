<template>
  <div class="mb-0 space-y-4">
    <div>
      <label for="name" class="block text-sm font-medium text-gray-700"
        >Name</label
      >
      <div class="mt-1">
        <input
          id="name"
          name="name"
          type="text"
          autocomplete="name"
          required
          v-model="client.name"
        />
      </div>
    </div>

    <div>
      <label for="email" class="block text-sm font-medium text-gray-700"
        >Email address</label
      >
      <div class="mt-1">
        <input
          id="email"
          name="email"
          type="text"
          autocomplete="email"
          required
          v-model="client.email"
        />
      </div>
    </div>

    <div>
      <label for="birthdate" class="block text-sm font-medium text-gray-700"
        >Birthdate</label
      >
      <div class="mt-1">
        <input
          id="birthdate"
          name="birthdate"
          type="date"
          autocomplete="date"
          required
          v-model="client.birthdate"
        />
      </div>
    </div>

    <div>
      <label for="gender" class="block text-sm font-medium text-gray-700"
        >Gender</label
      >
      <div class="mt-1">
        <select name="gender" id="gender" v-model="client.gender">
          <option value="">Please select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
    </div>

    <div>
      <label for="is-active" class="block text-sm font-medium text-gray-700"
        >Is active?
      </label>
      <div>
        <div class="flex items-center space-y-12 m-auto max-w-5xl">
          <label
            for="toggle"
            class="
              w-9
              h-5
              flex
              items-center
              bg-gray-300
              rounded-full
              p-1
              cursor-pointer
              duration-300
              ease-in-out
            "
          >
            <div
              class="
                focus:ring-2
                toggle-dot
                bg-purple-100
                w-4
                h-4
                rounded-full
                shadow-md
                transform
                duration-300
                ease-in-out
              "
              :class="{
                'translate-x-3 focus:outline-none': !client.isActive,
              }"
            ></div>
          </label>

          <span></span>
          <input
            type="checkbox"
            name="toggle"
            id="toggle"
            class="hidden"
            v-model="client.isActive"
            @click="client.isActive = !client.isActive"
          />
        </div>
      </div>
    </div>

    <div class="flex items-center justify-end">
      <button
        @click="cancel"
        class="
          mr-2
          py-2
          px-4
          border border-transparent
          rounded-md
          hover:bg-purple-100
        "
      >
        Cancel
      </button>
      <button
        @click="handleSave(client)"
        class="
          flex
          justify-center
          py-2
          px-4
          border border-transparent
          rounded-md
          shadow-sm
          text-sm
          font-medium
          text-white
          bg-purple-600
          hover:bg-purple-700
          focus:outline-none
          focus:ring-2
          focus:ring-offset-2
          focus:ring-purple-500
        "
      >
        Save
      </button>
    </div>
  </div>
</template>

<script>
// import { Validator } from 'simple-vue-validator';
// import { mapState } from 'vuex';

export default {
  props: {
    /**
     *  add or edit
     */
    clientAction: {
      type: String,
      required: false,
      default: 'add',
    },
    handleSave: {
      required: true,
    },
  },
  data() {
    return {
      client: {
        name: '',
        email: '',
        birthdate: '',
        gender: '',
        isActive: false,
      },
    };
  },
  components: {
    // still miss implement the edit
    // ...mapState(['currentClient']),
  },
  methods: {
    cancel() {
      this.$emit('on-cancel');
    },
  },
  // validators: {
  //   email: function (value) {
  //     return Validator.value(value).required.email();
  //   },
  // },
};
</script>
