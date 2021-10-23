<template>
  <div>
    <!-- Overlay -->
    <div class="hidden md:block fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"></div>

    <!-- Content -->
    <div
      class="
        fixed
        inset-0
        w-full
        h-screen
        overflow-y-auto
        p-3
        md:transform
        md:-translate-x-1/3
        md:relative
        md:mx-auto
        md:border
        md:w-96
        md:h-full
        md:p-5
        md:shadow-lg
        md:rounded-md
        bg-white
      "
    >
      <slot name="content" />
    </div>
  </div>
</template>

<script>
export default {};
</script>
