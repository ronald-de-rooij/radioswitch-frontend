<script setup lang="ts">
import type { Stream, StreamResponse } from '~/models'

const { apiClient } = useApiClient()

const streams = ref<Stream[]>([])

onMounted(async () => {
  try {
    const { data } = await apiClient<StreamResponse>('/streams')

    streams.value = data
  }
  catch (error) {
    console.error(error)
  }
})

const activeStream = ref<Stream | null>()

function isActiveStream(stream: Stream) {
  return activeStream.value?.streamUrl === stream.streamUrl
}

function randomStation() {
  const randomIndex = Math.floor(Math.random() * streams.value.length)
  activeStream.value = streams.value[randomIndex]
}
</script>

<template>
  <div class="w-full h-screen text-center">
    <AppHeader />

    <div class="flex items-center p-6 bg-sky-500 w-96 mx-auto rounded-full my-8">
      <AudioPlayer v-if="activeStream" :stream-url="activeStream?.streamUrl" auto-play icons />
      <h2 class="text-xl font-bold text-white w-full">
        <template v-if="activeStream">
          {{ activeStream.title }}
        </template>
        <template v-else>
          Select a stream to start listening
        </template>
      </h2>
    </div>

    <!-- <a href="https://api.radio-switch.nl/auth/google" class="text-white">GOOGLE</a> -->

    <div class="grid grid-cols-4 max-w-7xl sm:px-4 lg:px-8 mx-auto gap-4">
      <div
        v-for="stream in streams" :key="stream.id"
        class="max-w-md rounded-lg p-0.5 cursor-pointer"
        @click="activeStream = stream"
      >
        <div
          class="bg-surface-card px-4 py-5 rounded-lg border-2 hover:border-sky-400 border-transparent"
          :class="{ '!border-sky-400': isActiveStream(stream) }"
        >
          <p class="font-bold text-white">
            {{ stream.title }}
          </p>
        </div>
      </div>
    </div>

    <Button class="mt-8 bg-sky-500 px-4 py-2 rounded-lg" @click="randomStation">
      I'm feeling lucky (random)
    </Button>
  </div>
</template>
