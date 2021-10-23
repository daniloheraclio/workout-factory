<template>
  <div>
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
        'bg-gray-200 text-gray-500 cursor-default hover:bg-gray-200 focus:ring-transparent': isInvalid,
      }"
      @click="$emit('on-click')"
    >
      {{ labelFormatted }}
    </button>
  </div>
</template>

<script>
import { lowerAndCapitalize } from '../helpers/helper-string';

export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    isInvalid: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    labelFormatted() {
      return this.lowerAndCapitalize(this.label);
    },
  },
  methods: {
    lowerAndCapitalize,
  },
};
</script>
