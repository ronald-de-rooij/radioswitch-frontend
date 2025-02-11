<template>
  <button
    class="group relative inline-flex items-center justify-center overflow-hidden rounded-md p-0.5 font-bold"
    @click="signInWithGoogle"
  >
    <span
      class="absolute size-full bg-gradient-to-br from-primary via-primary-active-color to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-primary-active-color group-hover:to-primary"
    />
    <span
      class="relative rounded-md bg-gray-900 px-6 py-3 transition-all duration-300 ease-out group-hover:bg-gray-900/0"
    >
      <span class="relative text-white">
        <i class="pi pi-google mr-2 text-sm" /> Sign In
      </span>
    </span>
  </button>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()

function signInWithGoogle() {
  window.open(`${config.public.BASE_URL}/auth/google?callback}`, 'targetWindow', `toolbar=no, location=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=600px, height=800px`)
}
</script>
