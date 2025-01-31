<template>
  <div class="h-screen w-full text-center">
    <AppHeader />

    <div class="mx-auto max-w-96 text-left">
      <h1 class="mt-8 text-4xl font-bold text-white">
        Profile
      </h1>
      <div class="mt-8 text-lg text-white">
        <p>
          <span class="font-bold">Name:</span> {{ user.name }}
        </p>
        <p>
          <span class="font-bold">Email:</span>
          {{ user.email }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const { user } = storeToRefs(useUserStore())
</script>
