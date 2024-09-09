<template>
  <label
    :for="name"
    class="block"
  >
    {{ label }}
  </label>
</template>

<script setup lang="ts">
defineProps<{
  name?: string
  label: string
}>()
</script>
