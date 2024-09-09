<template>
  <span
    v-show="error"
    class="block text-sm text-red-500"
  >
    {{ error }}
  </span>
</template>

<script setup lang="ts">
defineProps<{
  error: string | undefined
}>()
</script>
