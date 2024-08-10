<template>
  <header class="sticky top-0 z-20 flex items-center justify-between border-b bg-white p-3">
    <a href="#">
      <img src="@/assets/images/logo.png" alt="Logo" class="h-9" />
    </a>
    <a href="#" class="text-sm">
      <span v-if="true" class="flex items-center gap-1">
        Day complete!
        <CheckCircleIcon class="h-7 text-green-500" />
      </span>
      <span v-else class="flex items-center gap-1">
        Progress:
        <span class="font-mono">20%</span>
        <span class="h-3 w-3 rounded-full bg-red-500" />
      </span>
    </a>
  </header>
</template>

<script setup>
  import { CheckCircleIcon } from '@heroicons/vue/24/solid';
</script>
