<template>
  <div class="mb-0 space-y-5">
    <div class="flex items-center justify-between border-b-2 border-gray-100 pb-3 md:hidden">
      <button class="mr-2 py-2 px-2 border border-transparent rounded-md hover:bg-purple-100" @click="cancel">
        <IconChevronLeft class="text-purple-700" />
      </button>
      <button
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
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
        "
        :class="{
          'bg-gray-200 text-gray-500 cursor-default hover:bg-gray-200': $v.$invalid,
        }"
        @click="handleSave(client)"
      >
        Save
      </button>
    </div>

    <div>
      <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
      <div class="mt-1">
        <input
          id="name"
          v-model.trim="client.name"
          name="name"
          type="text"
          required
          :class="{
            'border-red-500 ring-red-500 focus:border-red-500 focus:ring-red-500': $v.client.name.$error,
          }"
          @blur="$v.client.name.$touch"
        />
      </div>
    </div>

    <div>
      <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
      <div class="mt-1">
        <input
          id="email"
          v-model.trim="client.email"
          name="email"
          type="text"
          autocomplete="email"
          required
          :class="{
            'border-red-500 ring-red-500 focus:border-red-500 focus:ring-red-500': $v.client.email.$error,
          }"
          @blur="$v.client.email.$touch"
        />
      </div>
    </div>

    <div>
      <label for="birthdate" class="block text-sm font-medium text-gray-700">Birthdate</label>
      <div class="mt-1">
        <input
          id="birthdate"
          v-model="client.birthdate"
          name="birthdate"
          type="date"
          autocomplete="date"
          required
          :class="{
            'border-red-500 ring-red-500 focus:border-red-500 focus:ring-red-500': $v.client.birthdate.$error,
          }"
          @blur="$v.client.birthdate.$touch"
        />
      </div>
    </div>

    <div>
      <label for="gender" class="block text-sm font-medium text-gray-700">Gender</label>
      <div class="mt-1">
        <select
          id="gender"
          v-model="client.gender"
          name="gender"
          :class="{
            'border-red-500 ring-red-500 focus:border-red-500 focus:ring-red-500': $v.client.gender.$error,
          }"
          @blur="$v.client.gender.$touch"
        >
          <option value="">Please select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
    </div>

    <div>
      <label for="is-active" class="block text-sm font-medium text-gray-700">Is active? </label>
      <div>
        <div class="flex items-center space-y-12 m-auto max-w-5xl">
          <label
            for="toggle"
            class="w-9 h-5 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer duration-300 ease-in-out"
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
            id="toggle"
            v-model="client.isActive"
            type="checkbox"
            name="toggle"
            class="hidden"
            @click="client.isActive = !client.isActive"
          />
        </div>
      </div>
    </div>

    <div>
      <label for="is-active" class="block text-sm font-medium text-gray-700">Is active? </label>
      <div>
        <div class="flex items-center space-y-12 m-auto max-w-5xl">
          <label
            for="toggle"
            class="w-9 h-5 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer duration-300 ease-in-out"
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
            id="toggle"
            v-model="client.isActive"
            type="checkbox"
            name="toggle"
            class="hidden"
            @click="client.isActive = !client.isActive"
          />
        </div>
      </div>
    </div>

    <div>
      <label for="is-active" class="block text-sm font-medium text-gray-700">Is active? </label>
      <div>
        <div class="flex items-center space-y-12 m-auto max-w-5xl">
          <label
            for="toggle"
            class="w-9 h-5 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer duration-300 ease-in-out"
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
            id="toggle"
            v-model="client.isActive"
            type="checkbox"
            name="toggle"
            class="hidden"
            @click="client.isActive = !client.isActive"
          />
        </div>
      </div>
    </div>

    <div>
      <label for="is-active" class="block text-sm font-medium text-gray-700">Is active? </label>
      <div>
        <div class="flex items-center space-y-12 m-auto max-w-5xl">
          <label
            for="toggle"
            class="w-9 h-5 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer duration-300 ease-in-out"
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
            id="toggle"
            v-model="client.isActive"
            type="checkbox"
            name="toggle"
            class="hidden"
            @click="client.isActive = !client.isActive"
          />
        </div>
      </div>
    </div>

    <div>
      <label for="is-active" class="block text-sm font-medium text-gray-700">Is active? </label>
      <div>
        <div class="flex items-center space-y-12 m-auto max-w-5xl">
          <label
            for="toggle"
            class="w-9 h-5 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer duration-300 ease-in-out"
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
            id="toggle"
            v-model="client.isActive"
            type="checkbox"
            name="toggle"
            class="hidden"
            @click="client.isActive = !client.isActive"
          />
        </div>
      </div>
    </div>

    <div class="hidden md:flex items-center justify-end">
      <button class="mr-2 py-2 px-4 border border-transparent rounded-md hover:bg-purple-100" @click="cancel">
        Cancel
      </button>
      <Button :is-invalid="$v.$invalid" label="Save" @on-click="handleSave(client)" />
    </div>
  </div>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators';
import IconChevronLeft from './IconChevronLeft.vue';
import Button from './Button.vue';
// import { mapState } from 'vuex';

export default {
  components: {
    Button,
    IconChevronLeft,
  },
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
  methods: {
    cancel() {
      this.$emit('on-cancel');
    },
  },
  validations: {
    client: {
      name: {
        required,
        minLength: minLength(4),
      },
      email: {
        required,
        email,
      },
      birthdate: {
        required,
      },
      gender: {
        required,
      },
    },
  },
};
</script>
