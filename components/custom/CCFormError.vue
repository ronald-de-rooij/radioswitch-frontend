<script setup lang="ts">
defineProps<{
  error: string | undefined
}>()
</script>

<template>
  <span v-show="error" class="block text-sm text-pp-red">{{ error }}</span>
</template>
