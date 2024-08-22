<script setup lang="ts">
defineProps<{
  name?: string
  label: string
}>()
</script>

<template>
  <label :for="name" class="block">
    {{ label }}
  </label>
</template>
