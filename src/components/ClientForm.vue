<template>
  <div class="mb-0 space-y-5">
    <div class="flex items-center justify-between border-b-2 border-gray-100 pb-3 md:hidden">
      <button class="mr-2 py-2 px-2 border border-transparent rounded-md hover:bg-purple-100" @click="cancel">
        <IconChevronLeft class="text-purple-700" />
      </button>
      <Button :is-disabled="$v.$invalid" label="Save" @on-click="saveClient" />
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
          <option v-for="option in genderOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
        </select>
      </div>
    </div>

    <div>
      <div class="flex items-center justify-between">
        <label for="is-active" class="block text-sm font-medium text-gray-700">Is active? </label>
        <Toggle v-model="client.isActive" />
      </div>
    </div>

    <div class="hidden md:flex items-center justify-end gap-x-2">
      <Button :is-link="true" label="Cancel" @on-click="cancel" />
      <Button :is-disabled="$v.$invalid" label="Save" @on-click="saveClient" />
    </div>
  </div>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators';
import IconChevronLeft from './IconChevronLeft.vue';
import Button from './Button.vue';
import Toggle from './Toggle.vue';
import { validateEmail } from '../helpers/helper-string.js';

export default {
  components: {
    Button,
    IconChevronLeft,
    Toggle,
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
      toggleIsActive: false,
      genderOptions: [
        { value: '', label: 'Please select' },
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
      ],
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
    validateEmail,
    cancel() {
      this.$emit('on-cancel');
    },
    saveClient() {
      const sanitizedEmail = this.validateEmail(this.client.email);
      this.handleSave({ ...this.client, email: sanitizedEmail });
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
