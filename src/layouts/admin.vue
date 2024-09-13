<template>
  <AppHeader :navigation="navigation" />

  <slot />
</template>

<script lang="ts" setup>
const navigation = [
  { name: 'Streams', href: '/admin', current: true },
  { name: 'Users', href: '/admin/users', current: false },
]
</script>
