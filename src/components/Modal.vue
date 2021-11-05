<template>
  <div>
    <!-- Overlay -->
    <div
      class="
        fixed
        inset-0
        z-20
        overflow-y-auto
        flex
        justify-center
        items-center
        bg-gray-600 bg-opacity-40
        md:backdrop-filter md:backdrop-blur-sm
      "
    >
      <!-- Content -->
      <div class="bg-white p-3 w-full h-full md:w-96 md:h-auto md:m-auto md:p-5 md:rounded-md">
        <slot name="content" />
      </div>
    </div>
  </div>
</template>
