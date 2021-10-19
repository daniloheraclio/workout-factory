<template>
  <div>
    <!-- Overlay -->
    <div
      class="
        hidden
        md:block
        fixed
        inset-0
        bg-gray-600 bg-opacity-50
        overflow-y-auto
        h-full
        w-full
      "
    ></div>

    <!-- Content -->
    <div
      class="
        fixed
        md:relative
        top-0
        left-0
        md:mx-auto md:border
        w-full
        h-screen
        p-3
        md:w-96 md:h-full md:top-20 md:p-5 md:shadow-lg md:rounded-md
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
